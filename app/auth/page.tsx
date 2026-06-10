'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { KeyRound, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SkipLink } from '@/components/layout/SkipLink'

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [cargandoInstitucional, setCargandoInstitucional] = useState(false)
  const [cargandoClaveUnica, setCargandoClaveUnica] = useState(false)

  const simularAuth = (metodo: 'institucional' | 'clave-unica') => {
    if (metodo === 'institucional') {
      setCargandoInstitucional(true)
    } else {
      setCargandoClaveUnica(true)
    }
    setTimeout(() => {
      localStorage.setItem('authenticated', 'true')
      localStorage.setItem('auth_method', metodo)
      router.push('/solicitud')
    }, 1200)
  }

  const handleLoginForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    simularAuth('institucional')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SkipLink />
      {/* Barra superior institucional */}
      <div className="bg-primary-dark px-gob-4 min-[600px]:px-gob-5 py-gob-3 flex items-center gap-gob-3">
        <Image
          src="/inapi-mvp/inapi-logo.jpg"
          alt="INAPI"
          width={72}
          height={28}
          className="object-contain brightness-0 invert"
        />
        <div className="w-px h-5 bg-white/20" />
        <span className="text-gob-text-inverse/80 text-gri-body-xs font-semibold uppercase tracking-wider">
          Portal de Solicitud de Marca
        </span>
      </div>

      {/* Contenido centrado */}
      <main id="contenido-principal" tabIndex={-1} className="flex-1 flex items-center justify-center px-gob-4 py-gob-7 outline-none">
        <div className="w-full max-w-md">
          {/* Card principal */}
          <div className="bg-gob-surface rounded-gob-xl shadow-elevation-04 border border-gob-border overflow-hidden">
            {/* Franja superior */}
            <div className="h-1.5 bg-gradient-to-r from-gob-primary to-gob-primary-dark" />

            <div className="px-gob-6 pt-gob-6 pb-gob-7 space-y-gob-5">
              {/* Logo + Título */}
              <div className="flex flex-col items-center gap-gob-4 text-center">
                <div className="bg-gob-surface-elevated rounded-gob-lg p-gob-4">
                  <Image
                    src="/inapi-mvp/inapi-logo.jpg"
                    alt="INAPI — Instituto Nacional de Propiedad Industrial"
                    width={110}
                    height={42}
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="font-heading text-gri-h2 font-medium text-gob-text leading-tight">
                    Bienvenido al Portal INAPI
                  </h1>
                  <p className="text-gri-body-sm text-muted-foreground leading-relaxed">
                    Inicia sesión para comenzar tus trámites.
                  </p>
                </div>
              </div>

              {/* Formulario institucional */}
              <form onSubmit={handleLoginForm} className="space-y-gob-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="gri-field-label block">
                    Mail Usuario
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Mail Usuario"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="h-11 text-gri-body-sm"
                    aria-required="true"
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="gri-field-label block">
                    Contraseña Institucional
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gob-text transition-colors"
                      aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!email || !password || cargandoInstitucional || cargandoClaveUnica}
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

              {/* Separador Clave Única */}
              <div className="space-y-gob-4">
                <div className="flex items-center gap-gob-3">
                  <div className="flex-1 h-px bg-gob-border" />
                  <span className="text-gri-body-xs font-semibold text-muted-foreground whitespace-nowrap">
                    O puedes ingresar con tu clave única
                  </span>
                  <div className="flex-1 h-px bg-gob-border" />
                </div>

                <Button
                  type="button"
                  onClick={() => simularAuth('clave-unica')}
                  disabled={cargandoInstitucional || cargandoClaveUnica}
                  variant="outline"
                  size="form"
                  className="w-full font-semibold gap-2 hover:border-primary hover:bg-primary/5"
                >
                  {cargandoClaveUnica ? (
                    <div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin" />
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4 text-primary" />
                      <span className="text-gob-text">Clave Única</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Footer legal */}
          <p className="text-center text-gri-label text-muted-foreground mt-gob-5 leading-relaxed">
            Este portal es propiedad del Estado de Chile · INAPI ·{' '}
            <span className="font-semibold">Acceso seguro HTTPS</span>
          </p>
        </div>
      </main>
    </div>
  )
}
