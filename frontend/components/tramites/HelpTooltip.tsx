'use client'

import type { ReactNode } from 'react'
import { CircleHelp, Lightbulb, MousePointerClick } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

function deriveHelp(text: string, example?: string, action?: string) {
  const fromText = text.match(/(?:prueba con|ejemplo:?|usa|por ejemplo)\s+(.+?)(?:\.|$)/i)
  return {
    example:
      example ??
      (fromText ? fromText[1].replace(/\.$/, '').trim() : undefined),
    action: action,
  }
}

export function HelpTooltip({
  text,
  title,
  example,
  action,
  href,
  hrefLabel,
  hrefHint,
  quiet,
  label = 'Ayuda',
  children,
}: {
  text: string
  title?: string
  example?: string
  action?: string
  href?: string
  hrefLabel?: string
  hrefHint?: string
  quiet?: boolean
  label?: string
  children?: ReactNode
}) {
  const { tx } = useI18n()
  const extra = deriveHelp(text, example, action)
  const showExample = !quiet && (extra.example || example)
  const showAction = !quiet && extra.action
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center text-gob-primary hover:text-gob-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
          aria-label={tx(label)}
        >
          <CircleHelp className="size-5" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="w-[22rem] max-w-[calc(100vw-2rem)] space-y-gob-3 rounded-gob-lg border border-gob-border bg-card p-gob-4 text-left text-gri-body-sm leading-[1.55] text-gob-text shadow-elevation-04"
      >
        <p className="font-heading text-gri-body font-semibold text-gob-text">{tx(title ?? 'Ayuda de este dato')}</p>
        <p>{tx(text)}</p>
        {showExample ? (
          <p className="flex items-start gap-gob-2 text-gri-body-sm">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-gob-primary" aria-hidden />
            <span>
              <span className="font-semibold">{tx('Ejemplo')}: </span>
              {tx(extra.example ?? '')}
            </span>
          </p>
        ) : null}
        {showAction ? (
          <p className="flex items-start gap-gob-2 text-gri-body-sm">
            <MousePointerClick className="mt-0.5 size-4 shrink-0 text-gob-primary" aria-hidden />
            <span>{tx(extra.action ?? '')}</span>
          </p>
        ) : !quiet ? (
          <p className="flex items-start gap-gob-2 text-gri-body-sm">
            <MousePointerClick className="mt-0.5 size-4 shrink-0 text-gob-primary" aria-hidden />
            <span>{tx('Lee esta ayuda y continúa con el dato o el botón del trámite.')}</span>
          </p>
        ) : null}
        {href ? (
          <p className="text-gri-body-sm">
            {hrefHint ? <span className="block mb-1">{tx(hrefHint)}</span> : null}
            <a href={href} className="text-gob-link underline underline-offset-4" rel="noopener noreferrer" target="_blank">
              {tx(hrefLabel ?? href)}
            </a>
          </p>
        ) : null}
        {children}
      </PopoverContent>
    </Popover>
  )
}

export function TipWrap({
  children,
  text,
  example,
  action,
}: {
  children: ReactNode
  text: string
  example?: string
  action?: string
}) {
  const { tx } = useI18n()
  const extra = deriveHelp(text, example, action)
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="start" className="w-[22rem] max-w-[calc(100vw-2rem)] space-y-gob-3 p-gob-4 text-left">
        <p>{tx(text)}</p>
        <p className="flex items-start gap-gob-2 text-gri-body-sm">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-gob-primary" aria-hidden />
          <span>
            <span className="font-semibold">{tx('Ejemplo')}: </span>
            {tx(extra.example ?? '')}
          </span>
        </p>
        <p className="flex items-start gap-gob-2 text-gri-body-sm">
          <MousePointerClick className="mt-0.5 size-4 shrink-0 text-gob-primary" aria-hidden />
          <span>{tx(extra.action ?? '')}</span>
        </p>
      </PopoverContent>
    </Popover>
  )
}

export function FieldLabel({
  htmlFor,
  children,
  help,
  className,
}: {
  htmlFor?: string
  children: ReactNode
  help?: { title?: string; text: string; example?: string; action?: string }
  className?: string
}) {
  return (
    <label htmlFor={htmlFor} className={cn('inline-flex max-w-full items-start gap-1.5 text-left text-gri-body font-medium text-gob-text', className)}>
      {children}
      {help ? <HelpTooltip title={help.title} text={help.text} example={help.example} action={help.action} /> : null}
    </label>
  )
}
