'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { FROM_INFORMATIVO_KEY, FROM_TRAMITES_KEY, PLATFORM_BANNER_KEY } from '@/lib/citizen-status'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

export function PlatformContextBanner({
  platform,
}: {
  platform: 'tramites' | 'informativo'
}) {
  const { tx } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const from =
          platform === 'tramites'
            ? sessionStorage.getItem(FROM_INFORMATIVO_KEY)
            : sessionStorage.getItem(FROM_TRAMITES_KEY)
        const seen = sessionStorage.getItem(`${PLATFORM_BANNER_KEY}-${platform}`)
        if (from && !seen) setVisible(true)
      } catch {
        /* ignore */
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [platform])

  if (!visible) return null

  const dismiss = () => {
    try {
      sessionStorage.setItem(`${PLATFORM_BANNER_KEY}-${platform}`, '1')
      if (platform === 'tramites') sessionStorage.removeItem(FROM_INFORMATIVO_KEY)
      else sessionStorage.removeItem(FROM_TRAMITES_KEY)
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  const tramites = platform === 'tramites'

  return (
    <div
      className={cn(
        'flex items-start gap-gob-3 border px-gob-4 py-gob-3 text-gri-body-sm leading-relaxed',
        tramites ? 'border-gob-accent/30 bg-gob-accent/5' : 'border-gob-info/30 bg-gob-info-bg',
      )}
      role="status"
    >
      <div className="flex-1 space-y-1">
        <p className="font-medium text-gob-text">
          {tx(
            tramites
              ? 'Estás en el Portal de Trámites de INAPI.'
              : 'Volviste al sitio informativo de INAPI.',
          )}
        </p>
        <p className="text-gob-text">
          {tx(
            tramites
              ? 'Aquí presentas solicitudes, pagas tasas y sigues tu expediente. El sitio informativo está en INAPI.'
              : 'Tu sesión sigue activa.',
          )}{' '}
          {tramites ? (
            <Link href="/" className="font-medium text-gob-link underline underline-offset-4">
              {tx('Volver al sitio informativo')}
            </Link>
          ) : (
            <Link href="/tramites" className="font-medium text-gob-link underline underline-offset-4">
              {tx('Volver a trámites')}
            </Link>
          )}
        </p>
      </div>
      <button
        type="button"
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-gob-sm text-gob-text hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        aria-label={tx('Cerrar aviso')}
        onClick={dismiss}
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  )
}
