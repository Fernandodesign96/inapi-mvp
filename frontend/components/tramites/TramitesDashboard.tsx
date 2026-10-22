'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  AlarmClock,
  ArrowRight,
  ArrowUpRight,
  Bell,
  ChevronDown,
  ExternalLink,
  FileClock,
  FolderKanban,
  Lock,
  PenLine,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
import { StatusNotificationCard } from '@/components/shared/StatusNotificationCard'
import { ChartCard } from '@/components/story/ChartCard'
import { EyebrowPill } from '@/components/story/EyebrowPill'
import { JourneyRail } from '@/components/story/JourneyRail'
import { PiSeal } from '@/components/story/PiSeal'
import { StatTile } from '@/components/story/StatTile'
import { CATEGORY_ICONS, ScopeSwitch } from '@/components/tramites/TramitesSidebar'
import { Button } from '@/components/ui/button'
import { useDashboardPrefs } from '@/hooks/useDashboardPrefs'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import {
  TRAMITES_CATEGORIES,
  categoryById,
  categoryHref,
  categoryItems,
  type TramitesCategory,
  type TramitesCategoryId,
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

function WelcomeHero({ session }: { session: TramitesSession }) {
  const { tx } = useI18n()
  const { scope } = useDashboardPrefs()
  const first = session.nombre.split(' ')[0] || session.nombre
  const next = POR_RESPONDER[0]
  return (
    <section
      aria-labelledby="dash-hello"
      className="story-night relative isolate overflow-hidden rounded-gob-xl p-gob-6 text-white shadow-elevation-03 min-[905px]:p-gob-8"
    >
      <div aria-hidden className="guilloche pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_70%)]" />
      <PiSeal
        center="PI"
        caption="TRÁMITES"
        size={168}
        className="pointer-events-none absolute -right-6 -top-6 hidden text-white/25 min-[905px]:block"
      />
      <div className="grid gap-gob-6 min-[1100px]:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] min-[1100px]:items-end">
        <div className="space-y-gob-4">
          <EyebrowPill tone="night" dot="focus">
            {tx('Portal de trámites')}
          </EyebrowPill>
          <h1 id="dash-hello" className="font-heading text-[2rem] font-medium leading-[1.15] min-[905px]:text-[2.5rem]">
            {tx('Hola,')} {first}
          </h1>
          <p className="max-w-xl text-gri-body leading-[1.6] text-white/85">
            {tx('Desde aquí presentas solicitudes, pagas tasas y sigues tu expediente. Empieza por el estado de tus solicitudes o un atajo frecuente.')}
          </p>
          <div className="flex flex-wrap gap-gob-3">
            <Link
              href={scope === 'marcas' ? '/tramites/marcas/solicitar' : '/tramites/patentes/solicitar'}
              className="inline-flex min-h-11 items-center gap-gob-2 rounded-full bg-white px-gob-5 text-gri-body-sm font-semibold text-[#092039] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              {tx(scope === 'marcas' ? 'Solicitar marca' : 'Solicitar patente')}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/tramites/notificaciones"
              className="inline-flex min-h-11 items-center gap-gob-2 rounded-full border border-white/35 px-gob-5 text-gri-body-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              {tx('Ver todas mis solicitudes')}
            </Link>
          </div>
        </div>
        {next ? (
          <div className="story-glass relative rounded-gob-lg p-gob-5">
            <p className="flex items-center gap-gob-2 text-gri-body-xs font-semibold uppercase tracking-[0.08em] text-[#FFD08A]">
              <AlarmClock className="size-4" aria-hidden />
              {tx('Próxima acción recomendada')}
            </p>
            <p className="mt-gob-3 font-heading text-gri-h2 font-medium leading-[1.35]">
              {tx('Responde el requerimiento de tu solicitud')} {next.numero}
            </p>
            <p className="mt-gob-2 text-gri-body-sm leading-[1.55] text-white/80">{tx(next.resumen)}</p>
            <Link
              href="/tramites/marcas/escritos"
              className="mt-gob-4 inline-flex min-h-11 items-center gap-gob-2 text-gri-body-sm font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              {tx('Adjuntar documentos a tu solicitud de marca')}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function KpiRow() {
  const { tx } = useI18n()
  return (
    <section aria-label={tx('Resumen de tus trámites')} className="grid gap-gob-4 min-[600px]:grid-cols-2 min-[1240px]:grid-cols-4">
      <StatTile value={NOTIFICACIONES.length} label={tx('Solicitudes activas')} caption={tx('Marcas y patentes')} icon={<FolderKanban />} />
      <StatTile
        value={POR_RESPONDER.length}
        label={tx('Por responder')}
        caption={tx('Revisa el plazo en el aviso')}
        icon={<Bell />}
        tone="night"
      />
      <StatTile value={BORRADORES.length} label={tx('Borradores guardados')} caption={tx('Se eliminan a los 60 días')} icon={<FileClock />} />
      <StatTile value={PAGOS_PENDIENTES.length} label={tx('Pagos pendientes')} caption={tx(PAGOS_PENDIENTES[0]?.concepto ?? 'Sin pagos pendientes')} icon={<Wallet />} />
    </section>
  )
}

function ActiveApplications() {
  const { tx } = useI18n()
  const estados = Object.entries(
    NOTIFICACIONES.reduce<Record<string, number>>((acc, n) => {
      const key = ESTADO_CORTO[n.tipo] ?? n.tipo
      acc[key] = (acc[key] ?? 0) + 1
      return acc
    }, {}),
  )
  return (
    <section aria-labelledby="dash-activas" className="grid gap-gob-5 min-[1240px]:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="space-y-gob-4">
        <SectionHeading
          id="dash-activas"
          title={tx('Mis solicitudes activas')}
          description={tx('Lo último que pasó con cada expediente.')}
          action={
            <Link href="/tramites/notificaciones" className="inline-flex min-h-11 items-center gap-1 text-gri-body-sm font-medium text-gob-link hover:underline">
              {tx('Ver todas mis solicitudes')}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          }
        />
        <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
          {NOTIFICACIONES.slice(0, 2).map(n => (
            <StatusNotificationCard
              key={n.id}
              solicitudId={n.numero}
              signo={n.dominio === 'marcas' ? 'OMNIdanz' : 'Solicitud de patente'}
              tipo={n.dominio === 'marcas' ? 'Marca comercial' : 'Patente'}
              fechaIngreso={n.fecha}
              estadoCodigo={n.tipo}
              descripcion={n.resumen}
              ctas={[
                {
                  label: n.dominio === 'marcas' ? 'Ver estado de marcas' : 'Ver estado de patentes',
                  href: `/tramites/notificaciones?ambito=${n.dominio}`,
                },
              ]}
            />
          ))}
        </div>
      </div>
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
            center: { value: String(NOTIFICACIONES.length), caption: 'solicitudes activas' },
          },
        ]}
      />
    </section>
  )
}

function TrackingRail() {
  const { tx } = useI18n()
  return (
    <section aria-labelledby="dash-seguimiento" className="space-y-gob-4 rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-01 min-[905px]:p-gob-6">
      <SectionHeading
        id="dash-seguimiento"
        title={`${tx('Seguimiento de')} OMNIdanz`}
        description={`${tx('Solicitud de marca')} 1000000 · ${tx('Marca comercial')}`}
      />
      <JourneyRail
        label={tx('Etapas de la solicitud')}
        steps={[
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
        ]}
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
        <Link
          href={categoryHref(category.id)}
          className="inline-flex min-h-11 items-center gap-1 text-gri-body-sm font-medium text-gob-text hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        >
          {tx('Abrir categoría')}
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </div>
    </article>
  )
}

function CategoriesPanel() {
  const { tx } = useI18n()
  const { scope, setPrefs } = useDashboardPrefs()
  return (
    <section aria-labelledby="dash-categorias" className="space-y-gob-4">
      <SectionHeading
        id="dash-categorias"
        title={tx('Todos tus trámites, en 4 categorías')}
        description={tx('Elige el ámbito y abre la categoría que necesitas.')}
        action={<ScopeSwitch scope={scope} onChange={next => setPrefs({ scope: next })} className="w-64" />}
      />
      <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
        {TRAMITES_CATEGORIES.map((cat, i) => (
          <CategoryCard key={`${cat.id}-${scope}`} category={cat} scope={scope} dark={i === 0} />
        ))}
      </div>
    </section>
  )
}

export function TramitesDashboardHome({ session }: { session: TramitesSession }) {
  return (
    <DashboardShell>
      <WelcomeHero session={session} />
      <KpiRow />
      <ActiveApplications />
      <TrackingRail />
      <CategoriesPanel />
    </DashboardShell>
  )
}

function PreviewSkeleton() {
  return (
    <div className="flex flex-col gap-gob-5">
      <div className="story-night h-48 rounded-gob-xl" />
      <div className="grid gap-gob-4 min-[600px]:grid-cols-2 min-[1240px]:grid-cols-4">
        {['Solicitudes activas', 'Por responder', 'Borradores guardados', 'Pagos pendientes'].map((l, i) => (
          <div key={l} className="space-y-gob-3 rounded-gob-lg border border-gob-border bg-card p-gob-5 shadow-elevation-02">
            <p className="text-gri-body-sm text-muted-foreground">{l}</p>
            <p className="font-heading text-[2rem] leading-none text-gob-text">{[3, 1, 3, 1][i]}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
        {TRAMITES_CATEGORIES.map(cat => (
          <div key={cat.id} className="h-40 rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-01">
            <p className="font-heading text-gri-h2 text-gob-text">{cat.label}</p>
            <div className="mt-gob-4 space-y-gob-2">
              <div className="h-3 w-3/4 rounded bg-gob-surface-elevated" />
              <div className="h-3 w-2/3 rounded bg-gob-surface-elevated" />
              <div className="h-3 w-1/2 rounded bg-gob-surface-elevated" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TramitesLockedDashboard() {
  const { tx } = useI18n()
  const router = useRouter()
  return (
    <DashboardShell>
      <div className="relative">
        <div aria-hidden inert className="pointer-events-none select-none blur-[6px] saturate-50">
          <PreviewSkeleton />
        </div>
        <div className="absolute inset-0 flex items-start justify-center bg-[var(--story-mist)]/40 px-gob-2 pt-gob-6 min-[905px]:pt-gob-10">
          <section
            aria-labelledby="tramites-login-title"
            className="w-full max-w-xl space-y-gob-5 rounded-gob-xl border border-gob-border bg-card p-gob-6 shadow-elevation-04 min-[905px]:p-gob-8"
          >
            <div className="flex items-center gap-gob-3">
              <span aria-hidden className="inline-flex size-11 items-center justify-center rounded-full bg-[var(--story-night)] text-white">
                <Lock className="size-5" />
              </span>
              <EyebrowPill>{tx('Acceso con clave')}</EyebrowPill>
            </div>
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
                <ClaveUnicaButton onClick={() => router.push('/tramites/clave-unica?next=/tramites')} />
                <Button asChild variant="outline" size="form">
                  <Link href="/tramites/ingresar">{tx('Ingresar con Clave INAPI')}</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </DashboardShell>
  )
}

export function CategoryView({ id }: { id: TramitesCategoryId }) {
  const { tx } = useI18n()
  const { scope, setPrefs } = useDashboardPrefs()
  const category = categoryById(id)
  if (!category) return null
  const others = TRAMITES_CATEGORIES.filter(c => c.id !== id)
  const groups = (scope === 'marcas' ? (['marcas', 'patentes'] as const) : (['patentes', 'marcas'] as const)).map(s => ({
    scope: s,
    items: categoryItems(id, s),
  }))
  return (
    <DashboardShell>
      <div className="flex flex-wrap items-center justify-between gap-gob-3">
        <p className="text-gri-body-sm text-muted-foreground">{tx('Primero ves los trámites del ámbito que elegiste.')}</p>
        <ScopeSwitch scope={scope} onChange={next => setPrefs({ scope: next })} className="w-64" />
      </div>
      {groups.map(group => (
        <section key={group.scope} aria-labelledby={`cat-${group.scope}`} className="space-y-gob-4">
          <h2 id={`cat-${group.scope}`} className="flex items-center gap-gob-2 font-heading text-gri-h2 font-medium text-gob-text">
            <span aria-hidden className={cn('size-2.5 rounded-full', group.scope === 'marcas' ? 'bg-gob-accent' : 'bg-gob-primary')} />
            {tx(group.scope === 'marcas' ? 'Marcas' : 'Patentes')}
            <span className="story-tabular text-gri-body-sm font-normal text-muted-foreground">({group.items.length})</span>
          </h2>
          <ul className="grid gap-gob-4 min-[600px]:grid-cols-2 min-[1240px]:grid-cols-3">
            {group.items.map((item, i) => {
              const featured = i === 0 && group.scope === scope
              const cls = cn(
                'group/card flex h-full min-h-[9rem] flex-col gap-gob-3 rounded-gob-xl p-gob-5 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                featured
                  ? 'story-night text-white shadow-elevation-03'
                  : 'border border-gob-border bg-card text-gob-text shadow-elevation-01 hover:shadow-elevation-03',
              )
              const inner = (
                <>
                  <span className="flex items-start justify-between gap-gob-3">
                    <span
                      aria-hidden
                      className={cn(
                        'inline-flex size-10 items-center justify-center rounded-gob-md [&_svg]:size-5',
                        featured ? 'bg-white/12 text-white' : 'bg-gob-primary/10 text-gob-primary-dark',
                      )}
                    >
                      {CATEGORY_ICONS[id]}
                    </span>
                    {item.external ? (
                      <ExternalLink className={cn('size-4', featured ? 'text-white/80' : 'text-muted-foreground')} aria-label={tx('Se abre en otra pestaña')} />
                    ) : (
                      <ArrowUpRight className={cn('size-4 transition-transform group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5', featured ? 'text-white/80' : 'text-muted-foreground')} aria-hidden />
                    )}
                  </span>
                  <span className="font-heading text-gri-body font-medium leading-snug">{tx(item.label)}</span>
                  <span className={cn('text-gri-body-sm leading-[1.5]', featured ? 'text-white/80' : 'text-muted-foreground')}>{tx(item.tooltip)}</span>
                </>
              )
              return (
                <li key={item.href + item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cls}
                      title={tx('Se abre en otra pestaña')}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={item.href} className={cls} title={tx('Puede pedirte ClaveÚnica o Clave INAPI')}>
                      {inner}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
      <nav aria-label={tx('Otras categorías')} className="rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-01">
        <p className="mb-gob-3 text-gri-body-sm font-semibold text-gob-text">{tx('Otras categorías')}</p>
        <ul className="grid gap-gob-2 min-[600px]:grid-cols-3">
          {others.map(cat => (
            <li key={cat.id}>
              <Link
                href={categoryHref(cat.id)}
                className="flex min-h-11 items-center gap-gob-3 rounded-gob-md px-gob-3 text-gri-body-sm font-medium text-gob-text hover:bg-gob-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus [&_svg]:size-4 [&_svg]:text-gob-text/70"
              >
                {CATEGORY_ICONS[cat.id]}
                {tx(cat.label)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </DashboardShell>
  )
}
