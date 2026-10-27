'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  AlarmClock,
  ArrowRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  ExternalLink,
  FileClock,
  FolderKanban,
  PenLine,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
import { ChartCard } from '@/components/story/ChartCard'
import { EyebrowPill } from '@/components/story/EyebrowPill'
import { JourneyRail } from '@/components/story/JourneyRail'
import { StatTile } from '@/components/story/StatTile'
import { CATEGORY_ICONS } from '@/components/tramites/TramitesSidebar'
import { Button } from '@/components/ui/button'
import { useDashboardPrefs } from '@/hooks/useDashboardPrefs'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { nextAfterAuth } from '@/lib/tramites/entry'
import {
  TRAMITES_CATEGORIES,
  categoryItems,
  type TramitesCategory,
} from '@/lib/tramites/dashboard'
import {
  BORRADORES_MARCA,
  BORRADORES_PATENTE,
  NOTIFICACIONES,
  PAGOS_PENDIENTES,
} from '@/lib/tramites/mock-data'
import type { MegaItem, TramitesDomain } from '@/lib/tramites/nav'
import type { TramitesSession } from '@/lib/tramites/session'
import { cn } from '@/lib/utils'

const POR_RESPONDER = NOTIFICACIONES.filter(n => n.tipo === 'Requerimiento')
const BORRADORES = [...BORRADORES_MARCA, ...BORRADORES_PATENTE]

function byScope<T extends { dominio: TramitesDomain }>(items: T[], scope: TramitesDomain) {
  return items.filter(item => item.dominio === scope)
}

const ESTADO_CORTO: Record<string, string> = {
  Publicación: 'En publicación',
  Requerimiento: 'Por responder',
  'Examen de fondo': 'Examen de fondo',
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-gob-6 px-gob-4 py-gob-6 min-[600px]:px-gob-5 min-[905px]:px-gob-8">
      {children}
    </div>
  )
}

