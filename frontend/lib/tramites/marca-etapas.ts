import type { JourneyStep } from '@/components/story/JourneyRail'

/** Alineado a Mi INAPI / Etapas propuestas IPAS (7 hitos de la línea). */
export const MARCA_ETAPA_IDS = [
  'recibida',
  'forma',
  'publicacion',
  'oposicion',
  'fondo',
  'aceptacion',
  'pago',
] as const

export type MarcaEtapaId = (typeof MARCA_ETAPA_IDS)[number]
export type SolicitudTone = 'required' | 'progress' | 'registered' | 'closed'
export type DemoPersona = 'frecuente' | 'natural' | 'nuevo'
export type SolicitudSeverity = 'critical' | 'action' | 'review' | 'watch' | 'success' | 'closed'

export const MARCA_ETAPAS: { id: MarcaEtapaId; title: string; subtitle?: string; body: string }[] = [
  {
    id: 'recibida',
    title: 'Solicitud recibida',
    body: 'INAPI recibió su solicitud y está revisando sus datos.',
  },
  {
    id: 'forma',
    title: 'Revisión de requisitos',
    subtitle: '(Examen de Forma)',
    body: 'INAPI verifica que la solicitud cumpla los requisitos legales y formales.',
  },
  {
    id: 'publicacion',
    title: 'Publicación en Diario Oficial',
    body: 'Su marca se publica en el Diario Oficial y terceros pueden oponerse dentro de un plazo.',
  },
  {
    id: 'oposicion',
    title: 'Oposición',
    body: 'Si se presenta una oposición, un examinador revisa el caso y puede pedir respuesta o antecedentes.',
  },
  {
    id: 'fondo',
    title: 'Revisión legal y de fondo',
    subtitle: '(Examen de Fondo)',
    body: 'Un especialista de INAPI evalúa si su marca cumple con la ley para ser registrada.',
  },
  {
    id: 'aceptacion',
    title: 'En proceso de aceptación a registro',
    body: 'La solicitud superó la evaluación de fondo y está en la etapa previa al pago de derechos.',
  },
  {
    id: 'pago',
    title: 'Pago y registro',
    body: 'Si la solicitud fue aceptada, debe pagar los derechos para obtener el título de registro.',
  },
]

export const PATENTE_ETAPAS: { id: MarcaEtapaId; title: string; subtitle?: string; body: string }[] = [
  { id: 'recibida', title: 'Solicitud recibida', body: 'INAPI recibió su solicitud y está revisando sus datos.' },
  { id: 'forma', title: 'Examen preliminar', body: 'INAPI verifica tasas, poderes y documentos técnicos mínimos.' },
  { id: 'publicacion', title: 'Publicación', body: 'Debe requerir la publicación del extracto a su costa.' },
  { id: 'oposicion', title: 'Oposición', body: 'Cualquier interesado puede demandar oposición.' },
  { id: 'fondo', title: 'Peritaje', subtitle: '(Examen de fondo)', body: 'Se evalúa novedad, nivel inventivo y aplicación industrial.' },
  { id: 'aceptacion', title: 'Resolución', body: 'INAPI concede o rechaza la solicitud.' },
  { id: 'pago', title: 'Concesión y mantención', body: 'Si se concede, paga derechos y mantiene la vigencia.' },
]

export function marcaTimeline(current: MarcaEtapaId, tone: SolicitudTone): JourneyStep[] {
  const order = MARCA_ETAPA_IDS
  const cur = tone === 'registered' || tone === 'closed' ? order.length : order.indexOf(current)
  return MARCA_ETAPAS.map((etapa, i) => {
    const status: JourneyStep['status'] =
      tone === 'registered' || tone === 'closed' || i < cur ? 'done' : i === cur ? 'current' : 'pending'
    return {
      title: etapa.title,
      body: etapa.body,
      status,
      meta: etapa.subtitle,
    }
  })
}

export function patenteTimeline(current: MarcaEtapaId, tone: SolicitudTone): JourneyStep[] {
  const order = MARCA_ETAPA_IDS
  const cur = tone === 'registered' || tone === 'closed' ? order.length : order.indexOf(current)
  return PATENTE_ETAPAS.map((etapa, i) => {
    const status: JourneyStep['status'] =
      tone === 'registered' || tone === 'closed' || i < cur ? 'done' : i === cur ? 'current' : 'pending'
    return {
      title: etapa.title,
      body: etapa.body,
      status,
      meta: etapa.subtitle,
    }
  })
}

export function etapaLabel(id: MarcaEtapaId) {
  const etapa = MARCA_ETAPAS.find(e => e.id === id)
  return etapa ? (etapa.subtitle ? `${etapa.title} ${etapa.subtitle}` : etapa.title) : id
}

export function toneAccent(tone: SolicitudTone): 'danger' | 'info' | 'success' {
  if (tone === 'required') return 'danger'
  if (tone === 'registered' || tone === 'closed') return 'success'
  return 'info'
}

export function toneLabel(tone: SolicitudTone) {
  if (tone === 'required') return 'Acción requerida'
  if (tone === 'registered') return 'Registrada'
  if (tone === 'closed') return 'Concluida'
  return 'En trámite'
}

export function severityOf(n: { tone: SolicitudTone; estadoIpas: string; etapa: MarcaEtapaId }): SolicitudSeverity {
  if (n.tone === 'registered') return 'success'
  if (n.tone === 'closed') return 'closed'
  if (n.tone === 'required') {
    const estado = n.estadoIpas.toLowerCase()
    if (estado.includes('abandon') || estado.includes('no presentada') || estado.includes('falta de')) return 'critical'
    return 'action'
  }
  if (n.etapa === 'forma' || n.etapa === 'fondo') return 'review'
  return 'watch'
}

export function severityLabel(severity: SolicitudSeverity) {
  if (severity === 'critical') return 'Crítica'
  if (severity === 'action') return 'Pendiente'
  if (severity === 'review') return 'En revisión'
  if (severity === 'watch') return 'En trámite'
  if (severity === 'success') return 'Registrada'
  return 'Concluida'
}

const ETAPA_DAY_OFFSETS = [0, 14, 35, 65, 90, 120, 150]

export function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1))
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

export function formatEtapaDate(iso: string) {
  const [y, m, d] = iso.split('-')
  if (!d) return iso
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${Number(d)} ${months[Number(m) - 1]} ${y.slice(2)}`
}

export function etapaDates(presentacion: string, current: MarcaEtapaId, tone: SolicitudTone) {
  const cur = tone === 'registered' || tone === 'closed' ? MARCA_ETAPA_IDS.length : Math.max(0, MARCA_ETAPA_IDS.indexOf(current))
  return MARCA_ETAPA_IDS.map((_, i) => (i <= cur ? formatEtapaDate(addDays(presentacion || '2026-01-10', ETAPA_DAY_OFFSETS[i] ?? 0)) : ''))
}

export const PERSONA_HELP: Record<DemoPersona, string> = {
  frecuente: 'Varias solicitudes en distintas etapas, como una oficina o un estudio.',
  natural: 'Pocas solicitudes propias, sin agente.',
  nuevo: 'Aún no presentas una solicitud. Empieza por las herramientas o el portal.',
}
