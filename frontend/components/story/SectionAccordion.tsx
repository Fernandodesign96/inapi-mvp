'use client'

import { Accordion as AccordionPrimitive } from 'radix-ui'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SectionAccordionItem = {
  id: string
  title: string
  summary?: string
  icon?: React.ReactNode
  content: React.ReactNode
}

/** Secciones desplegables en tarjetas; operables con teclado (Radix). */
export function SectionAccordion({
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
  const night = tone === 'night'
  return (
    <AccordionPrimitive.Root type="multiple" defaultValue={defaultOpen} className={cn('flex flex-col gap-gob-3', className)}>
      {items.map(item => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          id={item.id}
          className={cn(
            'scroll-mt-28 overflow-hidden rounded-gob-lg transition-shadow',
            night ? 'story-glass' : 'border border-gob-border bg-card shadow-elevation-01',
          )}
        >
          <AccordionPrimitive.Header asChild>
            <h3>
              <AccordionPrimitive.Trigger
                className={cn(
                  'group flex min-h-16 w-full items-center gap-gob-4 px-gob-5 py-gob-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gob-focus',
                  night
                    ? 'text-white hover:bg-white/12 data-[state=open]:bg-white/14'
                    : 'text-gob-text hover:bg-[#1D70B8] hover:text-white data-[state=open]:bg-[var(--story-night)] data-[state=open]:text-white dark:hover:bg-[#0F69C4]',
                )}
              >
                {item.icon ? (
                  <span
                    aria-hidden
                    className={cn(
                      'inline-flex size-10 shrink-0 items-center justify-center rounded-gob-md [&_svg]:size-5',
                      night
                        ? 'bg-white/10 text-white'
                        : 'bg-gob-primary/10 text-gob-primary-dark group-hover:bg-white/15 group-hover:text-white group-data-[state=open]:bg-white/15 group-data-[state=open]:text-white',
                    )}
                  >
                    {item.icon}
                  </span>
                ) : null}
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="font-heading text-gri-h2 font-medium leading-[1.35]">{item.title}</span>
                  {item.summary ? (
                    <span
                      className={cn(
                        'text-gri-body-sm',
                        night ? 'text-white/72' : 'text-muted-foreground group-hover:text-white/80 group-data-[state=open]:text-white/75',
                      )}
                    >
                      {item.summary}
                    </span>
                  ) : null}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'inline-flex size-9 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-data-[state=open]:rotate-180',
                    night
                      ? 'border-white/25'
                      : 'border-gob-border-strong group-hover:border-white/40 group-data-[state=open]:border-white/40',
                  )}
                >
                  <ChevronDown className="size-4" />
                </span>
              </AccordionPrimitive.Trigger>
            </h3>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div
              className={cn(
                'px-gob-5 pb-gob-5 text-gri-body leading-[1.6] min-[905px]:pl-[4.75rem]',
                night ? 'text-white/85' : 'text-muted-foreground',
                !item.icon && 'min-[905px]:pl-gob-5',
                '[&_a]:font-medium [&_a]:text-gob-link [&_a]:underline-offset-4 hover:[&_a]:underline [&_strong]:text-gob-text [&_ul]:mt-gob-2 [&_ul]:list-disc [&_ul]:space-y-gob-1 [&_ul]:pl-gob-5',
              )}
            >
              {item.content}
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}
