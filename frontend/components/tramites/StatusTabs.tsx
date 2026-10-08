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
  const bar = accent === 'patentes' ? 'bg-gob-primary' : 'bg-gob-accent'

  return (
    <div className="overflow-x-auto">
      <div role="tablist" className="flex min-w-max border-b border-gob-border gap-1">
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
                'relative min-h-11 px-gob-4 py-gob-3 text-gri-body-sm font-medium whitespace-nowrap inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                selected ? 'text-gob-text' : 'text-muted-foreground hover:text-gob-text',
              )}
            >
              <span
                className={cn(
                  'inline-flex size-6 items-center justify-center rounded-full text-gri-body-xs border',
                  tab.status === 'ok' && 'bg-gob-success-bg text-gob-success border-gob-success/30',
                  tab.status === 'error' && 'bg-gob-warning-bg text-gob-warning border-gob-warning/40',
                  tab.status === 'active' && 'bg-gob-primary text-white border-gob-primary',
                  tab.status === 'idle' && 'bg-gob-surface-elevated text-muted-foreground border-gob-border',
                )}
                aria-hidden
              >
                {tab.status === 'ok' ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : i + 1}
              </span>
              {tab.label}
              {selected && <span className={cn('absolute inset-x-0 -bottom-px h-1 rounded-t', bar)} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
