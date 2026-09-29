import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BreadcrumbItem } from '@/lib/portal-routes'

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Ruta de navegación" className={cn('flex flex-wrap items-center gap-gob-2 text-gri-body', className)}>
      <Link
        href="/"
        className="inline-flex items-center gap-gob-2 min-h-11 text-gob-link font-medium hover:text-gob-primary-dark hover:underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
      >
        <Home className="w-4 h-4" aria-hidden />
        Inicio
      </Link>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="inline-flex items-center gap-1">
          <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden />
          {item.href ? (
            <Link href={item.href} className="text-gob-link font-medium hover:text-gob-primary-dark hover:underline underline-offset-4 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gob-text font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
