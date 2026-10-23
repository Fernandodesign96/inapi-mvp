import { CheckCircle2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type IconListItem = {
  text: React.ReactNode
  icon?: LucideIcon
}

export function IconList({
  items,
  className,
  tone = 'paper',
}: {
  items: (string | IconListItem)[]
  className?: string
  tone?: 'paper' | 'night'
}) {
  const night = tone === 'night'
  return (
    <ul className={cn('flex flex-col gap-gob-3', className)}>
      {items.map((item, i) => {
        const text = typeof item === 'string' ? item : item.text
        const Icon = typeof item === 'string' ? CheckCircle2 : (item.icon ?? CheckCircle2)
        return (
          <li key={i} className="flex gap-gob-3 text-gri-body leading-[1.55]">
            <span
              aria-hidden
              className={cn(
                'mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-gob-md',
                night ? 'bg-white/12 text-white' : 'bg-gob-primary/10 text-gob-primary-dark',
              )}
            >
              <Icon className="size-4" />
            </span>
            <span className={night ? 'text-white/92' : 'text-gob-text'}>{text}</span>
          </li>
        )
      })}
    </ul>
  )
}
