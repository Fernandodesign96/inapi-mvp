export type PortalSearchResult = {
  title: string
  category: string
  summary: string
  href: string
}

export const PORTAL_SEARCH_INDEX: PortalSearchResult[] = [
  {
    title: 'Marcas',
    category: 'Trámites',
    summary: 'Registra, renueva o consulta el estado de una marca comercial.',
    href: '/marcas',
  },
  {
    title: 'Patentes',
    category: 'Trámites',
    summary: 'Protege una invención mediante una patente de tu titularidad.',
    href: '/patentes',
  },
  {
    title: 'Ingresar una solicitud nueva de marca',
    category: 'Trámites',
    summary: 'Completa el formulario en línea para solicitar el registro de tu marca.',
    href: '/marcas/solicitud-nueva',
  },
  {
    title: 'Buscador de similitud de marcas',
    category: 'Herramientas',
    summary: 'Compara tu marca con las ya inscritas antes de presentar tu solicitud.',
    href: '/marcas/buscador-similitud',
  },
  {
    title: 'Acerca de INAPI',
    category: 'Institucional',
    summary: 'Conoce las funciones, objetivos y estructura del Instituto Nacional de Propiedad Industrial.',
    href: '/nosotros',
  },
  {
    title: 'Sala de Prensa',
    category: 'Noticias',
    summary: 'Revisa las noticias y comunicados de INAPI.',
    href: '/sala-de-prensa',
  },
  {
    title: 'INAPI realizó su Cuenta Pública Participativa 2026 en Valparaíso',
    category: 'Noticias',
    summary: 'La jornada mostró los avances en eficiencia, liderazgo internacional y descentralización de la propiedad industrial.',
    href: '/sala-de-prensa/cuenta-publica-2026',
  },
  {
    title: 'Chile alcanza su mayor cifra de solicitudes de patentes nacionales en más de una década',
    category: 'Noticias',
    summary: 'Inventores chilenos presentaron 296 solicitudes en seis meses.',
    href: '/sala-de-prensa/patentes-nacionales-2026',
  },
  {
    title: 'Atención ciudadana (SIAC)',
    category: 'Contacto',
    summary: 'Envía tus consultas, reclamos o sugerencias a INAPI.',
    href: '/contacto/siac',
  },
]
