/** Navegación dura para export estático (el App Router a veces no cambia de URL desde diálogos). */
export function goTramites(path: string) {
  const href = path.startsWith('/') ? path : `/${path}`
  const url = new URL(`/inapi-mvp${href}`, window.location.origin)
  window.location.assign(url.href)
}
