import type { NextRequest } from 'next/server'

const SYSTEM_PROMPT = `Eres el asistente virtual del portal de solicitud de marcas de INAPI Chile.
Tu rol es ayudar a ciudadanos y emprendedores a entender el proceso de registro de marcas.
Responde siempre en español, con lenguaje claro y cotidiano (nunca técnico-legal).
Si el usuario pregunta sobre su solicitud específica, indícale que para eso puede hablar con un ejecutivo.
Temas que puedes responder: qué es una marca, clases de Niza, costos, plazos, diferencia entre
marca denominativa y figurativa, qué hace el examen de fondo, cómo se publica en el Diario Oficial,
qué documentos se necesitan, qué pasa si alguien se opone a mi marca, cuánto vale una UTM.
No respondas sobre temas fuera del registro de marcas en Chile.`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json(
        { error: 'API key no configurada' },
        { status: 500 }
      )
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Anthropic error:', err)
      return Response.json({ error: 'Error al contactar la IA' }, { status: 502 })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text ?? 'No pude procesar tu consulta.'

    return Response.json({ reply: text })
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
