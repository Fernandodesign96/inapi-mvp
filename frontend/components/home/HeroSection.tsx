'use client'

import { Fragment, useRef, useState } from 'react'
import Link from 'next/link'
import { TramitesLink } from '@/components/tramites/TramitesLink'
import {
  Bell,
  Clock,
  FileSearch,
  HelpCircle,
  LayoutGrid,
  Lightbulb,
  MapPin,
  Route,
  Search,
  Stamp,
  Users,
} from 'lucide-react'
import CountUp from 'react-countup'
import { useInView, useReducedMotion } from 'framer-motion'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

const heroShortcuts = [
  { href: '/marcas/buscador-similitud', label: 'Buscador de marcas', icon: Search },
  { href: '/tramites/marcas/clasificador', label: 'Buscador de productos y servicios', icon: LayoutGrid },
  { href: '/tramites/patentes/buscador', label: 'Buscador de patentes', icon: FileSearch },
  { href: '/notificaciones-diarias', label: 'Notificaciones diarias en INAPI', icon: Bell },
] as const

const heroMuted = 'text-[#F3F7FC]'

const heroMarcaStats = [
  { end: 50388, suffix: '', prefix: '', label: 'Solicitudes de marca en 2025' },
  { end: 10, suffix: ' años', prefix: '', label: 'Vigencia de una marca' },
  { end: 97, suffix: '%', prefix: '', label: 'Marcas resueltas en menos de 7 meses' },
  { end: 275987, suffix: '', prefix: '', label: 'Solicitudes de marca 2020-2025' },
] as const

const heroPatenteStats = [
  { end: 4189, suffix: '', prefix: '', label: 'Solicitudes de patente en 2025' },
  { end: 20, suffix: ' años', prefix: '', label: 'Vigencia de una patente de invención' },
  { end: 91.8, suffix: '%', prefix: '', decimals: 1, label: 'En trámite con 3 años o menos' },
  { end: 12286, suffix: '', prefix: '', label: 'Solicitudes de patente 2023-2025' },
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
        Puedes presentar cuando quieras. En 2024, una marca sin oposición tardó en promedio{' '}
        <strong className="text-gob-text font-medium">4,5 meses</strong>.
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

function HeroStatsStrip({
  stats,
}: {
  stats: readonly {
    end: number
    suffix: string
    prefix: string
    label: string
    decimals?: number
  }[]
}) {
  const { tx, locale } = useI18n()
  const ref = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reduce = useReducedMotion()
  const formatMiles = (value: number, decimals = 0) =>
    value.toLocaleString(locale === 'en' ? 'en-US' : 'es-CL', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })

  return (
    <ul
      ref={ref}
      className="mx-auto flex w-full list-none flex-nowrap items-stretch justify-between gap-x-gob-3 overflow-x-auto min-[905px]:gap-x-gob-6"
    >
      {(stats ?? []).map((stat, index) => {
        const suffix = tx(stat.suffix || '')
        return (
        <Fragment key={stat.label}>
          {index > 0 ? (
            <li className="hidden min-[700px]:flex" aria-hidden>
              <span className="h-full min-h-10 w-px bg-[rgba(162,209,255,0.15)]" />
            </li>
          ) : null}
          <li className="min-w-[8rem] flex-1 px-gob-2 text-center">
            <p
              className="font-heading text-[1.75rem] font-bold leading-[1.2] text-white"
              data-i18n-skip
            >
              {reduce || !inView ? (
                `${stat.prefix}${formatMiles(stat.end, stat.decimals)}${suffix}`
              ) : (
                <CountUp
                  start={0}
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={suffix}
                  separator={locale === 'en' ? ',' : '.'}
                  decimals={stat.decimals ?? 0}
                  decimal={locale === 'en' ? '.' : ','}
                  duration={1.2}
                />
              )}
            </p>
            <p className={`mt-1 font-sans text-[0.75rem] leading-[1.4] ${heroMuted}`}>{tx(stat.label)}</p>
          </li>
        </Fragment>
        )
      })}
    </ul>
  )
}

const heroStatTabs = [
  { id: 'marcas' as const, label: 'Marcas', icon: Stamp, stats: heroMarcaStats },
  { id: 'patentes' as const, label: 'Patentes', icon: Lightbulb, stats: heroPatenteStats },
] as const

