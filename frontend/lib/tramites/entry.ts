const AUTH_PREFIXES = ['/tramites/auth', '/tramites/clave-unica']

export function isAuthPath(href: string) {
  const path = href.split('?')[0]
  if (path === '/tramites') return true
  return AUTH_PREFIXES.some(prefix => path === prefix || path.startsWith(`${prefix}/`))
}

export function nextAfterAuth(search: string, fallback = '/tramites') {
  const query = search.startsWith('?') ? search.slice(1) : search
  const next = new URLSearchParams(query).get('next')
  if (next?.startsWith('/') && !isAuthPath(next)) return next
  return fallback
}

export function loginHref(currentPath?: string) {
  const path = currentPath?.split('?')[0]
  if (!path || path === '/tramites' || isAuthPath(path)) return '/tramites'
  return `/tramites?next=${encodeURIComponent(currentPath!)}`
}

export function resolveTramitesHref(href: string, authenticated: boolean) {
  if (!authenticated || !href.startsWith('/tramites')) return href
  if (!isAuthPath(href)) return href
  return nextAfterAuth(href.includes('?') ? href.slice(href.indexOf('?')) : '', '/tramites')
}
