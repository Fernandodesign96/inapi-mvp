import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BarChart3,
  Bell,
  ChevronRight,
  CircleHelp,
  Database,
  History,
  Search,
} from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { Button } from '@/components/ui/button'
import { HomeExtraSections } from '@/components/portal/HomeExtraSections'

export const metadata: Metadata = {
  title: 'Portal INAPI — Propiedad industrial en Chile',
  description:
    'Te ayudamos a utilizar la propiedad industrial. Registra marcas y patentes, busca antecedentes y accede a trámites digitales de INAPI.',
}

const quickLinks = [
  { href: '/documentacion/estadisticas', icon: BarChart3, label: 'Estadísticas' },
  { href: '/notificaciones-diarias', icon: Bell, label: 'Notificaciones diarias' },
  { href: '/preguntas-frecuentes', icon: CircleHelp, label: 'Preguntas frecuentes' },
  { href: '/datos-abiertos', icon: Database, label: 'Datos abiertos' },
]

export default function HomePage() {
  return (
    <PortalShell active="home" variant="home">
      <section className="bg-inapi-portal-hero text-gob-text-inverse">
        <ContainerGRI size="portal" className="py-gob-7 min-[600px]:py-gob-8">
          <div className="grid min-[905px]:grid-cols-2 gap-gob-6 min-[905px]:gap-gob-8 items-center mb-gob-6">
            <div className="space-y-gob-5">
              <p className="text-gri-body-sm font-medium uppercase tracking-wide text-gob-focus">
                Portal oficial · INAPI Chile
              </p>
              <h1 className="portal-h1 text-gob-text-inverse">
                Te queremos ayudar a utilizar la propiedad industrial
              </h1>
              <p className="portal-lead text-gob-text-inverse/90 max-w-xl">
                Registra marcas, patentes, diseños y más. Protege tu propiedad industrial con seguridad y rapidez.
              </p>
            </div>
            <div
              className="hidden min-[905px]:flex h-80 items-center justify-center rounded-gob-lg border border-white/12 bg-gradient-to-br from-gob-primary-dark/80 to-inapi-portal-deep shadow-elevation-03"
              aria-hidden
            >
              <span className="text-gri-body-sm font-medium text-gob-text-inverse/54 px-gob-6 text-center">
                Imagen institucional
              </span>
            </div>
          </div>
        </ContainerGRI>

        <div className="bg-black/35 py-gob-7 min-[600px]:py-gob-8 px-gob-4">
          <ContainerGRI size="portal" className="space-y-gob-7">
            <div className="grid min-[600px]:grid-cols-2 gap-gob-5 min-[905px]:gap-gob-6">
              <article className="bg-card/10 backdrop-blur-sm rounded-gob-lg p-gob-6 space-y-gob-5 border border-white/12 shadow-elevation-02">
                <h2 className="portal-h3 text-gob-text-inverse">Marcas</h2>
                <div className="space-y-gob-3">
                  <Button
                    size="form"
                    className="w-full rounded-gob-md bg-inapi-marcas-accent hover:bg-[#E88000] text-gob-text-inverse font-medium"
                    asChild
                  >
                    <Link href="/buscar">
                      <Search className="w-5 h-5 mr-2" aria-hidden />
                      Buscador de marcas
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="form"
                    className="w-full rounded-gob-md border-2 border-white/60 bg-transparent text-gob-text-inverse hover:bg-white/10 font-medium"
                    asChild
                  >
                    <Link href="/marcas/buscador-similitud">
                      <History className="w-5 h-5 mr-2" aria-hidden />
                      Buscador de similitud de marcas
                    </Link>
                  </Button>
                </div>
                <ul className="space-y-gob-3 text-gri-body">
                  <li>
                    <Link
                      href="/marcas/como-registrar"
                      className="inline-flex items-center gap-gob-2 min-h-11 font-medium text-gob-text-inverse/90 hover:text-gob-focus transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gob-focus shrink-0" aria-hidden />
                      Cómo registrar una marca
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth"
                      className="inline-flex items-center gap-gob-2 min-h-11 font-medium text-gob-text-inverse/90 hover:text-gob-focus transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gob-focus shrink-0" aria-hidden />
                      Ingresa tu solicitud
                    </Link>
                  </li>
                </ul>
              </article>

              <article className="bg-card/10 backdrop-blur-sm rounded-gob-lg p-gob-6 space-y-gob-5 border border-white/12 shadow-elevation-02">
                <h2 className="portal-h3 text-gob-text-inverse">Patentes</h2>
                <Button
                  size="form"
                  className="w-full rounded-gob-md bg-inapi-patentes-accent hover:bg-[#0A9FCC] text-gob-text-inverse font-medium"
                  asChild
                >
                  <Link href="/buscar">
                    <Search className="w-5 h-5 mr-2" aria-hidden />
                    Buscador de patentes
                  </Link>
                </Button>
                <ul className="space-y-gob-3 text-gri-body">
                  <li>
                    <Link
                      href="/patentes/como-registrar"
                      className="inline-flex items-center gap-gob-2 min-h-11 font-medium text-gob-text-inverse/90 hover:text-gob-focus transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gob-focus shrink-0" aria-hidden />
                      Cómo registrar una patente
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/auth"
                      className="inline-flex items-center gap-gob-2 min-h-11 font-medium text-gob-text-inverse/90 hover:text-gob-focus transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gob-focus shrink-0" aria-hidden />
                      Ingresa tu solicitud
                    </Link>
                  </li>
                </ul>
              </article>
            </div>

            <nav
              className="flex flex-wrap justify-center gap-gob-4 pt-gob-5 border-t border-white/12"
              aria-label="Accesos rápidos"
            >
              {quickLinks.map(item => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-gob-2 min-h-11 rounded-gob-md bg-white/10 px-gob-4 py-gob-2 text-gri-body font-medium text-gob-text-inverse/90 hover:bg-white/20 hover:text-gob-focus transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                  >
                    <Icon className="w-5 h-5 text-gob-focus" aria-hidden />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </ContainerGRI>
        </div>
      </section>

      <HomeExtraSections />
    </PortalShell>
  )
}
