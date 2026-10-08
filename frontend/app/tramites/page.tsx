'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Bell,
  BookOpen,
  ChevronDown,
  CreditCard,
  FileSearch,
  FileText,
  FolderOpen,
  Landmark,
  LayoutGrid,
  PenLine,
  Scale,
  Search,
  Stamp,
  Wallet,
} from 'lucide-react'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
import { Button } from '@/components/ui/button'
import { TipWrap } from '@/components/tramites/HelpTooltip'
import { Spinner, TramitesMain } from '@/components/tramites/ui-helpers'
import { MARCAS_MEGA, PATENTES_MEGA, type MegaColumn, type MegaItem } from '@/lib/tramites/nav'
import { useTramitesSession } from '@/lib/tramites/use-session'
import { cn } from '@/lib/utils'

const PRIMARY_MARCAS = [
  { href: '/tramites/marcas/solicitar', label: 'Solicitar marca', icon: Stamp, tooltip: 'Inicia una solicitud nueva de marca' },
  { href: '/marcas/buscador-similitud', label: 'Buscador de marcas', icon: Search, tooltip: 'Compara tu nombre con marcas anteriores' },
  { href: '/tramites/marcas/documentos', label: 'Expediente digital', icon: FolderOpen, tooltip: 'Abre el expediente de una marca' },
  { href: '/tramites/notificaciones?ambito=marcas', label: 'Notificaciones', icon: Bell, tooltip: 'Revisa avisos de tus trámites de marcas' },
]

const PRIMARY_PATENTES = [
  { href: '/tramites/patentes/solicitar', label: 'Solicitar patente', icon: FileText, tooltip: 'Inicia una solicitud de patente o modelo' },
  { href: '/tramites/patentes/solicitar-diseno', label: 'Solicitar diseño', icon: Landmark, tooltip: 'Inicia un diseño o dibujo industrial' },
  { href: '/tramites/patentes/buscador', label: 'Buscador de patentes', icon: Search, tooltip: 'Busca patentes, modelos y diseños' },
  { href: '/tramites/patentes/solicitudes-guardadas', label: 'Solicitudes guardadas', icon: FileSearch, tooltip: 'Retoma un borrador de patente' },
]

const COL_ICON: Record<string, typeof Stamp> = {
  'Mi INAPI': LayoutGrid,
  Tramitación: PenLine,
  Pagos: Wallet,
  Servicios: BookOpen,
}

function ShortcutGlyph({ label }: { label: string }) {
  const key = label.toLowerCase()
  const className = 'size-4'
  if (key.includes('notif')) return <Bell className={className} aria-hidden />
  if (key.includes('busc')) return <Search className={className} aria-hidden />
  if (key.includes('exped')) return <FolderOpen className={className} aria-hidden />
  if (key.includes('pago') || key.includes('comprob')) return <CreditCard className={className} aria-hidden />
  if (key.includes('solicitar')) return <Stamp className={className} aria-hidden />
  if (key.includes('escrito') || key.includes('anot')) return <FileText className={className} aria-hidden />
  if (key.includes('legal') || key.includes('oposic')) return <Scale className={className} aria-hidden />
  return <FileSearch className={className} aria-hidden />
}

function ShortcutLink({
  item,
  accent,
}: {
  item: MegaItem
  accent: 'marcas' | 'patentes'
}) {
  const className = cn(
    'flex min-h-[4.5rem] items-center gap-gob-3 rounded-gob-lg border bg-white px-gob-4 py-gob-3 text-gri-body-sm text-gob-text shadow-elevation-01 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-elevation-03 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
    accent === 'marcas' ? 'border-gob-accent/20 hover:border-gob-accent' : 'border-gob-primary/20 hover:border-gob-primary',
  )
  const iconWrap = (
    <span className={cn('inline-flex size-9 items-center justify-center rounded-gob-md text-white', accent === 'marcas' ? 'bg-gob-accent' : 'bg-gob-primary')}>
      <ShortcutGlyph label={item.label} />
    </span>
  )
  if (item.external) {
    return (
      <TipWrap text={item.tooltip}>
        <a href={item.href} className={className} rel="noopener noreferrer">
          {iconWrap}
          <span className="font-medium leading-snug">{item.label}</span>
        </a>
      </TipWrap>
    )
  }
  return (
    <TipWrap text={item.tooltip}>
      <Link href={item.href} className={className}>
        {iconWrap}
        <span className="font-medium leading-snug">{item.label}</span>
      </Link>
    </TipWrap>
  )
}

