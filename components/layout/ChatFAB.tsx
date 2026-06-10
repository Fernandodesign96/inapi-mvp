'use client'

import { useState, useRef, useEffect } from 'react'
import { BotMessageSquare, X, ArrowLeft, Send, User, Phone } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type PanelState = 'closed' | 'menu' | 'ia' | 'ejecutivo'

interface Mensaje {
  rol: 'user' | 'assistant'
  contenido: string
}

export function ChatFAB() {
  const [panel, setPanel] = useState<PanelState>('closed')
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [input, setInput] = useState('')
  const [cargando, setCargando] = useState(false)
  const [visible, setVisible] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(t)
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
        contenido: data.reply ?? 'Lo siento, no pude procesar tu consulta.',
      }
      setMensajes(prev => [...prev, reply])
    } catch {
      setMensajes(prev => [
        ...prev,
        { rol: 'assistant', contenido: 'Hubo un problema de conexión. Inténtalo de nuevo.' },
      ])
    } finally {
      setCargando(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const isOpen = panel !== 'closed'

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4',
        'transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      )}
    >
      {isOpen && (
        <div
          className="w-[calc(100vw-2rem)] sm:w-[380px] bg-gob-surface rounded-gob-xl shadow-elevation-04 border border-gob-border flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ maxHeight: 'calc(100vh - 6rem)' }}
        >
          {/* Header */}
          <div className="bg-primary-dark p-gob-5 text-gob-text-inverse flex items-center gap-gob-3">
            {panel !== 'menu' && (
              <button
                onClick={() => setPanel('menu')}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors shrink-0"
                aria-label="Volver al menú"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="bg-white/10 p-2 rounded-gob-md">
              <BotMessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gri-body-sm">
                {panel === 'ia' ? 'Asistente IA · GRI' : panel === 'ejecutivo' ? 'Ejecutivo INAPI' : 'Asistente GRI'}
              </p>
              <p className="text-gri-label font-semibold text-gob-text-inverse/60 uppercase tracking-widest">
                {panel === 'ia' ? 'Respuestas automáticas' : panel === 'ejecutivo' ? 'Atención personalizada' : 'Portal INAPI · Marcas'}
              </p>
            </div>
            <button
              onClick={() => setPanel('closed')}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors shrink-0"
              aria-label="Cerrar asistente"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* MENU */}
          {panel === 'menu' && (
            <div className="p-gob-5 space-y-gob-3">
              <p className="text-gri-body-sm font-semibold text-gob-text mb-gob-4">
                ¿Cómo puedo ayudarte hoy?
              </p>

              <button
                onClick={() => {
                  setPanel('ia')
                  if (mensajes.length === 0) {
                    setMensajes([{
                      rol: 'assistant',
                      contenido: '¡Hola! Soy el asistente virtual de INAPI. Puedo ayudarte con dudas sobre el registro de marcas: costos, plazos, clases de Niza y más. ¿En qué te puedo ayudar?',
                    }])
                  }
                }}
                className="w-full flex items-center gap-gob-4 p-gob-4 bg-gob-surface-elevated hover:bg-gob-info-bg border border-gob-border hover:border-gob-primary/30 rounded-gob-lg text-left transition-all group"
              >
                <div className="w-10 h-10 rounded-gob-md bg-gob-primary/10 flex items-center justify-center shrink-0 group-hover:bg-gob-primary/20 transition-colors">
                  <BotMessageSquare className="w-5 h-5 text-gob-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-gri-body-sm font-semibold text-gob-text">Chatear con IA</p>
                  <p className="text-gri-body-xs text-muted-foreground leading-snug mt-0.5">
                    Respuestas automáticas sobre el proceso de registro de marcas
                  </p>
                </div>
              </button>

              <button
                onClick={() => setPanel('ejecutivo')}
                className="w-full flex items-center gap-gob-4 p-gob-4 bg-gob-surface-elevated hover:bg-gob-success-bg border border-gob-border hover:border-gob-success/30 rounded-gob-lg text-left transition-all group"
              >
                <div className="w-10 h-10 rounded-gob-md bg-gob-success-bg flex items-center justify-center shrink-0 group-hover:bg-gob-success-bg/80 transition-colors">
                  <User className="w-5 h-5 text-gob-success" />
                </div>
                <div className="min-w-0">
                  <p className="text-gri-body-sm font-semibold text-gob-text">Hablar con un ejecutivo</p>
                  <p className="text-gri-body-xs text-muted-foreground leading-snug mt-0.5">
                    Atención personalizada de INAPI · Lun–Vie, 9:00–18:00
                  </p>
                </div>
              </button>

              <div className="flex items-center gap-2 px-1 pt-2">
                <Image
                  src="/inapi-mvp/inapi-logo.jpg"
                  alt="INAPI"
                  width={52}
                  height={20}
                  className="object-contain opacity-50"
                />
                <span className="text-gri-label text-muted-foreground font-semibold uppercase tracking-wider">
                  Portal de Marcas
                </span>
              </div>
            </div>
          )}

          {/* CHAT IA */}
          {panel === 'ia' && (
            <>
              <div
                className="flex-1 overflow-y-auto p-gob-4 space-y-gob-3 bg-background"
                style={{ minHeight: 300, maxHeight: 420 }}
              >
                {mensajes.map((m, i) => (
                  <div
                    key={i}
                    className={cn('flex', m.rol === 'user' ? 'justify-end' : 'justify-start')}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-gob-lg px-gob-4 py-2.5 text-gri-body-sm leading-relaxed',
                        m.rol === 'user'
                          ? 'bg-gob-primary text-gob-text-inverse rounded-br-sm font-medium'
                          : 'bg-gob-surface border border-gob-border text-gob-text rounded-bl-sm'
                      )}
                    >
                      {m.contenido}
                    </div>
                  </div>
                ))}

                {cargando && (
                  <div className="flex justify-start">
                    <div className="bg-gob-surface border border-gob-border rounded-gob-lg rounded-bl-sm px-gob-4 py-gob-3 flex gap-1.5 items-center">
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-gob-3 border-t border-gob-border bg-gob-surface flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && enviarMensaje()}
                  placeholder="Escribe tu consulta..."
                  className="flex-1 h-11 text-gri-body-sm"
                  disabled={cargando}
                  aria-label="Mensaje para el asistente"
                />
                <button
                  onClick={enviarMensaje}
                  disabled={!input.trim() || cargando}
                  className="w-11 h-11 bg-gob-primary hover:bg-gob-primary-dark disabled:opacity-40 disabled:cursor-not-allowed text-gob-text-inverse rounded-gob-md flex items-center justify-center transition-colors shrink-0"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* EJECUTIVO */}
          {panel === 'ejecutivo' && (
            <div className="p-gob-6 space-y-gob-5">
              <div className="bg-gob-success-bg border border-gob-success/30 rounded-gob-lg p-gob-4 space-y-1">
                <p className="text-gri-body-sm font-semibold text-gob-success">
                  Atención presencial y telefónica
                </p>
                <p className="text-gri-body-xs text-gob-success/80">
                  Lunes a Viernes, 9:00 a 18:00 hrs.
                </p>
              </div>
              <div className="space-y-gob-3">
                <a
                  href="tel:+56223400800"
                  className="flex items-center gap-gob-4 p-gob-4 bg-gob-surface-elevated hover:bg-gob-surface-elevated/80 rounded-gob-lg border border-gob-border transition-colors"
                >
                  <div className="w-10 h-10 rounded-gob-md bg-gob-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gob-primary" />
                  </div>
                  <div>
                    <p className="text-gri-body-sm font-semibold text-gob-text">+56 2 2340 0800</p>
                    <p className="text-gri-body-xs text-muted-foreground">Mesa central INAPI</p>
                  </div>
                </a>
              </div>
              <Button
                onClick={() => setPanel('ia')}
                variant="outline"
                size="form"
                className="w-full font-semibold text-gri-body-sm gap-2"
              >
                <BotMessageSquare className="w-4 h-4" />
                O chatea con nuestra IA mientras esperas
              </Button>
            </div>
          )}
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setPanel(isOpen ? 'closed' : 'menu')}
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center shadow-elevation-04 transition-all duration-200 active:scale-95',
          isOpen
            ? 'bg-destructive hover:bg-destructive/90 rotate-90'
            : 'bg-gob-brand-from hover:bg-gob-brand-to hover:scale-110'
        )}
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente de INAPI'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gob-text-inverse" />
        ) : (
          <BotMessageSquare className="w-7 h-7 text-gob-text-inverse" />
        )}
      </button>
    </div>
  )
}
