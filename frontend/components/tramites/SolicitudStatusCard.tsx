'use client'

import { useState } from 'react'
import { ChevronDown, ClipboardList, Clock, Info } from 'lucide-react'
import { CompactProcessTimeline, ExpedienteTimeline, type JourneyStep } from '@/components/story/JourneyRail'
import { HelperCard } from '@/components/tramites/TramitesExperience'
import { SeverityChip } from '@/components/tramites/SeverityChip'
import { AlertBanner } from '@/components/tramites/ui-helpers'
import type { Notificacion } from '@/lib/tramites/mock-data'
import {
  etapaDates,
  etapaLabel,
  formatEtapaDate,
  marcaTimeline,
  patenteTimeline,
  severityOf,
  toneAccent,
} from '@/lib/tramites/marca-etapas'
import { cn } from '@/lib/utils'

export function SolicitudStatusCard({
  n,
  defaultOpen = false,
}: {
  n: Notificacion
  featured?: boolean
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const [detail, setDetail] = useState(n.tone === 'required')
  const dates = etapaDates(n.presentacion, n.etapa, n.tone)
  const raw = n.dominio === 'marcas' ? marcaTimeline(n.etapa, n.tone) : patenteTimeline(n.etapa, n.tone)
  const steps = raw.map((step, i) => ({
    ...step,
    date: dates[i],
    flag: step.status === 'current' ? n.ultimaAccion : undefined,
  }))
  const accent = toneAccent(n.tone)
  const severity = severityOf(n)
  const doneAndCurrent = steps.filter(s => s.status === 'done' || s.status === 'current')

  return (
    <article className="overflow-hidden rounded-gob-xl border border-gob-border bg-card shadow-elevation-01">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="w-full space-y-gob-3 p-gob-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
      >
        <div className="flex flex-wrap items-start justify-between gap-gob-3">
          <SeverityChip severity={severity} />
          {n.tone === 'required' ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--story-night)] px-gob-3 py-1 text-gri-body-xs font-semibold text-white">
              <Clock className="size-3.5" aria-hidden />
              Plazo: {n.plazo}
            </span>
          ) : (
            <p className="text-gri-body-xs text-muted-foreground">Actualizado {formatEtapaDate(n.fecha)}</p>
          )}
        </div>
        <div>
          <h3 className="font-heading text-[1.35rem] font-medium leading-tight text-gob-text">{n.nombre}</h3>
          <p className="mt-1 text-gri-body-sm text-muted-foreground">
            #{n.numero} · {n.dominio === 'marcas' ? n.tipoDerecho : n.categoria}
          </p>
        </div>
        {open ? null : <CompactProcessTimeline label="Etapas de la solicitud" steps={steps} accent={accent} />}
        <div className="flex flex-wrap items-center justify-between gap-gob-3 border-t border-gob-border/70 pt-gob-3">
          <p className="text-gri-body-xs text-muted-foreground">
            N° solicitud #{n.numero}
            {n.presentacion ? ` · Presentada el ${formatEtapaDate(n.presentacion)}` : ''}
          </p>
          <span className="inline-flex items-center gap-2 text-gri-body-sm font-medium text-gob-primary-dark">
            {open ? 'Ocultar detalle' : 'Ver detalle informativo'}
            <ChevronDown className={cn('size-4 shrink-0 transition-transform', open && 'rotate-180')} />
          </span>
        </div>
      </button>
      {open ? (
        <SolicitudDetalle
          n={n}
          steps={steps}
          doneAndCurrent={doneAndCurrent}
          detail={detail}
          onDetail={() => setDetail(v => !v)}
          accent={accent}
        />
      ) : null}
    </article>
  )
}

