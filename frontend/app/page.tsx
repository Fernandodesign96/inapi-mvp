import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  BarChart3,
  Bell,
  ChevronRight,
  CircleHelp,
  Database,
  Landmark,
  Search,
  Stamp,
} from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { Button } from '@/components/ui/button'
import { HomeExtraSections } from '@/components/portal/HomeExtraSections'
import { cn } from '@/lib/utils'

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

function QuickAccessChip({
  href,
  label,
  icon: Icon,
}: {
  href: string
  label: string
  icon: LucideIcon
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-gob-2 min-h-11 rounded-gob-md border border-gob-border bg-card px-gob-4 py-gob-2 text-gri-body-sm font-medium text-gob-text shadow-elevation-01 hover:border-gob-primary hover:text-gob-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
    >
      <Icon className="w-4 h-4 text-gob-primary" aria-hidden />
      {label}
    </Link>
  )
}

function DomainCard({
  accent,
  title,
  description,
  icon: Icon,
  primaryHref,
  primaryLabel,
  links,
}: {
  accent: 'marcas' | 'patentes'
  title: string
  description: string
  icon: LucideIcon
  primaryHref: string
  primaryLabel: string
  links: { href: string; label: string; hint: string }[]
}) {
  const isMarcas = accent === 'marcas'
  return (
    <article
      className={cn(
        'flex flex-col rounded-gob-lg border p-gob-6 shadow-elevation-02',
        isMarcas ? 'border-[#F4A261]/45 bg-[#FFF8F0]' : 'border-[#0A9FCC]/35 bg-[#F3FBFD]',
      )}
    >
      <div className="flex items-start gap-gob-4">
        <span
          className={cn(
            'inline-flex size-12 shrink-0 items-center justify-center rounded-gob-md text-white',
            isMarcas ? 'bg-inapi-marcas-accent' : 'bg-inapi-patentes-accent',
          )}
        >
          <Icon className="size-6" aria-hidden />
        </span>
        <div className="space-y-gob-2 min-w-0">
          <h3 className="font-heading text-gri-h1 font-medium text-gob-text">{title}</h3>
          <p className="text-gri-body text-muted-foreground leading-[1.5]">{description}</p>
        </div>
      </div>
      <div className="mt-gob-5">
        <Button
          size="form"
          className={cn(
            'w-full rounded-gob-md font-medium text-gob-text-inverse',
            isMarcas ? 'bg-inapi-marcas-accent hover:bg-[#E88000]' : 'bg-inapi-patentes-accent hover:bg-[#0A9FCC]',
          )}
          asChild
        >
          <Link href={primaryHref}>
            <Search className="w-5 h-5 mr-2" aria-hidden />
            {primaryLabel}
          </Link>
        </Button>
      </div>
      <div className={cn('mt-gob-5 border-t pt-gob-4 space-y-gob-1', isMarcas ? 'border-[#F4A261]/30' : 'border-[#0A9FCC]/25')}>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className="flex gap-gob-3 rounded-gob-md px-gob-2 py-gob-3 min-h-11 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
          >
            <ChevronRight
              className={cn('w-5 h-5 shrink-0 mt-0.5', isMarcas ? 'text-inapi-marcas-accent' : 'text-inapi-patentes-accent')}
              aria-hidden
            />
            <span>
              <span className="block font-medium text-gob-text">{link.label}</span>
              <span className="block text-gri-body-sm text-muted-foreground leading-[1.5]">{link.hint}</span>
            </span>
          </Link>
        ))}
      </div>
    </article>
  )
}

export default function HomePage() {
  return (
    <PortalShell active="home" variant="home">
      <section className="relative isolate flex min-h-[28rem] items-center overflow-hidden text-gob-text-inverse min-[905px]:min-h-[32rem]">
        <Image
          src="/inapi-mvp/inapi-banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-inapi-portal-hero/85 via-inapi-portal-hero/60 to-inapi-portal-hero/45"
          aria-hidden
        />
        <ContainerGRI size="portal" className="relative z-[1] py-gob-8 pb-24 text-center">
          <div className="mx-auto max-w-3xl space-y-gob-5">
            <p className="text-gri-body-sm font-medium uppercase tracking-wide text-gob-focus">
              Portal oficial · INAPI Chile
            </p>
            <h1 className="portal-h1 text-gob-text-inverse">
              Te queremos ayudar a utilizar la propiedad industrial
            </h1>
            <p className="portal-lead text-gob-text-inverse/90">
              Registra marcas, patentes, diseños y más. Protege tu propiedad industrial con seguridad y rapidez.
            </p>
            <div>
              <Button
                size="lg"
                className="h-14 min-h-14 rounded-gob-md bg-gob-primary px-gob-7 text-gri-h2 font-medium text-gob-text-inverse hover:bg-gob-primary-dark shadow-elevation-03"
                asChild
              >
                <Link href="/tramites">Iniciar sesión en el Sitio de Trámites</Link>
              </Button>
            </div>
          </div>
        </ContainerGRI>
      </section>

      <section className="bg-gob-surface-elevated border-b border-gob-border">
        <ContainerGRI size="portal" className="space-y-gob-7 py-gob-8">
          <div className="mx-auto max-w-3xl space-y-gob-3 text-center">
            <h2 className="portal-h1 text-gob-text">Bienvenido al sitio web de INAPI</h2>
            <p className="portal-lead text-muted-foreground">
              Puedes comenzar tus trámites a continuación, o revisar paso a paso como realizar solicitudes en línea.
            </p>
          </div>

          <div className="grid min-[600px]:grid-cols-2 gap-gob-5 min-[905px]:gap-gob-6">
            <DomainCard
              accent="marcas"
              title="Marcas"
              description="Protege el nombre, el logo o la frase que identifica tus productos o servicios en Chile."
              icon={Stamp}
              primaryHref="/marcas/buscador-similitud"
              primaryLabel="Buscador de marcas"
              links={[
                {
                  href: '/marcas/como-registrar',
                  label: 'Cómo registrar una marca',
                  hint: 'Pasos, plazos y requisitos antes de presentar tu solicitud.',
                },
                {
                  href: '/tramites/marcas/solicitar',
                  label: 'Ingresa tu solicitud',
                  hint: 'Completa el formulario en línea y paga las tasas correspondientes.',
                },
              ]}
            />
            <DomainCard
              accent="patentes"
              title="Patentes"
              description="Protege un invento, un modelo de utilidad o un diseño industrial con derecho exclusivo."
              icon={Landmark}
              primaryHref="/tramites/patentes/buscador"
              primaryLabel="Buscador de patentes"
              links={[
                {
                  href: '/patentes/como-registrar',
                  label: 'Cómo registrar una patente',
                  hint: 'Requisitos de patentabilidad, etapas y documentación técnica.',
                },
                {
                  href: '/tramites/patentes/solicitar',
                  label: 'Ingresa tu solicitud',
                  hint: 'Presenta tu invención en línea y sigue el expediente digital.',
                },
              ]}
            />
          </div>

          <nav className="flex flex-wrap justify-center gap-gob-3 pt-gob-2" aria-label="Accesos rápidos">
            {quickLinks.map(item => (
              <QuickAccessChip key={item.href} href={item.href} label={item.label} icon={item.icon} />
            ))}
          </nav>
        </ContainerGRI>
      </section>

      <HomeExtraSections />
    </PortalShell>
  )
}
