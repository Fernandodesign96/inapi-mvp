'use client'

import Image from 'next/image'
import Link from 'next/link'
import { User, Globe, Sun, Settings, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function HeaderINAPI() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (
    <header className="w-full flex flex-col items-center">
      {/* Navbar Superior (Rojo gradient) */}
      <div className="w-full bg-inapi-header text-gob-text-inverse py-gob-4 px-gob-4 min-[600px]:px-gob-5 flex items-center justify-between shadow-elevated relative overflow-hidden">

        {/* Logo e Insititución */}
        <div className="flex items-center gap-4 relative z-10">
          <div>
            <Image 
              src="/inapi-mvp/inapi-logo.jpg" 
              alt="INAPI Logo" 
              width={100} 
              height={40} 
              className="h-16 w-auto object-contain"
            />
          </div>
          <div className="hidden lg:block text-gri-body-xs leading-tight font-semibold uppercase tracking-wide text-gob-text-inverse/90">
            Instituto Nacional<br />
            de Propiedad<br />
            Industrial<br />
            INAPI - Chile
          </div>
        </div>

        {/* Links Centrales */}
        <div className="hidden md:flex items-center gap-6 relative z-10">
          <Link href="#" className="text-gri-body-xs uppercase tracking-widest text-gob-text-inverse/90 hover:text-gob-text-inverse transition-colors">Preguntas</Link>
          <Link href="#" className="text-gri-body-xs uppercase tracking-widest text-gob-text-inverse/90 hover:text-gob-text-inverse transition-colors">Trámites</Link>
          <Link href="#" className="text-gri-body-xs uppercase tracking-widest text-gob-text-inverse/90 hover:text-gob-text-inverse transition-colors">Capacitaciones</Link>
          <Link href="#" className="text-gri-body-xs uppercase tracking-widest text-gob-text-inverse/90 hover:text-gob-text-inverse transition-colors">Diario Oficial</Link>
        </div>

        {/* Acciones Derecha */}
        <div className="flex items-center gap-2 md:gap-4 relative z-10">
          <Button variant="ghost" size="icon" className="text-gob-text-inverse hover:bg-white/10 rounded-full size-11">
            <Globe className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gob-text-inverse hover:bg-white/10 rounded-full size-11">
            <Sun className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gob-text-inverse hover:bg-white/10 rounded-full size-11">
            <Settings className="w-5 h-5" />
          </Button>
          <div className="h-4 w-[1px] bg-white/30 mx-2 hidden sm:block" />
          <Button variant="ghost" className="text-gob-text-inverse hover:bg-white/10 gap-2 px-3 rounded-full hidden sm:flex">
            <User className="w-5 h-5" />
            <span className="text-gri-label uppercase">Mi Perfil</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-gob-text-inverse hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-gob-text/90 backdrop-blur-md flex flex-col p-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-12">
            <Image src="/inapi-mvp/inapi-logo.jpg" alt="INAPI" width={80} height={30} className="h-10 w-auto object-contain"/>
              <Button variant="ghost" size="icon" className="text-gob-text-inverse" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </Button>
            </div>
            <nav className="flex flex-col gap-8">
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-gob-text-inverse uppercase tracking-widest">Preguntas</Link>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-gob-text-inverse uppercase tracking-widest">Trámites</Link>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-gob-text-inverse uppercase tracking-widest">Capacitaciones</Link>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-gob-text-inverse uppercase tracking-widest">Diario Oficial</Link>
            </nav>
            <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
              <Button variant="outline" size="form" className="w-full bg-gob-surface text-gob-accent font-semibold uppercase tracking-widest">
                Mi Perfil
              </Button>
              <div className="flex justify-center gap-6 text-gob-text-inverse">
                <Globe /> <Sun /> <Settings />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sub-navbar (Azul INAPI) */}
      <div className="w-full bg-inapi-header-sub py-gob-3 px-gob-4 min-[600px]:px-gob-5 flex items-center justify-between shadow-card border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <h2 className="font-heading text-gri-body-sm md:text-gri-body text-gob-text-inverse uppercase tracking-wide">
            Proceso de solicitud de Marca
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-gri-label text-gob-text-inverse/70 uppercase">
          <span>Portal INAPI</span>
          <span className="opacity-30">•</span>
          <span className="text-gob-text-inverse">Formulario GRI v1.2</span>
        </div>
      </div>
    </header>
  )
}
