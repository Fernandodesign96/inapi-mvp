'use client'

import { cn } from '@/lib/utils'

export type PillItem = { id: string; label: string }

export function SectionPills({
  items,
  active,
  onSelect,
  ariaLabel,
}: {
  items: PillItem[]
  active: string
  onSelect: (id: string) => void
  ariaLabel: string
}) {
  return (
    <div className="w-full" role="tablist" aria-label={ariaLabel}>
      <div className="flex flex-wrap gap-gob-2">
        {items.map(item => {
          const selected = item.id === active
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              id={`pill-${item.id}`}
              onClick={() => onSelect(item.id)}
              className={cn(
                'inline-flex min-h-11 items-center rounded-full border px-gob-4 py-gob-2 text-gri-body-xs font-medium uppercase tracking-wide transition-colors',
                selected
                  ? 'border-transparent bg-[#d7e4f2] text-gob-primary'
                  : 'border-gob-primary/40 bg-card text-gob-primary hover:bg-inapi-tint',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function SectionSubnav({
  items,
  active,
  onSelect,
}: {
  items: PillItem[]
  active: string
  onSelect: (id: string) => void
}) {
  return (
    <nav aria-label="Subsección" className="rounded-b-gob-md bg-[#e8f0f8] px-gob-5 py-gob-3">
      <ul className="flex flex-wrap items-center gap-x-gob-3 gap-y-1 text-gri-body-xs font-medium uppercase tracking-wide text-gob-primary">
        {items.map((item, i) => (
          <li key={item.id} className="flex items-center gap-gob-3">
            {i > 0 ? <span aria-hidden className="text-gob-primary/40">|</span> : null}
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                'min-h-11 px-1 text-left underline-offset-4 hover:underline',
                item.id === active && 'font-bold',
              )}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
