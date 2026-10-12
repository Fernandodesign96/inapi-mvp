'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
import { SkipIfAuthenticated } from '@/components/tramites/SkipIfAuthenticated'
import { nextAfterAuth } from '@/lib/tramites/entry'
import { goTramites } from '@/lib/tramites/go'
import { DEMO_USER, signIn } from '@/lib/tramites/session'

function normalizarRun(value: string) {
  return value.replace(/\./g, '').replace(/\s/g, '').toUpperCase()
}

export default function TramitesAuthPage() {
  const [run, setRun] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [cargandoInstitucional, setCargandoInstitucional] = useState(false)
  const [cargandoClaveUnica, setCargandoClaveUnica] = useState(false)

  const entrar = (metodo: 'clave-inapi' | 'clave-unica') => {
    if (metodo === 'clave-inapi') setCargandoInstitucional(true)
    else setCargandoClaveUnica(true)

    signIn({
      metodo,
      run: metodo === 'clave-inapi' && run ? normalizarRun(run) : DEMO_USER.run,
    })
    window.setTimeout(() => goTramites(nextAfterAuth(window.location.search)), 800)
  }

  const handleLoginForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!run.trim() || !password) return
    entrar('clave-inapi')
  }

  return (
    <SkipIfAuthenticated>
    <div className="flex flex-1 items-center justify-center px-gob-4 py-gob-8">
      <div className="w-full max-w-md">
        <Link
          href="/tramites"
          className="mb-gob-4 inline-flex min-h-11 items-center gap-gob-2 rounded-gob-sm text-gri-body font-medium text-gob-link hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        >
          <ArrowLeft className="h-5 w-5 shrink-0" aria-hidden />
          Volver a trámites en línea
        </Link>

        <div className="overflow-hidden rounded-gob-xl border border-gob-border bg-card text-card-foreground shadow-elevation-04">
          <div className="h-1.5 bg-gradient-to-r from-gob-primary to-gob-primary-dark" />

          <div className="space-y-gob-5 px-gob-6 pb-gob-7 pt-gob-6">
            <div className="flex flex-col items-center gap-gob-4 text-center">
              <Image
                src="/inapi-mvp/inapi-logo.jpg"
                alt=""
                width={72}
                height={28}
                className="h-20 w-auto object-contain"
              />
              <div className="space-y-2">
                <h1 className="font-heading text-gri-h2 font-medium leading-tight text-gob-text">
                  Bienvenido al portal de trámites INAPI
                </h1>
                <p className="text-gri-body-sm leading-relaxed text-gob-text">
                  Inicia sesión para gestionar tus marcas y patentes.
                </p>
              </div>
            </div>

            <form onSubmit={handleLoginForm} className="space-y-gob-4">
              <div className="space-y-2">
                <label htmlFor="run" className="gri-field-label block">
                  RUN
                </label>
                <Input
                  id="run"
                  type="text"
                  inputMode="text"
                  placeholder="12.345.678-9"
                  value={run}
                  onChange={e => setRun(e.target.value)}
                  className="h-11 text-gri-body-sm"
                  aria-required="true"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="gri-field-label block">
                  Contraseña institucional
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Contraseña institucional"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="h-11 pr-11 text-gri-body-sm"
                    aria-required="true"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center text-gob-text hover:text-gob-primary"
                    aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!run.trim() || !password || cargandoInstitucional || cargandoClaveUnica}
                size="form"
                className="mt-2 w-full gap-2 font-semibold"
              >
                {cargandoInstitucional ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    Iniciar sesión
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="space-y-gob-4">
              <div className="flex items-center gap-gob-3">
                <div className="h-px flex-1 bg-gob-border" />
                <span className="whitespace-nowrap text-gri-body-xs font-medium text-gob-text">
                  O puedes ingresar con tu ClaveÚnica
                </span>
                <div className="h-px flex-1 bg-gob-border" />
              </div>

              <ClaveUnicaButton
                onClick={() => entrar('clave-unica')}
                disabled={cargandoInstitucional}
                loading={cargandoClaveUnica}
              />
            </div>
          </div>
        </div>

        <p className="mt-gob-5 text-center text-gri-label leading-relaxed text-gob-text">
          Este portal es propiedad del Estado de Chile · INAPI ·{' '}
          <strong className="font-semibold">Acceso seguro HTTPS</strong>
        </p>
      </div>
    </div>
    </SkipIfAuthenticated>
  )
}
