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

const HERO_H2 =
  'Transformamos el talento de Chile en un derecho exclusivo: marcas, patentes y diseños, con un trámite digital y ClaveÚnica.'

const editorialCards: {
  step: string
  icon: typeof HelpCircle
  kicker: string
  title: string
  lead: string
  items: string[]
  href: string
  cta: string
}[] = [
  {
    step: '01',
    icon: HelpCircle,
    kicker: 'Qué',
    title: 'Qué protege INAPI',
    lead: 'INAPI registra y resuelve las solicitudes de propiedad industrial en Chile.',
    items: [
      'Marcas: nombre, logo o signo de tus productos o servicios.',
      'Patentes: invención o modelo de utilidad.',
      'Diseños: apariencia de un producto.',
      'Esquemas de trazado: diseño de un circuito integrado.',
    ],
    href: '/marcas',
    cta: 'Leer qué puedes proteger',
  },
  {
    step: '02',
    icon: Route,
    kicker: 'Cómo',
    title: 'Cómo iniciar el trámite',
    lead: 'El camino es el mismo para una marca, una patente o un diseño.',
    items: [
      'Infórmate sobre el derecho que necesitas.',
      'Busca si ya existe algo parecido.',
      'Presenta, paga y adjunta documentos en línea.',
    ],
    href: '/tramites-digitales',
    cta: 'Ver cómo iniciar el trámite',
  },
  {
    step: '03',
    icon: MapPin,
    kicker: 'Dónde',
    title: 'Dónde te informas y dónde tramitas',
    lead: 'Este portal informa. El Sitio de Trámites es donde presentas.',
    items: [
      'Aquí lees requisitos, plazos y tasas.',
      'En el Sitio de Trámites presentas, pagas y sigues el expediente.',
      'Ingresas con ClaveÚnica, sin ir a una oficina.',
    ],
    href: '/tramites',
    cta: 'Ir al Sitio de Trámites',
  },
  {
    step: '04',
    icon: Clock,
    kicker: 'Cuándo',
    title: 'Cuánto demora un registro',
    lead: 'Puedes presentar cuando quieras.',
    items: [
      'Una marca sin oposición tardó 4,5 meses en 2024.',
      'Una oposición o un examen de fondo alarga el plazo.',
      'Si rechazan, puedes apelar en el Tribunal de PI.',
    ],
    href: '/marcas/como-registrar',
    cta: 'Revisar plazos del registro',
  },
  {
    step: '05',
    icon: Users,
    kicker: 'Para quién',
    title: 'Quién puede solicitar',
    lead: 'Puede pedir protección una persona o una empresa.',
    items: [
      'Personas naturales.',
      'Empresas de cualquier tamaño.',
      'Inventores, creadores y representantes.',
    ],
    href: '/marcas',
    cta: 'Ver quién puede solicitar',
  },
]

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
      <ContainerGRI size="wide" className="relative z-[1] pt-gob-6 pb-gob-10 min-[905px]:pt-gob-8 min-[905px]:pb-12">
        <div className="mx-auto flex w-full flex-col items-center text-center">
          <div className="mb-gob-4 inline-flex items-center gap-2 rounded-full border border-[rgba(162,209,255,0.3)] bg-[rgba(15,105,195,0.12)] px-4 py-1.5 text-sm font-medium text-[#A1D1FF]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2195F2]" aria-hidden />
            Instituto Nacional de Propiedad Industrial
          </div>
          <h1 className="w-full max-w-4xl font-heading text-[1.75rem] font-bold not-italic leading-[1.2] text-white min-[600px]:text-[2.25rem] min-[905px]:text-[2.75rem]">
            {tx('Impulsa el valor de tus ideas con el registro oficial de INAPI')}
          </h1>
          <h2 className={`mt-gob-5 w-full max-w-[40rem] text-pretty font-sans text-[0.95rem] font-normal leading-[1.5] ${heroMuted} min-[905px]:text-[1.125rem]`}>
            {tx(HERO_H2)}
          </h2>
          <div className="mt-gob-8 flex flex-row flex-wrap items-center justify-center gap-3">
            <TramitesLink
              href="/tramites"
              className="inline-flex h-12 min-h-12 items-center justify-center rounded-[8px] bg-[#0F69C3] px-gob-6 text-gri-btn font-medium text-white transition-colors hover:bg-gob-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              {tx('Iniciar un trámite')}
            </TramitesLink>
            <Link
              href="/tramites-digitales"
              className={`inline-flex h-12 min-h-12 items-center justify-center rounded-[8px] border-[1.5px] border-white/55 bg-transparent px-gob-6 text-gri-btn font-medium ${heroMuted} transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus`}
            >
              {tx('Ver cómo iniciar el trámite')}
            </Link>
          </div>
        </div>
        <ul className="mt-gob-8 flex w-full list-none flex-nowrap items-center justify-center gap-x-6 overflow-x-auto min-[905px]:mt-10 min-[905px]:gap-x-10">
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
        <div className="mt-gob-10 min-[905px]:mt-12">
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
        <h2 className="sr-only">{tx('Qué, cómo, dónde, cuándo y para quién')}</h2>
        <ul className="grid list-none gap-gob-4 min-[700px]:grid-cols-2 min-[1440px]:grid-cols-5">
          {editorialCards.map(card => {
            const Icon = card.icon
            return (
              <li key={card.kicker}>
                <article className="portal-card-motion flex h-full flex-col rounded-gob-lg border border-gob-border bg-card p-gob-5 text-left shadow-elevation-04">
                  <div className="flex items-center justify-between gap-gob-3">
                    <span className="inline-flex size-11 items-center justify-center rounded-gob-md bg-gob-info-bg text-gob-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-heading text-gri-body-sm font-bold tabular-nums tracking-wide text-gob-primary/70">
                      {card.step}
                    </span>
                  </div>
                  <p className="mt-gob-4 text-gri-body-xs font-medium uppercase tracking-wider text-gob-primary">
                    {tx(card.kicker)}
                  </p>
                  <h3 className="mt-gob-1 font-heading text-[1.25rem] font-medium leading-[1.35] text-gob-text min-[905px]:text-[1.375rem]">
                    {tx(card.title)}
                  </h3>
                  <p className="mt-gob-3 text-gri-body-sm leading-[1.5] text-gob-text">{tx(card.lead)}</p>
                  <ul className="mt-gob-3 flex-1 list-disc space-y-gob-2 pl-gob-5 text-gri-body-sm leading-[1.5] text-gob-text">
                    {card.items.map(item => (
                      <li key={item}>{tx(item)}</li>
                    ))}
                  </ul>
                  <TramitesLink
                    href={card.href}
                    className="mt-gob-4 inline-flex min-h-11 items-center text-gri-body-sm font-medium text-gob-link hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                  >
                    {tx(card.cta)}
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
