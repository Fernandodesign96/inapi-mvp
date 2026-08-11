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
    <nav aria-label="Ruta de navegación" className={cn('flex flex-wrap items-center gap-1 text-gri-body-sm', className)}>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-gob-link hover:text-gob-primary-dark transition-colors"
      >
        <Home className="w-4 h-4" aria-hidden />
        Inicio
      </Link>
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="inline-flex items-center gap-1">
          <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden />
          {item.href ? (
            <Link href={item.href} className="text-gob-link hover:text-gob-primary-dark transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gob-text" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}
