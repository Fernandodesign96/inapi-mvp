'use client'

import { CircleHelp } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function HelpTooltip({
  text,
  label = 'Más información',
}: {
  text: string
  label?: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-gob-primary hover:text-gob-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus rounded-gob-sm"
          aria-label={label}
        >
          <CircleHelp className="w-4 h-4" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs text-left leading-relaxed">{text}</TooltipContent>
    </Tooltip>
  )
}

export function TipWrap({
  children,
  text,
}: {
  children: React.ReactNode
  text: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="max-w-xs text-left leading-relaxed">{text}</TooltipContent>
    </Tooltip>
  )
}
