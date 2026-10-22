export type GlossaryEntry = {
  shortDef: string
  fullDef: string
  exampleText?: string
  glossaryAnchor: string
  aliases?: string[]
}

export function glossarySlug(term: string) {
  return term
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const glossaryTerms: Record<string, GlossaryEntry> = {
  'clase-de-niza': {
    shortDef: 'Categoría internacional de productos o servicios. Pagas una tasa por cada clase.',
    fullDef:
      'Las clases de Niza agrupan los productos y servicios en 45 categorías internacionales. Al solicitar una marca, debes indicar en qué clase o clases quieres protegerla, porque tu marca solo te protege en las clases elegidas.',
    exampleText: 'Una cafetería probablemente necesita clase 30 (café, té) y clase 43 (servicios de restaurante).',
    glossaryAnchor: '/glosario#clase-de-niza',
    aliases: ['niza', 'clase de niza', 'clases de niza', 'clasificador de niza'],
  },
  observancia: {
    shortDef: 'Protección legal de tus derechos una vez registrada la marca o patente.',
    fullDef:
      'Observancia es el conjunto de acciones legales para hacer valer tus derechos de propiedad industrial frente a quienes los infringen: copias, falsificaciones o uso no autorizado.',
    glossaryAnchor: '/glosario#observancia',
  },
  pct: {
    shortDef:
      'Tratado de Cooperación en materia de Patentes. Permite pedir protección en varios países con una sola solicitud.',
    fullDef:
      'El PCT (Patent Cooperation Treaty) es un sistema internacional que te permite presentar una sola solicitud de patente con efecto en más de 150 países. INAPI actúa como oficina receptora de solicitudes PCT.',
    glossaryAnchor: '/glosario#pct',
  },
  'sistema-de-madrid': {
    shortDef: 'Sistema para registrar tu marca en varios países con una sola solicitud ante INAPI.',
    fullDef:
      'El Sistema de Madrid te permite extender la protección de tu marca chilena a más de 130 países con un solo trámite. Presentas en INAPI y eliges en qué países quieres protección.',
    glossaryAnchor: '/glosario#sistema-de-madrid',
    aliases: ['madrid'],
  },
  oposicion: {
    shortDef: 'Plazo de 30 días donde terceros pueden objetar tu solicitud de marca.',
    fullDef:
      'Después de la publicación, otras personas pueden oponerse al registro de tu marca dentro del plazo legal. Si hay oposición, debes responder dentro del plazo que indica INAPI.',
    glossaryAnchor: '/glosario#oposicion',
    aliases: ['oposición'],
  },
  prioridad: {
    shortDef:
      'Si registraste esta marca o patente en otro país hace menos de 6 o 12 meses, puedes usar esa fecha como prioridad en Chile.',
    fullDef:
      'La prioridad no es urgencia del trámite. Es un derecho que te permite usar la fecha de una presentación anterior en otro país, si cumples el plazo del Convenio de París.',
    glossaryAnchor: '/glosario#prioridad',
  },
  anotacion: {
    shortDef: 'Cambio formal en los datos de una marca o patente (titular, representante, etc.).',
    fullDef:
      'Una anotación deja constancia de un cambio en la solicitud o el registro: titular, representante, domicilio u otras menciones.',
    glossaryAnchor: '/glosario#anotacion',
    aliases: ['anotación'],
  },
  representante: {
    shortDef: 'Persona que tramita en tu nombre. Necesitas un poder si no presentas tú.',
    fullDef:
      'El representante es quien actúa ante INAPI por el titular. Si designas representante, debes acreditar el poder o dejarlo en custodia.',
    glossaryAnchor: '/glosario#representante',
  },
  'sello-de-origen': {
    shortDef: 'Certificación que identifica productos con características vinculadas a una zona geográfica de Chile.',
    fullDef:
      'El Sello de Origen distingue productos típicos de una región. Incluye denominaciones de origen e indicaciones geográficas.',
    glossaryAnchor: '/glosario#sello-de-origen',
  },
  'denominacion-de-origen': {
    shortDef: 'Identifica un producto cuya calidad se debe a su origen geográfico y a factores humanos.',
    fullDef:
      'Una denominación de origen identifica un producto como originario de una región y le atribuye cualidades o reputación derivadas de ese origen.',
    glossaryAnchor: '/glosario#denominacion-de-origen',
    aliases: ['denominación de origen'],
  },
  'indicacion-geografica': {
    shortDef: 'Identifica un producto con una cualidad, reputación u otra característica ligada a su origen.',
    fullDef:
      'Una indicación geográfica vincula un producto a un lugar. Es distinta de una marca comercial: protege el origen, no un titular privado.',
    glossaryAnchor: '/glosario#indicacion-geografica',
    aliases: ['indicación geográfica'],
  },
  'examen-de-fondo': {
    shortDef: 'INAPI analiza si tu marca o patente cumple la ley y puede registrarse.',
    fullDef:
      'El examen de fondo es la revisión sustantiva: distintividad, novedad u otros requisitos legales, según el derecho solicitado.',
    glossaryAnchor: '/glosario#examen-de-fondo',
  },
  'notificacion-diaria': {
    shortDef: 'Publicación del estado de solicitudes. Para ver las tuyas, entra a Estado de mis solicitudes.',
    fullDef:
      'Las notificaciones diarias son listados públicos de estados. El estado de tu propio expediente se consulta en el Portal de trámites, con sesión.',
    glossaryAnchor: '/glosario#notificacion-diaria',
    aliases: ['notificación diaria', 'notificaciones diarias'],
  },
}

export function resolveGlossaryEntry(term: string): (GlossaryEntry & { key: string }) | undefined {
  const normalized = glossarySlug(term)
  const direct = glossaryTerms[normalized]
  if (direct) return { key: normalized, ...direct }
  const found = Object.entries(glossaryTerms).find(([, entry]) =>
    entry.aliases?.some(alias => glossarySlug(alias) === normalized),
  )
  if (!found) return undefined
  return { key: found[0], ...found[1] }
}
