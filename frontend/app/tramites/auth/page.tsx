'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
import { DemoAccountsPanel } from '@/components/tramites/DemoAccountsPanel'
import { SkipIfAuthenticated } from '@/components/tramites/SkipIfAuthenticated'
import { findDemoAccount, type DemoAccount } from '@/lib/tramites/demo-accounts'
import { nextAfterAuth } from '@/lib/tramites/entry'
import { goTramites } from '@/lib/tramites/go'
import { signIn } from '@/lib/tramites/session'

export default function TramitesAuthPage() {
  const [run, setRun] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [cargandoInstitucional, setCargandoInstitucional] = useState(false)

  const pickAccount = (account: DemoAccount) => {
    setRun(account.runDigits)
    setPassword(account.clave)
    setError('')
  }

  const entrar = (account?: DemoAccount) => {
    const found = account ?? findDemoAccount(run, password)
    if (!found) {
      setError('Usa un RUT de las cuentas de ejemplo y, como clave, los últimos 4 dígitos.')
      return
    }
    setCargandoInstitucional(true)
    signIn({
      metodo: 'clave-inapi',
      run: found.runDigits,
      nombre: found.nombre,
      email: `${found.runDigits}@demo.inapi.cl`,
      registered: found.persona !== 'nuevo',
    })
    window.setTimeout(() => goTramites(nextAfterAuth(window.location.search)), 800)
  }

  const handleLoginForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!run.trim() || !password) return
    entrar()
  }

  return (
    <SkipIfAuthenticated>
    <div className="flex min-h-svh items-center justify-center bg-[var(--story-mist)] px-gob-4 py-gob-8">
      <div className="w-full max-w-2xl">
        <Link
          href="/tramites"
          className="mb-gob-4 inline-flex min-h-11 items-center gap-gob-2 rounded-gob-sm text-gri-body font-medium text-gob-link hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        >
          <ArrowLeft className="h-5 w-5 shrink-0" aria-hidden />
          Volver a trámites en línea
        </Link>

        <div className="overflow-hidden rounded-gob-xl border-2 border-gob-border bg-card text-card-foreground shadow-elevation-04">
          <div className="h-1.5 bg-gradient-to-r from-gob-primary to-[var(--story-night)]" />

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
                  Inicia sesión para consultar el estado de tus marcas y patentes.
                </p>
              </div>
            </div>

            <form onSubmit={handleLoginForm} className="space-y-gob-4">
              <div className="space-y-2">
                <label htmlFor="run" className="gri-field-label block">
                  Cuenta INAPI
                </label>
                <Input
                  id="run"
                  type="text"
                  inputMode="numeric"
                  placeholder="RUT numérico sin dígito verificador"
                  value={run}
                  onChange={e => setRun(e.target.value)}
                  className="h-11 text-gri-body-sm"
                  aria-required="true"
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="gri-field-label block">
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Ingresa tu contraseña"
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

              {error ? <p className="text-gri-body-sm text-gob-danger">{error}</p> : null}

              <Button
                type="submit"
                disabled={!run.trim() || !password || cargandoInstitucional}
                size="form"
                className="mt-2 w-full gap-2 font-semibold"
              >
                {cargandoInstitucional ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    Ingresar
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="space-y-gob-4">
              <div className="flex items-center gap-gob-3">
                <div className="h-px flex-1 bg-gob-border" />
                <span className="whitespace-nowrap text-gri-body-xs font-medium text-gob-text">o</span>
                <div className="h-px flex-1 bg-gob-border" />
              </div>

              <ClaveUnicaButton
                onClick={() => goTramites(`/tramites/clave-unica${window.location.search}`)}
                disabled={cargandoInstitucional}
                className="w-full"
              />
            </div>

            <p className="text-gri-body-xs leading-relaxed text-muted-foreground">
              Cuenta INAPI: RUT numérico sin dígito verificador y los últimos 4 dígitos como clave. ClaveÚnica abre los 3
              perfiles de demostración (nuevo, con acciones y con un trámite).
            </p>

            <DemoAccountsPanel onPick={pickAccount} />
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
