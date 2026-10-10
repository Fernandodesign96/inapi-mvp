import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'

export function GlassCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: LucideIcon
  title: string
  description: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="portal-glass group flex min-h-11 flex-col gap-gob-4 rounded-gob-lg p-gob-6 text-left transition-colors hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
    >
      <span className="inline-flex size-11 items-center justify-center rounded-gob-md bg-white/10 text-gob-text-inverse">
        <Icon className="size-6" aria-hidden />
      </span>
      <h3 className="font-heading text-gri-h2 font-medium text-gob-text-inverse">{title}</h3>
      <p className="flex-1 text-gri-body leading-[1.5] text-gob-text-inverse">{description}</p>
      <span className="text-gri-body-sm font-medium text-gob-focus group-hover:underline underline-offset-4">
        Abrir este trámite
      </span>
    </Link>
  )
}
