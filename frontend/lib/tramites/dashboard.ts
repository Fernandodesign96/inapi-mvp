import { MARCAS_MEGA, PATENTES_MEGA, type MegaItem, type TramitesDomain } from './nav'

export type TramitesCategoryId = 'herramientas' | 'tramitacion' | 'cambios' | 'pagos' | 'documentos'

export type TramitesCategory = {
  id: TramitesCategoryId
  /** Título de la columna en MARCAS_MEGA / PATENTES_MEGA. Vacío si la lista es explícita. */
  column: string
  label: string
  description: string
}

export const TRAMITES_CATEGORIES: TramitesCategory[] = [
  {
    id: 'herramientas',
    column: '',
    label: 'Herramientas',
    description: 'Busca marcas, productos o patentes antes de presentar.',
  },
  {
    id: 'tramitacion',
    column: 'Tramitación',
    label: 'Empezar un trámite',
    description: 'Inicia una solicitud nueva o retoma un borrador.',
  },
  {
    id: 'cambios',
    column: 'Cambios y documentos',
    label: 'Solicitar documentos',
    description: 'Adjunta escritos, revisa cambios guardados y sube poderes.',
  },
  {
    id: 'pagos',
    column: 'Pagos',
    label: 'Pagos',
    description: 'Paga tasas, publicaciones y descarga tus comprobantes.',
  },
  {
    id: 'documentos',
    column: 'Mis documentos y otras consultas',
    label: 'Mis documentos',
    description: 'Expedientes, certificados, estados diarios y formularios.',
  },
]

const HERRAMIENTAS: Record<TramitesDomain, MegaItem[]> = {
  marcas: [
    {
      label: 'Buscador de marcas',
      href: '/marcas/buscador-similitud',
      tooltip: 'Compara tu nombre con marcas anteriores',
    },
    {
      label: 'Buscador de productos y servicios',
      href: '/tramites/marcas/clasificador',
      tooltip: 'Busca productos y servicios y te sugiere la clase de Niza',
    },
  ],
  patentes: [
    {
      label: 'Buscador de patentes',
      href: '/tramites/patentes/buscador',
      tooltip: 'Busca patentes, modelos de utilidad y diseños',
    },
  ],
}

const HERRAMIENTAS_HREFS = new Set(Object.values(HERRAMIENTAS).flat().map(item => item.href))

export function categoryById(id: string) {
  return TRAMITES_CATEGORIES.find(c => c.id === id)
}

export function pathOf(href: string) {
  return href.split('?')[0]
}

export function tramitesPath(pathname: string) {
  return pathname.replace(/^\/inapi-mvp(?=\/|$)/, '') || '/'
}

export function categoryItems(id: TramitesCategoryId, scope: TramitesDomain): MegaItem[] {
  if (id === 'herramientas') return HERRAMIENTAS[scope]
  const category = categoryById(id)
  if (!category) return []
  const columns = scope === 'marcas' ? MARCAS_MEGA : PATENTES_MEGA
  const items = columns.find(col => col.title === category.column)?.items ?? []
  if (id === 'tramitacion') return items.filter(item => !HERRAMIENTAS_HREFS.has(item.href))
  return items
}

export function scopeFromPath(pathname: string, fallback: TramitesDomain): TramitesDomain {
  if (pathname.includes('/patentes')) return 'patentes'
  if (pathname.includes('/marcas')) return 'marcas'
  return fallback
}

export function categoryForPath(pathname: string) {
  if (pathname === '/tramites/notificaciones') return TRAMITES_CATEGORIES.find(c => c.id === 'tramitacion')
  return TRAMITES_CATEGORIES.find(cat => {
    return (['marcas', 'patentes'] as const).some(s =>
      categoryItems(cat.id, s).some(item => {
        const itemPath = pathOf(item.href)
        if (item.external || itemPath === '/tramites/notificaciones') return false
        return itemPath === pathname
      }),
    )
  })
}

