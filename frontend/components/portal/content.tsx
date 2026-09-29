import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PortalMain({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('py-gob-2 pb-gob-8 space-y-gob-7', className)}>{children}</div>
}

export function PortalSectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="font-heading text-2xl font-medium text-gob-text mb-gob-4">
      {children}
    </h2>
  )
}

export function PortalProse({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-gri-body text-muted-foreground leading-relaxed max-w-3xl', className)}>{children}</p>
}

type QuickAccess = {
  href: string
  title: string
  description: string
  icon: LucideIcon
  variant?: 'primary' | 'outline'
}

export function PortalQuickAccessGrid({ items }: { items: QuickAccess[] }) {
  return (
    <section aria-label="Accesos rápidos" className="grid min-[600px]:grid-cols-3 gap-gob-4 -mt-gob-2 mb-gob-6">
      {items.map(item => {
        const Icon = item.icon
        const primary = item.variant === 'primary'
        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              'rounded-gob-md p-gob-5 flex flex-col gap-gob-3 transition-colors',
              primary
                ? 'bg-inapi-cta text-gob-text-inverse hover:bg-[#003B8D]'
                : 'bg-card text-gob-text border border-gob-border hover:border-gob-primary/40',
            )}
          >
            <Icon className={cn('w-8 h-8', primary ? 'text-gob-text-inverse' : 'text-gob-primary')} aria-hidden />
            <span className="text-lg font-bold">{item.title}</span>
            <span className={cn('text-gri-body-sm leading-relaxed', primary ? 'text-gob-text-inverse/85' : 'text-muted-foreground')}>
              {item.description}
            </span>
          </Link>
        )
      })}
    </section>
  )
}

