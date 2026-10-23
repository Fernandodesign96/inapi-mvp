import { SectionAccordion, type SectionAccordionItem } from '@/components/story/SectionAccordion'
import { cn } from '@/lib/utils'

/** Parte un listado de acordeones en dos columnas del mismo ancho. */
export function SplitAccordion({
  items,
  defaultOpen,
  tone = 'paper',
  className,
}: {
  items: SectionAccordionItem[]
  defaultOpen?: string[]
  tone?: 'paper' | 'night'
  className?: string
}) {
  const mid = Math.ceil(items.length / 2)
  const left = items.slice(0, mid)
  const right = items.slice(mid)
  return (
    <div className={cn('grid items-start gap-gob-4 min-[905px]:grid-cols-2 min-[905px]:gap-gob-5', className)}>
      <SectionAccordion items={left} defaultOpen={defaultOpen} tone={tone} />
      {right.length ? <SectionAccordion items={right} defaultOpen={defaultOpen} tone={tone} /> : null}
    </div>
  )
}
