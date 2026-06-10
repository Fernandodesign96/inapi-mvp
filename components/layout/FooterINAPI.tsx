'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Share2, Phone, Mail, Accessibility, MapPin, MessageCircle, Globe } from 'lucide-react'
import { ContainerGRI } from '@/components/layout/ContainerGRI'

export function FooterINAPI() {
  return (
    <footer className="w-full bg-gob-footer-bg text-gob-text-inverse pt-gob-7 pb-gob-5 mt-auto">
      <ContainerGRI size="desktop" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gob-7">
        {/* Columna Logo */}
        <div className="space-y-6">
          <div>
            <Image 
              src="/inapi-mvp/inapi-logo.jpg" 
              alt="INAPI Logo" 
              width={120} 
              height={50} 
              className="h-40 w-auto"
            />
          </div>
          <div className="text-gri-body-xs leading-loose text-gob-text-inverse/70 font-semibold uppercase tracking-wide">
            Instituto Nacional de Propiedad<br />
            Industrial (INAPI)<br />
            INAPI - Chile
          </div>
        </div>

        {/* Columna Dónde estamos */}
        <div className="space-y-4">
          <h3 className="font-heading text-gri-body-sm font-medium uppercase tracking-widest border-b border-white/10 pb-gob-2">Dónde estamos</h3>
          <ul className="space-y-4 text-gri-body-xs text-gob-text-inverse/70 font-medium">
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 text-gob-text-inverse/40 shrink-0" />
              <span>Carabineros de Chile Nº 195, Santiago, Chile</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-4 h-4 text-gob-text-inverse/40 shrink-0" />
              <span>+56 2 2887 0400</span>
            </li>
            <li className="flex gap-3">
              <Mail className="w-4 h-4 text-gob-text-inverse/40 shrink-0" />
              <span>inapi@inapi.cl</span>
            </li>
            <li className="text-gri-label opacity-40">RUT: 65.999.669-3</li>
          </ul>
        </div>

        {/* Columna Conversemos */}
        <div className="space-y-4">
          <h3 className="font-heading text-gri-body-sm font-medium uppercase tracking-widest border-b border-white/10 pb-gob-2">Conversemos</h3>
          <ul className="space-y-4 text-gri-body-xs text-gob-text-inverse/70 font-medium">
            <li><Link href="#" className="text-gob-text-inverse/70 hover:text-gob-link transition-colors flex items-center gap-2">+ Contacto</Link></li>
            <li><Link href="#" className="text-gob-text-inverse/70 hover:text-gob-link transition-colors flex items-center gap-2"><MessageCircle className="w-3 h-3" /> Facebook</Link></li>
            <li><Link href="#" className="text-gob-text-inverse/70 hover:text-gob-link transition-colors flex items-center gap-2"><Share2 className="w-3 h-3" /> Twitter</Link></li>
            <li><Link href="#" className="text-gob-text-inverse/70 hover:text-gob-link transition-colors flex items-center gap-2"><Globe className="w-3 h-3" /> Instagram</Link></li>
            <li><Link href="#" className="text-gob-text-inverse/70 hover:text-gob-link transition-colors flex items-center gap-2"><Share2 className="w-3 h-3" /> LinkedIn</Link></li>
          </ul>
        </div>

        {/* Columna Accesos */}
        <div className="space-y-4">
          <h3 className="font-heading text-gri-body-sm font-medium uppercase tracking-widest border-b border-white/10 pb-gob-2">Accesos</h3>
          <ul className="space-y-4 text-gri-body-xs text-gob-text-inverse/70 font-medium">
            <li><Link href="#" className="text-gob-text-inverse/70 hover:text-gob-link transition-colors">Atajos del Teclado</Link></li>
            <li><Link href="#" className="text-gob-text-inverse/70 hover:text-gob-link transition-colors">Descarga de Visualizadores</Link></li>
            <li><Link href="#" className="text-gob-text-inverse/70 hover:text-gob-link transition-colors">Glosario</Link></li>
            <li><Link href="#" className="text-gob-text-inverse/70 hover:text-gob-link transition-colors">Mapa del Sitio</Link></li>
            <li><Link href="#" className="text-gob-text-inverse/70 hover:text-gob-link transition-colors flex items-center gap-2"><Accessibility className="w-3 h-3" /> Accesibilidad</Link></li>
            <li><Link href="#" className="text-gob-text-inverse/70 hover:text-gob-link transition-colors">Política de privacidad</Link></li>
          </ul>
        </div>
      </ContainerGRI>

      {/* Barra Inferior */}
      <ContainerGRI size="desktop" className="mt-gob-7 pt-gob-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-gob-4 text-gri-label text-gob-text-inverse/40 uppercase">
        <div>© 2026 <span className="text-gob-accent">INAPI</span>. Todos los derechos reservados</div>
        <div className="flex items-center gap-6">
          <span>v 2.3.77.0</span>
          <div className="flex gap-1 h-1 overflow-hidden">
             <div className="w-4 h-full bg-gob-text-inverse/20" />
             <div className="w-4 h-full bg-gob-text-inverse/20" />
             <div className="w-4 h-full bg-gob-text-inverse/20" />
             <div className="w-4 h-full bg-gob-text-inverse/20" />
          </div>
        </div>
      </ContainerGRI>
    </footer>
  )
}
