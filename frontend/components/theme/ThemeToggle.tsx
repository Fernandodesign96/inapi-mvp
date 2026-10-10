'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/theme/ThemeProvider'
import { useI18n } from '@/lib/i18n/LocaleProvider'

interface Props {
  className?: string
  /** Estilo del botón en la barra roja del header INAPI */
  variant?: 'header' | 'plain'
}

export function ThemeToggle({ className, variant = 'header' }: Props) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const { tx } = useI18n()
  const isDark = resolvedTheme === 'dark'
  const label = tx(isDark ? 'Activar modo claro' : 'Activar modo oscuro')
  const icon = isDark ? (
    <Sun className="size-5" strokeWidth={2.25} aria-hidden />
  ) : (
    <Moon className="size-5" strokeWidth={2.25} aria-hidden />
  )

  if (variant === 'plain') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          'inline-flex size-11 min-h-11 min-w-11 items-center justify-center rounded-full text-white hover:bg-white/20 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus [&_svg]:text-white',
          className
        )}
        aria-label={label}
        suppressHydrationWarning
      >
        {icon}
      </button>
    )
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        'text-gob-text-inverse hover:bg-white/10 rounded-full size-11',
        className
      )}
      aria-label={label}
      aria-pressed={isDark}
      suppressHydrationWarning
    >
      {icon}
    </Button>
  )
}
