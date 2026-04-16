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
      <div className="w-full bg-gradient-to-r from-[#FF4134] to-[#FF4134] text-white py-4 px-6 md:px-12 flex items-center justify-between shadow-lg relative overflow-hidden">

        {/* Logo e Insititución */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-white p-1 rounded">
            <Image 
              src="/inapi-mvp/inapi-logo.png" 
              alt="INAPI Logo" 
              width={100} 
              height={40} 
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="hidden lg:block text-[10px] leading-tight font-bold uppercase tracking-tighter">
            Instituto Nacional<br />
            de Propiedad<br />
            Industrial<br />
            INAPI - Chile
          </div>
        </div>

        {/* Links Centrales */}
        <div className="hidden md:flex items-center gap-6 relative z-10">
          <Link href="#" className="text-xs uppercase tracking-widest hover:text-white/80 transition-colors">Preguntas</Link>
          <Link href="#" className="text-xs uppercase tracking-widest hover:text-white/80 transition-colors">Trámites</Link>
          <Link href="#" className="text-xs uppercase tracking-widest hover:text-white/80 transition-colors">Capacitaciones</Link>
          <Link href="#" className="text-xs uppercase tracking-widest hover:text-white/80 transition-colors">Diario Oficial</Link>
        </div>

        {/* Acciones Derecha */}
        <div className="flex items-center gap-2 md:gap-4 relative z-10">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-9 w-9">
            <Globe className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-9 w-9">
            <Sun className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-9 w-9">
            <Settings className="w-5 h-5" />
          </Button>
          <div className="h-4 w-[1px] bg-white/30 mx-2 hidden sm:block" />
          <Button variant="ghost" className="text-white hover:bg-white/10 gap-2 px-3 rounded-full hidden sm:flex">
            <User className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-tight">Mi Perfil</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex flex-col p-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-12">
              <Image src="/inapi-mvp/inapi-logo.png" alt="INAPI" width={80} height={30} className="bg-white p-1 rounded" />
              <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </Button>
            </div>
            <nav className="flex flex-col gap-8">
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-white uppercase tracking-widest">Preguntas</Link>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-white uppercase tracking-widest">Trámites</Link>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-white uppercase tracking-widest">Capacitaciones</Link>
              <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-black text-white uppercase tracking-widest">Diario Oficial</Link>
            </nav>
            <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-4">
              <Button className="w-full bg-white text-[#EE3124] font-black uppercase tracking-widest">Mi Perfil</Button>
              <div className="flex justify-center gap-6 text-white/50">
                <Globe /> <Sun /> <Settings />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sub-navbar (Azul INAPI) */}
      <div className="w-full bg-[#005fff] py-3 px-6 md:px-12 flex items-center justify-between shadow-md border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <h2 className="text-white text-sm md:text-md uppercase tracking-tighter">
            Proceso de solicitud de Marca
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[10px] text-white/70 font-bold uppercase tracking-widest">
          <span>Portal INAPI</span>
          <span className="opacity-30">•</span>
          <span className="text-white">Formulario GRI v1.2</span>
        </div>
      </div>
    </header>
  )
}
