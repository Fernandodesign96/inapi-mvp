'use client'

import { useRef, type ReactNode } from 'react'
import CountUp from 'react-countup'
import { useInView, useReducedMotion } from 'framer-motion'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

export type StatTileProps = {
  value: number
  label: string
  caption?: string
  prefix?: string
  suffix?: string
  decimals?: number
  /** Variación porcentual vs periodo anterior (dato publicado). */
  delta?: { value: number; label: string }
  detail?: ReactNode
  tone?: 'night' | 'glass' | 'paper'
  icon?: React.ReactNode
  className?: string
}

export function StatTile({
  value,
  label,
  caption,
  prefix = '',
  suffix = '',
  decimals = 0,
  delta,
  detail,
  tone = 'paper',
  icon,
  className,
}: StatTileProps) {
  const { locale } = useI18n()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const dark = tone !== 'paper'
  const sep = locale === 'en' ? ',' : '.'
  const dec = locale === 'en' ? '.' : ','
  const formatted = `${prefix}${value.toLocaleString(locale === 'en' ? 'en-US' : 'es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}${suffix}`
  const up = delta ? delta.value >= 0 : false

  return (
    <div
      ref={ref}
      className={cn(
        'group/stat relative flex min-w-0 cursor-default flex-col gap-gob-2 rounded-gob-lg p-gob-5 text-left transition-colors duration-300',
        tone === 'paper' && 'border border-gob-border bg-card shadow-elevation-02',
        tone === 'glass' && 'story-glass hover:bg-[#061526] hover:ring-1 hover:ring-white/20',
        tone === 'night' && 'story-night shadow-elevation-03',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-gob-3">
        <p className={cn('text-gri-body-sm font-medium leading-[1.4]', dark ? 'text-white/80' : 'text-muted-foreground')}>{label}</p>
        {icon ? (
          <span
            aria-hidden
            className={cn('inline-flex size-9 shrink-0 items-center justify-center rounded-full [&_svg]:size-4', dark ? 'bg-white/10 text-white' : 'bg-gob-primary/10 text-gob-primary-dark')}
          >
            {icon}
          </span>
        ) : null}
      </div>
      <p
        className={cn(
          'story-tabular font-heading text-[2rem] font-medium leading-none min-[1240px]:text-[2.375rem]',
          dark ? 'text-white' : 'text-gob-text',
        )}
      >
        <span className="sr-only">{formatted}</span>
        <span aria-hidden>
          {reduce || !inView ? (
            reduce ? formatted : `${prefix}0${suffix}`
          ) : (
            <CountUp end={value} prefix={prefix} suffix={suffix} decimals={decimals} separator={sep} decimal={dec} duration={1.4} />
          )}
        </span>
      </p>
      {delta || caption || detail ? (
        <div className="flex flex-wrap items-center gap-gob-2 text-gri-body-xs">
          {delta ? (
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-full px-gob-2 py-0.5 font-semibold',
                dark
                  ? up
                    ? 'bg-[#5EEAD4]/15 text-[#A7F3E4]'
                    : 'bg-[#FF8A7A]/15 text-[#FFC2B8]'
                  : up
                    ? 'bg-gob-success-bg text-[#1F6B23]'
                    : 'bg-gob-danger-bg text-[#A11A1A]',
              )}
            >
              {up ? <TrendingUp className="size-3.5" aria-hidden /> : <TrendingDown className="size-3.5" aria-hidden />}
              {`${up ? '+' : ''}${delta.value.toLocaleString(locale === 'en' ? 'en-US' : 'es-CL', { maximumFractionDigits: 1 })}%`}
              <span className="sr-only">{delta.label}</span>
            </span>
          ) : null}
          {caption ? <span className={dark ? 'text-white/70' : 'text-muted-foreground'}>{caption}</span> : null}
          {detail ? <span className={dark ? 'text-white/80' : 'text-muted-foreground'}>{detail}</span> : null}
        </div>
      ) : null}
    </div>
  )
}
