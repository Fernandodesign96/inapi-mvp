/**
 * Mapa de rutas del portal INAPI — alineado a pantallas Claude Design
 */

export type PortalNavId =
  | 'home'
  | 'nosotros'
  | 'conoce'
  | 'marcas'
  | 'patentes'
  | 'buscador'
  | 'tramites'
  | 'prensa'
  | 'contacto'
  /** @deprecated Usar prensa para Sala de Prensa */
  | 'conecta'

/** Barra principal del header (diseño Claude v3 / Ctrl+U) */
export const PORTAL_PRIMARY_NAV = [
  { id: 'nosotros' as const, label: 'Nosotros', href: '/nosotros' },
  { id: 'conoce' as const, label: 'Conoce más', href: '/conoce-mas' },
  { id: 'marcas' as const, label: 'Marcas', href: '/marcas' },
  { id: 'patentes' as const, label: 'Patentes', href: '/patentes' },
  { id: 'buscador' as const, label: 'Buscador', href: '/buscar' },
  { id: 'tramites' as const, label: 'Trámites', href: '/tramites-digitales' },
  { id: 'prensa' as const, label: 'Sala de Prensa', href: '/sala-de-prensa' },
  { id: 'contacto' as const, label: 'Contacto', href: '/contacto' },
] satisfies { id: PortalNavId; label: string; href: string }[]

/** Subheader — enlaces secundarios */
export const PORTAL_SECONDARY_NAV = [
  { label: 'PCT', href: '/patentes/pct' },
  { label: 'Sistema de Madrid', href: '/marcas/sistema-de-madrid' },
  { label: 'Sello de Origen', href: '/sello-de-origen' },
  { label: 'Aprende', href: '/aprende' },
  { label: 'Conecta', href: '/conecta' },
  { label: 'Centro de Documentación', href: '/documentacion' },
  { label: 'Glosario', href: '/glosario' },
  { label: 'Observancia', href: '/observancia' },
  { label: 'Preguntas Frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Datos Abiertos', href: '/datos-abiertos' },
  { label: 'Gasto Presupuestario', href: '/transparencia/gasto-presupuestario' },
] as const

/** @deprecated Usar PORTAL_PRIMARY_NAV */
export const PORTAL_NAV = PORTAL_PRIMARY_NAV

export type BreadcrumbItem = { label: string; href?: string }

export type PageMeta = {
  slug: string
  path: string
  title: string
  description?: string
  section?: { label: string; href: string }
  current?: string
  navActive?: PortalNavId
}

