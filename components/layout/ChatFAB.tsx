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

  // Slide-up con delay de 1s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000)
    return () => clearTimeout(t)
  }, [])

  // Auto-scroll al último mensaje
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
      {/* Panel flotante */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-[#E5E7EB] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ maxHeight: 'calc(100vh - 6rem)' }}
        >
          {/* Header */}
          <div className="bg-[#1E3A8A] p-5 text-white flex items-center gap-3">
            {panel !== 'menu' && (
              <button
                onClick={() => setPanel('menu')}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors shrink-0"
                aria-label="Volver al menú"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="bg-white/10 p-2 rounded-xl">
              <BotMessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-sm">
                {panel === 'ia' ? 'Asistente IA · GRI' : panel === 'ejecutivo' ? 'Ejecutivo INAPI' : 'Asistente GRI'}
              </p>
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
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
            <div className="p-5 space-y-3">
              <p className="text-sm font-bold text-slate-700 mb-4">¿Cómo puedo ayudarte hoy?</p>

              <button
                onClick={() => {
                  setPanel('ia')
                  if (mensajes.length === 0) {
                    setMensajes([{
                      rol: 'assistant',
                      contenido: '¡Hola! Soy el asistente virtual de INAPI. Puedo ayudarte con dudas sobre el registro de marcas: costos, plazos, clases de Niza y más. ¿En qué te puedo ayudar?'
                    }])
                  }
                }}
                className="w-full flex items-center gap-4 p-4 bg-[#F3F4F6] hover:bg-blue-50 border border-[#E5E7EB] hover:border-[#1A56DB]/30 rounded-2xl text-left transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1A56DB]/10 flex items-center justify-center shrink-0 group-hover:bg-[#1A56DB]/20 transition-colors">
                  <BotMessageSquare className="w-5 h-5 text-[#1A56DB]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-900">Chatear con IA</p>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                    Respuestas automáticas sobre el proceso de registro de marcas
                  </p>
                </div>
              </button>

              <button
                onClick={() => setPanel('ejecutivo')}
                className="w-full flex items-center gap-4 p-4 bg-[#F3F4F6] hover:bg-green-50 border border-[#E5E7EB] hover:border-green-300 rounded-2xl text-left transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-200 transition-colors">
                  <User className="w-5 h-5 text-green-700" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-slate-900">Hablar con un ejecutivo</p>
                  <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                    Atención personalizada de INAPI · Lun–Vie, 9:00–18:00
                  </p>
                </div>
              </button>

              <div className="flex items-center gap-2 px-1 pt-2">
                <Image
                  src="/inapi-mvp/inapi-logo.png"
                  alt="INAPI"
                  width={52}
                  height={20}
                  className="object-contain opacity-50"
                />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Portal de Marcas</span>
              </div>
            </div>
          )}

          {/* CHAT IA */}
          {panel === 'ia' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9FAFB]" style={{ minHeight: 300, maxHeight: 420 }}>
                {mensajes.map((m, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex',
                      m.rol === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                        m.rol === 'user'
                          ? 'bg-[#1A56DB] text-white rounded-br-sm font-medium'
                          : 'bg-white border border-[#E5E7EB] text-[#111827] rounded-bl-sm'
                      )}
                    >
                      {m.contenido}
                    </div>
                  </div>
                ))}

                {/* Indicador de escritura */}
                {cargando && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#E5E7EB] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-[#E5E7EB] bg-white flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && enviarMensaje()}
                  placeholder="Escribe tu consulta..."
                  className="flex-1 h-11 border-[#D1D5DB] focus:ring-2 focus:ring-[#1A56DB] focus:ring-offset-1 text-sm"
                  disabled={cargando}
                  aria-label="Mensaje para el asistente"
                />
                <button
                  onClick={enviarMensaje}
                  disabled={!input.trim() || cargando}
                  className="w-11 h-11 bg-[#1A56DB] hover:bg-[#1E3A8A] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {/* EJECUTIVO */}
          {panel === 'ejecutivo' && (
            <div className="p-6 space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 space-y-1">
                <p className="text-sm font-black text-green-800">Atención presencial y telefónica</p>
                <p className="text-xs text-green-700">Lunes a Viernes, 9:00 a 18:00 hrs.</p>
              </div>
              <div className="space-y-3">
                <a
                  href="tel:+56223400800"
                  className="flex items-center gap-4 p-4 bg-[#F3F4F6] hover:bg-slate-100 rounded-2xl border border-[#E5E7EB] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1A56DB]/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#1A56DB]" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">+56 2 2340 0800</p>
                    <p className="text-[11px] text-slate-500">Mesa central INAPI</p>
                  </div>
                </a>
              </div>
              <Button
                onClick={() => setPanel('ia')}
                variant="outline"
                className="w-full h-11 border-[#D1D5DB] font-bold text-sm gap-2"
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
          'w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 active:scale-95',
          isOpen
            ? 'bg-[#DC2626] hover:bg-red-700 rotate-90'
            : 'bg-[#1A56DB] hover:bg-[#1E3A8A] hover:scale-110'
        )}
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente de INAPI'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <BotMessageSquare className="w-7 h-7 text-white" />
        )}
      </button>
    </div>
  )
}