function PrimaryCards({
  items,
  accent,
}: {
  items: typeof PRIMARY_MARCAS
  accent: 'marcas' | 'patentes'
}) {
  return (
    <ul className="grid gap-gob-3 min-[600px]:grid-cols-2 min-[905px]:grid-cols-4">
      {items.map(item => {
        const Icon = item.icon
        return (
          <li key={item.href}>
            <TipWrap text={item.tooltip}>
              <Link
                href={item.href}
                className={cn(
                  'flex min-h-[7rem] flex-col gap-gob-3 rounded-gob-lg border border-gob-border bg-card p-gob-4 shadow-elevation-01 transition-all duration-150 hover:shadow-elevation-03 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                  accent === 'marcas' ? 'hover:border-gob-accent' : 'hover:border-gob-primary',
                )}
              >
                <span
                  className={cn(
                    'inline-flex size-10 items-center justify-center rounded-gob-md text-white',
                    accent === 'marcas' ? 'bg-gob-accent' : 'bg-gob-primary',
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="font-medium text-gri-body text-gob-text">{item.label}</span>
              </Link>
            </TipWrap>
          </li>
        )
      })}
    </ul>
  )
}

function AccordionColumns({
  columns,
  accent,
  excludeHrefs,
}: {
  columns: MegaColumn[]
  accent: 'marcas' | 'patentes'
  excludeHrefs: string[]
}) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="space-y-gob-3">
      {columns.map((col, i) => {
        const items = col.items.filter(item => !excludeHrefs.includes(item.href.split('?')[0]))
        if (items.length === 0) return null
        const isOpen = open === col.title
        const Icon = COL_ICON[col.title] ?? LayoutGrid
        return (
          <section
            key={col.title}
            className={cn(
              'overflow-hidden rounded-gob-lg border bg-card shadow-elevation-01 transition-shadow hover:shadow-elevation-02',
              i === 0 ? 'border-gob-primary/30' : 'border-gob-border',
            )}
          >
            <button
              type="button"
              className={cn(
                'flex w-full min-h-14 items-center gap-gob-3 px-gob-4 py-gob-3 text-left',
                isOpen ? 'bg-gob-surface-elevated' : 'hover:bg-gob-surface-elevated/70',
              )}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : col.title)}
            >
              <span
                className={cn(
                  'inline-flex size-10 items-center justify-center rounded-gob-md text-white',
                  accent === 'marcas' ? 'bg-gob-accent' : 'bg-gob-primary',
                )}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block font-heading text-gri-body font-medium">{col.title}</span>
                <span className="block text-gri-body-xs text-muted-foreground">{items.length} accesos</span>
              </span>
              <ChevronDown className={cn('size-5 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
            </button>
            {isOpen ? (
              <ul className="grid gap-gob-3 border-t border-gob-border bg-gob-surface-elevated/40 p-gob-4 min-[600px]:grid-cols-2 min-[905px]:grid-cols-3">
                {items.map(item => (
                  <li key={item.href + item.label}>
                    <ShortcutLink item={item} accent={accent} />
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        )
      })}
    </div>
  )
}

export default function TramitesHomePage() {
  const { session, ready } = useTramitesSession()
  const router = useRouter()

  if (!ready) {
    return (
      <TramitesMain>
        <Spinner label="Cargando tu sesión" />
      </TramitesMain>
    )
  }

  if (session.authenticated) {
    return (
      <TramitesMain>
        <div className="space-y-gob-2">
          <h1 className="font-heading text-gri-h2 font-medium text-gob-text">Hola, {session.nombre.split(' ')[0]}</h1>
          <p className="text-gri-body text-gob-text max-w-3xl leading-relaxed">
            Desde aquí puedes solicitar marcas y patentes, pagar tasas, consultar expedientes, descargar estados diarios y
            presentar escritos. Empieza por un atajo frecuente o abre el resto de trámites cuando lo necesites.
          </p>
        </div>
        <section className="space-y-gob-5">
          <h2 className="font-heading text-xl font-medium text-gob-text border-l-4 border-gob-accent pl-gob-3">Marcas</h2>
          <PrimaryCards items={PRIMARY_MARCAS} accent="marcas" />
          <div className="pt-gob-2">
            <p className="mb-gob-3 text-gri-body-sm font-medium text-gob-text">Más trámites de marcas</p>
            <AccordionColumns
              columns={MARCAS_MEGA}
              accent="marcas"
              excludeHrefs={['/tramites/marcas/solicitar', '/marcas/buscador-similitud', '/tramites/marcas/documentos', '/tramites/notificaciones']}
            />
          </div>
        </section>
        <section className="space-y-gob-5 pt-gob-4">
          <h2 className="font-heading text-xl font-medium text-gob-text border-l-4 border-gob-primary pl-gob-3">Patentes</h2>
          <PrimaryCards items={PRIMARY_PATENTES} accent="patentes" />
          <div className="pt-gob-2">
            <p className="mb-gob-3 text-gri-body-sm font-medium text-gob-text">Más trámites de patentes</p>
            <AccordionColumns
              columns={PATENTES_MEGA}
              accent="patentes"
              excludeHrefs={[
                '/tramites/patentes/solicitar',
                '/tramites/patentes/solicitar-diseno',
                '/tramites/patentes/buscador',
                '/tramites/patentes/solicitudes-guardadas',
              ]}
            />
          </div>
        </section>
      </TramitesMain>
    )
  }

  return (
    <TramitesMain>
      <div className="grid gap-gob-6 min-[905px]:grid-cols-2">
        <section className="rounded-gob-lg border border-gob-border bg-card p-gob-6 space-y-gob-4">
          <h1 className="font-heading text-gri-h2 font-medium text-gob-text">Trámites en línea</h1>
          <p className="text-gri-body text-gob-text leading-relaxed">
            Desde aquí solicitas marcas y patentes, revisas notificaciones, abres tus documentos y pides certificados.
          </p>
          <ul className="list-disc pl-gob-5 text-gri-body text-gob-text space-y-gob-2">
            <li>Presentar una solicitud nueva</li>
            <li>Seguir un expediente ya ingresado</li>
            <li>Usar el Buscador de Marcas o el Buscador de Patentes</li>
          </ul>
        </section>
        <section className="rounded-gob-lg border border-gob-border bg-card p-gob-6 space-y-gob-4">
          <h2 className="font-heading text-xl font-medium text-gob-text">Inicia sesión</h2>
          <p className="text-gri-body-sm text-muted-foreground">
            Si es tu primera vez, valida tu identidad con ClaveÚnica. Después puedes entrar con ClaveÚnica o con Clave INAPI.
          </p>
          <TipWrap text="Valida tu identidad con ClaveÚnica para entrar a trámites.">
            <span className="block">
              <ClaveUnicaButton
                onClick={() => {
                  router.push('/tramites/clave-unica?next=/tramites')
                }}
              />
            </span>
          </TipWrap>
          <Button asChild variant="outline" size="form">
            <Link href="/tramites/ingresar">Ingresar con Clave INAPI</Link>
          </Button>
        </section>
      </div>
    </TramitesMain>
  )
}