/** Metadatos por pantalla — fuente: extracted/index.json + diseños */
export const PORTAL_PAGES: PageMeta[] = [
  { slug: 'INAPI', path: '/', title: 'Portal INAPI', navActive: 'home' },
  {
    slug: 'Marcas',
    path: '/marcas',
    title: 'Marcas',
    description:
      'Registra una marca para proteger el nombre, el logo o la frase que identifica lo que ofreces.',
    navActive: 'marcas',
    current: 'Marcas',
  },
  {
    slug: 'Buscador-de-Anterioridades',
    path: '/marcas/buscador-similitud',
    title: 'Buscador de similitud de marcas',
    description: 'Usa esta herramienta antes de iniciar la solicitud de tu marca.',
    section: { label: 'Marcas', href: '/marcas' },
    current: 'Buscador de similitud de marcas',
    navActive: 'marcas',
  },
  {
    slug: 'Marcas-Para-Informarse',
    path: '/marcas/como-registrar',
    title: 'Cómo registrar una marca',
    section: { label: 'Marcas', href: '/marcas' },
    current: 'Cómo registrar una marca',
    navActive: 'marcas',
  },
  {
    slug: 'Marcas-Solicitud-Nueva',
    path: '/marcas/solicitud-nueva',
    title: 'Solicitud nueva de marca',
    section: { label: 'Marcas', href: '/marcas' },
    current: 'Solicitud nueva',
    navActive: 'marcas',
  },
  {
    slug: 'Sistema-de-Madrid',
    path: '/marcas/sistema-de-madrid',
    title: 'Sistema de Madrid',
    section: { label: 'Marcas', href: '/marcas' },
    current: 'Sistema de Madrid',
    navActive: 'marcas',
  },
  {
    slug: 'Patentes',
    path: '/patentes',
    title: 'Patentes',
    description:
      'Registra una patente para proteger un invento y obtener el derecho exclusivo a usarlo.',
    navActive: 'patentes',
    current: 'Patentes',
  },
  {
    slug: 'Patentes-Para-Informarse',
    path: '/patentes/como-registrar',
    title: 'Cómo registrar una patente',
    section: { label: 'Patentes', href: '/patentes' },
    current: 'Cómo registrar una patente',
    navActive: 'patentes',
  },
  {
    slug: 'PCT',
    path: '/patentes/pct',
    title: 'PCT',
    description:
      'El Tratado de Cooperación en materia de Patentes (PCT) es un sistema de presentación de solicitudes, no de concesión.',
    section: { label: 'Patentes', href: '/patentes' },
    current: 'PCT',
    navActive: 'patentes',
  },
  {
    slug: 'Acerca-de-INAPI',
    path: '/nosotros',
    title: 'Acerca de INAPI',
    navActive: 'nosotros',
    current: 'INAPI',
  },
  { slug: 'Tramites-Digitales', path: '/tramites-digitales', title: 'Trámites digitales', navActive: 'tramites' },
  {
    slug: 'Preguntas-Frecuentes',
    path: '/preguntas-frecuentes',
    title: 'Preguntas frecuentes',
    description: 'Respuestas a las dudas más comunes sobre marcas, patentes y otros derechos.',
  },
  { slug: 'Glosario', path: '/glosario', title: 'Glosario de propiedad industrial' },
  {
    slug: 'Contacto',
    path: '/contacto',
    title: 'Contacto',
    navActive: 'contacto',
    current: 'Contacto',
  },
  {
    slug: 'SIAC',
    path: '/contacto/siac',
    title: 'Formulario de contacto (SIAC)',
    section: { label: 'Contacto', href: '/contacto' },
    current: 'SIAC',
    navActive: 'contacto',
  },
  { slug: 'Aprende', path: '/aprende', title: 'Aprende de propiedad industrial' },
  {
    slug: 'Conecta',
    path: '/conecta',
    title: 'Conecta',
    navActive: 'conecta',
    current: 'Conecta',
  },
  { slug: 'Conoce-Mas', path: '/conoce-mas', title: 'Conoce más', navActive: 'conoce' },
  {
    slug: 'Sala-de-Prensa',
    path: '/sala-de-prensa',
    title: 'Sala de Prensa',
    navActive: 'prensa',
    current: 'Sala de Prensa',
  },
  {
    slug: 'Noticia-Cuenta-Publica-2026',
    path: '/sala-de-prensa/cuenta-publica-2026',
    title: 'Cuenta Pública Participativa 2026',
    section: { label: 'Sala de Prensa', href: '/sala-de-prensa' },
    current: 'Noticia',
  },
  {
    slug: 'Noticia-Patentes-Nacionales',
    path: '/sala-de-prensa/patentes-nacionales-2026',
    title: 'Récord de patentes nacionales',
    section: { label: 'Sala de Prensa', href: '/sala-de-prensa' },
    current: 'Noticia',
  },
  {
    slug: 'Centro-de-Documentacion',
    path: '/documentacion',
    title: 'Centro de documentación',
  },
  {
    slug: 'Estadisticas',
    path: '/documentacion/estadisticas',
    title: 'Estadísticas',
    section: { label: 'Centro de documentación', href: '/documentacion' },
    current: 'Estadísticas',
  },
  { slug: 'Datos-Abiertos', path: '/datos-abiertos', title: 'Datos abiertos' },
  {
    slug: 'Gasto-Presupuestario',
    path: '/transparencia/gasto-presupuestario',
    title: 'Gasto presupuestario',
  },
  {
    slug: 'Notificaciones-Diarias',
    path: '/notificaciones-diarias',
    title: 'Notificaciones diarias',
  },
  { slug: 'Observancia', path: '/observancia', title: 'Observancia' },
  { slug: 'Sello-de-Origen', path: '/sello-de-origen', title: 'Sello de Origen' },
  {
    slug: 'Buscador',
    path: '/buscar',
    title: 'Resultados de búsqueda',
    navActive: 'buscador',
  },
]

export function getPageMeta(path: string): PageMeta | undefined {
  return PORTAL_PAGES.find(p => p.path === path)
}
