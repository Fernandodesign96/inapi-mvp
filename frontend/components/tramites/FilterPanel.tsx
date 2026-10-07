'use client'

import { useState } from 'react'
import { ChevronDown, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FilterPanel({
  title = 'Filtros',
  children,
  defaultOpen = true,
}: {
  title?: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="border border-gob-border rounded-gob-md bg-card">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-gob-3 min-h-11 px-gob-4 py-gob-3 text-left hover:bg-gob-surface-elevated transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
      >
        <SlidersHorizontal className="w-5 h-5 text-gob-primary" aria-hidden />
        <span className="flex-1 font-medium text-gri-body text-gob-text">{title}</span>
        <ChevronDown
          className={cn('w-5 h-5 text-muted-foreground transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      {open && <div className="px-gob-4 pb-gob-4 grid gap-gob-4 min-[600px]:grid-cols-2 min-[905px]:grid-cols-4">{children}</div>}
    </section>
  )
}

export function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-gob-2">
      <label htmlFor={id} className="block text-gri-body-sm font-medium text-gob-text">
        {label}
      </label>
      {children}
    </div>
  )
}
