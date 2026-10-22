import Link from 'next/link'
import { citizenStatusLabel } from '@/lib/citizen-status'
import { cn } from '@/lib/utils'

export function StatusNotificationCard({
  solicitudId,
  signo,
  tipo,
  clases,
  fechaIngreso,
  estadoCodigo,
  descripcion,
  proximoPaso,
  ctas,
}: {
  solicitudId: string
  signo: string
  tipo: string
  clases?: number[]
  fechaIngreso: string
  estadoCodigo: string
  descripcion: string
  proximoPaso?: string
  ctas?: { label: string; href: string; variant?: 'primary' | 'secondary' }[]
}) {
  return (
    <article className="space-y-gob-4 rounded-gob-lg border border-gob-border bg-card p-gob-5 shadow-elevation-01">
      <header className="flex flex-wrap items-start justify-between gap-gob-3">
        <div>
          <p className="text-gri-body-xs text-muted-foreground">{solicitudId}</p>
          <h3 className="font-heading text-xl font-medium text-gob-text">{signo}</h3>
          <p className="text-gri-body-sm text-gob-text">
            {tipo}
            {clases?.length ? ` · clases ${clases.join(', ')}` : ''}
          </p>
        </div>
        <p className="rounded-gob-sm bg-gob-info-bg px-gob-3 py-gob-2 text-gri-body-sm font-medium text-gob-text">
          {citizenStatusLabel(estadoCodigo)}
        </p>
      </header>
      <p className="text-gri-body leading-relaxed text-gob-text">{descripcion}</p>
      {proximoPaso ? <p className="text-gri-body-sm text-gob-text">{proximoPaso}</p> : null}
      <p className="text-gri-body-xs text-muted-foreground">Ingresada el {fechaIngreso}</p>
      {ctas?.length ? (
        <div className="flex flex-wrap gap-gob-3">
          {ctas.map(cta => (
            <Link
              key={cta.href}
              href={cta.href}
              className={cn(
                'inline-flex min-h-11 items-center rounded-gob-md px-gob-4 text-gri-body-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                cta.variant === 'secondary'
                  ? 'border border-gob-border text-gob-text'
                  : 'bg-gob-primary text-gob-text-inverse',
              )}
            >
              {cta.label}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  )
}
