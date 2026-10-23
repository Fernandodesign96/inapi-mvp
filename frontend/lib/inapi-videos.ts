/** Videos oficiales del canal de INAPI en YouTube, con la página donde se muestran. */
export type InapiVideo = {
  id: string
  title: string
  description: string
  pages: readonly string[]
}

export const INAPI_YOUTUBE_CHANNEL = 'https://www.youtube.com/@INAPICHILE'

export const INAPI_VIDEOS = {
  cuentaPublica: {
    id: 'ilYilAAYasI',
    title: 'Cuenta pública de INAPI',
    description: 'Resultados del año, metas cumplidas y desafíos del Instituto.',
    pages: ['/nosotros', '/transparencia/gasto-presupuestario'],
  },
  solicitarMarca: {
    id: 'TEBAHRqo69w',
    title: 'Cómo solicitar una marca en línea',
    description: 'Paso a paso para presentar tu solicitud de marca en el Portal de trámites.',
    pages: ['/marcas', '/marcas/como-registrar', '/tramites-digitales'],
  },
  tramitarPatente: {
    id: 'mMCsQ2ustsQ',
    title: 'Tramitación en línea de una patente',
    description: 'Cómo presentar y seguir una solicitud de patente sin salir de casa.',
    pages: ['/patentes', '/patentes/como-registrar', '/tramites-digitales'],
  },
  costosPatente: {
    id: 'awBnQkM1qBE',
    title: 'Patentes: costos y duración',
    description: 'Cuánto pagas y cuánto tiempo protege una patente en Chile.',
    pages: ['/patentes/como-registrar/costos', '/patentes'],
  },
  queEsPatente: {
    id: 'xdJBNco7t4s',
    title: 'Qué es una patente',
    description: 'Una explicación breve de qué protege una patente y por qué sirve.',
    pages: ['/patentes/que-es-una-patente', '/que-es-la-propiedad-industrial'],
  },
  patenteVsMarca: {
    id: 'F6cLJYC63iE',
    title: 'Diferencia entre patente y marca',
    description: 'Cuándo necesitas una marca, cuándo una patente y cuándo ambas.',
    pages: ['/', '/que-proteger', '/preguntas-frecuentes'],
  },
  selloOrigen: {
    id: 'prLgb_GlTOc',
    title: 'El Sello de Origen',
    description: 'Cómo el Sello de Origen protege productos típicos de una zona de Chile.',
    pages: ['/sello-de-origen'],
  },
} as const satisfies Record<string, InapiVideo>

export type InapiVideoKey = keyof typeof INAPI_VIDEOS

export const ALL_INAPI_VIDEO_KEYS = Object.keys(INAPI_VIDEOS) as InapiVideoKey[]
