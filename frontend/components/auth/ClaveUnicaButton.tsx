'use client'

import { cn } from '@/lib/utils'

/** Imagotipo oficial de ClaveÚnica (llave) del Kit de UI Gobierno Digital. */
function ClaveUnicaMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 28"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M11 3.5a7.5 7.5 0 1 0 6.9 10.4H21v2.7h2.6V19H26v4.5h-7.2l-2.05-2.05A7.5 7.5 0 0 0 11 3.5Zm0 3.2a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6Z" />
    </svg>
  )
}

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
        'inline-flex h-11 min-h-11 w-full items-center justify-center gap-2',
        'rounded-[4px] px-4 text-base font-medium leading-none font-sans',
        'bg-claveunica-bg text-claveunica-fg',
        'hover:bg-claveunica-bg-hover',
        'active:bg-claveunica-bg-active active:border-2 active:border-claveunica-border-active',
        'focus-visible:outline-none focus-visible:bg-claveunica-bg-focus focus-visible:ring-2 focus-visible:ring-claveunica-border-active focus-visible:ring-offset-2',
        'disabled:bg-claveunica-bg-disabled disabled:text-claveunica-fg-disabled disabled:cursor-not-allowed',
        'transition-colors duration-150',
        className,
      )}
      aria-busy={loading}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          <ClaveUnicaMark className="size-6 shrink-0" />
          ClaveÚnica
        </>
      )}
    </button>
  )
}