function SectionHeading({
  title,
  description,
  action,
  id,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  id?: string
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-gob-3">
      <div className="space-y-1">
        <h2 id={id} className="font-heading text-gri-h2 font-medium text-gob-text">
          {title}
        </h2>
        {description ? <p className="text-gri-body-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}

function WelcomeBand({ session }: { session: TramitesSession }) {
  const { tx } = useI18n()
  const { scope } = useDashboardPrefs()
  const first = session.nombre.split(' ')[0] || session.nombre
  const avisos = byScope(NOTIFICACIONES, scope).length
  return (
    <section aria-labelledby="dash-hello" className="flex flex-col gap-gob-4 min-[905px]:flex-row min-[905px]:items-end min-[905px]:justify-between">
      <div className="space-y-gob-3">
        <p className="text-gri-body-xs text-muted-foreground">
          {tx('Ámbito')}: {tx(scope === 'marcas' ? 'Marcas' : 'Patentes')}
          <span aria-hidden className="mx-gob-2 text-gob-border">
            ·
          </span>
          <Link
            href={`/tramites/notificaciones?ambito=${scope}`}
            className="font-medium text-gob-link hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
          >
            {avisos} {tx('avisos')}
          </Link>
        </p>
        <h1 id="dash-hello" className="font-heading text-[1.75rem] font-medium leading-[1.15] text-gob-text min-[905px]:text-[2.125rem]">
          {tx('Hola,')} {first}
        </h1>
        <p className="max-w-xl text-gri-body-sm leading-[1.55] text-muted-foreground">
          {tx('Desde aquí presentas solicitudes, pagas tasas y sigues tu expediente. Empieza por el estado de tus solicitudes o un atajo frecuente.')}
        </p>
      </div>
      <div className="flex flex-wrap gap-gob-2">
        <Link
          href={scope === 'marcas' ? '/tramites/marcas/solicitar' : '/tramites/patentes/solicitar'}
          className="inline-flex min-h-11 items-center gap-gob-2 rounded-full bg-[var(--story-night)] px-gob-5 text-gri-body-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        >
          {tx('Empezar un trámite')}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
        <Link
          href={`/tramites/notificaciones?ambito=${scope}`}
          className="inline-flex min-h-11 items-center gap-gob-2 rounded-full border border-gob-border bg-card px-gob-5 text-gri-body-sm font-semibold text-gob-text hover:border-gob-primary hover:text-gob-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        >
          {tx('Mis Notificaciones')}
        </Link>
        <Link
          href={categoryItems('herramientas', scope)[0]?.href ?? '/tramites'}
          className="inline-flex min-h-11 items-center gap-gob-2 rounded-full border border-gob-border bg-card px-gob-5 text-gri-body-sm font-semibold text-gob-text hover:border-gob-primary hover:text-gob-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        >
          {tx('Herramientas')}
        </Link>
      </div>
    </section>
  )
}

function KpiRow() {
  const { tx } = useI18n()
  const { scope } = useDashboardPrefs()
  const avisos = byScope(NOTIFICACIONES, scope)
  const responder = avisos.filter(n => n.tipo === 'Requerimiento')
  const drafts = byScope(BORRADORES, scope)
  const pagos = byScope(PAGOS_PENDIENTES, scope)
  return (
    <section aria-label={tx('Resumen de tus trámites')} className="grid gap-gob-4 min-[600px]:grid-cols-2 min-[1240px]:grid-cols-4">
      <StatTile value={avisos.length} label={tx('Solicitudes activas')} caption={tx(scope === 'marcas' ? 'Marcas' : 'Patentes')} icon={<FolderKanban />} />
      <StatTile
        value={responder.length}
        label={tx('Por responder')}
        caption={tx('Revisa el plazo en el aviso')}
        icon={<Bell />}
        tone="night"
      />
      <StatTile value={drafts.length} label={tx('Borradores guardados')} caption={tx('Se eliminan a los 60 días')} icon={<FileClock />} />
      <StatTile value={pagos.length} label={tx('Pagos pendientes')} caption={tx(pagos[0]?.concepto ?? 'Sin pagos pendientes')} icon={<Wallet />} />
    </section>
  )
}

function StatusChip({ tipo }: { tipo: string }) {
  const { tx } = useI18n()
  const label = ESTADO_CORTO[tipo] ?? tipo
  const tone =
    tipo === 'Requerimiento'
      ? 'text-gob-accent'
      : tipo === 'Publicación'
        ? 'text-gob-primary-dark'
        : 'text-muted-foreground'
  return <span className={cn('text-[0.6875rem] font-medium', tone)}>{tx(label)}</span>
}

function ActiveApplications() {
  const { tx } = useI18n()
  const { scope } = useDashboardPrefs()
  const avisos = byScope(NOTIFICACIONES, scope)
  const next = POR_RESPONDER.find(n => n.dominio === scope)
  const tools = categoryItems('herramientas', scope)
  const estados = Object.entries(
    avisos.reduce<Record<string, number>>((acc, n) => {
      const key = ESTADO_CORTO[n.tipo] ?? n.tipo
      acc[key] = (acc[key] ?? 0) + 1
      return acc
    }, {}),
  )
  return (
    <section aria-labelledby="dash-activas" className="grid gap-gob-5 min-[1240px]:grid-cols-[minmax(0,1.4fr)_minmax(18rem,1fr)]">
      <div className="space-y-gob-4 rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-01">
        <SectionHeading
          id="dash-activas"
          title={tx('Mis solicitudes activas')}
          description={tx('Lo último que pasó con cada expediente.')}
          action={
            <Link href={`/tramites/notificaciones?ambito=${scope}`} className="inline-flex min-h-11 items-center gap-1 text-gri-body-sm font-medium text-gob-link hover:underline">
              {tx('Ver todas mis solicitudes')}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          }
        />
        <ul className="divide-y divide-gob-border">
          {avisos.map(n => (
            <li key={n.id}>
              <Link
                href={`/tramites/notificaciones?ambito=${n.dominio}`}
                className="flex min-h-14 flex-wrap items-center gap-gob-3 py-gob-3 text-gob-text hover:bg-gob-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-gri-body-sm font-medium">{n.numero}</span>
                  <span className="block text-gri-body-xs text-muted-foreground">{tx(n.resumen)}</span>
                </span>
                <StatusChip tipo={n.tipo} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-gob-4">
        {next ? (
          <div className="rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-01">
            <p className="flex items-center gap-gob-2 text-gri-body-xs font-semibold uppercase tracking-[0.08em] text-gob-primary">
              <AlarmClock className="size-4" aria-hidden />
              {tx('Próxima acción recomendada')}
            </p>
            <p className="mt-gob-3 font-heading text-gri-h2 font-medium leading-[1.35] text-gob-text">
              {tx('Responde el requerimiento de tu solicitud')} {next.numero}
            </p>
            <p className="mt-gob-2 text-gri-body-sm leading-[1.55] text-muted-foreground">{tx(next.resumen)}</p>
            <Link
              href={next.dominio === 'marcas' ? '/tramites/marcas/escritos' : '/tramites/patentes/escritos'}
              className="mt-gob-4 inline-flex min-h-11 items-center gap-gob-2 text-gri-body-sm font-semibold text-gob-link hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              {tx(next.dominio === 'marcas' ? 'Adjuntar documentos a tu solicitud de marca' : 'Adjuntar documentos a tu solicitud de patente')}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        ) : null}
        <div className="rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-01">
          <p className="text-gri-body-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{tx('Herramientas')}</p>
          <div className="mt-gob-3 flex flex-wrap gap-gob-2">
            {tools.map(item => (
              <Link
                key={item.href}
                href={item.href}
                title={tx(item.tooltip)}
                className="text-gri-body-xs font-medium text-gob-link hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
              >
                {tx(item.label)}
              </Link>
            ))}
          </div>
        </div>
        {estados.length ? (
          <ChartCard
            kind="doughnut"
            title="Tus solicitudes por estado"
            description="Cuántas solicitudes tienes en cada etapa."
            views={[
              {
                id: 'estado',
                label: 'Hoy',
                labels: estados.map(([k]) => k),
                series: [{ label: 'Solicitudes', data: estados.map(([, v]) => v) }],
                center: { value: String(avisos.length), caption: 'solicitudes activas' },
              },
            ]}
          />
        ) : null}
      </div>
    </section>
  )
}

function TrackingRail() {
  const { tx } = useI18n()
  const { scope } = useDashboardPrefs()
  const marca = scope === 'marcas'
  return (
    <section aria-labelledby="dash-seguimiento" className="space-y-gob-4 rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-01 min-[905px]:p-gob-6">
      <SectionHeading
        id="dash-seguimiento"
        title={`${tx('Seguimiento de')} ${marca ? 'OMNIdanz' : 'Dispositivo de asistencia para danza'}`}
        description={
          marca
            ? `${tx('Solicitud de marca')} 1000000 · ${tx('Marca comercial')}`
            : `${tx('Solicitud de patente')} 202101234 · ${tx('Examen de fondo')}`
        }
      />
      <JourneyRail
        label={tx('Etapas de la solicitud')}
        steps={
          marca
            ? [
                { title: tx('Ingreso y pago inicial'), body: tx('Recibimos tu solicitud y el pago de la tasa.'), status: 'done', meta: '03-11-2025' },
                { title: tx('Examen de forma'), body: tx('Revisamos que la solicitud esté completa.'), status: 'done', meta: '10-11-2025' },
                {
                  title: tx('Publicación en el Diario Oficial'),
                  body: tx('Tu solicitud se publicó. Terceros pueden presentar oposición dentro del plazo legal.'),
                  status: 'current',
                  meta: '12-04-2026',
                  href: '/tramites/notificaciones?ambito=marcas',
                  cta: tx('Ver el aviso'),
                },
                { title: tx('Examen de fondo y resolución'), body: tx('INAPI revisa si tu marca cumple la ley y resuelve.'), status: 'pending' },
              ]
            : [
                { title: tx('Ingreso y pago inicial'), body: tx('Recibimos tu solicitud y el pago de la tasa.'), status: 'done', meta: '18-05-2021' },
                { title: tx('Examen de forma'), body: tx('Revisamos que la solicitud esté completa.'), status: 'done', meta: '02-06-2021' },
                {
                  title: tx('Examen de fondo y resolución'),
                  body: tx('INAPI está analizando si tu solicitud puede registrarse'),
                  status: 'current',
                  meta: '18-05-2026',
                  href: '/tramites/notificaciones?ambito=patentes',
                  cta: tx('Ver el aviso'),
                },
                { title: tx('Concesión y pagos de mantención'), body: tx('Si se concede, deberás pagar los derechos y mantenerla vigente.'), status: 'pending' },
              ]
        }
      />
    </section>
  )
}

function ShortcutRow({ item, scope }: { item: MegaItem; scope: TramitesDomain }) {
  const { tx } = useI18n()
  const cls =
    'group/item flex min-h-12 items-center gap-gob-3 rounded-gob-md px-gob-3 py-gob-2 text-gri-body-sm text-gob-text transition-colors hover:bg-gob-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus'
  const dot = <span aria-hidden className={cn('size-1.5 shrink-0 rounded-full', scope === 'marcas' ? 'bg-gob-accent' : 'bg-gob-primary')} />
  const content = (
    <>
      {dot}
      <span className="flex-1 font-medium leading-snug">{tx(item.label)}</span>
      {item.external ? (
        <ExternalLink className="size-4 shrink-0 text-muted-foreground" aria-label={tx('Se abre en otra pestaña')} />
      ) : (
        <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover/item:translate-x-0.5" aria-hidden />
      )}
    </>
  )
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls} title={tx(item.tooltip)}>
      {content}
    </a>
  ) : (
    <Link href={item.href} className={cls} title={tx(item.tooltip)}>
      {content}
    </Link>
  )
}

function CategoryCard({ category, scope, dark }: { category: TramitesCategory; scope: TramitesDomain; dark?: boolean }) {
  const { tx } = useI18n()
  const [expanded, setExpanded] = useState(false)
  const listId = useId()
  const items = categoryItems(category.id, scope)
  const first = items.slice(0, 3)
  const rest = items.slice(3)
  return (
    <article className="flex flex-col gap-gob-4 rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-01">
      <header className="flex items-start gap-gob-3">
        <span
          aria-hidden
          className={cn(
            'inline-flex size-11 shrink-0 items-center justify-center rounded-gob-md [&_svg]:size-5',
            dark ? 'bg-[var(--story-night)] text-white' : 'bg-gob-primary/10 text-gob-primary-dark',
          )}
        >
          {CATEGORY_ICONS[category.id]}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-gri-h2 font-medium leading-[1.3] text-gob-text">{tx(category.label)}</h3>
          <p className="text-gri-body-sm text-muted-foreground">{tx(category.description)}</p>
        </div>
      </header>
      <ul className="-mx-gob-2 flex flex-col">
        {first.map(item => (
          <li key={item.href + item.label}>
            <ShortcutRow item={item} scope={scope} />
          </li>
        ))}
      </ul>
      {rest.length ? (
        <ul id={listId} className={cn('-mx-gob-2 -mt-gob-4 flex-col', expanded ? 'flex' : 'hidden')}>
          {rest.map(item => (
            <li key={item.href + item.label}>
              <ShortcutRow item={item} scope={scope} />
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-gob-2 border-t border-gob-border pt-gob-3">
        {rest.length ? (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setExpanded(v => !v)}
            className="inline-flex min-h-11 items-center gap-gob-1 text-gri-body-sm font-medium text-gob-link hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
          >
            {expanded
              ? tx('Mostrar menos')
              : `${tx('Ver los')} ${items.length} ${tx('trámites de')} ${tx(category.label)}`}
            <ChevronDown className={cn('size-4 transition-transform', expanded && 'rotate-180')} aria-hidden />
          </button>
        ) : (
          <span className="text-gri-body-xs text-muted-foreground">
            {items.length} {tx(items.length === 1 ? 'trámite' : 'trámites')}
          </span>
        )}
      </div>
    </article>
  )
}

function CategoriesPanel() {
  const { tx } = useI18n()
  const { scope } = useDashboardPrefs()
  return (
    <section aria-labelledby="dash-categorias" className="space-y-gob-4">
      <SectionHeading
        id="dash-categorias"
        title={tx('Qué puedes hacer ahora')}
        description={tx('Elige el ámbito y abre la categoría que necesitas.')}
      />
      <div className="grid gap-gob-4 min-[905px]:grid-cols-2 min-[1440px]:grid-cols-3">
        {TRAMITES_CATEGORIES.map((cat, i) => (
          <CategoryCard key={`${cat.id}-${scope}`} category={cat} scope={scope} dark={i === 0} />
        ))}
      </div>
    </section>
  )
}

function PaymentsAndDrafts() {
  const { tx } = useI18n()
  const { scope } = useDashboardPrefs()
  const pagos = byScope(PAGOS_PENDIENTES, scope)
  const drafts = byScope(BORRADORES, scope)
  return (
    <section className="grid gap-gob-4 min-[905px]:grid-cols-2">
      <div className="rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-01">
        <SectionHeading
          title={tx('Pagos pendientes')}
          action={
            <Link
              href={scope === 'marcas' ? '/tramites/marcas/pagos' : '/tramites/patentes/pagos'}
              className="text-gri-body-sm font-medium text-gob-link hover:underline"
            >
              {tx('Pagos')}
            </Link>
          }
        />
        {pagos.length ? (
          <ul className="mt-gob-3 divide-y divide-gob-border">
            {pagos.map(p => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-gob-3 py-gob-3">
                <span className="min-w-0">
                  <span className="block font-heading text-gri-body-sm font-medium text-gob-text">{p.numero}</span>
                  <span className="block text-gri-body-xs text-muted-foreground">{tx(p.concepto)}</span>
                </span>
                <Link
                  href={p.href}
                  className="inline-flex min-h-9 items-center rounded-full bg-[var(--story-night)] px-gob-3 text-gri-body-xs font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                >
                  {tx('Pagar ahora')}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-gob-3 text-gri-body-sm text-muted-foreground">{tx('Sin pagos pendientes')}</p>
        )}
      </div>
      <div className="rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-01">
        <SectionHeading
          title={tx('Borradores')}
          action={
            <Link
              href={scope === 'marcas' ? '/tramites/marcas/solicitudes-guardadas' : '/tramites/patentes/solicitudes-guardadas'}
              className="text-gri-body-sm font-medium text-gob-link hover:underline"
            >
              {tx('Empezar un trámite')}
            </Link>
          }
        />
        {drafts.length ? (
          <ul className="mt-gob-3 divide-y divide-gob-border">
            {drafts.map(d => (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-gob-3 py-gob-3">
                <span className="min-w-0">
                  <span className="block font-heading text-gri-body-sm font-medium text-gob-text">{d.signoOTitulo}</span>
                  <span className="block text-gri-body-xs text-muted-foreground">
                    {d.id} · {tx('Vence')} {d.vence}
                  </span>
                </span>
                <Link
                  href={d.dominio === 'marcas' ? '/tramites/marcas/solicitudes-guardadas' : '/tramites/patentes/solicitudes-guardadas'}
                  className="inline-flex min-h-9 items-center rounded-full border border-gob-border px-gob-3 text-gri-body-xs font-semibold text-gob-text hover:border-gob-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                >
                  {tx('Retomar')}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-gob-3 text-gri-body-sm text-muted-foreground">{tx('Sin borradores')}</p>
        )}
      </div>
    </section>
  )
}

export function TramitesDashboardHome({ session }: { session: TramitesSession }) {
  return (
    <DashboardShell>
      <WelcomeBand session={session} />
      <KpiRow />
      <ActiveApplications />
      <TrackingRail />
      <CategoriesPanel />
      <PaymentsAndDrafts />
    </DashboardShell>
  )
}

export function TramitesLockedDashboard() {
  const { tx } = useI18n()
  const router = useRouter()
  const params = useSearchParams()
  const next = nextAfterAuth(params.toString())
  const nextQuery = `?next=${encodeURIComponent(next)}`
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-[var(--story-mist)]">
      <div className="story-night guilloche relative px-gob-4 py-gob-5 text-white min-[600px]:px-gob-8">
        <div className="mx-auto flex w-full max-w-xl items-center gap-gob-3">
          <Image
            src="/inapi-mvp/inapi-logo.jpg"
            alt=""
            width={96}
            height={38}
            className="h-9 w-auto rounded-sm object-contain"
            priority
          />
          <p className="font-heading text-gri-body font-semibold">{tx('Mis trámites')}</p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center px-gob-4 py-gob-8">
        <section
          aria-labelledby="tramites-login-title"
          className="w-full max-w-xl space-y-gob-5 rounded-gob-xl border border-gob-border bg-card p-gob-6 shadow-elevation-04 min-[905px]:p-gob-8"
        >
          <div className="space-y-gob-2">
            <h1 id="tramites-login-title" className="portal-h2 text-gob-text">
              {tx('Portal de trámites de INAPI')}
            </h1>
            <p className="text-gri-body leading-relaxed text-gob-text">
              {tx('Aquí presentas solicitudes, pagas y sigues el expediente.')}
            </p>
          </div>
          <ul className="space-y-gob-2 text-gri-body-sm text-gob-text">
            {[
              { icon: <PenLine className="size-4" />, text: 'Presentar una solicitud nueva' },
              { icon: <FolderKanban className="size-4" />, text: 'Seguir un expediente ya ingresado' },
              { icon: <ShieldCheck className="size-4" />, text: 'Usar el Buscador de Marcas o el Buscador de Patentes' },
            ].map(row => (
              <li key={row.text} className="flex items-center gap-gob-3">
                <span aria-hidden className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gob-primary/10 text-gob-primary-dark">
                  {row.icon}
                </span>
                {tx(row.text)}
              </li>
            ))}
          </ul>
          <div className="space-y-gob-3 border-t border-gob-border pt-gob-5">
            <h2 className="font-heading text-gri-h2 font-medium text-gob-text">{tx('Iniciar sesión con ClaveÚnica')}</h2>
            <p className="text-gri-body-sm text-gob-text">
              {tx('Si es tu primera vez, valida tu identidad con ClaveÚnica. Después puedes entrar con ClaveÚnica o con Clave INAPI.')}
            </p>
            <div className="flex flex-col gap-gob-3 min-[600px]:flex-row min-[600px]:items-center">
              <ClaveUnicaButton onClick={() => router.push(`/tramites/clave-unica${nextQuery}`)} />
              <Button asChild variant="outline" size="form">
                <Link href={`/tramites/auth${nextQuery}`}>{tx('Ingresar con Clave INAPI')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
