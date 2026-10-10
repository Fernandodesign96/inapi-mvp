'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ContainerGRI } from '@/components/layout/ContainerGRI'

const LAST_UPDATED = '09-10-2026'

const SOCIAL_LINKS = [
  { label: 'Facebook de INAPI', href: 'https://www.facebook.com/inapi.cl' },
  { label: 'INAPI en X (Twitter)', href: 'https://twitter.com/inapi_cl' },
  { label: 'Instagram de INAPI', href: 'https://www.instagram.com/inapi.cl' },
  { label: 'LinkedIn de INAPI', href: 'https://www.linkedin.com/company/inapi' },
] as const

const PRIVACY_PDF =
  'https://www.inapi.cl/docs/default-source/default-document-library/politica_de_privacidad.pdf?sfvrsn=b781d48b_2'

const ACCESOS = [
  { label: 'Registrar una marca', href: '/marcas/solicitud-nueva' },
  { label: 'Buscador de marcas', href: '/marcas/buscador-similitud' },
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Glosario de propiedad industrial', href: '/glosario' },
] as const

const linkClass =
  'text-gri-body font-normal leading-[1.5] text-gob-text-inverse/78 hover:text-gob-text-inverse hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus'

export function FooterINAPI() {
  return (
    <footer className="w-full bg-inapi-portal-hero text-gob-text-inverse mt-auto">
      <ContainerGRI size="wide" className="py-gob-8 grid gap-gob-8 min-[700px]:grid-cols-2 min-[1280px]:grid-cols-4 min-[1280px]:justify-between">
        <div className="space-y-gob-4 min-[1280px]:max-w-sm">
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
        </div>

        <div className="space-y-gob-4">
          <h2 className="text-gri-h1 font-medium text-gob-text-inverse">Dónde estamos</h2>
          <ul className="space-y-gob-3 text-gri-body font-normal text-gob-text-inverse/78">
            <li>Av. Libertador Bernardo O&apos;Higgins 194, Santiago</li>
            <li>
              <a href="tel:+56228870400" className={linkClass}>
                (562) 2887 0400
              </a>
            </li>
            <li>
              <a href="mailto:inapi@inapi.cl" className={linkClass}>
                inapi@inapi.cl
              </a>
            </li>
            <li>65.999.669-3</li>
          </ul>
        </div>

        <div className="space-y-gob-4">
          <h2 className="text-gri-h1 font-medium text-gob-text-inverse">Conversemos</h2>
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

        <div className="space-y-gob-4">
          <h2 className="text-gri-h1 font-medium text-gob-text-inverse">Accesos</h2>
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
          size="wide"
          className="flex flex-col gap-gob-4 min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between text-gri-body-sm text-gob-text-inverse/78"
        >
          <p>©2026 INAPI. Todos los derechos reservados</p>
          <nav className="flex flex-wrap gap-gob-5" aria-label="Enlaces legales">
            <a
              href={PRIVACY_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Política de privacidad
            </a>
          </nav>
        </ContainerGRI>
        <ContainerGRI size="wide" className="mt-gob-3">
          <p className="text-gri-body-sm text-gob-text-inverse/78">Última actualización: {LAST_UPDATED}</p>
        </ContainerGRI>
      </div>
    </footer>
  )
}
