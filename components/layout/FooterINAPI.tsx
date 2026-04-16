'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Share2, Phone, Mail, Accessibility, MapPin, MessageCircle, Globe } from 'lucide-react'

export function FooterINAPI() {
  return (
    <footer className="w-full bg-[#333333] text-white pt-12 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Columna Logo */}
        <div className="space-y-6">
          <div className="bg-white p-2 rounded w-fit">
            <Image 
              src="/inapi-mvp/inapi-logo.png" 
              alt="INAPI Logo" 
              width={120} 
              height={50} 
              className="h-10 w-auto"
            />
          </div>
          <div className="text-xs leading-loose text-white/70 font-bold uppercase tracking-tighter">
            Instituto Nacional de Propiedad<br />
            Industrial (INAPI)<br />
            INAPI - Chile
          </div>
        </div>

        {/* Columna Dónde estamos */}
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest border-b border-white/10 pb-2">Dónde estamos</h3>
          <ul className="space-y-4 text-[11px] text-white/60 font-medium">
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 text-white/40 shrink-0" />
              <span>Carabineros de Chile Nº 195, Santiago, Chile</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-4 h-4 text-white/40 shrink-0" />
              <span>+56 2 2887 0400</span>
            </li>
            <li className="flex gap-3">
              <Mail className="w-4 h-4 text-white/40 shrink-0" />
              <span>inapi@inapi.cl</span>
            </li>
            <li className="text-[10px] opacity-40">RUT: 65.999.669-3</li>
          </ul>
        </div>

        {/* Columna Conversemos */}
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest border-b border-white/10 pb-2">Conversemos</h3>
          <ul className="space-y-3 text-[11px] text-white/60 font-medium">
            <li><Link href="#" className="hover:text-white transition-colors flex items-center gap-2">+ Contacto</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors flex items-center gap-2"><MessageCircle className="w-3 h-3" /> Facebook</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors flex items-center gap-2"><Share2 className="w-3 h-3" /> Twitter</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors flex items-center gap-2"><Globe className="w-3 h-3" /> Instagram</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors flex items-center gap-2"><Share2 className="w-3 h-3" /> LinkedIn</Link></li>
          </ul>
        </div>

        {/* Columna Accesos */}
        <div className="space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest border-b border-white/10 pb-2">Accesos</h3>
          <ul className="space-y-3 text-[11px] text-white/60 font-medium">
            <li><Link href="#" className="hover:text-white transition-colors">Atajos del Teclado</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Descarga de Visualizadores</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Glosario</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Mapa del Sitio</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors flex items-center gap-2"><Accessibility className="w-3 h-3" /> Accesibilidad</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Política de privacidad</Link></li>
          </ul>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="mt-16 pt-8 border-t border-white/5 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 font-bold uppercase tracking-widest">
        <div>© 2026 <span className="text-[#EE3124]">INAPI</span>. Todos los derechos reservados</div>
        <div className="flex items-center gap-6">
          <span>v 2.3.77.0</span>
          <div className="flex gap-1 h-1 overflow-hidden">
             <div className="w-4 h-full bg-slate-800" />
             <div className="w-4 h-full bg-slate-800" />
             <div className="w-4 h-full bg-slate-800" />
             <div className="w-4 h-full bg-slate-800" />
          </div>
        </div>
      </div>
    </footer>
  )
}