const TO_PATENTES: Record<string, string> = {
  '/tramites/marcas/solicitar': '/tramites/patentes/solicitar',
  '/tramites/marcas/clasificador': '/tramites/patentes/buscador',
  '/tramites/marcas/solicitudes-guardadas': '/tramites/patentes/solicitudes-guardadas',
  '/tramites/marcas/tramites': '/tramites/patentes/tramites',
  '/tramites/marcas/pagos': '/tramites/patentes/pagos',
  '/tramites/marcas/escritos': '/tramites/patentes/escritos',
  '/tramites/marcas/anotaciones-guardadas': '/tramites/patentes/anotaciones-guardadas',
  '/tramites/marcas/certificados': '/tramites/patentes/certificados',
  '/tramites/marcas/verificar-titulos': '/tramites/patentes/verificar-titulos',
  '/tramites/marcas/formularios': '/tramites/patentes/formularios',
  '/tramites/marcas/estados-diarios': '/tramites/patentes/estados-diarios',
  '/tramites/marcas/libro-registro': '/tramites/patentes/libro-registro',
  '/tramites/marcas/datos-abiertos': '/tramites/patentes/datos-abiertos',
  '/tramites/marcas/documentos': '/tramites/patentes/documentos',
  '/marcas/buscador-similitud': '/tramites/patentes/buscador',
  '/tramites/marcas/gaceta': '/tramites/patentes/estados-diarios',
}

const TO_MARCAS: Record<string, string> = {
  ...Object.fromEntries(Object.entries(TO_PATENTES).map(([from, to]) => [to, from])),
  '/tramites/patentes/solicitar-diseno': '/tramites/marcas/solicitar',
  '/tramites/patentes/presentar-escritos': '/tramites/marcas/escritos',
  '/tramites/patentes/anotaciones': '/tramites/marcas/tramites',
  '/tramites/patentes/tramites': '/tramites/marcas/tramites',
  '/tramites/patentes/documentacion-pct': '/tramites/marcas/datos-abiertos',
  '/tramites/patentes/buscador/avanzada': '/tramites/marcas/clasificador',
}

export function counterpartHref(pathname: string, search: string, target: TramitesDomain): string {
  const path = tramitesPath(pathname)
  if (path === '/tramites' || path === '/') return '/tramites'
  if (path === '/tramites/notificaciones') return `/tramites/notificaciones?ambito=${target}`
  if (path === '/tramites/custodia-poderes') {
    return target === 'patentes' ? '/tramites/patentes/tramites?tipo=poderes' : '/tramites/marcas/tramites?tipo=poderes'
  }
  const mapped = target === 'patentes' ? TO_PATENTES[path] : TO_MARCAS[path]
  if (mapped) return mapped
  const cat = categoryForPath(path)
  if (cat) {
    const items = categoryItems(cat.id, target).filter(item => !item.external)
    if (items[0]) return items[0].href
  }
  return target === 'patentes' ? '/tramites/patentes/solicitar' : '/tramites/marcas/solicitar'
}

/* Preferencias del dashboard persistidas en localStorage. */

const PREFS_EVENT = 'tramites-dashboard-prefs'

export type DashboardPrefs = { scope: TramitesDomain; collapsed: boolean; persona: 'frecuente' | 'natural' | 'nuevo' }

const DEFAULT_PREFS: DashboardPrefs = { scope: 'marcas', collapsed: false, persona: 'frecuente' }
const PREFS_KEY = 'inapi-tramites-dashboard'

let cachedRaw: string | null | undefined
let cachedPrefs: DashboardPrefs = DEFAULT_PREFS

export function readDashboardPrefs(): DashboardPrefs {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(PREFS_KEY)
  } catch {
    return DEFAULT_PREFS
  }
  if (raw === cachedRaw) return cachedPrefs
  cachedRaw = raw
  try {
    const parsed = raw ? (JSON.parse(raw) as Partial<DashboardPrefs>) : {}
    cachedPrefs = {
      scope: parsed.scope === 'patentes' ? 'patentes' : 'marcas',
      collapsed: parsed.collapsed === true,
      persona: parsed.persona === 'natural' || parsed.persona === 'nuevo' ? parsed.persona : 'frecuente',
    }
  } catch {
    cachedPrefs = DEFAULT_PREFS
  }
  return cachedPrefs
}

export function serverDashboardPrefs(): DashboardPrefs {
  return DEFAULT_PREFS
}

export function writeDashboardPrefs(patch: Partial<DashboardPrefs>) {
  const next = { ...readDashboardPrefs(), ...patch }
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(next))
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(PREFS_EVENT))
}

export function subscribeDashboardPrefs(callback: () => void) {
  window.addEventListener(PREFS_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(PREFS_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}
