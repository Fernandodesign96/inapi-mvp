import { MARCAS_MEGA, PATENTES_MEGA, type MegaItem, type TramitesDomain } from './nav'

export type TramitesCategoryId = 'tramitacion' | 'cambios' | 'pagos' | 'documentos'

export type TramitesCategory = {
  id: TramitesCategoryId
  /** Título de la columna en MARCAS_MEGA / PATENTES_MEGA. */
  column: string
  label: string
  description: string
}

export const TRAMITES_CATEGORIES: TramitesCategory[] = [
  {
    id: 'tramitacion',
    column: 'Tramitación',
    label: 'Tramitación',
    description: 'Solicita, busca antes de presentar y retoma tus borradores.',
  },
  {
    id: 'cambios',
    column: 'Cambios y documentos',
    label: 'Cambios y documentos',
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

export function categoryById(id: string) {
  return TRAMITES_CATEGORIES.find(c => c.id === id)
}

export function categoryHref(id: TramitesCategoryId) {
  return `/tramites/categoria/${id}`
}

export function categoryItems(id: TramitesCategoryId, scope: TramitesDomain): MegaItem[] {
  const category = categoryById(id)
  if (!category) return []
  const columns = scope === 'marcas' ? MARCAS_MEGA : PATENTES_MEGA
  return columns.find(col => col.title === category.column)?.items ?? []
}

/* Preferencias del dashboard persistidas en localStorage. */

const PREFS_EVENT = 'tramites-dashboard-prefs'

export type DashboardPrefs = { scope: TramitesDomain; collapsed: boolean }

const DEFAULT_PREFS: DashboardPrefs = { scope: 'marcas', collapsed: false }
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
