'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  AlarmClock,
  ArrowRight,
  ArrowUpRight,
  Bell,
  FileClock,
  FolderKanban,
  Lightbulb,
  PenLine,
  ShieldCheck,
  Tag,
  Wallet,
} from 'lucide-react'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
import { PlainTerm } from '@/components/GlosarioTerm'
import { CompactProcessTimeline } from '@/components/story/JourneyRail'
import { Button } from '@/components/ui/button'
import { useDashboardPrefs } from '@/hooks/useDashboardPrefs'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { nextAfterAuth } from '@/lib/tramites/entry'
import {
  BORRADORES_MARCA,
  BORRADORES_PATENTE,
  NOTIFICACIONES,
  PAGOS_PENDIENTES,
} from '@/lib/tramites/mock-data'
import type { TramitesDomain } from '@/lib/tramites/nav'
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

type HomeTab = 'activas' | 'responder' | 'borradores' | 'pagos'

function DomainTabs() {
  const { tx } = useI18n()
  const { scope, setPrefs } = useDashboardPrefs()
  const tabClass = (pressed: boolean, accent: 'marcas' | 'patentes') =>
    cn(
      'inline-flex min-h-11 shrink-0 items-center gap-gob-2 border-b-2 px-gob-4 text-gri-body-sm font-medium whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
      pressed
        ? accent === 'marcas'
          ? 'border-inapi-marcas-accent text-gob-text'
          : 'border-gob-primary text-gob-text'
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
  const first = session.nombre.split(' ')[0] || session.nombre
  return (
    <section aria-labelledby="dash-hello" className="space-y-gob-4">
      <h1 id="dash-hello" className="font-heading text-[1.75rem] font-medium leading-[1.15] text-gob-text min-[905px]:text-[2.125rem]">
        {tx('Hola,')} {first}
      </h1>
      <p className="max-w-2xl text-gri-body-sm leading-[1.55] text-muted-foreground">
        {tx('Desde aquí presentas solicitudes, pagas tasas y sigues tu')}{' '}
        <PlainTerm term="expediente">expediente</PlainTerm>. {tx('Empieza por lo que vence primero.')}
      </p>
      <DomainTabs />
    </section>
  )
}

function KpiTabs({ tab, onTab }: { tab: HomeTab; onTab: (id: HomeTab) => void }) {
  const { tx } = useI18n()
  const { scope } = useDashboardPrefs()
  const avisos = byScope(NOTIFICACIONES, scope)
  const responder = avisos.filter(n => n.tipo === 'Requerimiento')
  const drafts = byScope(BORRADORES, scope)
  const pagos = byScope(PAGOS_PENDIENTES, scope)
  const items: { id: HomeTab; value: number; label: string; icon: typeof FolderKanban }[] = [
    { id: 'activas', value: avisos.length, label: 'Solicitudes activas', icon: FolderKanban },
    { id: 'responder', value: responder.length, label: 'Por responder', icon: Bell },
    { id: 'borradores', value: drafts.length, label: 'Borradores', icon: FileClock },
    { id: 'pagos', value: pagos.length, label: 'Pagos pendientes', icon: Wallet },
  ]
  return (
    <div role="tablist" aria-label={tx('Resumen de tus trámites')} className="flex flex-nowrap overflow-x-auto border-b border-gob-border">
      {items.map(item => {
        const pressed = tab === item.id
        const Icon = item.icon
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={pressed}
            onClick={() => onTab(item.id)}
            className={cn(
              'inline-flex min-h-11 shrink-0 items-center gap-gob-2 border-b-2 px-gob-4 text-gri-body-sm font-medium whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
              pressed
                ? scope === 'marcas'
                  ? 'border-inapi-marcas-accent text-gob-text'
                  : 'border-gob-primary text-gob-text'
                : 'border-transparent text-muted-foreground hover:text-gob-text',
            )}
          >
            <Icon className="size-4" aria-hidden />
            <span className="font-heading font-semibold tabular-nums">{item.value}</span>
            {tx(item.label)}
          </button>
        )
      })}
    </div>
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

function stepsFor(tipo: string, dominio: TramitesDomain) {
  const marca = dominio === 'marcas'
  const current =
    tipo === 'Requerimiento' ? 'forma' : tipo === 'Publicación' ? 'publicacion' : tipo === 'Examen de fondo' ? 'fondo' : 'fondo'
  const mark = (id: string): 'done' | 'current' | 'pending' => {
    const order = ['ingreso', 'forma', 'publicacion', 'oposicion', 'fondo', 'resolucion']
    const cur = order.indexOf(current)
    const i = order.indexOf(id)
    if (i < cur) return 'done'
    if (i === cur) return 'current'
    return 'pending'
  }
  if (marca) {
    return [
      { title: 'Ingreso y pago inicial', body: 'Recibimos tu solicitud y el pago de la tasa.', status: mark('ingreso'), meta: '03-11-2025' },
      { title: 'Examen de forma', body: 'Revisamos que la solicitud esté completa.', status: mark('forma'), meta: '10-11-2025' },
      { title: 'Publicación en el Diario Oficial', body: 'Terceros pueden presentar oposición dentro del plazo legal.', status: mark('publicacion'), meta: '12-04-2026' },
      { title: 'Oposición', body: 'Si nadie se opone, el expediente sigue al examen de fondo.', status: mark('oposicion') },
      { title: 'Examen de fondo', body: 'INAPI revisa si tu marca cumple la ley.', status: mark('fondo') },
      { title: 'Resolución y certificado', body: 'Si se concede, pagas la tasa final y recibes el certificado.', status: mark('resolucion') },
    ]
  }
  return [
    { title: 'Ingreso y pago inicial', body: 'Recibimos tu solicitud y el pago de la tasa.', status: mark('ingreso'), meta: '18-05-2021' },
    { title: 'Examen de forma', body: 'Revisamos que la solicitud esté completa.', status: mark('forma'), meta: '02-06-2021' },
    { title: 'Publicación', body: 'La solicitud se publica para conocimiento de terceros.', status: mark('publicacion') },
    { title: 'Examen de fondo', body: 'INAPI analiza si tu invención puede registrarse.', status: mark('fondo'), meta: '18-05-2026' },
    { title: 'Resolución', body: 'INAPI concede o rechaza la solicitud.', status: mark('resolucion') },
    { title: 'Concesión y mantención', body: 'Si se concede, pagas derechos y mantienes la vigencia.', status: 'pending' as const },
  ]
}

function NextActionCard({ tab }: { tab: HomeTab }) {
  const { tx } = useI18n()
  const { scope } = useDashboardPrefs()
  const avisos = byScope(NOTIFICACIONES, scope)
  const responder = byScope(POR_RESPONDER, scope)
  const drafts = byScope(BORRADORES, scope)
  const pagos = byScope(PAGOS_PENDIENTES, scope)

  const emptyCopy: Record<HomeTab, string> = {
    activas: 'No tienes solicitudes activas en este ámbito.',
    responder: 'No hay requerimientos por responder.',
    borradores: 'No tienes borradores guardados.',
    pagos: 'No tienes pagos pendientes.',
  }

  const content =
    tab === 'responder' && responder[0]
      ? {
          title: `${tx('Responde el requerimiento de tu solicitud')} ${responder[0].numero}`,
          body: responder[0].resumen,
          href: responder[0].dominio === 'marcas' ? '/tramites/marcas/escritos' : '/tramites/patentes/escritos',
          cta: responder[0].dominio === 'marcas' ? 'Adjuntar documentos a tu solicitud de marca' : 'Adjuntar documentos a tu solicitud de patente',
        }
      : tab === 'pagos' && pagos[0]
        ? {
            title: `${tx('Paga la tasa pendiente')} ${pagos[0].numero}`,
            body: pagos[0].concepto,
            href: pagos[0].href,
            cta: 'Pagar ahora',
          }
        : tab === 'borradores' && drafts[0]
          ? {
              title: `${tx('Retoma el borrador')} ${drafts[0].signoOTitulo}`,
              body: `${tx('Vence')} ${drafts[0].vence}`,
              href: drafts[0].dominio === 'marcas' ? '/tramites/marcas/solicitudes-guardadas' : '/tramites/patentes/solicitudes-guardadas',
              cta: 'Retomar',
            }
          : tab === 'activas' && avisos[0]
            ? {
                title: `${tx('Revisa el estado de tu solicitud')} ${avisos[0].numero}`,
                body: avisos[0].resumen,
                href: `/tramites/notificaciones?ambito=${scope}`,
                cta:
                  avisos[0].tipo === 'Requerimiento'
                    ? scope === 'marcas'
                      ? 'Adjuntar documentos a tu solicitud de marca'
                      : 'Adjuntar documentos a tu solicitud de patente'
                    : 'Ver solicitudes',
              }
            : null

  if (!content) {
    return (
      <section aria-labelledby="dash-next" className="story-night rounded-gob-xl p-gob-6 text-white shadow-elevation-03">
        <p className="flex items-center gap-gob-2 text-gri-body-xs font-semibold tracking-[0.08em] text-white/80 uppercase">
          <AlarmClock className="size-4" aria-hidden />
          {tx('Próxima acción recomendada')}
        </p>
        <h2 id="dash-next" className="mt-gob-3 font-heading text-[1.5rem] font-medium leading-[1.3]">
          {tx(emptyCopy[tab])}
        </h2>
      </section>
    )
  }

  return (
    <section aria-labelledby="dash-next" className="story-night rounded-gob-xl p-gob-6 text-white shadow-elevation-03">
      <p className="flex items-center gap-gob-2 text-gri-body-xs font-semibold tracking-[0.08em] text-white/80 uppercase">
        <AlarmClock className="size-4" aria-hidden />
        {tx('Próxima acción recomendada')}
      </p>
      <h2 id="dash-next" className="mt-gob-3 font-heading text-[1.5rem] font-medium leading-[1.3]">
        {content.title}
      </h2>
      <p className="mt-gob-2 max-w-3xl text-gri-body-sm leading-[1.55] text-white/80">{tx(content.body)}</p>
      <Link
        href={content.href}
        className="mt-gob-4 inline-flex min-h-11 items-center gap-gob-2 rounded-full bg-white px-gob-5 text-gri-body-sm font-semibold text-[#092039] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
      >
        {tx(content.cta)}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </section>
  )
}

function TabResults({ tab }: { tab: HomeTab }) {
  const { tx } = useI18n()
  const { scope } = useDashboardPrefs()
  const avisos = byScope(NOTIFICACIONES, scope)
  const responder = byScope(POR_RESPONDER, scope)
  const drafts = byScope(BORRADORES, scope)
  const pagos = byScope(PAGOS_PENDIENTES, scope)
  const list = tab === 'responder' ? responder : tab === 'borradores' ? drafts : tab === 'pagos' ? pagos : avisos

  const heading =
    tab === 'responder'
      ? { title: 'Por responder', description: 'Estos trámites tienen un plazo abierto.', href: `/tramites/notificaciones?ambito=${scope}`, action: 'Ver todas' }
      : tab === 'borradores'
        ? {
            title: 'Borradores',
            description: 'Retoma un borrador. Se eliminan a los 60 días.',
            href: scope === 'marcas' ? '/tramites/marcas/solicitudes-guardadas' : '/tramites/patentes/solicitudes-guardadas',
            action: 'Empezar un trámite',
          }
        : tab === 'pagos'
          ? {
              title: 'Pagos pendientes',
              description: 'Paga las tasas que tienes abiertas.',
              href: scope === 'marcas' ? '/tramites/marcas/pagos' : '/tramites/patentes/pagos',
              action: 'Pagos',
            }
          : {
              title: 'Mis solicitudes activas',
              description: 'Abre una solicitud para ver las etapas del expediente.',
              href: `/tramites/notificaciones?ambito=${scope}`,
              action: 'Ver todas mis solicitudes',
            }

  return (
    <section aria-labelledby="dash-list" className="space-y-gob-4">
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
        {tab === 'activas' || tab === 'responder'
          ? (list as typeof avisos).map(n => (
              <li key={n.id} className="space-y-gob-4 rounded-gob-lg border-2 border-gob-border bg-card p-gob-5 shadow-elevation-01">
                <div className="flex flex-wrap items-start justify-between gap-gob-3">
                  <div className="min-w-0">
                    <p className="font-heading text-gri-body font-medium text-gob-text">{n.numero}</p>
                    <p className="text-gri-body-xs text-muted-foreground">{tx(n.resumen)}</p>
                  </div>
                  <StatusChip tipo={n.tipo} />
                </div>
                <CompactProcessTimeline label={tx('Etapas de la solicitud')} steps={stepsFor(n.tipo, n.dominio).map(s => ({ ...s, title: tx(s.title) }))} />
              </li>
            ))
          : null}
        {tab === 'borradores'
          ? (list as typeof drafts).map(d => (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-gob-3 rounded-gob-lg border-2 border-gob-border bg-card p-gob-5 shadow-elevation-01">
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
            ))
          : null}
        {tab === 'pagos'
          ? (list as typeof pagos).map(p => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-gob-3 rounded-gob-lg border-2 border-gob-border bg-card p-gob-5 shadow-elevation-01">
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
            ))
          : null}
      </ul>
    </section>
  )
}

export function TramitesDashboardHome({ session }: { session: TramitesSession }) {
  const [tab, setTab] = useState<HomeTab>('activas')
  return (
    <DashboardShell>
      <WelcomeBand session={session} />
      <KpiTabs tab={tab} onTab={setTab} />
      <NextActionCard tab={tab} />
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
