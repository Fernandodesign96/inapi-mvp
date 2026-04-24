'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { KeyRound, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Barra superior institucional */}
      <div className="bg-[#1E3A8A] px-6 py-3 flex items-center gap-3">
        <Image
          src="/inapi-mvp/inapi-logo.png"
          alt="INAPI"
          width={72}
          height={28}
          className="object-contain brightness-0 invert"
        />
        <div className="w-px h-5 bg-white/20" />
        <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">
          Portal de Solicitud de Marca
        </span>
      </div>

      {/* Contenido centrado */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card principal */}
          <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] overflow-hidden">
            {/* Franja azul superior */}
            <div className="h-1.5 bg-gradient-to-r from-[#1A56DB] to-[#1E3A8A]" />

            <div className="px-8 pt-8 pb-10 space-y-7">
              {/* Logo + Título */}
              <div className="flex flex-col items-center gap-5 text-center">
                <div className="bg-[#F3F4F6] rounded-2xl p-4">
                  <Image
                    src="/inapi-mvp/inapi-logo.png"
                    alt="INAPI — Instituto Nacional de Propiedad Industrial"
                    width={110}
                    height={42}
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-xl font-black text-[#111827] leading-tight">
                    Bienvenido al Portal INAPI
                  </h1>
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    Inicia sesión para comenzar tus trámites.
                  </p>
                </div>
              </div>

              {/* Formulario institucional */}
              <form onSubmit={handleLoginForm} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-[#9CA3AF] block">
                    Mail Usuario
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Mail Usuario"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="h-12 border-[#D1D5DB] focus:ring-2 focus:ring-[#1A56DB] focus:ring-offset-2 text-sm"
                    aria-required="true"
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-[#9CA3AF] block">
                    Contraseña Institucional
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPass ? 'text' : 'password'}
                      placeholder="Contraseña institucional"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="h-12 border-[#D1D5DB] focus:ring-2 focus:ring-[#1A56DB] focus:ring-offset-2 text-sm pr-11"
                      aria-required="true"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#4B5563] transition-colors"
                      aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!email || !password || cargandoInstitucional || cargandoClaveUnica}
                  className="w-full h-12 bg-[#1A56DB] hover:bg-[#1E3A8A] text-white font-bold rounded-xl gap-2 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
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
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-[#E5E7EB]" />
                  <span className="text-xs font-bold text-[#9CA3AF] whitespace-nowrap">
                    O puedes ingresar con tu clave única
                  </span>
                  <div className="flex-1 h-px bg-[#E5E7EB]" />
                </div>

                <Button
                  type="button"
                  onClick={() => simularAuth('clave-unica')}
                  disabled={cargandoInstitucional || cargandoClaveUnica}
                  variant="outline"
                  className="w-full h-12 border-[#D1D5DB] hover:border-[#1A56DB] hover:bg-[#1A56DB]/5 font-bold rounded-xl gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {cargandoClaveUnica ? (
                    <div className="w-4 h-4 border-2 border-slate-300 border-t-[#1A56DB] rounded-full animate-spin" />
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4 text-[#1A56DB]" />
                      <span className="text-[#111827]">Clave Única</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Footer legal */}
          <p className="text-center text-[11px] text-[#9CA3AF] mt-6 leading-relaxed">
            Este portal es propiedad del Estado de Chile · INAPI ·{' '}
            <span className="font-semibold">Acceso seguro HTTPS</span>
          </p>
        </div>
      </div>
    </div>
  )
}
