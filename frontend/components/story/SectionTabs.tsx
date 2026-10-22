'use client'

import { Tabs as TabsPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

export type SectionTab = {
  id: string
  label: string
  icon?: React.ReactNode
  content: React.ReactNode
}

/** Pestañas segmentadas (Radix, flechas de teclado). */
export function SectionTabs({
  tabs,
  label,
  tone = 'paper',
  className,
  listClassName,
  defaultValue,
}: {
  tabs: SectionTab[]
  label: string
  tone?: 'paper' | 'night'
  className?: string
  listClassName?: string
  defaultValue?: string
}) {
  const night = tone === 'night'
  return (
    <TabsPrimitive.Root defaultValue={defaultValue ?? tabs[0]?.id} className={cn('flex flex-col gap-gob-6', className)}>
      <TabsPrimitive.List
        aria-label={label}
        className={cn(
          'inline-flex max-w-full self-center overflow-x-auto rounded-full p-1 [scrollbar-width:none]',
          night ? 'border border-white/15 bg-white/6' : 'border border-gob-border bg-card shadow-elevation-02',
          listClassName,
        )}
      >
        {tabs.map(tab => (
          <TabsPrimitive.Trigger
            key={tab.id}
            value={tab.id}
            className={cn(
              'inline-flex min-h-11 shrink-0 items-center gap-gob-2 whitespace-nowrap rounded-full px-gob-4 text-gri-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus min-[600px]:px-gob-5 [&_svg]:size-4',
              night
                ? 'text-white/78 hover:text-white data-[state=active]:bg-white data-[state=active]:text-[#092039]'
                : 'text-muted-foreground hover:text-gob-text data-[state=active]:bg-[#092039] data-[state=active]:text-white',
            )}
          >
            {tab.icon ? <span aria-hidden>{tab.icon}</span> : null}
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabs.map(tab => (
        <TabsPrimitive.Content
          key={tab.id}
          value={tab.id}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus focus-visible:ring-offset-4 data-[state=active]:animate-in data-[state=active]:fade-in-0"
        >
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
