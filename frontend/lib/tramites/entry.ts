const AUTH_PREFIXES = ['/tramites/auth', '/tramites/ingresar', '/tramites/clave-unica', '/tramites/registrarse']

export function isAuthPath(href: string) {
  const path = href.split('?')[0]
  return AUTH_PREFIXES.some(prefix => path === prefix || path.startsWith(`${prefix}/`))
}

export function nextAfterAuth(search: string, fallback = '/tramites') {
  const query = search.startsWith('?') ? search.slice(1) : search
  const next = new URLSearchParams(query).get('next')
  if (next?.startsWith('/') && !isAuthPath(next)) return next
  return fallback
}

export function loginHref(currentPath?: string) {
  if (!currentPath || isAuthPath(currentPath)) return '/tramites/ingresar'
  return `/tramites/ingresar?next=${encodeURIComponent(currentPath)}`
}

export function resolveTramitesHref(href: string, authenticated: boolean) {
  if (!authenticated || !href.startsWith('/tramites')) return href
  if (!isAuthPath(href)) return href
  return nextAfterAuth(href.includes('?') ? href.slice(href.indexOf('?')) : '', '/tramites')
}
