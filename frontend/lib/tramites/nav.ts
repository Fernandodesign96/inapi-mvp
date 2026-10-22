import { URLS_EXTERNAS } from './catalogs'

export type TramitesDomain = 'marcas' | 'patentes'

export type MegaItem = {
  label: string
  href: string
  tooltip: string
  stub?: boolean
  external?: boolean
}

export type MegaColumn = {
  title: string
  items: MegaItem[]
}

function ext(label: string, href: string, tooltip: string): MegaItem {
  return { label, href, tooltip, external: true }
}

export const MARCAS_MEGA: MegaColumn[] = [
  {
    title: 'Cambios y documentos',
    items: [
      {
        label: 'Cambios guardados de marcas',
        href: '/tramites/marcas/anotaciones-guardadas',
        tooltip: 'Revisa cambios guardados de marcas',
      },
      {
        label: 'Adjuntar documentos a tu solicitud de marca',
        href: '/tramites/marcas/escritos',
        tooltip: 'Adjunta documentos a una solicitud de marca',
      },
    ],
  },
  {
    title: 'Tramitación',
    items: [
      {
        label: 'Solicitar marca',
        href: '/tramites/marcas/solicitar',
        tooltip: 'Inicia una solicitud nueva de marca',
      },
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
      {
        label: 'Estado de mis solicitudes de marca',
        href: '/tramites/notificaciones?ambito=marcas',
        tooltip: 'Revisa el estado de tus solicitudes de marca',
      },
      {
        label: 'Borradores de solicitudes de marca',
        href: '/tramites/marcas/solicitudes-guardadas',
        tooltip: 'Retoma un borrador. Los borradores se eliminan a los 60 días.',
      },
      {
        label: 'Realiza otras solicitudes y presentaciones de marcas',
        href: '/tramites/marcas/tramites',
        tooltip: 'Renovaciones, anotaciones, escritos, oposición, Madrid y custodia en un solo paso',
      },
    ],
  },
  {
    title: 'Pagos',
    items: [
      ext(
        'Pagar publicación en el Diario Oficial',
        URLS_EXTERNAS.diarioOficialMarcas,
        'Paga la publicación de tu marca en el Diario Oficial',
      ),
      {
        label: 'Realiza todos tus pagos de marcas aquí',
        href: '/tramites/marcas/pagos',
        tooltip: 'Concesión, otros pagos y comprobante Formulario 10 en un solo paso',
      },
    ],
  },
  {
    title: 'Mis documentos y otras consultas',
    items: [
      {
        label: 'Estados diarios de marcas',
        href: '/tramites/marcas/estados-diarios',
        tooltip: 'Descarga los estados diarios de marcas',
      },
      {
        label: 'Gaceta de marcas',
        href: '/tramites/marcas/gaceta',
        tooltip: 'Descarga la gaceta de marcas nuevas',
      },
      {
        label: 'Expedientes digitales de marcas',
        href: '/tramites/marcas/documentos',
        tooltip: 'Abre el expediente digital de una marca',
      },
      ext(
        'Consulta de marca, registro y dominio',
        URLS_EXTERNAS.consultaMarcaDominio,
        'Consulta marcas, empresas y dominios .cl',
      ),
      {
        label: 'Datos abiertos de marcas',
        href: '/tramites/marcas/datos-abiertos',
        tooltip: 'Descarga listados de marcas en datos.gob.cl',
      },
      {
        label: 'Libro de registro de marcas',
        href: '/tramites/marcas/libro-registro',
        tooltip: 'Consulta el libro de registro de marcas',
      },
      {
        label: 'Certificados de marcas',
        href: '/tramites/marcas/certificados',
        tooltip: 'Pide un certificado de tu marca',
      },
      {
        label: 'Verificar certificados de marcas',
        href: '/tramites/marcas/verificar-titulos',
        tooltip: 'Valida un título o certificado con CVE',
      },
      {
        label: 'Descargar formularios (PDF)',
        href: '/tramites/marcas/formularios',
        tooltip: 'Descarga formularios PDF de marcas',
      },
    ],
  },
]