function SolicitudDetalle({
  n,
  steps,
  doneAndCurrent,
  detail,
  onDetail,
  accent,
}: {
  n: Notificacion
  steps: JourneyStep[]
  doneAndCurrent: JourneyStep[]
  detail: boolean
  onDetail: () => void
  accent: 'danger' | 'info' | 'success'
}) {
  return (
    <div className="space-y-gob-4 border-t border-gob-border px-gob-5 pb-gob-5 pt-gob-4">
      <ExpedienteTimeline steps={steps} accent={accent} />

      <ol className="space-y-gob-3 border-l border-gob-border pl-gob-4">
        {doneAndCurrent.map(step => (
          <li key={step.title} className="relative">
            <span
              aria-hidden
              className={cn(
                'absolute -left-[1.35rem] top-1 size-2.5 rounded-full',
                step.status === 'done' ? 'bg-gob-success' : 'bg-gob-primary',
              )}
            />
            <p className="text-gri-body-xs text-muted-foreground">{step.date}</p>
            <p className="font-heading text-gri-body-sm font-semibold text-gob-text">{step.title}</p>
            {step.status === 'current' ? (
              <p className="text-gri-body-sm text-gob-text">
                Última acción: <em>«{n.ultimaAccion}»</em>
              </p>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="grid gap-gob-4 min-[905px]:grid-cols-12">
        <div className="min-[905px]:col-span-7">
          <button
            type="button"
            aria-expanded={detail}
            onClick={onDetail}
            className="flex min-h-11 w-full items-center justify-between rounded-gob-md border border-gob-border bg-gob-surface-elevated px-gob-4 text-left text-gri-body-sm text-gob-text"
          >
            <span>
              Detalle de la notificación
              <span className="text-muted-foreground"> · {etapaLabel(n.etapa)}</span>
            </span>
            <ChevronDown className={cn('size-4 transition-transform', detail && 'rotate-180')} />
          </button>
          {detail ? (
            <dl className="mt-gob-2 overflow-hidden rounded-gob-lg border border-gob-border bg-card text-gri-body-sm">
              {[
                ['Etapa actual', etapaLabel(n.etapa)],
                ['N° Solicitud', n.numero],
                ['Estado IPAS', n.estadoIpas],
                ['Estado unificado', n.estadoUnificado],
                ['Tipo de derecho', n.tipoDerecho],
                n.claseNiza ? ['Clasificación de Niza', n.claseNiza] : null,
                ['Última acción', n.ultimaAccion],
                n.accionUsuario ? ['Qué debes gestionar', n.accionUsuario] : null,
                ['Plazo', n.plazo],
                n.contacto ? ['Contacto', n.contacto] : null,
              ]
                .filter(Boolean)
                .map((row, i) => {
                  const [k, v] = row as [string, string]
                  return (
                    <div
                      key={k}
                      className={cn(
                        'grid gap-1 px-gob-4 py-gob-3 min-[700px]:grid-cols-2',
                        i % 2 === 1 && 'bg-muted/50',
                      )}
                    >
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd
                        className={cn(
                          'font-semibold text-gob-text',
                          k === 'Estado IPAS' && 'font-bold',
                          k === 'Plazo' && n.tone === 'required' && 'text-gob-warning',
                          k === 'Última acción' && 'font-normal italic',
                        )}
                      >
                        {k === 'Última acción' ? `«${v}»` : v}
                      </dd>
                    </div>
                  )
                })}
            </dl>
          ) : null}
        </div>

        <div className="min-[905px]:col-span-5">
          {n.tone === 'required' ? (
            <HelperCard tone="night" title="Qué debes hacer ahora">
              <p className="mb-gob-3 inline-flex items-center gap-gob-2 text-[0.6875rem] font-semibold tracking-[0.06em] text-white/80 uppercase">
                <ClipboardList className="size-4" aria-hidden />
                Tu próximo paso
              </p>
              <ol className="space-y-gob-3">
                {n.nextSteps.map((step, i) => (
                  <li key={step} className="flex gap-gob-3 text-gri-body-sm text-white">
                    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-gob-accent text-gri-body-xs font-semibold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </HelperCard>
          ) : (
            <HelperCard title="Qué implica este estado">
              <ol className="space-y-gob-2">
                {n.nextSteps.map(step => (
                  <li key={step} className="text-gri-body-sm text-gob-text">
                    {step}
                  </li>
                ))}
              </ol>
            </HelperCard>
          )}
        </div>
      </div>

      {n.tone === 'required' ? (
        <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
          <AlertBanner tone="warning">
            <p className="mb-1 font-semibold text-gob-text">Si no actúas a tiempo</p>
            {n.ifNoAct}
          </AlertBanner>
          <div className="rounded-gob-lg border border-gob-border bg-gob-surface-elevated p-gob-4 text-gri-body-sm text-gob-text">
            <p className="mb-1 inline-flex items-center gap-gob-2 font-semibold">
              <Info className="size-4" aria-hidden />
              Dónde presentar
            </p>
            <p>{n.dondePresentar}</p>
          </div>
        </div>
      ) : (
        <div className="rounded-gob-lg border border-gob-border bg-gob-surface-elevated p-gob-4 text-gri-body-sm text-gob-text">
          <p className="mb-1 inline-flex items-center gap-gob-2 font-semibold">
            <Info className="size-4" aria-hidden />
            Dónde presentar
          </p>
          <p>{n.dondePresentar}</p>
        </div>
      )}
    </div>
  )
}
