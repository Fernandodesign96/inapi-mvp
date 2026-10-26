'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TabStatus = 'idle' | 'active' | 'ok' | 'error'

export type StatusTab = {
  id: string
  label: string
  status: TabStatus
}

export function StatusTabs({
  tabs,
  current,
  onSelect,
  accent = 'marcas',
}: {
  tabs: StatusTab[]
  current: string
  onSelect: (id: string) => void
  accent?: 'marcas' | 'patentes'
}) {
  const index = Math.max(0, tabs.findIndex(t => t.id === current))
  const progress = tabs.length ? ((index + 1) / tabs.length) * 100 : 0
  const bar = accent === 'patentes' ? 'bg-gob-primary' : 'bg-gob-accent'
  const currentLabel = tabs[index]?.label

  return (
    <div className="space-y-gob-3 rounded-gob-xl border border-gob-border bg-card p-gob-4 shadow-elevation-01 min-[905px]:p-gob-5">
      <div className="flex flex-wrap items-end justify-between gap-gob-2">
        <p className="text-gri-body-xs text-muted-foreground">
          Paso {index + 1} de {tabs.length}
          {currentLabel ? <span className="font-medium text-gob-text"> · {currentLabel}</span> : null}
        </p>
        <p className="text-[0.6875rem] text-muted-foreground">{Math.round(progress)}%</p>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-gob-surface-elevated" aria-hidden>
        <div className={cn('h-full rounded-full transition-[width]', bar)} style={{ width: `${progress}%` }} />
      </div>
      <div role="tablist" aria-label="Etapas de la solicitud" className="flex gap-gob-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
        {tabs.map((tab, i) => {
          const selected = tab.id === current
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onSelect(tab.id)}
              className={cn(
                'inline-flex min-h-11 shrink-0 items-center gap-gob-2 rounded-gob-md px-gob-3 text-left text-gri-body-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                selected
                  ? 'bg-[var(--story-night)] text-white dark:bg-[#0F69C4]'
                  : 'text-muted-foreground hover:bg-gob-surface-elevated hover:text-gob-text',
              )}
            >
              <span
                className={cn(
                  'inline-flex size-6 items-center justify-center rounded-full text-[0.6875rem] font-semibold',
                  selected
                    ? 'bg-white text-[var(--story-night)]'
                    : tab.status === 'ok'
                      ? 'bg-gob-success-bg text-gob-success'
                      : tab.status === 'error'
                        ? 'bg-gob-warning-bg text-gob-warning'
                        : 'bg-gob-surface-elevated text-muted-foreground',
                )}
                aria-hidden
              >
                {tab.status === 'ok' && !selected ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <span className="max-w-[10rem] truncate font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
