import type { ComponentProps } from 'react'
import { PortalShell } from '@/components/layout/PortalShell'
import { StoryHero } from '@/components/story/StoryHero'
import { portalShellProps } from '@/lib/portal-page-props'
import type { BreadcrumbItem } from '@/lib/portal-routes'

type HeroProps = Omit<ComponentProps<typeof StoryHero>, 'breadcrumbs' | 'title'> & { title?: string }

/**
 * Página informativa con plantilla storytelling: hero oscuro en la atmósfera del header
 * y bandas `StorySection` como hijos. Título, lead y migas salen de `getPageMeta(path)`.
 */
export function StoryPage({
  path,
  hero,
  breadcrumbs,
  children,
}: {
  path: string
  hero: HeroProps
  breadcrumbs?: BreadcrumbItem[]
  children: React.ReactNode
}) {
  const shell = portalShellProps(path)
  const crumbs = breadcrumbs ?? shell.breadcrumbs ?? []
  const { title, lead, ...rest } = hero
  return (
    <PortalShell
      active={shell.active}
      breadcrumbs={crumbs}
      hero={<StoryHero breadcrumbs={crumbs} title={title ?? shell.pageTitle ?? ''} lead={lead ?? shell.pageSubtitle} {...rest} />}
    >
      {children}
    </PortalShell>
  )
}

/** Bloque de texto corrido dentro de una banda. */
export function StoryProse({ children, tone = 'paper', className }: { children: React.ReactNode; tone?: 'paper' | 'night'; className?: string }) {
  return (
    <div
      className={[
        'mx-auto max-w-3xl space-y-gob-4 text-gri-body leading-[1.65] min-[600px]:text-[1.0625rem]',
        tone === 'night' ? 'text-white/85 [&_strong]:text-white' : 'text-gob-text [&_strong]:font-semibold',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}
