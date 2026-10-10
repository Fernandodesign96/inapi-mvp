'use client'

import Link from 'next/link'
import { ClipboardList, Languages } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

const iconBtn =
  'inline-flex size-11 min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus [&_svg]:text-white'

type HeaderUtilitiesProps = {
  className?: string
  /** Cierra el menú móvil al elegir un enlace (p. ej. Sitio de Trámites). */
  onNavigate?: () => void
}

export function HeaderUtilities({ className, onNavigate }: HeaderUtilitiesProps) {
  const { locale, setLocale, tx } = useI18n()
  const nextLocale = locale === 'es' ? 'en' : 'es'
  const languageLabel =
    locale === 'es' ? 'Cambiar idioma a inglés' : 'Cambiar idioma a español'
  const localeBadge = locale === 'es' ? 'EN' : 'ES'

  return (
    <div
      className={cn('flex items-center gap-0.5 sm:gap-gob-1', className)}
      role="group"
      aria-label={tx('Accesos del encabezado')}
    >
      <button
        type="button"
        className={cn(iconBtn, 'relative')}
        aria-label={tx(languageLabel)}
        aria-pressed={locale === 'en'}
        onClick={() => setLocale(nextLocale)}
      >
        <Languages className="size-5" strokeWidth={2.25} aria-hidden />
        <span
          className="absolute -bottom-0.5 -right-0.5 min-w-[1.125rem] rounded-gob-sm bg-white px-0.5 text-[0.625rem] font-bold leading-4 text-[#061526]"
          aria-hidden
          data-i18n-skip
        >
          {localeBadge}
        </span>
      </button>

      <ThemeToggle className={iconBtn} variant="plain" />

      <Link
        href="/tramites"
        className={iconBtn}
        aria-label={tx('Ir al Sitio de Trámites')}
        onClick={() => onNavigate?.()}
      >
        <ClipboardList className="size-5" strokeWidth={2.25} aria-hidden />
      </Link>
    </div>
  )
}
