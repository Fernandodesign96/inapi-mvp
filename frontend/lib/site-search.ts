import Fuse from 'fuse.js'
import { PORTAL_PAGES, PORTAL_PRIMARY_NAV, PORTAL_SECONDARY_NAV } from '@/lib/portal-routes'
import { PORTAL_SEARCH_INDEX, type PortalSearchResult } from '@/lib/portal-search-index'
import { MARCAS_MEGA, PAGE_TITLES, PATENTES_MEGA, TRAMITES_SECONDARY_NAV } from '@/lib/tramites/nav'

export type SiteSearchHit = PortalSearchResult & { keywords?: string }

function pathKey(href: string) {
  return href.split('?')[0]
}

function upsert(map: Map<string, SiteSearchHit>, item: SiteSearchHit) {
  const href = pathKey(item.href)
  if (!href.startsWith('/') || href.startsWith('http')) return
  const current = map.get(href)
  if (!current) {
    map.set(href, { ...item, href })
    return
  }
  const keywords = [current.keywords, item.keywords, item.title, item.summary]
    .filter(Boolean)
    .join(' ')
  if (item.summary && item.summary.length > (current.summary?.length ?? 0)) {
    map.set(href, { ...current, ...item, href, keywords })
  } else {
    map.set(href, { ...current, keywords })
  }
}

function buildIndex(): SiteSearchHit[] {
  const map = new Map<string, SiteSearchHit>()

  for (const row of PORTAL_SEARCH_INDEX) {
    upsert(map, row)
  }

  for (const page of PORTAL_PAGES) {
    upsert(map, {
      title: page.title,
      category: page.section?.label ?? (page.path.startsWith('/tramites') ? 'Trámites' : 'Portal'),
      summary: page.description ?? page.current ?? page.title,
      href: page.path,
      keywords: [page.slug.replaceAll('-', ' '), page.current, page.section?.label].filter(Boolean).join(' '),
    })
  }

  for (const item of [...PORTAL_PRIMARY_NAV, ...PORTAL_SECONDARY_NAV]) {
    upsert(map, {
      title: item.label,
      category: 'Portal',
      summary: item.label,
      href: item.href,
      keywords: item.label,
    })
  }

  for (const item of TRAMITES_SECONDARY_NAV) {
    upsert(map, {
      title: item.label,
      category: 'Trámites',
      summary: item.label,
      href: item.href,
      keywords: item.label,
    })
  }

  for (const col of [...MARCAS_MEGA, ...PATENTES_MEGA]) {
    const category = MARCAS_MEGA.includes(col) ? 'Marcas' : 'Patentes'
    for (const item of col.items) {
      if (item.external) continue
      upsert(map, {
        title: item.label,
        category,
        summary: item.tooltip || item.label,
        href: item.href,
        keywords: `${col.title} ${item.label} ${item.tooltip}`,
      })
    }
  }

  for (const [href, meta] of Object.entries(PAGE_TITLES)) {
    const title = meta.title.replace(/^[^•]+•\s*/, '')
    upsert(map, {
      title,
      category: meta.domain === 'marcas' ? 'Marcas' : meta.domain === 'patentes' ? 'Patentes' : 'Trámites',
      summary: meta.subtitle ?? meta.title,
      href,
      keywords: meta.title,
    })
  }

  return [...map.values()]
}

const SITE_SEARCH_INDEX = buildIndex()

const fuse = new Fuse(SITE_SEARCH_INDEX, {
  keys: [
    { name: 'title', weight: 0.45 },
    { name: 'keywords', weight: 0.25 },
    { name: 'summary', weight: 0.2 },
    { name: 'category', weight: 0.05 },
    { name: 'href', weight: 0.05 },
  ],
  threshold: 0.38,
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true,
})

export function searchSite(query: string): SiteSearchHit[] {
  const q = query.trim()
  if (!q) return SITE_SEARCH_INDEX
  return fuse.search(q).map(hit => hit.item)
}

export { SITE_SEARCH_INDEX }
