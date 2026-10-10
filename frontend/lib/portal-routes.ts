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
  | 'faq'
  /** @deprecated Usar prensa para Sala de Prensa */
  | 'conecta'

/** Barra principal: atajos de mayor prioridad (sin repetir subheader ni chips del hero). */
export const PORTAL_PRIMARY_NAV = [
  { id: 'marcas' as const, label: 'Marcas', href: '/marcas' },
  { id: 'patentes' as const, label: 'Patentes', href: '/patentes' },
  { id: 'tramites' as const, label: 'Trámites digitales', href: '/tramites-digitales' },
  { id: 'faq' as const, label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { id: 'contacto' as const, label: 'Contacto', href: '/contacto' },
] satisfies { id: PortalNavId; label: string; href: string }[]

/** Subheader: atajos institucionales que no están en el header ni en otra sección del home. */
export const PORTAL_SECONDARY_NAV = [
  { label: 'Acerca de INAPI', href: '/nosotros' },
  { label: 'Conoce más', href: '/conoce-mas' },
  { label: 'Glosario', href: '/glosario' },
  { label: 'Observancia', href: '/observancia' },
  { label: 'Centro de documentación', href: '/documentacion' },
  { label: 'Conecta', href: '/conecta' },
  { label: 'Gasto presupuestario', href: '/transparencia/gasto-presupuestario' },
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
    title: 'Buscador de marcas',
    description: 'Usa esta herramienta antes de iniciar la solicitud de tu marca.',
    section: { label: 'Marcas', href: '/marcas' },
    current: 'Buscador de marcas',
    navActive: 'marcas',
  },
  {
    slug: 'Buscadores-de-Marcas',
    path: '/marcas/buscadores',
    title: 'Buscador de marcas',
    description:
      'Compara tu marca con las ya solicitadas o registradas y revisa el buscador de patentes.',
    section: { label: 'Marcas', href: '/marcas' },
    current: 'Buscador de marcas',
    navActive: 'buscador',
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
    description:
      'INAPI administra los derechos de propiedad industrial en Chile: registra, resuelve y publica marcas, patentes y otros derechos.',
    navActive: 'nosotros',
    current: 'Acerca de INAPI',
  },
  {
    slug: 'Tramites-Digitales',
    path: '/tramites-digitales',
    title: 'Trámites digitales',
    description:
      'Trámites de INAPI inscritos en el Registro Nacional de Trámites del Estado. Los inicias y terminas por internet, con ClaveÚnica.',
    navActive: 'tramites',
    current: 'Trámites digitales',
  },
  {
    slug: 'Preguntas-Frecuentes',
    path: '/preguntas-frecuentes',
    title: 'Preguntas frecuentes',
    description: 'Respuestas a las dudas más comunes sobre marcas, patentes y otros derechos.',
    navActive: 'faq',
    current: 'Preguntas frecuentes',
  },
  {
    slug: 'Glosario',
    path: '/glosario',
    title: 'Glosario de propiedad industrial',
    current: 'Glosario',
  },
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
  {
    slug: 'Aprende',
    path: '/aprende',
    title: 'Aprende de propiedad industrial',
    current: 'Aprende',
  },
  {
    slug: 'Conecta',
    path: '/conecta',
    title: 'Conecta',
    navActive: 'conecta',
    current: 'Conecta',
  },
  { slug: 'Conoce-Mas', path: '/conoce-mas', title: 'Conoce más', navActive: 'conoce', current: 'Conoce más' },
  {
    slug: 'Que-es-PI',
    path: '/conoce-mas/que-es-la-propiedad-intelectual-e-industrial',
    title: 'Qué es la propiedad intelectual e industrial',
    section: { label: 'Conoce más', href: '/conoce-mas' },
    current: 'Qué es la propiedad intelectual e industrial',
    navActive: 'conoce',
  },
  {
    slug: 'Conceptos-PI',
    path: '/conoce-mas/conceptos-fundamentales',
    title: 'Conceptos fundamentales',
    section: { label: 'Conoce más', href: '/conoce-mas' },
    current: 'Conceptos fundamentales',
    navActive: 'conoce',
  },
  {
    slug: 'Derechos-PI',
    path: '/conoce-mas/derechos-de-propiedad-intelectual',
    title: 'Derechos de la propiedad intelectual',
    section: { label: 'Conoce más', href: '/conoce-mas' },
    current: 'Derechos de la propiedad intelectual',
    navActive: 'conoce',
  },
  {
    slug: 'TDPI',
    path: '/conoce-mas/tribunal-de-propiedad-industrial',
    title: 'Tribunal de Propiedad Industrial',
    section: { label: 'Conoce más', href: '/conoce-mas' },
    current: 'Tribunal de Propiedad Industrial',
    navActive: 'conoce',
  },
  {
    slug: 'Historia-PI',
    path: '/conoce-mas/historia-propiedad-industrial',
    title: 'Historia de la propiedad industrial',
    description:
      'Hitos del registro de marcas y patentes en Chile, desde las primeras concesiones del siglo XIX hasta INAPI.',
    section: { label: 'Conoce más', href: '/conoce-mas' },
    current: 'Historia de la propiedad industrial',
    navActive: 'conoce',
  },
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
    description: 'Leyes, reglamento, directrices y estadísticas de propiedad industrial en Chile.',
    current: 'Centro de documentación',
  },
  {
    slug: 'Estadisticas',
    path: '/documentacion/estadisticas',
    title: 'Estadísticas',
    section: { label: 'Centro de documentación', href: '/documentacion' },
    current: 'Estadísticas',
  },
  { slug: 'Datos-Abiertos', path: '/datos-abiertos', title: 'Datos abiertos', current: 'Datos abiertos' },
  {
    slug: 'Gasto-Presupuestario',
    path: '/transparencia/gasto-presupuestario',
    title: 'Gasto presupuestario',
    description:
      'Presupuesto y ejecución de INAPI por subtítulo, según la Ley N.° 20.285 de Transparencia.',
    current: 'Gasto presupuestario',
  },
  {
    slug: 'Notificaciones-Diarias',
    path: '/notificaciones-diarias',
    title: 'Notificaciones INAPI',
    current: 'Notificaciones INAPI',
  },
  { slug: 'Observancia', path: '/observancia', title: 'Observancia', current: 'Observancia' },
  { slug: 'Sello-de-Origen', path: '/sello-de-origen', title: 'Sello de Origen', current: 'Sello de Origen' },
  {
    slug: 'Buscador',
    path: '/buscar',
    title: 'Resultados de búsqueda',
    navActive: 'buscador',
    current: 'Resultados de búsqueda',
  },
]

export function getPageMeta(path: string): PageMeta | undefined {
  return PORTAL_PAGES.find(p => p.path === path)
}
