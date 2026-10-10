import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BreadcrumbItem } from '@/lib/portal-routes'

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
  tone?: 'default' | 'inverse'
}

export function Breadcrumbs({ items, className, tone = 'default' }: BreadcrumbsProps) {
  if (items.length === 0) return null

  const inverse = tone === 'inverse'
  const linkClass = inverse
    ? 'text-gob-text-inverse hover:text-gob-text-inverse hover:underline underline-offset-4 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus'
    : 'text-gob-link font-medium hover:text-gob-link-hover hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus'
  const currentClass = inverse ? 'text-gob-text-inverse font-medium' : 'text-gob-text font-medium'
  const chevronClass = inverse ? 'text-gob-text-inverse/70' : 'text-muted-foreground'

  return (
    <nav aria-label="Ruta de navegación" className={cn('flex flex-wrap items-center gap-gob-2 text-gri-body', className)}>
      <Link href="/" className={cn('inline-flex items-center gap-gob-2 min-h-11', linkClass)}>
        <Home className="w-4 h-4" aria-hidden />
        Inicio
      </Link>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="inline-flex items-center gap-1">
          <ChevronRight className={cn('w-4 h-4', chevronClass)} aria-hidden />
          {item.href ? (
            <Link href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ) : (
            <span className={currentClass} aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
