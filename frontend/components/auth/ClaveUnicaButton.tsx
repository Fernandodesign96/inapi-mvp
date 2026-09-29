'use client'

import { KeyRound } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
}

export function ClaveUnicaButton({ onClick, disabled, loading, className }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'inline-flex h-11 w-full items-center justify-center gap-2',
        'rounded-gob-sm px-gob-4 text-gri-btn font-medium',
        'bg-claveunica-bg text-claveunica-fg',
        'hover:bg-claveunica-bg-hover',
        'active:bg-claveunica-bg-active active:border-2 active:border-claveunica-border-active',
        'focus-visible:outline-none focus-visible:bg-claveunica-bg-focus focus-visible:ring-2 focus-visible:ring-claveunica-border-active focus-visible:ring-offset-2',
        'disabled:bg-claveunica-bg-disabled disabled:text-claveunica-fg-disabled disabled:cursor-not-allowed',
        'transition-colors duration-150',
        className
      )}
      aria-busy={loading}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          <KeyRound className="w-5 h-5" aria-hidden />
          ClaveÚnica
        </>
      )}
    </button>
  )
}