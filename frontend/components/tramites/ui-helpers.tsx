import Link from 'next/link'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TramitesMain({ children }: { children: React.ReactNode }) {
  return (
    <ContainerGRI size="portal" className="py-gob-6 space-y-gob-6">
      {children}
    </ContainerGRI>
  )
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-gob-3 text-gri-body text-gob-text border border-gob-info/30 rounded-gob-md px-gob-4 py-gob-4 bg-gob-info-bg">
      <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gob-info text-white text-gri-body-xs font-bold" aria-hidden>
        i
      </span>
      <span>{children}</span>
    </p>
  )
}

export function selectClass(disabled?: boolean) {
  return cn(
    'w-full h-11 min-h-11 px-gob-3 border border-gob-border rounded-md bg-gob-surface text-gri-body-sm outline-none transition-colors duration-150',
    'hover:border-gob-primary/50 focus-visible:ring-2 focus-visible:ring-gob-focus',
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none bg-muted',
  )
}

export function Spinner({ label = 'Cargando' }: { label?: string }) {
  return (
    <p className="flex items-center gap-gob-3 text-gri-body text-muted-foreground" role="status" aria-live="polite">
      <LoaderCircle className="size-5 animate-spin text-gob-primary" aria-hidden />
      {label}…
    </p>
  )
}

export function ServicePanel({
  title,
  domain,
  children,
}: {
  title: string
  domain: 'marcas' | 'patentes'
  children: React.ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-gob-lg border border-gob-border bg-card shadow-elevation-02">
      <h2
        className={cn(
          'px-gob-5 py-gob-3 font-heading text-gri-body font-medium text-white',
          domain === 'marcas' ? 'bg-[#3d5a80]' : 'bg-gob-accent',
        )}
      >
        {title}
      </h2>
      <div className="space-y-gob-5 p-gob-5">{children}</div>
    </section>
  )
}

export function AlertBanner({
  tone = 'info',
  children,
}: {
  tone?: 'info' | 'warning'
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-gob-md border px-gob-4 py-gob-3 text-gri-body-sm leading-relaxed',
        tone === 'warning'
          ? 'border-gob-warning/30 bg-gob-warning-bg text-gob-text'
          : 'border-gob-info/30 bg-gob-info-bg text-gob-text',
      )}
      role="status"
    >
      {children}
    </div>
  )
}

export function ScopeTabs({
  current,
  marcasHref,
  patentesHref,
}: {
  current: 'marcas' | 'patentes'
  marcasHref: string
  patentesHref: string
}) {
  const tab = (id: 'marcas' | 'patentes', href: string, label: string) => (
    <Link
      href={href}
      className={cn(
        'rounded-t-md px-gob-4 py-gob-2 text-gri-body-sm font-medium transition-colors duration-150',
        current === id
          ? 'bg-[#3d5a80] text-white'
          : 'bg-white text-gob-text hover:bg-gob-surface-elevated',
      )}
    >
      {label}
    </Link>
  )
  return (
    <div className="flex gap-px" role="tablist" aria-label="Ámbito">
      {tab('marcas', marcasHref, 'Marcas')}
      {tab('patentes', patentesHref, 'Patentes')}
    </div>
  )
}

export function StepSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-gob-4 rounded-gob-lg border border-gob-border bg-card p-gob-5 shadow-elevation-01">
      <header className="space-y-gob-2 border-b border-gob-border pb-gob-3">
        <h2 className="font-heading text-xl font-medium text-gob-text">{title}</h2>
        {description ? <p className="text-gri-body-sm leading-relaxed text-gob-text">{description}</p> : null}
      </header>
      {children}
    </section>
  )
}

export function RequiredMark() {
  return (
    <span className="text-gob-text" aria-hidden>
      (*)
    </span>
  )
}

export function FileField({
  label,
  description,
  tooltip,
  fileName,
  onFile,
  tone = 'plain',
}: {
  label: string
  description: string
  tooltip?: string
  fileName?: string
  onFile: (name: string) => void
  tone?: 'plain' | 'soft' | 'strong'
}) {
  const tones = {
    plain: 'border-gob-border bg-card',
    soft: 'border-gob-primary/25 bg-gob-primary/5',
    strong: 'border-gob-accent/30 bg-gob-accent/5',
  }
  return (
    <div className={cn('space-y-gob-3 rounded-gob-md border p-gob-5 text-center', tones[tone])}>
      <div className="flex items-center justify-center gap-gob-2">
        <p className="font-heading text-gri-body font-medium text-gob-text">{label}</p>
        {tooltip ? <HelpTooltip text={tooltip} /> : null}
      </div>
      <p className="text-gri-body-sm leading-relaxed text-gob-text">{description}</p>
      <label className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-gob-md border border-gob-border bg-white px-gob-5 text-gri-body-sm font-medium hover:bg-gob-surface-elevated">
        Seleccionar archivo
        <input
          type="file"
          className="sr-only"
          onChange={e => {
            const name = e.target.files?.[0]?.name
            if (name) onFile(name)
          }}
        />
      </label>
      <p className="text-gri-body-sm text-muted-foreground">{fileName || 'Ningún archivo seleccionado'}</p>
    </div>
  )
}
