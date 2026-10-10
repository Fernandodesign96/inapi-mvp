'use client'

import CountUp from 'react-countup'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function CounterStat({
  end,
  suffix = '',
  prefix = '',
  label,
  decimals = 0,
  tone = 'dark',
}: {
  end: number
  suffix?: string
  prefix?: string
  label: string
  decimals?: number
  tone?: 'dark' | 'light'
}) {
  const reduce = useReducedMotion()
  const light = tone === 'light'
  return (
    <div
      className={cn(
        'portal-card-motion min-w-[7rem] space-y-gob-2 rounded-gob-lg border p-gob-5 text-left shadow-elevation-02',
        light
          ? 'border-gob-border bg-card'
          : 'border-white/12 bg-inapi-portal-hero',
      )}
    >
      <p
        className={cn(
          'font-heading text-[2rem] font-medium leading-[1.2]',
          light ? 'text-gob-primary' : 'text-gob-focus',
        )}
      >
        {reduce ? (
          `${prefix}${end}${suffix}`
        ) : (
          <CountUp end={end} suffix={suffix} prefix={prefix} decimals={decimals} duration={1.2} start={0} />
        )}
      </p>
      <p className={cn('text-gri-body-sm leading-[1.4]', light ? 'text-gob-text' : 'text-gob-text-inverse')}>
        {label}
      </p>
    </div>
  )
}
