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
    title: 'Mi INAPI',
    items: [
      {
        label: 'Notificaciones electrónicas marcas',
        href: '/tramites/notificaciones?ambito=marcas',
        tooltip: 'Revisa avisos de tus trámites de marcas',
      },
      {
        label: 'Solicitudes guardadas de marcas',
        href: '/tramites/marcas/solicitudes-guardadas',
        tooltip: 'Retoma un borrador de solicitud de marca',
      },
      {
        label: 'Anotaciones guardadas marcas',
        href: '/tramites/marcas/anotaciones-guardadas',
        tooltip: 'Revisa anotaciones guardadas de marcas',
      },
      {
        label: 'Escritos guardados de marcas',
        href: '/tramites/marcas/escritos',
        tooltip: 'Presenta o retoma un escrito de marcas',
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
        label: 'Solicitar marca Sistema de Madrid',
        href: '/tramites/marcas/madrid',
        tooltip: 'Te lleva al sitio de Madrid e-filing',
      },
      {
        label: 'Solicitar renovaciones',
        href: '/tramites/marcas/renovaciones',
        tooltip: 'Renueva el registro de tu marca',
      },
      {
        label: 'Solicitar anotación de marcas',
        href: '/tramites/marcas/anotaciones',
        tooltip: 'Anota cambios de tu marca',
      },
      {
        label: 'Presentar escritos de marcas',
        href: '/tramites/marcas/presentar-escritos',
        tooltip: 'Presenta un escrito a una solicitud, anotación o juicio de marcas',
      },
      {
        label: 'Presentar demanda de oposición',
        href: '/tramites/marcas/oposicion',
        tooltip: 'Presenta una oposición a una solicitud de marca',
      },
      {
        label: 'Custodia de poderes y personerías',
        href: '/tramites/custodia-poderes',
        tooltip: 'Registra un poder o personería una sola vez',
      },
    ],
  },
  {
    title: 'Pagos',
    items: [
      {
        label: 'Pagar tasa de concesión final marcas',
        href: '/tramites/marcas/pago-concesion',
        tooltip: 'Paga el segundo pago o derechos finales de una marca',
      },
      ext(
        'Pagar publicación en Diario Oficial',
        URLS_EXTERNAS.diarioOficialMarcas,
        'Paga la publicación de tu marca en el Diario Oficial',
      ),
      {
        label: 'Otros pagos en línea marcas',
        href: '/tramites/marcas/otros-pagos',
        tooltip: 'Pagos complementarios de marcas',
      },
      {
        label: 'Comprobantes para pago marcas',
        href: '/tramites/marcas/comprobante-pago',
        tooltip: 'Genera el Formulario 10 para pago en banco',
      },
    ],
  },
  {
    title: 'Servicios',
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
        label: 'Buscador marcas',
        href: '/marcas/buscador-similitud',
        tooltip: 'Compara tu nombre con marcas anteriores',
      },
      {
        label: 'Expedientes digitales marcas',
        href: '/tramites/marcas/documentos',
        tooltip: 'Abre el expediente digital de una marca',
      },
      ext(
        'Consulta de marca, registro y dominio',
        URLS_EXTERNAS.consultaMarcaDominio,
        'Consulta marcas, empresas y dominios .cl',
      ),
      {
        label: 'Datos abiertos marcas',
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
        label: 'Clasificador productos y servicios',
        href: '/tramites/marcas/clasificador',
        tooltip: 'Busca productos y servicios y te sugiere la clase de Niza',
      },
      {
        label: 'Verificar certificados marcas',
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
    title: 'Mi INAPI',
    items: [
      {
        label: 'Notificaciones electrónicas patentes',
        href: '/tramites/notificaciones?ambito=patentes',
        tooltip: 'Revisa avisos de tus trámites de patentes',
      },
      {
        label: 'Solicitudes guardadas de patentes',
        href: '/tramites/patentes/solicitudes-guardadas',
        tooltip: 'Retoma un borrador de solicitud de patente',
      },
      {
        label: 'Anotaciones guardadas patentes',
        href: '/tramites/patentes/anotaciones-guardadas',
        tooltip: 'Revisa anotaciones guardadas de patentes',
      },
      {
        label: 'Escritos guardados de patentes',
        href: '/tramites/patentes/escritos',
        tooltip: 'Revisa escritos guardados de patentes',
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
      {
        label: 'Solicitar anotación de patentes',
        href: '/tramites/patentes/anotaciones',
        tooltip: 'Anota cambios de tu patente, modelo o diseño',
      },
      {
        label: 'Presentar escritos de patentes',
        href: '/tramites/patentes/presentar-escritos',
        tooltip: 'Presenta un escrito a una solicitud, anotación o nulidad',
      },
      {
        label: 'Custodia de poderes y personerías',
        href: '/tramites/custodia-poderes',
        tooltip: 'Registra un poder o personería una sola vez',
      },
    ],
  },
  {
    title: 'Pagos',
    items: [
      {
        label: 'Pagar tasa de presentación patentes',
        href: '/tramites/patentes/pago-presentacion',
        tooltip: 'Paga la tasa de presentación si postergaste el pago',
      },
      {
        label: 'Pagar arancel pericial',
        href: '/tramites/patentes/pago-arancel-pericial',
        tooltip: 'Paga el arancel pericial cuando INAPI lo requiere',
      },
      {
        label: 'Pagar derechos finales',
        href: '/tramites/patentes/pago-derechos-finales',
        tooltip: 'Paga decenios, quinquenios o anualidades',
      },
      {
        label: 'Pagar tasas PCT fase internacional',
        href: '/tramites/patentes/pago-pct',
        tooltip: 'Paga tasas de una solicitud PCT',
      },
      ext(
        'Pagar publicación en el Diario Oficial',
        URLS_EXTERNAS.diarioOficialPatentes,
        'Paga la publicación de tu patente en el Diario Oficial',
      ),
      {
        label: 'Otros pagos en línea patentes',
        href: '/tramites/patentes/otros-pagos',
        tooltip: 'Pagos complementarios de patentes',
      },
      {
        label: 'Comprobantes para pago patentes',
        href: '/tramites/patentes/comprobante-pago',
        tooltip: 'Genera el Formulario 10 para pago en banco',
      },
    ],
  },
  {
    title: 'Servicios',
    items: [
      {
        label: 'Estados diarios patentes',
        href: '/tramites/patentes/estados-diarios',
        tooltip: 'Descarga los estados diarios de patentes',
      },
      {
        label: 'Buscador patentes',
        href: '/tramites/patentes/buscador',
        tooltip: 'Busca patentes, modelos de utilidad y diseños',
      },
      {
        label: 'Libro de registro de patentes',
        href: '/tramites/patentes/libro-registro',
        tooltip: 'Consulta el libro de registro de patentes',
      },
      {
        label: 'Datos abiertos patentes',
        href: '/tramites/patentes/datos-abiertos',
        tooltip: 'Descarga listados de patentes en datos.gob.cl',
      },
      {
        label: 'Títulos y certificados patentes',
        href: '/tramites/patentes/certificados',
        tooltip: 'Pide un certificado de tu patente',
      },
      {
        label: 'Verificar certificados patentes',
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

export const PAGE_TITLES: Record<string, { title: string; subtitle?: string; domain: TramitesDomain | 'general' }> = {
  '/tramites': { title: 'Trámites en línea', subtitle: 'Gestiona tus marcas y patentes', domain: 'general' },
  '/marcas/buscador-similitud': { title: 'Revisa si tu marca se parece a otra', subtitle: 'Usa esta herramienta antes de pedir el registro de tu marca.', domain: 'marcas' },
  '/tramites/auth': { title: 'Iniciar sesión', domain: 'general' },
  '/tramites/ingresar': { title: 'Ingresar con Clave INAPI', domain: 'general' },
  '/tramites/solicitudmarca': { title: 'Solicitud de marca', domain: 'marcas' },
  '/tramites/registrarse': { title: 'Regístrate en trámites INAPI', domain: 'general' },
  '/tramites/clave-unica': { title: 'Validación con ClaveÚnica', domain: 'general' },
  '/tramites/notificaciones': { title: 'Notificaciones electrónicas', domain: 'general' },
  '/tramites/perfil': { title: 'Mi perfil', domain: 'general' },
  '/tramites/custodia-poderes': { title: 'Trámites y Servicios • Ingreso de Documentos, Poderes y Personerías', domain: 'general' },
  '/tramites/marcas/documentos': { title: 'Marcas • Expedientes digitales', domain: 'marcas' },
  '/tramites/marcas/solicitudes-guardadas': { title: 'Marcas • Solicitudes guardadas de marcas', domain: 'marcas' },
  '/tramites/marcas/escritos': { title: 'Marcas • Escritos guardados de marcas', domain: 'marcas' },
  '/tramites/marcas/presentar-escritos': { title: 'Marcas • Presentar escritos de marcas', domain: 'marcas' },
  '/tramites/marcas/gaceta': { title: 'Trámites y Servicios • Gaceta de marcas nuevas', domain: 'marcas' },
  '/tramites/marcas/estados-diarios': { title: 'Trámites y Servicios • Estados diarios de marcas', domain: 'marcas' },
  '/tramites/marcas/clasificador': { title: 'Marcas • Clasificador de productos y servicios', domain: 'marcas' },
  '/tramites/marcas/formularios': { title: 'Marcas • Descargar formularios (PDF)', domain: 'marcas' },
  '/tramites/marcas/certificados': { title: 'Marcas • Certificados de marcas', domain: 'marcas' },
  '/tramites/marcas/solicitar': { title: 'Marcas • Solicitar marca', domain: 'marcas' },
  '/tramites/marcas/madrid': { title: 'Marcas • Solicitar marca Sistema de Madrid', domain: 'marcas' },
  '/tramites/marcas/renovaciones': { title: 'Marcas • Solicitar renovaciones', domain: 'marcas' },
  '/tramites/marcas/anotaciones-guardadas': { title: 'Marcas • Anotaciones guardadas', domain: 'marcas' },
  '/tramites/marcas/anotaciones': { title: 'Marcas • Solicitar anotación de marcas', domain: 'marcas' },
  '/tramites/marcas/oposicion': { title: 'Marcas • Presentar demanda de oposición', domain: 'marcas' },
  '/tramites/marcas/pago-concesion': { title: 'Marcas • Pagar tasa de concesión final marcas', domain: 'marcas' },
  '/tramites/marcas/otros-pagos': { title: 'Marcas • Otros pagos en línea marcas', domain: 'marcas' },
  '/tramites/marcas/comprobante-pago': { title: 'Trámites y Servicios • Comprobante para pago', domain: 'marcas' },
  '/tramites/marcas/datos-abiertos': { title: 'Trámites y Servicios • Datos abiertos', domain: 'marcas' },
  '/tramites/marcas/libro-registro': { title: 'Marcas • Libro de registro marcas', domain: 'marcas' },
  '/tramites/marcas/verificar-titulos': { title: 'Trámites y Servicios • Verificador de títulos y certificados', domain: 'marcas' },
  '/tramites/patentes/documentos': { title: 'Patentes • Expedientes digitales', domain: 'patentes' },
  '/tramites/patentes/solicitudes-guardadas': { title: 'Patentes • Solicitudes guardadas de patentes', domain: 'patentes' },
  '/tramites/patentes/escritos': { title: 'Patentes • Escritos guardados de patentes', domain: 'patentes' },
  '/tramites/patentes/presentar-escritos': { title: 'Patentes • Presentar escritos de patentes', domain: 'patentes' },
  '/tramites/patentes/estados-diarios': { title: 'Trámites y Servicios • Estados diarios de patentes', domain: 'patentes' },
  '/tramites/patentes/datos-abiertos': { title: 'Trámites y Servicios • Datos abiertos', domain: 'patentes' },
  '/tramites/patentes/libro-registro': { title: 'Patentes • Libro de registro patentes', domain: 'patentes' },
  '/tramites/patentes/verificar-titulos': { title: 'Trámites y Servicios • Verificador de títulos y certificados', domain: 'patentes' },
  '/tramites/patentes/documentacion-pct': { title: 'Patentes • Documentación mínima PCT - Colección nacional de patentes de Chile', domain: 'patentes' },
  '/tramites/patentes/formularios': { title: 'Patentes • Descargar formularios (PDF)', domain: 'patentes' },
  '/tramites/patentes/certificados': { title: 'Patentes • Títulos y certificados patentes', domain: 'patentes' },
  '/tramites/patentes/buscador': { title: 'Buscador de Patentes', domain: 'patentes' },
  '/tramites/patentes/buscador/avanzada': { title: 'Búsqueda avanzada de patentes', domain: 'patentes' },
  '/tramites/patentes/solicitar': { title: 'Patentes • Solicitud de patente o modelo de utilidad', domain: 'patentes' },
  '/tramites/patentes/solicitar-diseno': { title: 'Patentes • Solicitud de diseño o dibujo industrial', domain: 'patentes' },
  '/tramites/patentes/anotaciones-guardadas': { title: 'Patentes • Anotaciones guardadas', domain: 'patentes' },
  '/tramites/patentes/anotaciones': { title: 'Patentes • Solicitar anotación de patentes', domain: 'patentes' },
  '/tramites/patentes/pago-presentacion': { title: 'Patentes • Pagar tasa de presentación patentes', domain: 'patentes' },
  '/tramites/patentes/pago-arancel-pericial': { title: 'Patentes • Pagar arancel pericial', domain: 'patentes' },
  '/tramites/patentes/pago-derechos-finales': { title: 'Patentes • Pagar derechos finales', domain: 'patentes' },
  '/tramites/patentes/pago-pct': { title: 'Patentes • Pagos PCT', domain: 'patentes' },
  '/tramites/patentes/otros-pagos': { title: 'Patentes • Otros pagos en línea patentes', domain: 'patentes' },
  '/tramites/patentes/comprobante-pago': { title: 'Trámites y Servicios • Comprobante para pago', domain: 'patentes' },
  '/tramites/pago': { title: 'Pago en Tesorería', domain: 'general' },
  '/tramites/pago-tgr': { title: 'Pago de tasas INAPI', domain: 'general' },
  '/tramites/proximamente': { title: 'Próxima entrega', domain: 'general' },
}
