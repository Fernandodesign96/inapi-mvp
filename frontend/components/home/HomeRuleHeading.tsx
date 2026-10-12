import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function HomeRuleHeading({
  id,
  children,
  tone = 'default',
}: {
  id?: string
  children: ReactNode
  tone?: 'default' | 'inverse'
}) {
  const inverse = tone === 'inverse'
  return (
    <div className="flex items-center justify-center gap-gob-4 px-gob-4 py-gob-4 min-[905px]:py-gob-6">
      <span className={cn('h-px min-w-0 flex-1', inverse ? 'bg-white/25' : 'bg-gob-border')} aria-hidden />
      <h2
        id={id}
        className={cn(
          'shrink-0 text-center portal-h2',
          inverse ? 'text-gob-text-inverse' : 'text-gob-text',
        )}
      >
        {children}
      </h2>
      <span className={cn('h-px min-w-0 flex-1', inverse ? 'bg-white/25' : 'bg-gob-border')} aria-hidden />
    </div>
  )
}
