'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Contrast, Eye, EyeOff } from 'lucide-react'
import { SkipIfAuthenticated } from '@/components/tramites/SkipIfAuthenticated'
import { nextAfterAuth } from '@/lib/tramites/entry'
import { findDemoAccount, STEREOTYPE_ACCOUNTS } from '@/lib/tramites/demo-accounts'
import { signIn } from '@/lib/tramites/session'
import { useQueryParams } from '@/lib/tramites/use-query'
import { cn } from '@/lib/utils'

const RECUPERA = 'https://claveunica.gob.cl/recuperar'
const SOLICITA = 'https://claveunica.gob.cl/'
const AYUDA = 'https://claveunica.gob.cl/'

export default function ClaveUnicaSimPage() {
  const router = useRouter()
  const params = useQueryParams()
  const [run, setRun] = useState('')
  const [clave, setClave] = useState('')
  const [showClave, setShowClave] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [textScale, setTextScale] = useState(1)
  const [sending, setSending] = useState(false)

  const ingresar = (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    const found = findDemoAccount(run, clave) ?? (!run.trim() ? STEREOTYPE_ACCOUNTS[0] : undefined)
    if (!found) {
      setSending(false)
      return
    }
    signIn({
      metodo: 'clave-unica',
      run: found.runDigits,
      nombre: found.nombre,
      registered: found.persona !== 'nuevo',
    })
    router.push(nextAfterAuth(params.toString()))
  }

  return (
    <SkipIfAuthenticated>
      <div className="flex min-h-svh items-center justify-center bg-[#f2f2f2] px-4 py-8">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cu-portal-title"
          className={cn(
            'w-full max-w-[28.5rem] border border-black bg-white text-[#333]',
            highContrast && 'bg-black text-white',
          )}
          style={{ fontSize: `${textScale}rem` }}
        >
          <div className="flex h-2 w-[42%]" aria-hidden>
            <span className="w-[32%] bg-[#0039A6]" />
            <span className="w-[18%] bg-white" />
            <span className="flex-1 bg-[#D52B1E]" />
          </div>

          <div className="px-8 pb-8 pt-5">
            <div className="mb-8 flex items-start justify-between gap-3">
              <p className="flex items-center gap-2 font-sans text-[1.35rem] font-medium leading-none text-[#5B8DB8]">
                <img
                  src="/inapi-mvp/claveunica-mark-blue.svg"
                  alt=""
                  width={24}
                  height={24}
                  className="size-7 shrink-0"
                />
                ClaveÚnica
              </p>
              <div className="flex items-center gap-1" role="group" aria-label="Accesibilidad">
                <button
                  type="button"
                  className={cn(
                    'inline-flex size-9 items-center justify-center border border-black bg-white text-black',
                    highContrast && 'bg-yellow-300',
                  )}
                  aria-pressed={highContrast}
                  aria-label="Alto contraste"
                  onClick={() => setHighContrast(v => !v)}
                >
                  <Contrast className="size-5" strokeWidth={2} aria-hidden />
                </button>
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center border border-black bg-white font-serif text-[0.8rem] font-bold text-black"
                  aria-label="Reducir tamaño de texto"
                  onClick={() => setTextScale(s => Math.max(0.85, Number((s - 0.1).toFixed(2))))}
                >
                  A-
                </button>
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center border border-black bg-white font-serif text-base font-bold text-black"
                  aria-label="Aumentar tamaño de texto"
                  onClick={() => setTextScale(s => Math.min(1.35, Number((s + 0.1).toFixed(2))))}
                >
                  A+
                </button>
              </div>
            </div>

            <h1
              id="cu-portal-title"
              className="mb-8 text-center font-heading text-[1.65rem] font-medium leading-tight tracking-tight"
            >
              Portal Ciudadano ClaveÚnica
            </h1>

            <form className="space-y-5" onSubmit={ingresar}>
              <label className="sr-only" htmlFor="cu-run">
                RUN
              </label>
              <input
                id="cu-run"
                name="run"
                type="text"
                autoComplete="username"
                placeholder="Ingresa tu RUN"
                value={run}
                onChange={e => setRun(e.target.value)}
                className={cn(
                  'h-12 w-full border border-black bg-white px-3 text-base text-[#333] outline-none placeholder:text-[#8a8a8a]',
                  'focus-visible:ring-2 focus-visible:ring-[#0F69C4] focus-visible:ring-offset-1',
                  highContrast && 'bg-black text-white placeholder:text-white/70',
                )}
              />

              <div className="flex">
                <label className="sr-only" htmlFor="cu-clave">
                  ClaveÚnica
                </label>
                <input
                  id="cu-clave"
                  name="password"
                  type={showClave ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Ingresa tu ClaveÚnica"
                  value={clave}
                  onChange={e => setClave(e.target.value)}
                  className={cn(
                    'h-12 min-w-0 flex-1 border border-black border-r-0 bg-white px-3 text-base text-[#333] outline-none placeholder:text-[#8a8a8a]',
                    'focus-visible:ring-2 focus-visible:ring-[#0F69C4] focus-visible:ring-offset-1',
                    highContrast && 'bg-black text-white placeholder:text-white/70',
                  )}
                />
                <button
                  type="button"
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-black bg-[#c5dff5] text-[#0F69C4]"
                  aria-label={showClave ? 'Ocultar ClaveÚnica' : 'Mostrar ClaveÚnica'}
                  onClick={() => setShowClave(v => !v)}
                >
                  {showClave ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
                </button>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  href={RECUPERA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[0.95rem] text-[#1a5fb4] underline underline-offset-2"
                >
                  Recupera tu ClaveÚnica
                </a>
                <a
                  href={SOLICITA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[0.95rem] text-[#1a5fb4] underline underline-offset-2"
                >
                  Solicita tu ClaveÚnica
                </a>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-2 flex h-12 w-full items-center justify-center bg-[#0F69C4] font-sans text-base font-bold tracking-wide text-white underline decoration-2 underline-offset-4 hover:bg-[color-mix(in_srgb,black_26%,#0F69C4)] focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_#FFBE5C] disabled:opacity-80"
              >
                {sending ? 'INGRESANDO…' : 'INGRESA'}
              </button>
            </form>

            <p className="mt-6 text-center">
              <a
                href={AYUDA}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.95rem] text-[#5c5346] underline underline-offset-2"
              >
                ¿Necesitas ayuda?
              </a>
            </p>
          </div>
        </div>
      </div>
    </SkipIfAuthenticated>
  )
}