export const PATENTES_MEGA: MegaColumn[] = [
  {
    title: 'Cambios y documentos',
    items: [
      {
        label: 'Cambios guardados de patentes',
        href: '/tramites/patentes/anotaciones-guardadas',
        tooltip: 'Revisa cambios guardados de patentes',
      },
      {
        label: 'Adjuntar documentos a tu solicitud de patente',
        href: '/tramites/patentes/escritos',
        tooltip: 'Adjunta documentos a una solicitud de patente',
      },
      {
        label: 'Documentos de representación legal',
        href: '/tramites/custodia-poderes',
        tooltip: 'Sube el poder notarial de quien tramita en tu nombre',
      },
    ],
  },
  {
    title: 'Tramitación',
    items: [
      {
        label: 'Solicitar patente',
        href: '/tramites/patentes/solicitar',
        tooltip: 'Inicia una solicitud de patente o modelo de utilidad',
      },
      {
        label: 'Solicitar diseño',
        href: '/tramites/patentes/solicitar-diseno',
        tooltip: 'Inicia un diseño o dibujo industrial',
      },
      {
        label: 'Buscador de patentes',
        href: '/tramites/patentes/buscador',
        tooltip: 'Busca patentes, modelos de utilidad y diseños',
      },
      {
        label: 'Estado de mis solicitudes de patentes',
        href: '/tramites/notificaciones?ambito=patentes',
        tooltip: 'Revisa el estado de tus solicitudes de patentes',
      },
      {
        label: 'Borradores de solicitudes de patente',
        href: '/tramites/patentes/solicitudes-guardadas',
        tooltip: 'Retoma un borrador. Los borradores se eliminan a los 60 días.',
      },
      {
        label: 'Cambios en solicitudes de patentes',
        href: '/tramites/patentes/anotaciones',
        tooltip: 'Registra cambios de tu patente, modelo o diseño',
      },
      {
        label: 'Adjuntar documentos a tu solicitud de patente',
        href: '/tramites/patentes/presentar-escritos',
        tooltip: 'Adjunta documentos a una solicitud, un cambio o una nulidad',
      },
    ],
  },
  {
    title: 'Pagos',
    items: [
      ext(
        'Pagar publicación en el Diario Oficial',
        URLS_EXTERNAS.diarioOficialPatentes,
        'Paga la publicación de tu patente en el Diario Oficial',
      ),
      {
        label: 'Realiza todos tus pagos de patentes aquí',
        href: '/tramites/patentes/pagos',
        tooltip: 'Presentación, peritaje, derechos, PCT, otros pagos y comprobante en un solo paso',
      },
    ],
  },
  {
    title: 'Mis documentos y otras consultas',
    items: [
      {
        label: 'Estados diarios de patentes',
        href: '/tramites/patentes/estados-diarios',
        tooltip: 'Descarga los estados diarios de patentes',
      },
      {
        label: 'Expedientes digitales de patentes',
        href: '/tramites/patentes/documentos',
        tooltip: 'Abre el expediente digital de una patente',
      },
      {
        label: 'Libro de registro de patentes',
        href: '/tramites/patentes/libro-registro',
        tooltip: 'Consulta el libro de registro de patentes',
      },
      {
        label: 'Datos abiertos de patentes',
        href: '/tramites/patentes/datos-abiertos',
        tooltip: 'Descarga listados de patentes en datos.gob.cl',
      },
      {
        label: 'Títulos y certificados de patentes',
        href: '/tramites/patentes/certificados',
        tooltip: 'Pide un certificado de tu patente',
      },
      {
        label: 'Verificar certificados de patentes',
        href: '/tramites/patentes/verificar-titulos',
        tooltip: 'Valida un título o certificado con CVE',
      },
      {
        label: 'Descargar formularios (PDF)',
        href: '/tramites/patentes/formularios',
        tooltip: 'Descarga formularios PDF de patentes',
      },
      {
        label: 'Documentación mínima PCT',
        href: '/tramites/patentes/documentacion-pct',
        tooltip: 'Authority File y XML de la colección nacional de patentes',
      },
    ],
  },
]

