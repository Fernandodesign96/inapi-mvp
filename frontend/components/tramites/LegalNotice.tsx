'use client'

import { useState } from 'react'
import { ChevronDown, Scale } from 'lucide-react'
import { cn } from '@/lib/utils'

export function LegalNotice({
  title = 'Aviso legal',
  children,
  defaultOpen = false,
}: {
  title?: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-gob-border rounded-gob-md bg-gob-info-bg/40">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-gob-3 min-h-11 px-gob-4 py-gob-3 text-left"
      >
        <Scale className="w-5 h-5 text-gob-primary-dark shrink-0" aria-hidden />
        <span className="flex-1 font-medium text-gri-body text-gob-text">{title}</span>
        <ChevronDown
          className={cn('w-5 h-5 text-muted-foreground transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      {open && (
        <div className="px-gob-4 pb-gob-4 text-gri-body-sm text-gob-text leading-relaxed whitespace-pre-wrap">
          {children}
        </div>
      )}
    </div>
  )
}
