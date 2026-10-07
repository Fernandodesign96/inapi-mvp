export type TramitesDomain = 'marcas' | 'patentes'

export type MegaItem = {
  label: string
  href: string
  tooltip: string
  stub?: boolean
}

export type MegaColumn = {
  title: string
  items: MegaItem[]
}

function stub(label: string, servicio: string, tooltip: string): MegaItem {
  return {
    label,
    href: `/tramites/proximamente?servicio=${encodeURIComponent(servicio)}`,
    tooltip,
    stub: true,
  }
}

export const MARCAS_MEGA: MegaColumn[] = [
  {
    title: 'Mi INAPI',
    items: [
      {
        label: 'Notificaciones',
        href: '/tramites/notificaciones?ambito=marcas',
        tooltip: 'Revisa avisos de tus trámites de marcas',
      },
      {
        label: 'Tus documentos',
        href: '/tramites/marcas/documentos',
        tooltip: 'Abre el expediente digital de una marca',
      },
      {
        label: 'Solicitudes guardadas',
        href: '/tramites/marcas/solicitudes-guardadas',
        tooltip: 'Retoma un borrador de solicitud de marca',
      },
      {
        label: 'Escritos',
        href: '/tramites/marcas/escritos',
        tooltip: 'Presenta un escrito asociado a un expediente',
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
      stub('Sistema de Madrid', 'madrid', 'Registro internacional de marcas. Disponible en una próxima entrega.'),
      stub('Renovaciones', 'renovaciones-marcas', 'Renueva el registro de tu marca. Disponible en una próxima entrega.'),
      stub('Anotaciones', 'anotaciones-marcas', 'Anota cambios de tu marca. Disponible en una próxima entrega.'),
      stub('Oposición', 'oposicion-marcas', 'Presenta una oposición. Disponible en una próxima entrega.'),
    ],
  },
  {
    title: 'Pagos',
    items: [
      stub('Pagos Diario Oficial', 'pagos-do', 'Paga publicaciones en el Diario Oficial. Disponible en una próxima entrega.'),
    ],
  },
  {
    title: 'Servicios',
    items: [
      {
        label: 'Buscador de Marcas',
        href: '/marcas/buscador-similitud',
        tooltip: 'Compara tu nombre con marcas anteriores',
      },
      {
        label: 'Formularios',
        href: '/tramites/marcas/formularios',
        tooltip: 'Descarga formularios PDF de marcas',
      },
      {
        label: 'Certificados',
        href: '/tramites/marcas/certificados',
        tooltip: 'Pide un certificado de tu marca',
      },
      stub('Gaceta', 'gaceta', 'Consulta la gaceta de propiedad industrial. Disponible en una próxima entrega.'),
      stub('Datos abiertos', 'datos-abiertos', 'Descarga datos abiertos. Disponible en una próxima entrega.'),
      stub('Verificar certificados', 'verificar-certificados', 'Valida un certificado con CVE. Disponible en una próxima entrega.'),
      stub('Custodia de poderes', 'custodia-poderes', 'Registra un poder una sola vez. Disponible en una próxima entrega.'),
    ],
  },
]

export const PATENTES_MEGA: MegaColumn[] = [
  {
    title: 'Mi INAPI',
    items: [
      {
        label: 'Notificaciones',
        href: '/tramites/notificaciones?ambito=patentes',
        tooltip: 'Revisa avisos de tus trámites de patentes',
      },
      {
        label: 'Tus documentos',
        href: '/tramites/patentes/documentos',
        tooltip: 'Abre el expediente digital de una patente',
      },
      {
        label: 'Solicitudes guardadas',
        href: '/tramites/patentes/solicitudes-guardadas',
        tooltip: 'Retoma un borrador de solicitud de patente',
      },
      {
        label: 'Escritos',
        href: '/tramites/patentes/escritos',
        tooltip: 'Presenta un escrito asociado a un expediente de patente',
      },
    ],
  },
  {
    title: 'Tramitación',
    items: [
      {
        label: 'Solicitar patente o modelo de utilidad',
        href: '/tramites/patentes/solicitar',
        tooltip: 'Inicia una solicitud de patente o modelo de utilidad',
      },
      {
        label: 'Solicitar diseño o dibujo industrial',
        href: '/tramites/patentes/solicitar-diseno',
        tooltip: 'Inicia una solicitud de diseño o dibujo industrial',
      },
      stub('PCT', 'pct-tramites', 'Presentación internacional PCT. Disponible en una próxima entrega.'),
      stub('Anotaciones', 'anotaciones-patentes', 'Anota cambios de tu patente. Disponible en una próxima entrega.'),
    ],
  },
  {
    title: 'Pagos',
    items: [
      stub('Pagos Diario Oficial', 'pagos-do-patentes', 'Paga publicaciones en el Diario Oficial. Disponible en una próxima entrega.'),
    ],
  },
  {
    title: 'Servicios',
    items: [
      {
        label: 'Buscador de Patentes',
        href: '/tramites/patentes/buscador',
        tooltip: 'Busca patentes, modelos de utilidad y diseños',
      },
      {
        label: 'Formularios',
        href: '/tramites/patentes/formularios',
        tooltip: 'Descarga formularios PDF de patentes',
      },
      {
        label: 'Certificados',
        href: '/tramites/patentes/certificados',
        tooltip: 'Pide un certificado de tu patente',
      },
      stub('Gaceta', 'gaceta-patentes', 'Consulta la gaceta. Disponible en una próxima entrega.'),
      stub('Datos abiertos', 'datos-abiertos-patentes', 'Descarga datos abiertos. Disponible en una próxima entrega.'),
      stub('Verificar certificados', 'verificar-certificados-patentes', 'Valida un certificado con CVE. Disponible en una próxima entrega.'),
    ],
  },
]

export const PAGE_TITLES: Record<string, { title: string; subtitle?: string; domain: TramitesDomain | 'general' }> = {
  '/tramites': { title: 'Trámites en línea', subtitle: 'Gestiona tus marcas y patentes', domain: 'general' },
  '/tramites/auth': { title: 'Iniciar sesión', domain: 'general' },
  '/tramites/ingresar': { title: 'Ingresar con Clave INAPI', domain: 'general' },
  '/tramites/solicitudmarca': { title: 'Solicitud de marca', domain: 'marcas' },
  '/tramites/registrarse': { title: 'Regístrate en trámites INAPI', domain: 'general' },
  '/tramites/clave-unica': { title: 'Validación con ClaveÚnica', domain: 'general' },
  '/tramites/notificaciones': { title: 'Tus notificaciones', domain: 'general' },
  '/tramites/marcas/documentos': { title: 'Marcas • Tus documentos', domain: 'marcas' },
  '/tramites/marcas/solicitudes-guardadas': { title: 'Marcas • Solicitudes guardadas', domain: 'marcas' },
  '/tramites/marcas/escritos': { title: 'Marcas • Escritos', domain: 'marcas' },
  '/tramites/marcas/formularios': { title: 'Marcas • Formularios', domain: 'marcas' },
  '/tramites/marcas/certificados': { title: 'Marcas • Certificados', domain: 'marcas' },
  '/tramites/marcas/solicitar': { title: 'Solicitar marca', domain: 'marcas' },
  '/tramites/patentes/documentos': { title: 'Patentes • Tus documentos', domain: 'patentes' },
  '/tramites/patentes/solicitudes-guardadas': { title: 'Patentes • Solicitudes guardadas', domain: 'patentes' },
  '/tramites/patentes/escritos': { title: 'Patentes • Escritos', domain: 'patentes' },
  '/tramites/patentes/formularios': { title: 'Patentes • Formularios', domain: 'patentes' },
  '/tramites/patentes/certificados': { title: 'Patentes • Certificados', domain: 'patentes' },
  '/tramites/patentes/buscador': { title: 'Buscador de Patentes', domain: 'patentes' },
  '/tramites/patentes/buscador/avanzada': { title: 'Búsqueda avanzada de patentes', domain: 'patentes' },
  '/tramites/patentes/solicitar': { title: 'Solicitar patente o modelo de utilidad', domain: 'patentes' },
  '/tramites/patentes/solicitar-diseno': { title: 'Solicitar diseño o dibujo industrial', domain: 'patentes' },
  '/tramites/pago': { title: 'Pago en Tesorería (simulación)', domain: 'general' },
  '/tramites/proximamente': { title: 'Próxima entrega', domain: 'general' },
}
