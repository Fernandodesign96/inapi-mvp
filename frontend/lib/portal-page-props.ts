import type { SiteHeaderProps } from '@/components/layout/SiteHeader'
import { getPageMeta, type BreadcrumbItem, type PortalNavId } from '@/lib/portal-routes'

export function portalShellProps(path: string, overrides?: Partial<SiteHeaderProps>): SiteHeaderProps {
  const meta = getPageMeta(path)
  const breadcrumbs: BreadcrumbItem[] = []
  if (meta?.section) breadcrumbs.push({ label: meta.section.label, href: meta.section.href })
  const currentLabel = meta?.current ?? (path === '/' ? undefined : meta?.title)
  if (currentLabel) breadcrumbs.push({ label: currentLabel })

  return {
    variant: 'page',
    active: (meta?.navActive ?? 'home') as PortalNavId,
    pageTitle: meta?.title,
    pageSubtitle: meta?.description,
    breadcrumbs: breadcrumbs.length ? breadcrumbs : undefined,
    ...overrides,
  }
}
