import type { TramitesDomain } from './nav'
import { cn } from '@/lib/utils'

export function scopeFill(scope: TramitesDomain, active: boolean) {
  if (!active) {
    return cn(
      'text-gob-text hover:text-gob-text',
      scope === 'marcas'
        ? 'hover:bg-inapi-marcas-surface dark:hover:bg-inapi-marcas-surface'
        : 'hover:bg-gob-primary/10 dark:hover:bg-gob-primary/20',
    )
  }
  return scope === 'marcas'
    ? 'bg-inapi-marcas-accent text-white hover:bg-inapi-marcas-hover [&_svg]:text-white'
    : 'bg-gob-primary text-white hover:bg-gob-primary-dark [&_svg]:text-white'
}

export function scopeSubItem(active: boolean) {
  return active
    ? 'bg-gob-surface-elevated font-medium text-gob-text dark:bg-white/10 dark:text-white'
    : 'text-muted-foreground hover:bg-gob-surface-elevated hover:text-gob-text dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white'
}

export function scopeTab(pressed: boolean, accent: TramitesDomain) {
  if (!pressed) return 'border-transparent text-muted-foreground hover:text-gob-text'
  return accent === 'marcas'
    ? 'border-inapi-marcas-accent bg-inapi-marcas-surface text-gob-text'
    : 'border-gob-primary bg-gob-primary/10 text-gob-primary-dark dark:text-white dark:bg-gob-primary/25'
}
