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

export default function HomePage() {
  return (
    <PortalShell active="home" variant="home">
      {/* Hero */}
      <section className="bg-inapi-portal-hero text-gob-text-inverse">
        <ContainerGRI size="portal" className="py-gob-7 min-[600px]:py-gob-8">
          <div className="grid min-[905px]:grid-cols-2 gap-gob-6 items-center mb-gob-6">
            <div className="space-y-gob-4">
              <p className="text-gri-body-sm font-bold uppercase tracking-wider text-gob-focus">
                Portal oficial · INAPI Chile
              </p>
              <h1 className="font-heading text-3xl min-[600px]:text-[2.75rem] font-medium leading-tight">
                Te queremos ayudar a utilizar la propiedad industrial
              </h1>
              <p className="text-gri-body text-gob-text-inverse/85 max-w-xl leading-relaxed">
                Registra marcas, patentes, diseños y más. Protege tu propiedad industrial con seguridad y rapidez.
              </p>
            </div>
            <div
              className="hidden min-[905px]:block h-80 rounded-gob-md bg-gob-primary-dark/40 border border-white/10"
              aria-hidden
            />
          </div>
        </ContainerGRI>

        <div className="bg-black/30 py-gob-7 px-gob-4">
          <ContainerGRI size="portal" className="space-y-gob-6">
            <div className="grid min-[600px]:grid-cols-2 gap-gob-5">
              <article className="bg-black/40 backdrop-blur-sm rounded-gob-md p-gob-5 space-y-gob-4">
                <h2 className="text-xl font-bold">Marcas</h2>
                <Button
                  className="w-full h-auto py-gob-3 rounded-none bg-inapi-marcas-accent hover:bg-[#E88000] text-gob-text-inverse font-bold uppercase tracking-wide text-gri-body-sm"
                  asChild
                >
                  <Link href="/buscar">
                    <Search className="w-5 h-5 mr-2" aria-hidden />
                    Buscador de marcas
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-auto py-gob-3 rounded-none border-2 border-white/50 bg-transparent text-gob-text-inverse hover:bg-white/10 font-bold uppercase tracking-wide text-gri-body-sm"
                  asChild
                >
                  <Link href="/marcas/buscador-similitud">
                    <History className="w-5 h-5 mr-2" aria-hidden />
                    Buscador de similitud de marcas
                  </Link>
                </Button>
                <ul className="space-y-gob-3 text-gri-body-sm">
                  <li>
                    <Link href="/marcas/como-registrar" className="inline-flex items-center gap-1 hover:text-gob-focus transition-colors">
                      <ChevronRight className="w-4 h-4" aria-hidden />
                      Cómo registrar una marca
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth" className="inline-flex items-center gap-1 hover:text-gob-focus transition-colors">
                      <ChevronRight className="w-4 h-4" aria-hidden />
                      Ingresa tu solicitud
                    </Link>
                  </li>
                </ul>
              </article>

              <article className="bg-black/40 backdrop-blur-sm rounded-gob-md p-gob-5 space-y-gob-4">
                <h2 className="text-xl font-bold">Patentes</h2>
                <Button
                  className="w-full h-auto py-gob-3 rounded-none bg-inapi-patentes-accent hover:bg-[#0A9FCC] text-gob-text-inverse font-bold uppercase tracking-wide text-gri-body-sm"
                  asChild
                >
                  <Link href="/buscar">
                    <Search className="w-5 h-5 mr-2" aria-hidden />
                    Buscador de patentes
                  </Link>
                </Button>
                <ul className="space-y-gob-3 text-gri-body-sm">
                  <li>
                    <Link href="/patentes/como-registrar" className="inline-flex items-center gap-1 hover:text-gob-focus transition-colors">
                      <ChevronRight className="w-4 h-4" aria-hidden />
                      Cómo registrar una patente
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth" className="inline-flex items-center gap-1 hover:text-gob-focus transition-colors">
                      <ChevronRight className="w-4 h-4" aria-hidden />
                      Ingresa tu solicitud
                    </Link>
                  </li>
                </ul>
              </article>
            </div>

            <div className="flex flex-wrap justify-center gap-gob-6 pt-gob-5 border-t border-white/10 text-gri-body-sm">
              <Link href="/documentacion/estadisticas" className="inline-flex items-center gap-2 hover:text-gob-focus transition-colors">
                <BarChart3 className="w-5 h-5" aria-hidden />
                Estadísticas
              </Link>
              <Link href="/notificaciones-diarias" className="inline-flex items-center gap-2 hover:text-gob-focus transition-colors">
                <Bell className="w-5 h-5" aria-hidden />
                Notificaciones diarias
              </Link>
              <Link href="/preguntas-frecuentes" className="inline-flex items-center gap-2 hover:text-gob-focus transition-colors">
                <CircleHelp className="w-5 h-5" aria-hidden />
                Preguntas frecuentes
              </Link>
              <Link href="/datos-abiertos" className="inline-flex items-center gap-2 hover:text-gob-focus transition-colors">
                <Database className="w-5 h-5" aria-hidden />
                Datos abiertos
              </Link>
            </div>
          </ContainerGRI>
        </div>
      </section>

      <HomeExtraSections />
    </PortalShell>
  )
}
