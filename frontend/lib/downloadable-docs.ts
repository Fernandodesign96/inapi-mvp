export type DownloadDoc = {
  code: string
  title: string
  format: 'PDF' | 'ZIP'
  size: string
  href: string
}

export type DownloadGroup = {
  id: string
  title: string
  lead: string
  items: DownloadDoc[]
}

const MARCAS_HUB = 'https://www.inapi.cl/marcas/tramites/formularios-descargables'
const PATENTES_HUB = 'https://www.inapi.cl/patentes/tramites/formularios-de-patentes'
const DIRECTRICES = 'https://www.inapi.cl/patentes/patentes'

export const MARCAS_DOWNLOADS: DownloadGroup[] = [
  {
    id: 'formularios',
    title: 'Formularios de marcas',
    lead: 'Solicitudes de registro, renovación, divisionales e indicaciones geográficas.',
    items: [
      { code: 'FPI-58', title: 'Solicitud de Registro de Marcas Productos - Servicios', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'FPI-59', title: 'Solicitud de Registro de Frase de Propaganda para Marca Registrada', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'FPI-62', title: 'Solicitud de Registro de Marcas Colectivas Productos - Servicios', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'FPI-63', title: 'Solicitud de Registro de Marcas Certificación Productos - Servicios', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'FPI-64', title: 'Solicitud Divisional de Marcas o Registros', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'FPI-27', title: 'Solicitud de Registro Indicación Geográfica - Denominación de Origen', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'FPI-57', title: 'Solicitud de Renovación de Marcas', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
    ],
  },
  {
    id: 'anotaciones',
    title: 'Anotaciones',
    lead: 'Transferencias, licencias, cambio de nombre y gravámenes.',
    items: [
      { code: 'FPI-28', title: 'Solicitud de Anotación de Transferencia Parcial de Marcas', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'FPI-29', title: 'Solicitud de Anotación de Transferencia Total de Marcas', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'FPI-30', title: 'Solicitud de Anotación de Licencia de Marcas', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'FPI-31', title: 'Solicitud de Anotación de Cambio Nombre de Marcas', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'FPI-32', title: 'Solicitud de Anotación de Gravamen, Prohibición y Alzamiento de Marcas', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
    ],
  },
  {
    id: 'anexos',
    title: 'Anexos y escritos tipo',
    lead: 'Coberturas adicionales, renovación y ejemplos de cumplimiento de oficios.',
    items: [
      { code: 'Anexo', title: 'Anexo para coberturas adicionales', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'Anexo', title: 'Anexo para renovación de marcas', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'EPI-01', title: 'Cumplimiento de observación de forma', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'EPI-02', title: 'Cumplimiento de observación de fondo', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'Todos', title: 'Descargar todos los formularios de una vez', format: 'ZIP', size: 'ZIP', href: MARCAS_HUB },
    ],
  },
  {
    id: 'otros',
    title: 'Otros formularios',
    lead: 'Poder, corrección de extracto y documento de anotación.',
    items: [
      { code: 'FPI-50', title: 'Solicitud de Registro de Poder', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'FPI-52', title: 'Solicitud de Corrección de Extracto', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
      { code: 'FPI-56', title: 'Solicitud de Registro de Documento de Anotación', format: 'PDF', size: 'PDF', href: MARCAS_HUB },
    ],
  },
]

export const PATENTES_DOWNLOADS: DownloadGroup[] = [
  {
    id: 'formularios',
    title: 'Formularios de patentes y diseños',
    lead: 'Solicitud de patente, anotaciones y programas piloto.',
    items: [
      { code: 'FPI-40', title: 'Solicitud de patente', format: 'PDF', size: 'PDF', href: PATENTES_HUB },
      { code: 'FPI-42', title: 'Solicitud de anotación de patente - cambio de nombre', format: 'PDF', size: 'PDF', href: PATENTES_HUB },
      { code: 'FPI-43', title: 'Solicitud de Anotación de Patente - Licencia', format: 'PDF', size: 'PDF', href: PATENTES_HUB },
      { code: 'FPI-44', title: 'Solicitud de Anotación de Patente - Transferencia', format: 'PDF', size: 'PDF', href: PATENTES_HUB },
      { code: 'FPI-46', title: 'Solicitud de Anotación de Patente - Gravamen', format: 'PDF', size: 'PDF', href: PATENTES_HUB },
      { code: 'FPI-47', title: 'Solicitud de Participación en el Programa Piloto de Examen Acelerado de Patentes (PPH)', format: 'PDF', size: 'PDF', href: PATENTES_HUB },
      { code: 'FPI-48', title: 'Solicitud de participación en Programa Piloto de Patentes Verdes (PAPV)', format: 'PDF', size: 'PDF', href: PATENTES_HUB },
      { code: 'Anexo', title: 'Anexo Patentes', format: 'PDF', size: 'PDF', href: PATENTES_HUB },
      { code: 'Todos', title: 'Descargar todos los formularios de una vez', format: 'ZIP', size: 'ZIP', href: PATENTES_HUB },
    ],
  },
  {
    id: 'otros',
    title: 'Otros formularios',
    lead: 'Poder, rectificación de extractos y de título.',
    items: [
      { code: 'FPI-50', title: 'Solicitud de Registro de Poder', format: 'PDF', size: 'PDF', href: PATENTES_HUB },
      { code: 'FPI-53', title: 'Rectificación de extractos de publicación DO', format: 'PDF', size: 'PDF', href: PATENTES_HUB },
      { code: 'FPI-54', title: 'Rectificación de título y/o certificado de Patentes', format: 'PDF', size: 'PDF', href: PATENTES_HUB },
      { code: 'FPI-56', title: 'Solicitud de Registro de Documento de Anotación', format: 'PDF', size: 'PDF', href: PATENTES_HUB },
    ],
  },
  {
    id: 'directrices',
    title: 'Directrices de examen (versión 2022)',
    lead: 'Reemplazan las Directrices de Patentes de 2017. Publicadas el 7 de junio de 2022, solo en formato electrónico.',
    items: [
      {
        code: 'Invención',
        title: 'Directrices de examen: invenciones y modelos de utilidad',
        format: 'PDF',
        size: 'PDF',
        href: DIRECTRICES,
      },
      {
        code: 'Diseños',
        title: 'Directrices de examen: diseños y dibujos industriales',
        format: 'PDF',
        size: 'PDF',
        href: DIRECTRICES,
      },
    ],
  },
]
