'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { TramitesLink } from '@/components/tramites/TramitesLink'
import { FROM_INFORMATIVO_KEY, FROM_TRAMITES_KEY } from '@/lib/citizen-status'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

type Variant = 'button-primary' | 'button-secondary' | 'link' | 'card-cta' | 'inherit'

export function CrossPlatformLink({
  href,
  label,
  tooltip,
  requiresAuth = false,
  targetPlatform,
  variant = 'link',
  className,
  children,
  onClick,
}: {
  href: string
  label?: string
  tooltip?: string
  requiresAuth?: boolean
  targetPlatform: 'tramites' | 'informativo'
  variant?: Variant
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}) {
  const { tx } = useI18n()
  const defaultTooltip =
    targetPlatform === 'tramites'
      ? 'Irás al Portal de Trámites de INAPI. Necesitarás ClaveÚnica.'
      : 'Irás al sitio informativo de INAPI.'
  const message = tooltip ?? defaultTooltip
  const text = label ?? (typeof children === 'string' ? children : '')
  const aria =
    targetPlatform === 'tramites'
      ? `${text || label}, abre en el Portal de Trámites de INAPI`
      : `${text || label}, abre en el sitio informativo de INAPI`

  const styles: Record<Variant, string> = {
    'button-primary':
      'inline-flex min-h-11 items-center justify-center gap-2 rounded-gob-md bg-gob-primary px-gob-5 text-gri-btn font-medium text-gob-text-inverse hover:bg-gob-primary-dark',
    'button-secondary':
      'inline-flex min-h-11 items-center justify-center gap-2 rounded-gob-md border border-gob-border bg-transparent px-gob-5 text-gri-btn font-medium text-gob-text hover:bg-gob-surface-elevated',
    link: 'inline-flex min-h-11 items-center gap-1 font-medium text-gob-link hover:underline underline-offset-4',
    'card-cta': 'inline-flex min-h-11 items-center gap-1 text-gri-body-sm font-medium text-gob-link hover:underline',
    inherit: '',
  }

  const markNavigation = () => {
    try {
      if (targetPlatform === 'tramites') sessionStorage.setItem(FROM_INFORMATIVO_KEY, '1')
      else sessionStorage.setItem(FROM_TRAMITES_KEY, '1')
    } catch {
      /* ignore */
    }
    onClick?.()
  }

  const inner = (
    <>
      {children ?? tx(label ?? '')}
      <ArrowUpRight className="size-4 shrink-0" aria-hidden />
    </>
  )

  const shared = {
    className: cn(styles[variant], 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus', className),
    'aria-label': aria,
    onClick: markNavigation,
  }

  const node =
    targetPlatform === 'tramites' ? (
      <TramitesLink href={requiresAuth ? href : href} {...shared}>
        {inner}
      </TramitesLink>
    ) : (
      <Link href={href} {...shared}>
        {inner}
      </Link>
    )

  return (
    <Tooltip>
      <TooltipTrigger asChild>{node}</TooltipTrigger>
      <TooltipContent className="max-w-xs text-left leading-relaxed">{tx(message)}</TooltipContent>
    </Tooltip>
  )
}
