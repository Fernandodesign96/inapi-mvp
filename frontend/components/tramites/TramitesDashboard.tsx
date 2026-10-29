'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowUpRight,
  Bell,
  CheckCircle2,
  FileClock,
  FolderKanban,
  Lightbulb,
  PenLine,
  Search,
  ShieldCheck,
  Tag,
  Wallet,
} from 'lucide-react'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
import { Button } from '@/components/ui/button'
import { ChartCanvas } from '@/components/story/ChartCanvas'
import { KpiStatCard } from '@/components/tramites/KpiStatCard'
import { SolicitudStatusCard } from '@/components/tramites/SolicitudStatusCard'
import { ControlChip, ControlChipRow, PaperPanel } from '@/components/tramites/TramitesExperience'
import { AlertBanner } from '@/components/tramites/ui-helpers'
import { useTheme } from '@/components/theme/ThemeProvider'
import { useDashboardPrefs } from '@/hooks/useDashboardPrefs'
import { useSolicitudes } from '@/hooks/useSolicitudes'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { MARCA_ETAPAS, severityLabel, severityOf } from '@/lib/tramites/marca-etapas'
import { nextAfterAuth } from '@/lib/tramites/entry'
import {
  BORRADORES_MARCA,
  BORRADORES_PATENTE,
  pagosForRun,
} from '@/lib/tramites/mock-data'
import type { TramitesDomain } from '@/lib/tramites/nav'
import type { TramitesSession } from '@/lib/tramites/session'
import { cn } from '@/lib/utils'

const BORRADORES = [...BORRADORES_MARCA, ...BORRADORES_PATENTE]

