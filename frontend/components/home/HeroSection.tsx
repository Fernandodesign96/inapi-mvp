import Link from 'next/link'
import {
  Bell,
  Clock,
  FileSearch,
  HelpCircle,
  LayoutGrid,
  MapPin,
  Route,
  Search,
  Users,
} from 'lucide-react'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { Button } from '@/components/ui/button'

const heroShortcuts = [
  { href: '/marcas/buscador-similitud', label: 'Buscador de marcas', icon: Search },
  { href: '/tramites/marcas/clasificador', label: 'Buscador de productos y servicios', icon: LayoutGrid },
  { href: '/tramites/patentes/buscador', label: 'Buscador de patentes', icon: FileSearch },
  { href: '/notificaciones-diarias', label: 'Notificaciones INAPI', icon: Bell },
] as const

const editorialCards = [
  {
    icon: HelpCircle,
    kicker: 'Qué',
    title: 'Qué es INAPI y qué protege',
    lead: (
      <>
        El Instituto Nacional de Propiedad Industrial es el servicio público que administra la{' '}
        <strong className="text-gob-text font-medium">propiedad industrial en Chile</strong>.
      </>
    ),
    items: [
      'Marcas comerciales y frases de propaganda',
      'Patentes de invención y modelos de utilidad',
      'Diseños industriales y esquemas de trazado',
      'Indicaciones geográficas y denominaciones de origen',
    ],
    href: '/marcas',
    cta: 'Leer qué puedes proteger',
  },
  {
    icon: Route,
    kicker: 'Cómo',
    title: 'Cómo iniciar y realizar un trámite',
    lead: (
      <>
        El camino es el mismo para una marca, una patente o un diseño:{' '}
        <strong className="text-gob-text font-medium">informarte, buscar y presentar</strong>.
      </>
    ),
    numbered: true,
    items: [
      'Selecciona el área: marcas, patentes u otro derecho.',
      'Haz la búsqueda previa en los buscadores oficiales.',
      'Inicia la solicitud en línea, paga y adjunta documentos.',
    ],
    href: '/tramites-digitales',
    cta: 'Ver cómo iniciar el trámite',
  },
  {
    icon: MapPin,
    kicker: 'Dónde',
    title: 'Dónde te informas y dónde tramitas',
    lead: (
      <>
        Este portal informa. El{' '}
        <strong className="text-gob-text font-medium">Sitio de Trámites</strong> es donde presentas, pagas y
        sigues el expediente.
      </>
    ),
    items: [
      'Aquí lees requisitos, plazos, tasas y avisos.',
      'En el Sitio de Trámites entras con ClaveÚnica.',
      'No necesitas ir a una oficina para presentar.',
      'Atención ciudadana responde dudas de canal y estado.',
    ],
    href: '/tramites',
    cta: 'Ir al Sitio de Trámites',
  },
  {
    icon: Clock,
    kicker: 'Cuándo',
    title: 'Cuánto demora y qué pasa si se atrasa',
    lead: (
      <>
        Puedes presentar cuando quieras. Una marca suele tardar{' '}
        <strong className="text-gob-text font-medium">6 a 8 meses</strong> si no hay oposiciones.
      </>
    ),
    items: [
      'La publicación abre un plazo legal de oposición.',
      'Una oposición o un examen de fondo alarga el plazo.',
      'Si rechazan, puedes apelar en el Tribunal de PI.',
      'Un pago fuera de plazo puede dejar sin efecto el trámite.',
    ],
    href: '/marcas/como-registrar',
    cta: 'Revisar plazos del registro',
  },
  {
    icon: Users,
    kicker: 'Para quién',
    title: 'A quién están dirigidos estos servicios',
    lead: (
      <>
        Puede pedir protección{' '}
        <strong className="text-gob-text font-medium">una persona o una empresa</strong>, con o sin
        representante.
      </>
    ),
    items: [
      'Personas naturales',
      'Micro, pequeñas, medianas y grandes empresas',
      'Emprendedores e inventores',
      'Científicos, académicos y representantes legales',
    ],
    href: '/marcas',
    cta: 'Ver quién puede solicitar',
  },
] as const

export function HeroSection() {
  return (
    <section aria-label="Presentación" className="relative portal-ambient-hero bg-inapi-portal-hero">
      <ContainerGRI size="wide" className="relative z-[1] pt-gob-8 pb-gob-6 min-[905px]:pt-gob-12">
        <div className="mx-auto flex w-full flex-col items-center text-center">
          <h1 className="portal-h1 w-full text-gob-text-inverse">
            Registra y protege tu marca o patente en Chile
          </h1>
          <h2 className="mt-gob-6 w-full font-sans text-gri-body min-[600px]:text-[1.1875rem] font-normal leading-[1.5] !text-center text-gob-text-inverse">
            Descubre cómo buscar, solicitar y proteger tus ideas e invenciones en línea.
          </h2>
          <Button
            size="lg"
            className="mt-gob-8 h-14 min-h-14 rounded-full bg-gob-primary px-gob-8 text-gri-h2 font-medium text-gob-text-inverse hover:bg-gob-primary-dark shadow-elevation-03"
            asChild
          >
            <Link href="/tramites">Iniciar un trámite</Link>
          </Button>
          <ul className="mt-gob-8 flex w-full list-none flex-wrap items-center justify-center gap-x-gob-7 gap-y-gob-3">
            {heroShortcuts.map(item => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center gap-2 text-gri-body-sm font-medium text-gob-text-inverse underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </ContainerGRI>

      <ContainerGRI size="wide" className="relative z-[1] pb-gob-8 pt-gob-10 min-[905px]:pb-20 min-[905px]:pt-20">
        <h2 className="sr-only">Qué, cómo, dónde, cuándo y para quién</h2>
        <ul className="grid list-none gap-gob-5 min-[700px]:grid-cols-2 min-[1440px]:grid-cols-5">
          {editorialCards.map(card => {
            const Icon = card.icon
            const ListTag = 'numbered' in card && card.numbered ? 'ol' : 'ul'
            return (
              <li key={card.kicker}>
                <article className="portal-card-motion flex h-full flex-col rounded-gob-lg border border-gob-border bg-card p-gob-5 text-left shadow-elevation-04">
                  <span className="inline-flex size-11 items-center justify-center rounded-gob-md bg-gob-info-bg text-gob-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <p className="mt-gob-4 text-gri-body-sm font-medium text-gob-primary">{card.kicker}</p>
                  <h3 className="mt-gob-1 font-heading text-gri-h2 font-medium text-gob-text leading-[1.35]">
                    {card.title}
                  </h3>
                  <p className="mt-gob-3 text-gri-body-sm leading-[1.5] text-gob-text">{card.lead}</p>
                  <ListTag
                    className={
                      'numbered' in card && card.numbered
                        ? 'mt-gob-3 flex-1 list-decimal space-y-gob-2 pl-gob-5 text-gri-body-sm leading-[1.5] text-gob-text'
                        : 'mt-gob-3 flex-1 list-disc space-y-gob-2 pl-gob-5 text-gri-body-sm leading-[1.5] text-gob-text'
                    }
                  >
                    {card.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ListTag>
                  <Link
                    href={card.href}
                    className="mt-gob-4 inline-flex min-h-11 items-center text-gri-body-sm font-medium text-gob-link hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                  >
                    {card.cta}
                  </Link>
                </article>
              </li>
            )
          })}
        </ul>
      </ContainerGRI>
    </section>
  )
}
