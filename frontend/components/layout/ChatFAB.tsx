'use client'

import { useState, useRef, useEffect } from 'react'
import { BotMessageSquare, X, ArrowLeft, Send, User, Phone, ChevronUp, Mail } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type PanelState = 'closed' | 'menu' | 'ia' | 'ejecutivo'

interface Mensaje {
  rol: 'user' | 'assistant'
  contenido: string
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function ChatFAB({ title = 'Asistente GRI' }: { title?: string }) {
  const [panel, setPanel] = useState<PanelState>('closed')
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [input, setInput] = useState('')
  const [cargando, setCargando] = useState(false)
  const [visible, setVisible] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, cargando])

  const enviarMensaje = async () => {
    if (!input.trim() || cargando) return
    const userMsg: Mensaje = { rol: 'user', contenido: input.trim() }
    const nuevosMensajes = [...mensajes, userMsg]
    setMensajes(nuevosMensajes)
    setInput('')
    setCargando(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nuevosMensajes.map(m => ({
            role: m.rol,
            content: m.contenido,
          })),
        }),
      })
      const data = await res.json()
      const reply: Mensaje = {
        rol: 'assistant',
        contenido: data.reply ?? 'No pude procesar tu consulta. Inténtalo otra vez o usa el formulario de contacto.',
      }
      setMensajes(prev => [...prev, reply])
    } catch {
      setMensajes(prev => [
        ...prev,
        {
          rol: 'assistant',
          contenido: 'Hubo un problema de conexión. Puedes escribir a inapi@inapi.cl o volver a intentar.',
        },
      ])
    } finally {
      setCargando(false)
      window.setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const isOpen = panel !== 'closed'

  return (
    <div
      data-chat-fab
      className={cn(
        'fixed bottom-6 right-6 z-50 flex flex-col items-end gap-gob-3',
        'transition-all duration-150',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
      )}
    >
      {isOpen ? (
        <section
          aria-labelledby="asistente-titulo"
          className="flex w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-gob-lg border border-gob-border bg-card shadow-elevation-05 sm:w-[380px]"
          style={{ maxHeight: 'calc(100vh - 6rem)' }}
        >
          <header className="flex items-center gap-gob-3 bg-gob-primary p-gob-4 text-gob-text-inverse">
            {panel !== 'menu' ? (
              <button
                type="button"
                onClick={() => setPanel('menu')}
                className={cn('inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-white/15', focusRing)}
                aria-label="Volver al menú"
              >
                <ArrowLeft className="size-5" aria-hidden />
              </button>
            ) : (
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-gob-md bg-white/15" aria-hidden>
                <BotMessageSquare className="size-5" />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p id="asistente-titulo" className="text-gri-body-sm font-medium">
                {panel === 'ia' ? 'Chat con IA' : panel === 'ejecutivo' ? 'Atención ciudadana' : title}
              </p>
              <p className="text-gri-label font-medium uppercase tracking-wider text-gob-text-inverse/90">
                {panel === 'ia'
                  ? 'Respuestas automáticas'
                  : panel === 'ejecutivo'
                    ? 'Horario de atención'
                    : 'Portal INAPI · Marcas'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPanel('closed')}
              className={cn('inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-white/15', focusRing)}
              aria-label="Cerrar asistente"
            >
              <X className="size-5" aria-hidden />
            </button>
          </header>

          {panel === 'menu' ? (
            <div className="space-y-gob-3 p-gob-5">
              <p className="text-gri-body font-medium text-gob-text">¿Cómo puedo ayudarte hoy?</p>

              <button
                type="button"
                onClick={() => {
                  setPanel('ia')
                  if (mensajes.length === 0) {
                    setMensajes([
                      {
                        rol: 'assistant',
                        contenido:
                          'Hola. Soy el asistente virtual de INAPI. Puedo orientarte sobre marcas, plazos, tasas y el clasificador de Niza. Esta orientación no reemplaza una resolución oficial. ¿En qué te ayudo?',
                      },
                    ])
                  }
                }}
                className={cn(
                  'group flex min-h-11 w-full items-center gap-gob-4 rounded-gob-md border border-gob-border bg-gob-surface-elevated p-gob-4 text-left transition-colors duration-150 hover:border-gob-primary hover:bg-gob-info-bg',
                  focusRing,
                )}
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-gob-md bg-gob-primary/10 text-gob-primary">
                  <BotMessageSquare className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-gri-body-sm font-medium text-gob-text">Chatear con IA</span>
                  <span className="mt-0.5 block text-gri-body-xs leading-snug text-muted-foreground">
                    Respuestas automáticas sobre el proceso de registro de marcas
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPanel('ejecutivo')}
                className={cn(
                  'group flex min-h-11 w-full items-center gap-gob-4 rounded-gob-md border border-gob-border bg-gob-surface-elevated p-gob-4 text-left transition-colors duration-150 hover:border-gob-primary hover:bg-gob-info-bg',
                  focusRing,
                )}
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-gob-md bg-[#E8F5E9] text-gob-success">
                  <User className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-gri-body-sm font-medium text-gob-text">Hablar con un ejecutivo</span>
                  <span className="mt-0.5 block text-gri-body-xs leading-snug text-muted-foreground">
                    Atención personalizada de INAPI · Lun–Vie, 9:00–18:00
                  </span>
                </span>
              </button>

              <p className="pt-gob-2 text-gri-label font-medium uppercase tracking-wider text-muted-foreground">
                Portal de marcas
              </p>
            </div>
          ) : null}

          {panel === 'ia' ? (
            <>
              <div
                className="flex-1 space-y-gob-3 overflow-y-auto bg-background p-gob-4"
                style={{ minHeight: 280, maxHeight: 400 }}
              >
                {mensajes.map((m, i) => (
                  <div key={`${m.rol}-${i}`} className={cn('flex', m.rol === 'user' ? 'justify-end' : 'justify-start')}>
                    <p
                      className={cn(
                        'max-w-[80%] rounded-gob-md px-gob-4 py-gob-3 text-gri-body-sm leading-[1.5]',
                        m.rol === 'user'
                          ? 'rounded-br-sm bg-gob-primary text-gob-text-inverse'
                          : 'rounded-bl-sm border border-gob-border bg-card text-gob-text',
                      )}
                    >
                      {m.contenido}
                    </p>
                  </div>
                ))}
                {cargando ? (
                  <div className="flex justify-start" aria-live="polite">
                    <p className="sr-only">El asistente está escribiendo</p>
                    <div className="flex items-center gap-1.5 rounded-gob-md border border-gob-border bg-card px-gob-4 py-gob-3">
                      <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                    </div>
                  </div>
                ) : null}
                <div ref={messagesEndRef} />
              </div>
              <form
                className="flex gap-gob-2 border-t border-gob-border bg-card p-gob-3"
                onSubmit={e => {
                  e.preventDefault()
                  void enviarMensaje()
                }}
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Escribe tu consulta"
                  className="h-11 min-h-11 flex-1 text-gri-body-sm"
                  disabled={cargando}
                  aria-label="Mensaje para el asistente"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || cargando}
                  className={cn(
                    'inline-flex size-11 min-h-11 shrink-0 items-center justify-center rounded-gob-md bg-gob-primary text-gob-text-inverse transition-colors duration-150 hover:bg-gob-primary-dark disabled:cursor-not-allowed disabled:opacity-40',
                    focusRing,
                  )}
                  aria-label="Enviar mensaje"
                >
                  <Send className="size-4" aria-hidden />
                </button>
              </form>
            </>
          ) : null}

          {panel === 'ejecutivo' ? (
            <div className="space-y-gob-4 p-gob-5">
              <div className="rounded-gob-md border border-[#C8E6C9] bg-[#E8F5E9] p-gob-4">
                <p className="text-gri-body-sm font-medium text-[#1B5E20]">Atención presencial y telefónica</p>
                <p className="mt-1 text-gri-body-xs text-[#2E7D32]">
                  Lunes a jueves, 09:00 a 18:00. Viernes, 09:00 a 17:00.
                </p>
              </div>
              <a
                href="tel:+56228870400"
                className={cn(
                  'flex min-h-11 items-center gap-gob-4 rounded-gob-md border border-gob-border bg-gob-surface-elevated p-gob-4 transition-colors duration-150 hover:border-gob-primary hover:bg-gob-info-bg',
                  focusRing,
                )}
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-gob-md bg-gob-primary/10 text-gob-primary">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-gri-body-sm font-medium text-gob-text">(56 2) 2 887 0400</span>
                  <span className="text-gri-body-xs text-muted-foreground">Mesa central INAPI</span>
                </span>
              </a>
              <a
                href="mailto:inapi@inapi.cl"
                className={cn(
                  'flex min-h-11 items-center gap-gob-4 rounded-gob-md border border-gob-border bg-gob-surface-elevated p-gob-4 transition-colors duration-150 hover:border-gob-primary hover:bg-gob-info-bg',
                  focusRing,
                )}
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-gob-md bg-gob-primary/10 text-gob-primary">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-gri-body-sm font-medium text-gob-text">inapi@inapi.cl</span>
                  <span className="text-gri-body-xs text-muted-foreground">Atención ciudadana</span>
                </span>
              </a>
              <Link
                href="/contacto"
                className={cn(
                  'inline-flex min-h-11 w-full items-center justify-center rounded-gob-md border border-gob-primary px-gob-5 text-gri-body-sm font-medium text-gob-primary transition-colors duration-150 hover:bg-gob-primary hover:text-gob-text-inverse',
                  focusRing,
                )}
              >
                Ver todos los canales de contacto
              </Link>
            </div>
          ) : null}
        </section>
      ) : null}

      <div className="flex items-center gap-gob-3">
        {showTop ? (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={cn(
              'inline-flex size-14 items-center justify-center rounded-full border border-gob-primary bg-white text-gob-primary shadow-elevation-04 transition-colors duration-150 hover:border-gob-primary-dark hover:bg-gob-primary hover:text-white',
              focusRing,
            )}
            aria-label="Volver al inicio de la página"
          >
            <ChevronUp className="size-7" aria-hidden />
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => setPanel(isOpen ? 'closed' : 'menu')}
          className={cn(
            'inline-flex size-14 items-center justify-center rounded-full shadow-elevation-04 transition-colors duration-150',
            isOpen ? 'bg-gob-accent hover:bg-[#E4332C]' : 'bg-gob-primary hover:bg-gob-primary-dark',
            focusRing,
          )}
          aria-label={isOpen ? 'Cerrar asistente' : `Abrir ${title}`}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="size-6 text-gob-text-inverse" aria-hidden />
          ) : (
            <BotMessageSquare className="size-7 text-gob-text-inverse" aria-hidden />
          )}
        </button>
      </div>
    </div>
  )
}
