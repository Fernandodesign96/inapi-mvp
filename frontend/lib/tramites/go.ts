import { resolveTramitesHref } from '@/lib/tramites/entry'
import { readSession } from '@/lib/tramites/session'

/** Navegación dura para export estático (el App Router a veces no cambia de URL desde diálogos). */
export function goTramites(path: string) {
  const href = path.startsWith('/') ? path : `/${path}`
  const dest = resolveTramitesHref(href, readSession().authenticated)
  const url = new URL(`/inapi-mvp${dest}`, window.location.origin)
  window.location.assign(url.href)
}
