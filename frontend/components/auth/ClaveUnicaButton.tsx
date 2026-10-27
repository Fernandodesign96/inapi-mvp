'use client'

import { cn } from '@/lib/utils'

type Radius = '4' | '0' | '24'

interface Props {
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  className?: string
  /** Radio de la Guía ClaveÚnica 2025: 4 px (defecto INAPI), 0 px o 24 px. */
  radius?: Radius
}

const RADIUS: Record<Radius, string> = {
  '4': 'rounded-[4px]',
  '0': 'rounded-none',
  '24': 'rounded-[24px]',
}

export function ClaveUnicaButton({ onClick, disabled, loading, className, radius = '4' }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'inline-flex h-12 min-h-12 items-center justify-center gap-1 px-[14px]',
        'font-sans text-base font-bold leading-normal text-claveunica-fg',
        RADIUS[radius],
        'bg-claveunica-bg',
        'hover:bg-claveunica-bg-hover',
        'active:bg-claveunica-bg-active',
        'focus-visible:bg-claveunica-bg-hover focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_var(--claveunica-border-active)]',
        'disabled:cursor-not-allowed disabled:bg-claveunica-bg-disabled disabled:text-claveunica-fg-disabled',
        'max-[599px]:h-auto max-[599px]:min-h-11 max-[599px]:gap-1 max-[599px]:px-2 max-[599px]:py-3 max-[599px]:text-sm',
        className,
      )}
      aria-label="ClaveÚnica"
      aria-busy={loading}
    >
      {loading ? (
        <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : (
        <>
          <img
            src="/inapi-mvp/claveunica-mark.svg"
            alt=""
            width={24}
            height={24}
            className="size-6 shrink-0 max-[599px]:hidden"
          />
          <img
            src="/inapi-mvp/claveunica-mark-mobile.svg"
            alt=""
            width={18}
            height={18}
            className="hidden size-[18px] shrink-0 max-[599px]:block"
          />
          <span className="pt-0.5">ClaveÚnica</span>
        </>
      )}
    </button>
  )
}
