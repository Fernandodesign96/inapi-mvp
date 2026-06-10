'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/theme/ThemeProvider'

interface Props {
  className?: string
  /** Estilo del botón en la barra roja del header INAPI */
  variant?: 'header' | 'plain'
}

export function ThemeToggle({ className, variant = 'header' }: Props) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const label = isDark ? 'Activar modo claro' : 'Activar modo oscuro'
  const icon = isDark ? (
    <Sun className="w-5 h-5" aria-hidden />
  ) : (
    <Moon className="w-5 h-5" aria-hidden />
  )

  if (variant === 'plain') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          'p-2 rounded-full text-gob-text-inverse hover:bg-white/10 transition-colors focus-gob',
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
