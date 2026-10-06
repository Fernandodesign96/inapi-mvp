'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SkipLink } from '@/components/layout/SkipLink'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
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
    window.setTimeout(() => goTramites('/tramites'), 800)
  }

  const handleLoginForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!run.trim() || !password) return
    entrar('clave-inapi')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SkipLink />
      <div className="bg-primary-dark px-gob-4 min-[600px]:px-gob-5 py-gob-3 flex items-center gap-gob-3">
        <Link
          href="/"
          aria-label="Ir al inicio del portal INAPI"
          className="shrink-0 rounded-gob-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        >
          <Image
            src="/inapi-mvp/inapi-logo.jpg"
            alt="INAPI — ir al inicio del portal"
            width={72}
            height={28}
            className="object-contain h-14 w-auto"
            priority
          />
        </Link>
        <div className="w-px h-5 bg-white/20" />
        <span className="flex-1 text-gob-text-inverse/80 text-gri-body-xs font-semibold uppercase tracking-wider">
          Trámites en línea
        </span>
        <ThemeToggle variant="plain" />
      </div>

      <main
        id="contenido-principal"
        tabIndex={-1}
        className="flex-1 flex items-center justify-center px-gob-4 py-gob-7 outline-none"
      >
        <div className="w-full max-w-md">
          <Link
            href="/tramites"
            className="inline-flex min-h-11 items-center gap-gob-2 mb-gob-4 text-gri-body font-medium text-gob-link hover:underline rounded-gob-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
          >
            <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden />
            Volver a trámites en línea
          </Link>

          <div className="bg-card text-card-foreground rounded-gob-xl shadow-elevation-04 border border-gob-border overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-gob-primary to-gob-primary-dark" />

            <div className="px-gob-6 pt-gob-6 pb-gob-7 space-y-gob-5">
              <div className="flex flex-col items-center gap-gob-4 text-center">
                <div className="p-gob-4">
                  <Image
                    src="/inapi-mvp/inapi-logo.jpg"
                    alt="INAPI"
                    width={72}
                    height={28}
                    className="object-contain h-28 w-auto"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="font-heading text-gri-h2 font-medium text-gob-text leading-tight">
                    Bienvenido al portal de trámites INAPI
                  </h1>
                  <p className="text-gri-body-sm text-muted-foreground leading-relaxed">
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
                      className="h-11 text-gri-body-sm pr-11"
                      aria-required="true"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gob-text transition-colors min-h-11 min-w-11 inline-flex items-center justify-center"
                      aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!run.trim() || !password || cargandoInstitucional || cargandoClaveUnica}
                  size="form"
                  className="w-full font-semibold gap-2 mt-2"
                >
                  {cargandoInstitucional ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Iniciar sesión
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="space-y-gob-4">
                <div className="flex items-center gap-gob-3">
                  <div className="flex-1 h-px bg-gob-border" />
                  <span className="text-gri-body-xs font-semibold text-muted-foreground whitespace-nowrap">
                    O puedes ingresar con tu ClaveÚnica
                  </span>
                  <div className="flex-1 h-px bg-gob-border" />
                </div>

                <ClaveUnicaButton
                  onClick={() => entrar('clave-unica')}
                  disabled={cargandoInstitucional}
                  loading={cargandoClaveUnica}
                />
              </div>
            </div>
          </div>

          <p className="text-center text-gri-label text-muted-foreground mt-gob-5 leading-relaxed">
            Este portal es propiedad del Estado de Chile · INAPI ·{' '}
            <span className="font-semibold">Acceso seguro HTTPS</span>
          </p>
        </div>
      </main>
    </div>
  )
}
