'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Table2 } from 'lucide-react'
import { STORY_PALETTE, type ChartKind, type ChartSeries } from '@/components/story/chart-palette'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

const ChartCanvas = dynamic(() => import('@/components/story/ChartCanvas').then(m => m.ChartCanvas), {
  ssr: false,
  loading: () => <div className="skeleton h-full w-full" aria-hidden />,
})

export type ChartView = {
  id: string
  label: string
  labels: string[]
  series: ChartSeries[]
  /** Texto central para doughnut (p. ej. "62 %"). */
  center?: { value: string; caption: string }
}

export function ChartCard({
  kind,
  title,
  description,
  views,
  tone = 'paper',
  unit,
  source,
  stacked,
  height = 260,
  className,
}: {
  kind: ChartKind
  title: string
  description?: string
  views: ChartView[]
  tone?: 'night' | 'paper'
  unit?: string
  source?: { label: string; href?: string }
  stacked?: boolean
  height?: number
  className?: string
}) {
  const { tx, locale } = useI18n()
  const [active, setActive] = useState(views[0]?.id)
  const view = views.find(v => v.id === active) ?? views[0]
  const night = tone === 'night'
  const palette = STORY_PALETTE[tone]
  const fmt = (n: number) => n.toLocaleString(locale === 'en' ? 'en-US' : 'es-CL')
  const doughnut = kind === 'doughnut'
  const legend = doughnut ? view.labels.map((l, i) => ({ label: l, value: view.series[0]?.data[i] ?? 0 })) : null

  return (
    <article
      className={cn(
        'flex h-full min-w-0 flex-col gap-gob-4 rounded-gob-xl p-gob-5 min-[905px]:p-gob-6',
        night ? 'border-2 border-white/20 bg-[#07182b]/85 text-white' : 'border-2 border-gob-border bg-card text-gob-text shadow-elevation-02',
        className,
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-gob-3">
        <div className="min-w-0 max-w-md space-y-gob-1">
          <h3 className={cn('font-heading text-gri-h2 font-medium leading-[1.35]', night ? 'text-white' : 'text-gob-text')}>{tx(title)}</h3>
          {description ? (
            <p className={cn('text-gri-body-sm leading-[1.55]', night ? 'text-white/78' : 'text-muted-foreground')}>{tx(description)}</p>
          ) : null}
        </div>
        {views.length > 1 ? (
          <div
            role="group"
            aria-label={tx('Elegir periodo')}
            className={cn('inline-flex rounded-full p-0.5', night ? 'border border-white/16 bg-white/5' : 'border border-gob-border bg-gob-surface-elevated')}
          >
            {views.map(v => (
              <button
                key={v.id}
                type="button"
                aria-pressed={v.id === view.id}
                onClick={() => setActive(v.id)}
                className={cn(
                  'story-tabular min-h-9 rounded-full px-gob-3 text-gri-body-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                  v.id === view.id
                    ? night
                      ? 'bg-white text-[#092039]'
                      : 'bg-card text-gob-text shadow-elevation-01'
                    : night
                      ? 'text-white/75 hover:text-white'
                      : 'text-muted-foreground hover:text-gob-text',
                )}
              >
                {tx(v.label)}
              </button>
            ))}
          </div>
        ) : null}
      </header>

      <div className={cn('relative grid min-w-0 flex-1 gap-gob-5', doughnut && 'min-[600px]:grid-cols-[auto_minmax(0,1fr)] min-[600px]:items-center')}>
        <div className={cn('relative min-w-0', doughnut && 'mx-auto size-[12rem]')} style={doughnut ? undefined : { height }}>
          <ChartCanvas
            key={view.id}
            kind={kind}
            labels={view.labels}
            series={view.series}
            tone={tone}
            unit={unit}
            stacked={stacked}
            ariaLabel={`${tx(title)}. ${tx('Datos en la tabla a continuación.')}`}
          />
          {doughnut && view.center ? (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center" aria-hidden>
              <span className="story-tabular font-heading text-[1.5rem] font-semibold leading-none">{view.center.value}</span>
              <span className={cn('mt-1 max-w-[7rem] text-[0.6875rem] leading-tight', night ? 'text-[#A1D1FF]' : 'text-muted-foreground')}>
                {tx(view.center.caption)}
              </span>
            </div>
          ) : null}
        </div>
        {legend ? (
          <ul className="flex flex-col gap-gob-2">
            {legend.map((item, i) => (
              <li key={item.label} className="flex items-center gap-gob-2 text-gri-body-sm">
                <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: palette[i % palette.length] }} />
                <span className={cn('flex-1', night ? 'text-white/82' : 'text-muted-foreground')}>{tx(item.label)}</span>
                <span className="story-tabular font-semibold">{fmt(item.value)}</span>
              </li>
            ))}
          </ul>
        ) : view.series.length > 1 ? (
          <ul className="flex flex-wrap gap-x-gob-4 gap-y-gob-2" aria-hidden>
            {view.series.map((s, i) => (
              <li key={s.label} className={cn('flex items-center gap-gob-2 text-gri-body-xs', night ? 'text-white/82' : 'text-muted-foreground')}>
                <span className="size-2.5 rounded-full" style={{ backgroundColor: s.color ?? palette[i % palette.length] }} />
                {tx(s.label)}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <details className="group/table">
        <summary
          className={cn(
            'inline-flex min-h-9 cursor-pointer list-none items-center gap-gob-2 rounded-full text-gri-body-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus [&::-webkit-details-marker]:hidden',
            night ? 'text-white/85 hover:text-white' : 'text-gob-link hover:text-gob-link-hover',
          )}
        >
          <Table2 className="size-4" aria-hidden />
          <span className="group-open/table:hidden">{tx('Ver los datos en tabla')}</span>
          <span className="hidden group-open/table:inline">{tx('Ocultar tabla')}</span>
        </summary>
        <div className="mt-gob-3 overflow-x-auto">
          <table className={cn('w-full text-left text-gri-body-sm', night ? 'text-white/90' : 'text-gob-text')}>
            <caption className="sr-only">{tx(title)}</caption>
            <thead>
              <tr className={night ? 'border-b border-white/15' : 'border-b border-gob-border'}>
                <th scope="col" className="py-gob-2 pr-gob-4 font-semibold">
                  {doughnut ? tx('Categoría') : tx('Periodo')}
                </th>
                {view.series.map(s => (
                  <th key={s.label} scope="col" className="py-gob-2 pr-gob-4 text-right font-semibold">
                    {tx(s.label)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {view.labels.map((l, row) => (
                <tr key={l} className={night ? 'border-b border-white/8' : 'border-b border-gob-border/60'}>
                  <th scope="row" className="py-gob-2 pr-gob-4 font-normal">
                    {tx(l)}
                  </th>
                  {view.series.map(s => (
                    <td key={s.label} className="story-tabular py-gob-2 pr-gob-4 text-right">
                      {fmt(s.data[row] ?? 0)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      {source ? (
        <p className={cn('text-gri-body-xs', night ? 'text-white/88' : 'text-muted-foreground')}>
          {tx('Fuente:')}{' '}
          {source.href ? (
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn('underline underline-offset-2', night ? 'text-white/85 hover:text-white' : 'text-gob-link')}
            >
              {tx(source.label)}
            </a>
          ) : (
            tx(source.label)
          )}
        </p>
      ) : null}
    </article>
  )
}