export function PortalStepList({
  steps,
}: {
  steps: { num: number; title: string; body: string }[]
}) {
  return (
    <ol className="list-none space-y-gob-4 max-w-3xl">
      {steps.map(step => (
        <li key={step.num} className="flex gap-gob-4 bg-gob-surface-elevated rounded-gob-md p-gob-5">
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-inapi-cta text-gob-text-inverse font-bold text-gri-body-sm"
          >
            {step.num}
          </span>
          <div>
            <h3 className="font-bold text-gob-text mb-1">{step.title}</h3>
            <p className="text-gri-body-sm text-muted-foreground leading-relaxed">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function PortalFeeTable({
  caption,
  headers,
  rows,
}: {
  caption: string
  headers: [string, string]
  rows: [string, string][]
}) {
  return (
    <div className="max-w-3xl overflow-x-auto">
      <p className="text-gri-body-xs text-muted-foreground mb-gob-2">{caption}</p>
      <table className="w-full text-gri-body-sm border-collapse">
        <thead>
          <tr className="bg-inapi-portal-hero text-gob-text-inverse text-left">
            <th className="p-gob-3 font-bold">{headers[0]}</th>
            <th className="p-gob-3 font-bold">{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b], i) => (
            <tr key={a} className={cn('border-b border-gob-border', i % 2 === 1 && 'bg-gob-surface-elevated')}>
              <td className="p-gob-3">{a}</td>
              <td className="p-gob-3 font-bold">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PortalInfoGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid min-[600px]:grid-cols-2 gap-gob-4 max-w-3xl">
      {items.map(item => (
        <div key={item.title} className="border border-gob-border rounded-gob-md p-gob-5 bg-card">
          <h3 className="font-bold text-gob-text mb-1">{item.title}</h3>
          <p className="text-gri-body-sm text-muted-foreground leading-relaxed">{item.body}</p>
        </div>
      ))}
    </div>
  )
}

export function PortalLinkList({ links }: { links: { href: string; label: string; icon?: LucideIcon }[] }) {
  return (
    <ul className="list-none space-y-gob-3 max-w-3xl">
      {links.map(link => {
        const Icon = link.icon
        return (
          <li key={link.label} className="flex items-center gap-gob-3">
            {Icon && <Icon className="w-5 h-5 text-gob-primary shrink-0" aria-hidden />}
            <Link href={link.href} className="text-gri-body text-gob-link hover:text-gob-primary-dark font-medium">
              {link.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function PortalTramiteGrid({
  items,
}: {
  items: { href: string; title: string; icon: LucideIcon }[]
}) {
  return (
    <div className="grid min-[600px]:grid-cols-2 min-[905px]:grid-cols-4 gap-gob-4">
      {items.map(item => {
        const Icon = item.icon
        return (
          <Link
            key={item.title}
            href={item.href}
            className="bg-gob-surface-elevated rounded-gob-md p-gob-5 flex flex-col gap-gob-3 text-gob-text hover:bg-[#E6EEF7] transition-colors"
          >
            <Icon className="w-7 h-7 text-inapi-cta" aria-hidden />
            <span className="text-gri-body-sm font-bold leading-snug">{item.title}</span>
          </Link>
        )
      })}
    </div>
  )
}

export function PortalCardGrid({
  items,
}: {
  items: { title: string; body: string; href?: string; footnote?: string; cta?: string }[]
}) {
  return (
    <div className="grid min-[600px]:grid-cols-2 gap-gob-5">
      {items.map(item => (
        <article key={item.title} className="border border-gob-border rounded-gob-md p-gob-5 flex flex-col gap-gob-3 bg-card">
          <h3 className="font-bold text-gob-text">{item.title}</h3>
          <p className="text-gri-body-sm text-muted-foreground leading-relaxed flex-1">{item.body}</p>
          {item.footnote && <p className="text-gri-body-xs text-muted-foreground">{item.footnote}</p>}
          {item.href && item.cta && (
            <Link href={item.href} className="inline-flex items-center gap-1 text-gri-body-sm font-bold text-gob-link hover:text-gob-primary-dark">
              {item.cta}
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          )}
        </article>
      ))}
    </div>
  )
}

export function PortalSidebarLayout({
  sidebar,
  children,
}: {
  sidebar: { href: string; label: string; active?: boolean }[]
  children: React.ReactNode
}) {
  return (
    <div className="grid min-[905px]:grid-cols-[260px_1fr] gap-gob-7 items-start">
      <nav aria-label="Secciones" className="sticky top-24 bg-gob-surface-elevated rounded-gob-md p-gob-2 hidden min-[905px]:block">
        <ul className="list-none space-y-0.5">
          {sidebar.map(item => (
            <li key={item.label}>
              <Link
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={cn(
                  'block px-gob-4 py-gob-3 rounded-gob-sm text-gri-body-sm font-medium transition-colors',
                  item.active
                    ? 'bg-inapi-cta text-gob-text-inverse font-bold'
                    : 'text-gob-text hover:bg-[#E6EEF7]',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="space-y-gob-6">{children}</div>
    </div>
  )
}

export function PortalBulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-gob-5 space-y-gob-2 text-gri-body text-muted-foreground max-w-3xl leading-relaxed">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export function PortalImagePlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        'bg-gob-surface-elevated border border-dashed border-gob-border rounded-gob-md flex items-center justify-center text-gri-body-sm text-muted-foreground text-center p-gob-4',
        className,
      )}
      role="img"
      aria-label={label}
    >
      {label}
    </div>
  )
}

export function PortalCtaBanner({
  title,
  href,
  cta,
}: {
  title: string
  href: string
  cta: string
}) {
  return (
    <div className="bg-inapi-portal-hero text-gob-text-inverse rounded-gob-md p-gob-6 flex flex-wrap items-center justify-between gap-gob-5 mt-gob-6">
      <h3 className="text-lg font-bold">{title}</h3>
      <Link
        href={href}
        className="inline-flex items-center justify-center bg-background text-inapi-cta px-gob-6 py-gob-3 font-bold text-gri-body-sm hover:bg-gob-surface-elevated transition-colors shrink-0"
      >
        {cta}
      </Link>
    </div>
  )
}

export function PortalBlockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-gob-5 px-gob-5 py-gob-4 bg-gob-surface-elevated rounded-gob-md italic text-gob-text leading-relaxed">
      {children}
    </blockquote>
  )
}

export function PortalAccordion({
  items,
}: {
  items: { title: string; content: string }[]
}) {
  return (
    <div className="max-w-3xl divide-y divide-gob-border border border-gob-border rounded-gob-md overflow-hidden">
      {items.map(item => (
        <details key={item.title} className="group bg-card">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-gob-3 px-gob-5 py-gob-4 font-bold text-gob-text text-gri-body-sm hover:bg-gob-surface-elevated [&::-webkit-details-marker]:hidden">
            {item.title}
            <span aria-hidden className="text-gob-primary transition-transform group-open:rotate-180">
              ▾
            </span>
          </summary>
          <p className="px-gob-5 pb-gob-4 text-gri-body-sm text-muted-foreground leading-relaxed">{item.content}</p>
        </details>
      ))}
    </div>
  )
}

export function PortalDownloadList({
  items,
}: {
  items: { label: string; href: string }[]
}) {
  return (
    <div className="flex flex-col gap-gob-3 max-w-3xl">
      {items.map(item => (
        <div
          key={item.label}
          className="flex items-center justify-between gap-gob-4 bg-gob-surface-elevated rounded-gob-md px-gob-5 py-gob-4"
        >
          <span className="text-gri-body-sm font-bold text-gob-text">{item.label}</span>
          <Link href={item.href} className="text-gri-body-xs font-bold text-gob-link hover:text-gob-primary-dark shrink-0">
            Descargar (PDF)
          </Link>
        </div>
      ))}
    </div>
  )
}