export function HeroSection() {
  const { tx } = useI18n()
  const [panel, setPanel] = useState<'marcas' | 'patentes'>('marcas')
  const stats = panel === 'patentes' ? heroPatenteStats : heroMarcaStats

  return (
    <section aria-label="Presentación" className="relative">
      <div className="home-atmosphere relative overflow-hidden">
      <ContainerGRI size="wide" className="relative z-[1] pt-gob-8 pb-16 min-[905px]:pt-gob-12">
        <div className="mx-auto flex w-full flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(162,209,255,0.3)] bg-[rgba(15,105,195,0.12)] px-4 py-1.5 text-sm font-medium text-[#A1D1FF]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2195F2]" aria-hidden />
            Instituto Nacional de Propiedad Industrial
          </div>
          <h1 className="w-full max-w-3xl font-heading text-[2rem] font-bold not-italic leading-[1.5] text-white min-[905px]:text-[3rem]">
            Registra y protege tu marca o patente en Chile
          </h1>
          <div className="mt-gob-5 w-full overflow-x-auto">
            <h2 className={`mx-auto w-max whitespace-nowrap text-center font-sans text-[0.95rem] font-normal leading-[1.5] ${heroMuted} min-[905px]:text-lg`}>
              Descubre cómo buscar, solicitar y proteger tus ideas e invenciones en línea.
            </h2>
          </div>
          <div className="mt-gob-8 flex flex-row flex-wrap items-center justify-center gap-3">
            <TramitesLink
              href="/tramites"
              className="inline-flex h-12 min-h-12 items-center justify-center rounded-[8px] bg-[#0F69C3] px-gob-6 text-gri-btn font-medium text-white transition-colors hover:bg-gob-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              Iniciar un trámite
            </TramitesLink>
            <Link
              href="/tramites-digitales"
              className={`inline-flex h-12 min-h-12 items-center justify-center rounded-[8px] border-[1.5px] border-white/55 bg-transparent px-gob-6 text-gri-btn font-medium ${heroMuted} transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus`}
            >
              Ver cómo iniciar el trámite
            </Link>
          </div>
        </div>
        <ul className="mt-12 flex w-full list-none flex-nowrap items-center justify-center gap-x-6 overflow-x-auto min-[905px]:mt-14 min-[905px]:gap-x-10">
          {heroShortcuts.map((item, index) => {
            const Icon = item.icon
            return (
              <Fragment key={item.href}>
                {index > 0 ? (
                  <li className="hidden shrink-0 min-[600px]:flex" aria-hidden>
                    <div className="h-4 w-px bg-[rgba(162,209,255,0.2)]" />
                  </li>
                ) : null}
                <li className="shrink-0">
                  <TramitesLink
                    href={item.href}
                    className={`inline-flex min-h-11 items-center gap-2 whitespace-nowrap text-gri-body-sm font-medium ${heroMuted} underline-offset-4 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus`}
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    {item.label}
                  </TramitesLink>
                </li>
              </Fragment>
            )
          })}
        </ul>
        <div className="mt-16 min-[905px]:mt-20">
          <div
            role="tablist"
            aria-label="Cifras de marcas y patentes"
            className="mb-gob-5 flex flex-wrap items-center justify-center gap-gob-2"
          >
            {heroStatTabs.map(tab => {
              const Icon = tab.icon
              const selected = tab.id === panel
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={cn(
                    'inline-flex min-h-11 items-center gap-2 rounded-full border px-gob-4 py-gob-2 text-gri-body-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                    selected
                      ? 'border-white bg-white text-[#081F38] shadow-elevation-03'
                      : `border-white/40 bg-transparent ${heroMuted} hover:border-white hover:text-white`,
                  )}
                  onClick={() => setPanel(tab.id)}
                >
                  <Icon className="size-4" aria-hidden />
                  {tx(tab.label)}
                </button>
              )
            })}
          </div>
          <HeroStatsStrip key={panel} stats={stats} />
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
                  <TramitesLink
                    href={card.href}
                    className="mt-gob-4 inline-flex min-h-11 items-center text-gri-body-sm font-medium text-gob-link hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                  >
                    {card.cta}
                  </TramitesLink>
                </article>
              </li>
            )
          })}
        </ul>
      </ContainerGRI>
      </div>
    </section>
  )
}