function byScope<T extends { dominio: TramitesDomain }>(items: T[], scope: TramitesDomain) {
  return items.filter(item => item.dominio === scope)
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

type HomeTab = 'proceso' | 'accion' | 'finalizadas' | 'borradores' | 'pagos'

function DomainTabs() {
  const { tx } = useI18n()
  const { scope, setPrefs } = useDashboardPrefs()
  const tabClass = (pressed: boolean, accent: 'marcas' | 'patentes') =>
    cn(
      'inline-flex min-h-11 shrink-0 items-center gap-gob-2 border-b-2 px-gob-4 text-gri-body-sm font-medium whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
      pressed
        ? accent === 'marcas'
          ? 'border-inapi-marcas-accent bg-inapi-marcas-surface text-gob-text'
          : 'border-gob-primary bg-gob-primary/10 text-gob-primary-dark dark:text-white dark:bg-gob-primary/25'
        : 'border-transparent text-muted-foreground hover:text-gob-text',
    )
  return (
    <div role="tablist" aria-label={tx('Ámbito')} className="flex border-b border-gob-border">
      <button type="button" role="tab" aria-selected={scope === 'marcas'} className={tabClass(scope === 'marcas', 'marcas')} onClick={() => setPrefs({ scope: 'marcas' })}>
        <Tag className="size-4" aria-hidden />
        {tx('Marcas')}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={scope === 'patentes'}
        className={tabClass(scope === 'patentes', 'patentes')}
        onClick={() => setPrefs({ scope: 'patentes' })}
      >
        <Lightbulb className="size-4" aria-hidden />
        {tx('Patentes')}
      </button>
    </div>
  )
}

function WelcomeBand({ session }: { session: TramitesSession }) {
  const { tx } = useI18n()
  const { persona } = useSolicitudes()
  const first = session.nombre.split(' ')[0] || session.nombre
  return (
    <section aria-labelledby="dash-hello" className="space-y-gob-4">
      <h1 id="dash-hello" className="font-heading text-[1.75rem] font-medium leading-[1.15] text-gob-text min-[905px]:text-[2.125rem]">
        {tx('Hola,')} {first}
      </h1>
      <p className="w-full text-gri-body-sm leading-[1.55] text-muted-foreground">
        {persona === 'nuevo'
          ? tx('Consulta avisos y el detalle de tus trámites. Las gestiones pendientes se realizan en los canales oficiales de INAPI.')
          : tx('Tienes novedades en tus trámites. Abre una solicitud para ver el estado y los pasos informativos.')}
      </p>
      {persona === 'nuevo' ? null : <DomainTabs />}
    </section>
  )
}

function PortfolioOverview({ tab, onTab }: { tab: HomeTab; onTab: (id: HomeTab) => void }) {
  const { tx } = useI18n()
  const { resolvedTheme } = useTheme()
  const { scope } = useDashboardPrefs()
  const { items: solicitudes, session } = useSolicitudes()
  const avisos = byScope(solicitudes, scope)
  const accion = avisos.filter(n => n.tone === 'required')
  const proceso = avisos.filter(n => n.tone !== 'registered' && n.tone !== 'closed')
  const done = avisos.filter(n => n.tone === 'registered' || n.tone === 'closed')
  const drafts = byScope(BORRADORES, scope)
  const pagos = byScope(pagosForRun(session.run), scope)
  const total = Math.max(avisos.length, 1)
  const chartTone = resolvedTheme === 'dark' ? 'night' : 'paper'
  const etapaCounts = MARCA_ETAPAS.map(etapa => avisos.filter(n => n.etapa === etapa.id).length)
  const severities = ['critical', 'action', 'review', 'watch', 'success', 'closed'] as const
  const severityCounts = severities.map(id => avisos.filter(n => severityOf(n) === id).length)
  const kpis: { id: HomeTab; value: number; label: string; icon: ReactNode; tone: 'neutral' | 'warning' | 'success' | 'info' }[] = [
    { id: 'proceso', value: proceso.length, label: 'En proceso', icon: <FolderKanban />, tone: 'info' },
    { id: 'accion', value: accion.length, label: 'Acción requerida', icon: <Bell />, tone: 'warning' },
    { id: 'finalizadas', value: done.length, label: 'Finalizadas', icon: <CheckCircle2 />, tone: 'success' },
    { id: 'borradores', value: drafts.length, label: 'Borradores', icon: <FileClock />, tone: 'neutral' },
    { id: 'pagos', value: pagos.length, label: 'Pagos pendientes', icon: <Wallet />, tone: 'warning' },
  ]
  return (
    <div className="space-y-gob-4">
      {accion.length > 0 ? (
        <AlertBanner tone="warning">
          <p className="font-semibold">{tx('Tienes plazos abiertos')}</p>
          <p>
            {accion.length} {accion.length === 1 ? tx('solicitud pide una gestión en los canales oficiales de INAPI.') : tx('solicitudes piden una gestión en los canales oficiales de INAPI.')}
          </p>
        </AlertBanner>
      ) : null}
      <div className="grid gap-gob-3 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-5">
        {kpis.map(item => (
          <KpiStatCard
            key={item.id}
            label={tx(item.label)}
            value={item.value}
            hint={`${Math.round((item.value / total) * 100)}% ${tx('del ámbito')}`}
            icon={item.icon}
            pressed={tab === item.id}
            onClick={() => onTab(item.id)}
            tone={item.tone}
          />
        ))}
      </div>
      <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
        <PaperPanel className="space-y-gob-3">
          <h2 className="font-heading text-gri-body-sm font-semibold text-gob-text">{tx('Solicitudes por etapa')}</h2>
          <div className="mx-auto h-48 max-w-xs">
            <ChartCanvas
              kind="doughnut"
              labels={MARCA_ETAPAS.map(e => e.title)}
              series={[{ label: tx('Solicitudes'), data: etapaCounts }]}
              tone={chartTone}
              ariaLabel={tx('Solicitudes por etapa')}
            />
          </div>
        </PaperPanel>
        <PaperPanel className="space-y-gob-3">
          <h2 className="font-heading text-gri-body-sm font-semibold text-gob-text">{tx('Solicitudes por severidad')}</h2>
          <div className="h-48">
            <ChartCanvas
              kind="bar"
              labels={severities.map(severityLabel)}
              series={[{ label: tx('Solicitudes'), data: severityCounts }]}
              tone={chartTone}
              ariaLabel={tx('Solicitudes por severidad')}
            />
          </div>
        </PaperPanel>
      </div>
    </div>
  )
}

function NewUserSolicitudes() {
  const { tx } = useI18n()
  const [filter, setFilter] = useState<'todas' | 'marcas' | 'patentes' | 'disenos'>('todas')
  const chip = (id: 'todas' | 'marcas' | 'patentes' | 'disenos', label: string) => (
    <ControlChip pressed={filter === id} accent="neutral" onClick={() => setFilter(id)}>
      {tx(label)}
    </ControlChip>
  )
  return (
    <section className="space-y-gob-5">
      <div>
        <h2 className="font-heading text-[1.75rem] font-medium text-gob-text">{tx('Seguimiento de tus solicitudes')}</h2>
        <p className="mt-1 text-gri-body-sm text-muted-foreground">{tx('Revisa el estado de tus registros en tiempo real')}</p>
      </div>
      <ControlChipRow label="Ámbito">
        {chip('todas', 'Todas')}
        {chip('marcas', 'Marcas')}
        {chip('patentes', 'Patentes')}
        {chip('disenos', 'Diseños')}
      </ControlChipRow>
      <div className="flex flex-col items-center gap-gob-3 py-gob-10 text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Search className="size-7" aria-hidden />
        </span>
        <h3 className="font-heading text-gri-h2 font-medium text-gob-text">{tx('Por el momento no tienes registrada ninguna solicitud en INAPI')}</h3>
        <p className="max-w-md text-gri-body-sm text-muted-foreground">
          {tx('No hemos encontrado ninguna solicitud asociada a tu usuario. Puedes comenzar una nueva solicitud haciendo')}{' '}
          <Link href="/tramites/marcas/solicitar" className="font-medium text-gob-link underline underline-offset-4">
            {tx('click aquí')}
          </Link>
          .
        </p>
      </div>
    </section>
  )
}

function TabResults({ tab }: { tab: HomeTab }) {
  const { tx } = useI18n()
  const { scope } = useDashboardPrefs()
  const { items, persona, session } = useSolicitudes()
  const avisos = byScope(items, scope)
  const list =
    tab === 'accion'
      ? avisos.filter(n => n.tone === 'required')
      : tab === 'finalizadas'
        ? avisos.filter(n => n.tone === 'registered' || n.tone === 'closed')
        : tab === 'borradores'
          ? byScope(BORRADORES, scope)
          : tab === 'pagos'
            ? byScope(pagosForRun(session.run), scope)
            : avisos.filter(n => n.tone !== 'registered' && n.tone !== 'closed')
  const featured = avisos.find(n => n.tone === 'required') ?? avisos[0]
  const headings: Record<HomeTab, { title: string; description: string; href: string; action: string }> = {
    proceso: {
      title: 'Mis solicitudes',
      description: 'Abre una solicitud para ver las etapas y el detalle informativo. No redirige a otra pantalla.',
      href: `/tramites/notificaciones?ambito=${scope}`,
      action: 'Ver todas mis solicitudes',
    },
    accion: {
      title: 'Acción requerida',
      description: 'Estos trámites tienen un plazo abierto en IPAS.',
      href: `/tramites/notificaciones?ambito=${scope}`,
      action: 'Ver todas',
    },
    finalizadas: {
      title: 'Finalizadas',
      description: 'Registros concedidos. Desde aquí puedes renovar o anotar cambios.',
      href: `/tramites/notificaciones?ambito=${scope}`,
      action: 'Ver todas',
    },
    borradores: {
      title: 'Borradores',
      description: 'Retoma un borrador. Se eliminan a los 60 días.',
      href: scope === 'marcas' ? '/tramites/marcas/solicitudes-guardadas' : '/tramites/patentes/solicitudes-guardadas',
      action: 'Empezar un trámite',
    },
    pagos: {
      title: 'Pagos pendientes',
      description: 'Paga las tasas que tienes abiertas.',
      href: scope === 'marcas' ? '/tramites/marcas/pagos' : '/tramites/patentes/pagos',
      action: 'Pagos',
    },
  }
  const heading = headings[tab]
  const showCards = tab === 'proceso' || tab === 'accion' || tab === 'finalizadas'

  if (persona === 'nuevo') return <NewUserSolicitudes />

  return (
    <section aria-labelledby="dash-list" className="space-y-gob-4">
      {tab === 'proceso' && featured ? <SolicitudStatusCard n={featured} defaultOpen={featured.id === 'eco'} /> : null}
      <SectionHeading
        id="dash-list"
        title={tx(heading.title)}
        description={tx(heading.description)}
        action={
          <Link href={heading.href} className="inline-flex min-h-11 items-center gap-1 text-gri-body-sm font-medium text-gob-link hover:underline">
            {tx(heading.action)}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        }
      />
      {list.length === 0 ? <p className="text-gri-body-sm text-muted-foreground">{tx('No hay trámites en esta pestaña.')}</p> : null}
      <ul className="space-y-gob-3">
        {showCards
          ? (list as typeof avisos).filter(n => !(tab === 'proceso' && n.id === featured?.id)).map(n => (
              <li key={n.id}>
                <SolicitudStatusCard n={n} />
              </li>
            ))
          : null}
        {tab === 'borradores'
          ? (list as typeof BORRADORES).map(d => (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-gob-3 rounded-gob-lg border border-gob-border bg-card p-gob-5">
                <span className="min-w-0">
                  <span className="block font-heading text-gri-body-sm font-medium text-gob-text">{d.signoOTitulo}</span>
                  <span className="block text-gri-body-xs text-muted-foreground">
                    {d.id} · {tx('Vence')} {d.vence}
                  </span>
                </span>
                <Link
                  href={d.dominio === 'marcas' ? '/tramites/marcas/solicitudes-guardadas' : '/tramites/patentes/solicitudes-guardadas'}
                  className="inline-flex min-h-9 items-center rounded-full border border-gob-border px-gob-3 text-gri-body-xs font-semibold text-gob-text hover:border-gob-primary"
                >
                  {tx('Retomar')}
                </Link>
              </li>
            ))
          : null}
        {tab === 'pagos'
          ? (list as ReturnType<typeof pagosForRun>).map(p => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-gob-3 rounded-gob-lg border border-gob-border bg-card p-gob-5">
                <span className="min-w-0">
                  <span className="block font-heading text-gri-body-sm font-medium text-gob-text">{p.numero}</span>
                  <span className="block text-gri-body-xs text-muted-foreground">{tx(p.concepto)}</span>
                </span>
                <Link href={p.href} className="inline-flex min-h-9 items-center rounded-full bg-[var(--story-night)] px-gob-3 text-gri-body-xs font-semibold text-white">
                  {tx('Pagar ahora')}
                </Link>
              </li>
            ))
          : null}
      </ul>
    </section>
  )
}

export function TramitesDashboardHome({ session }: { session: TramitesSession }) {
  const [tab, setTab] = useState<HomeTab>('proceso')
  const { persona } = useSolicitudes()
  return (
    <DashboardShell>
      <WelcomeBand session={session} />
      {persona === 'nuevo' ? null : <PortfolioOverview tab={tab} onTab={setTab} />}
      <TabResults tab={tab} />
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