export const TRAMITES_SECONDARY_NAV = [
  { label: 'Solicitar marca', hint: 'Presenta una nueva solicitud de registro de marca en línea', href: '/tramites/marcas/solicitar' },
  { label: 'Solicitar patente', hint: 'Presenta una solicitud de patente, modelo de utilidad o diseño', href: '/tramites/patentes/solicitar' },
  { label: 'Buscador de marcas', hint: 'Buscador de marcas: revisa si existen marcas parecidas a la tuya', href: '/marcas/buscador-similitud' },
  { label: 'Buscador de productos y servicios', hint: 'Buscador de productos y servicios: te sugiere la clase de Niza', href: '/tramites/marcas/clasificador' },
  { label: 'Buscador de patentes', hint: 'Buscador de patentes: consulta solicitudes y registros publicados', href: '/tramites/patentes/buscador' },
  { label: 'Mis solicitudes', hint: 'Estado de mis solicitudes: avisos y plazos de tus trámites', href: '/tramites/notificaciones' },
  { label: 'Estado público', hint: 'Estado público de solicitudes: notificaciones diarias de INAPI', href: '/notificaciones-diarias' },
] as const

function splitHref(href: string) {
  const [path, query = ''] = href.split('?')
  return { path, query }
}

type PageHeading = { title: string; subtitle?: string; domain: TramitesDomain | 'general' }

function withDot(text?: string) {
  if (!text) return undefined
  const trimmed = text.trim()
  return /[.!?…]$/.test(trimmed) ? trimmed : `${trimmed}.`
}

function titlesFromMega(columns: MegaColumn[], domain: TramitesDomain) {
  const out: Record<string, PageHeading> = {}
  for (const col of columns) {
    for (const item of col.items) {
      if (item.external) continue
      const { path } = splitHref(item.href)
      if (out[path]) continue
      out[path] = { title: item.label, subtitle: withDot(item.tooltip), domain }
    }
  }
  return out
}

function headingSubtitle(tooltip?: string, fallback?: string) {
  return withDot(tooltip) ?? fallback
}

/** Título de la franja: coincide con el atajo elegido (incl. query). */
export function resolveTramitesHeading(pathname: string, search = '') {
  const query = search.replace(/^\?/, '')
  const items: MegaItem[] = [
    ...MARCAS_MEGA.flatMap(col => col.items),
    ...PATENTES_MEGA.flatMap(col => col.items),
    ...TRAMITES_SECONDARY_NAV.map(item => ({ ...item, tooltip: '' })),
  ]
  const exact = items.find(item => {
    if (item.external) return false
    const { path, query: itemQuery } = splitHref(item.href)
    return path === pathname && itemQuery === query
  })
  const pathMatch = items.find(item => {
    if (item.external) return false
    const { path, query: itemQuery } = splitHref(item.href)
    return path === pathname && !itemQuery
  })
  const meta = PAGE_TITLES[pathname]
  if (exact) {
    return {
      title: exact.label,
      subtitle: headingSubtitle(exact.tooltip, meta?.subtitle),
      domain: meta?.domain ?? 'general',
    }
  }
  if (pathMatch) {
    return {
      title: pathMatch.label,
      subtitle: headingSubtitle(pathMatch.tooltip, meta?.subtitle),
      domain: meta?.domain ?? 'general',
    }
  }
  if (meta) return meta
  return { title: 'Portal de trámites de INAPI', domain: 'general' as const }
}

const MEGA_PAGE_TITLES = {
  ...titlesFromMega(MARCAS_MEGA, 'marcas'),
  ...titlesFromMega(PATENTES_MEGA, 'patentes'),
}

const MARCAS_TRAMITES_HEADING: PageHeading = MEGA_PAGE_TITLES['/tramites/marcas/tramites'] ?? {
  title: 'Realiza otras solicitudes y presentaciones de marcas',
  subtitle: 'Renovaciones, anotaciones, escritos, oposición, Madrid y custodia en un solo paso.',
  domain: 'marcas',
}
const MARCAS_PAGOS_HEADING: PageHeading = MEGA_PAGE_TITLES['/tramites/marcas/pagos'] ?? {
  title: 'Realiza todos tus pagos de marcas aquí',
  subtitle: 'Concesión, otros pagos y comprobante Formulario 10 en un solo paso.',
  domain: 'marcas',
}
const PATENTES_PAGOS_HEADING: PageHeading = MEGA_PAGE_TITLES['/tramites/patentes/pagos'] ?? {
  title: 'Realiza todos tus pagos de patentes aquí',
  subtitle: 'Presentación, peritaje, derechos, PCT, otros pagos y comprobante en un solo paso.',
  domain: 'patentes',
}

