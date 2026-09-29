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

const linkClass =
  'text-gri-body font-medium leading-[1.5] text-gob-text-inverse/78 hover:text-gob-text-inverse hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus'

export function FooterINAPI() {
  return (
    <footer className="w-full bg-inapi-portal-hero text-gob-text-inverse mt-auto">
      <ContainerGRI size="portal" className="py-gob-8 flex flex-wrap gap-gob-8">
        <div className="flex-1 min-w-[260px] space-y-gob-4">
          <Image
            src="/inapi-mvp/inapi-logo.jpg"
            alt="INAPI — Ministerio de Economía, Fomento y Turismo, Gobierno de Chile"
            width={160}
            height={64}
            className="h-[84px] w-auto object-contain"
          />
          <p className="text-gri-h2 font-medium text-gob-text-inverse">
            Instituto Nacional de Propiedad Industrial (INAPI)
          </p>
          <p className="text-gri-body text-gob-text-inverse/78 max-w-xs leading-[1.5]">
            Servicio público del Estado de Chile, dependiente del Ministerio de Economía, Fomento y Turismo.
          </p>
        </div>

        <div className="flex-0 min-w-[220px] space-y-gob-4">
          <h2 className="font-heading text-gri-h1 font-medium text-gob-text-inverse">Dónde estamos</h2>
          <ul className="space-y-gob-3 text-gri-body text-gob-text-inverse/78">
            <li className="flex gap-gob-3">
              <MapPin className="w-5 h-5 text-gob-focus shrink-0 mt-0.5" aria-hidden />
              Av. Libertador Bernardo O&apos;Higgins 194, Santiago
            </li>
            <li className="flex gap-gob-3">
              <Phone className="w-5 h-5 text-gob-focus shrink-0" aria-hidden />
              <a href="tel:+56228870400" className={linkClass}>
                +56 2 2887 0400
              </a>
            </li>
            <li className="flex gap-gob-3">
              <Mail className="w-5 h-5 text-gob-focus shrink-0" aria-hidden />
              <a href="mailto:inapi@inapi.cl" className={linkClass}>
                inapi@inapi.cl
              </a>
            </li>
            <li className="flex gap-gob-3">
              <BadgeCheck className="w-5 h-5 text-gob-focus shrink-0" aria-hidden />
              RUT: 65.999.669-3
            </li>
          </ul>
        </div>

        <div className="flex-0 min-w-[180px] space-y-gob-4">
          <h2 className="font-heading text-gri-h1 font-medium text-gob-text-inverse">Conversemos</h2>
          <ul className="space-y-gob-3">
            <li>
              <Link href="/contacto/siac" className={linkClass}>
                Formulario de contacto
              </Link>
            </li>
            {SOCIAL_LINKS.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-0 min-w-[200px] space-y-gob-4">
          <h2 className="font-heading text-gri-h1 font-medium text-gob-text-inverse">Accesos</h2>
          <ul className="space-y-gob-3">
            {ACCESOS.map(item => (
              <li key={item.label}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ContainerGRI>

      <div className="bg-inapi-portal-deep py-gob-5 px-gob-4">
        <ContainerGRI
          size="portal"
          className="flex flex-col gap-gob-4 min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between text-gri-body-sm text-gob-text-inverse/78"
        >
          <p>© 2026 INAPI · Gobierno de Chile. Contenido bajo licencia Creative Commons BY 4.0.</p>
          <nav className="flex flex-wrap gap-gob-5" aria-label="Enlaces legales">
            <Link href="/glosario" className={linkClass}>
              Mapa del sitio
            </Link>
            <Link href="#" className={linkClass}>
              Accesibilidad
            </Link>
            <Link href="#" className={linkClass}>
              Política de privacidad y derechos ARCO
            </Link>
          </nav>
        </ContainerGRI>
        <ContainerGRI size="portal" className="mt-gob-3">
          <p className="text-gri-body-sm text-gob-text-inverse/54">Última actualización: {LAST_UPDATED}</p>
        </ContainerGRI>
      </div>
    </footer>
  )
}
