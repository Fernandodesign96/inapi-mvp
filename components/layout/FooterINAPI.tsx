'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, BadgeCheck } from 'lucide-react'
import { ContainerGRI } from '@/components/layout/ContainerGRI'

const LAST_UPDATED = '06-08-2026'

const SOCIAL_LINKS = [
  { label: 'Facebook de INAPI', href: 'https://www.facebook.com/inapi.cl' },
  { label: 'INAPI en X (Twitter)', href: 'https://twitter.com/inapi_cl' },
  { label: 'Instagram de INAPI', href: 'https://www.instagram.com/inapi.cl' },
  { label: 'LinkedIn de INAPI', href: 'https://www.linkedin.com/company/inapi' },
] as const

const ACCESOS = [
  { label: 'Registrar una marca', href: '/marcas/solicitud-nueva' },
  { label: 'Buscar marcas anteriores', href: '/marcas/buscador-similitud' },
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Glosario de propiedad industrial', href: '/glosario' },
  { label: 'Mapa del sitio', href: '/glosario' },
  { label: 'Descarga de visualizadores', href: '#' },
] as const

export function FooterINAPI() {
  return (
    <footer className="w-full bg-inapi-portal-hero text-gob-text-inverse mt-auto">
      <ContainerGRI size="portal" className="py-gob-7 flex flex-wrap gap-gob-7">
        <div className="flex-1 min-w-[260px] space-y-gob-4">
          <Image
            src="/inapi-mvp/inapi-logo.jpg"
            alt="INAPI — Ministerio de Economía, Fomento y Turismo, Gobierno de Chile"
            width={160}
            height={64}
            className="h-[84px] w-auto object-contain"
          />
          <p className="text-gri-body font-bold">Instituto Nacional de Propiedad Industrial (INAPI)</p>
          <p className="text-gri-body-sm text-gob-text-inverse/78 max-w-xs leading-relaxed">
            Servicio público del Estado de Chile, dependiente del Ministerio de Economía, Fomento y Turismo.
          </p>
        </div>

        <div className="flex-0 min-w-[220px] space-y-gob-3">
          <h2 className="text-gri-body font-bold">Dónde estamos</h2>
          <ul className="space-y-gob-3 text-gri-body-sm text-gob-text-inverse/85">
            <li className="flex gap-gob-2">
              <MapPin className="w-[18px] h-[18px] text-[#7FB2E8] shrink-0 mt-0.5" aria-hidden />
              Av. Libertador Bernardo O&apos;Higgins 194, Santiago
            </li>
            <li className="flex gap-gob-2">
              <Phone className="w-[18px] h-[18px] text-[#7FB2E8] shrink-0" aria-hidden />
              +56 2 2887 0400
            </li>
            <li className="flex gap-gob-2">
              <Mail className="w-[18px] h-[18px] text-[#7FB2E8] shrink-0" aria-hidden />
              inapi@inapi.cl
            </li>
            <li className="flex gap-gob-2">
              <BadgeCheck className="w-[18px] h-[18px] text-[#7FB2E8] shrink-0" aria-hidden />
              RUT: 65.999.669-3
            </li>
          </ul>
        </div>

        <div className="flex-0 min-w-[180px] space-y-gob-3">
          <h2 className="text-gri-body font-bold">Conversemos</h2>
          <ul className="space-y-gob-2 text-gri-body-sm">
            <li>
              <Link
                href="/contacto/siac"
                className="text-gob-text-inverse/85 hover:text-gob-text-inverse transition-colors"
              >
                Formulario de contacto
              </Link>
            </li>
            {SOCIAL_LINKS.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gob-text-inverse/85 hover:text-gob-text-inverse transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-0 min-w-[200px] space-y-gob-3">
          <h2 className="text-gri-body font-bold">Accesos</h2>
          <ul className="space-y-gob-2 text-gri-body-sm">
            {ACCESOS.map(item => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-gob-text-inverse/85 hover:text-gob-text-inverse transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ContainerGRI>

      <div className="bg-inapi-portal-deep py-gob-4 px-gob-4">
        <ContainerGRI size="portal" className="flex flex-col gap-gob-3 min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between text-gri-body-sm text-gob-text-inverse/70">
          <p>© 2026 INAPI · Gobierno de Chile. Contenido bajo licencia Creative Commons BY 4.0.</p>
          <nav className="flex flex-wrap gap-gob-5" aria-label="Enlaces legales">
            <Link href="/glosario" className="hover:text-gob-text-inverse transition-colors">
              Mapa del sitio
            </Link>
            <Link href="#" className="hover:text-gob-text-inverse transition-colors">
              Accesibilidad
            </Link>
            <Link href="#" className="hover:text-gob-text-inverse transition-colors">
              Política de privacidad y derechos ARCO
            </Link>
          </nav>
        </ContainerGRI>
        <ContainerGRI size="portal" className="mt-gob-2">
          <p className="text-gri-body-xs text-gob-text-inverse/55">Última actualización: {LAST_UPDATED}</p>
        </ContainerGRI>
      </div>
    </footer>
  )
}