export const PAGE_TITLES: Record<string, PageHeading> = {
  '/tramites': {
    title: 'Portal de trámites de INAPI',
    subtitle: 'Aquí presentas solicitudes, pagas y sigues el expediente.',
    domain: 'general',
  },
  ...MEGA_PAGE_TITLES,
  '/tramites/notificaciones': {
    title: 'Estado de mis solicitudes',
    subtitle: 'Revisa el estado de tus solicitudes de marcas y patentes.',
    domain: 'general',
  },
  '/tramites/custodia-poderes': {
    title: 'Documentos de representación legal',
    subtitle: 'Sube el poder notarial de quien tramita en tu nombre.',
    domain: 'general',
  },
  '/tramites/categoria/tramitacion': {
    title: 'Tramitación',
    subtitle: 'Solicita, busca antes de presentar y retoma tus borradores.',
    domain: 'general',
  },
  '/tramites/categoria/cambios': {
    title: 'Cambios y documentos',
    subtitle: 'Adjunta escritos, revisa cambios guardados y sube poderes.',
    domain: 'general',
  },
  '/tramites/categoria/pagos': {
    title: 'Pagos',
    subtitle: 'Paga tasas, publicaciones y descarga tus comprobantes.',
    domain: 'general',
  },
  '/tramites/categoria/documentos': {
    title: 'Mis documentos',
    subtitle: 'Expedientes, certificados, estados diarios y formularios.',
    domain: 'general',
  },
  '/tramites/auth': { title: 'Iniciar sesión', domain: 'general' },
  '/tramites/ingresar': { title: 'Ingresar con Clave INAPI', domain: 'general' },
  '/tramites/solicitudmarca': { title: 'Solicitud de marca', domain: 'marcas' },
  '/tramites/registrarse': { title: 'Regístrate en trámites INAPI', domain: 'general' },
  '/tramites/clave-unica': { title: 'Validación con ClaveÚnica', domain: 'general' },
  '/tramites/perfil': { title: 'Mi perfil', domain: 'general' },
  '/tramites/patentes/buscador/avanzada': {
    title: 'Búsqueda avanzada de patentes',
    subtitle: 'Afina la búsqueda por número, titular, fechas o clasificación.',
    domain: 'patentes',
  },
  '/tramites/marcas/presentar-escritos': MARCAS_TRAMITES_HEADING,
  '/tramites/marcas/madrid': MARCAS_TRAMITES_HEADING,
  '/tramites/marcas/renovaciones': MARCAS_TRAMITES_HEADING,
  '/tramites/marcas/anotaciones': MARCAS_TRAMITES_HEADING,
  '/tramites/marcas/oposicion': MARCAS_TRAMITES_HEADING,
  '/tramites/marcas/pago-concesion': MARCAS_PAGOS_HEADING,
  '/tramites/marcas/otros-pagos': MARCAS_PAGOS_HEADING,
  '/tramites/marcas/comprobante-pago': MARCAS_PAGOS_HEADING,
  '/tramites/patentes/pago-presentacion': PATENTES_PAGOS_HEADING,
  '/tramites/patentes/pago-arancel-pericial': PATENTES_PAGOS_HEADING,
  '/tramites/patentes/pago-derechos-finales': PATENTES_PAGOS_HEADING,
  '/tramites/patentes/pago-pct': PATENTES_PAGOS_HEADING,
  '/tramites/patentes/otros-pagos': PATENTES_PAGOS_HEADING,
  '/tramites/patentes/comprobante-pago': PATENTES_PAGOS_HEADING,
  '/tramites/pago': { title: 'Pago en Tesorería', domain: 'general' },
  '/tramites/pago-tgr': { title: 'Pago de tasas INAPI', domain: 'general' },
  '/tramites/proximamente': { title: 'Próxima entrega', domain: 'general' },
}
