import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ProgressMiniCard = {
  title: string
  body: string
  icon?: React.ReactNode
}

export function ProgressMiniCards({
  items,
  className,
}: {
  items: ProgressMiniCard[]
  className?: string
}) {
  return (
    <ol className={cn('grid gap-gob-3 min-[600px]:grid-cols-2 min-[1100px]:grid-cols-4', className)}>
      {items.map((item, i) => (
        <li key={item.title} className="relative">
          <article className="story-card-hover-paper flex h-full flex-col gap-gob-2 rounded-gob-lg border border-gob-border bg-card p-gob-4 shadow-elevation-01">
            <div className="flex items-center gap-gob-2">
              {item.icon ? (
                <span aria-hidden className="inline-flex size-9 items-center justify-center rounded-gob-md bg-gob-primary/10 text-gob-primary-dark [&_svg]:size-4">
                  {item.icon}
                </span>
              ) : (
                <span
                  aria-hidden
                  className="inline-flex size-8 items-center justify-center rounded-full bg-gob-primary text-gri-body-xs font-bold text-white"
                >
                  {i + 1}
                </span>
              )}
              <p className="font-heading text-gri-body font-medium leading-[1.35]">{item.title}</p>
            </div>
            <p className="text-gri-body-sm leading-[1.5] text-muted-foreground">{item.body}</p>
          </article>
          {i < items.length - 1 ? (
            <ArrowRight
              aria-hidden
              className="absolute -right-2 top-1/2 z-[1] hidden size-4 -translate-y-1/2 text-gob-primary min-[1100px]:block"
            />
          ) : null}
        </li>
      ))}
    </ol>
  )
}
