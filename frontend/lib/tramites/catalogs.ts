export const UTM_OCTUBRE_CLP = 72151

export const ANOTACIONES_MARCA: { id: string; label: string; help: string }[] = [
  {
    id: 'cambio-nombre',
    label: 'Anotación de Cambio de nombre',
    help: 'Se utiliza cuando el titular de una marca cambia de nombre, a fin que dicho cambio produzca efecto respecto de terceros. El RUT del titular actual coincidirá con el RUT del nuevo titular.',
  },
  {
    id: 'transferencia-total',
    label: 'Anotación de Transferencia total',
    help: 'Se utiliza en los casos en que el derecho sobre una marca pasa de una persona a otra, en virtud de una compraventa, donación, permuta, dación en pago, aporte en sociedad, sucesión por causa de muerte, fusión de empresas cuando implican transferencia u otro título. Se transfieren todas las clases comprendidas en el registro, aun cuando se trate de un porcentaje de la titularidad.',
  },
  {
    id: 'embargo-alzamiento',
    label: 'Anotación de Embargo (alzamiento)',
    help: 'Se utiliza para dejar sin efecto un embargo inscrito sobre una marca comercial.',
  },
  {
    id: 'embargo-inscripcion',
    label: 'Anotación de Embargo (inscripción)',
    help: 'Es utilizada para anotar el embargo decretado por un Tribunal, ordinario o especial, sobre una marca comercial.',
  },
  {
    id: 'licencia-alzamiento',
    label: 'Anotación de Licencia (alzamiento)',
    help: 'Se utiliza para dejar sin efecto una licencia inscrita, toda vez que han cesado los efectos del acto por el cual el titular de una marca confiere a otro el derecho a usarla.',
  },
  {
    id: 'licencia-inscripcion',
    label: 'Anotación de Licencia (inscripción)',
    help: 'Se inscribe el contrato por el cual el titular de una marca autoriza a un tercero a usarla. Ejemplo franquicia.',
  },
  {
    id: 'medida-alzamiento',
    label: 'Anotación de Medida precautoria (alzamiento)',
    help: 'Se utiliza para dejar sin efecto una medida precautoria inscrita sobre una marca comercial.',
  },
  {
    id: 'medida-inscripcion',
    label: 'Anotación de Medida precautoria (inscripción)',
    help: 'Se utiliza para anotar una medida precautoria decretada por un Tribunal, ordinario o especial, sobre una marca comercial.',
  },
  {
    id: 'prenda-alzamiento',
    label: 'Anotación de Prenda (alzamiento)',
    help: 'Se utiliza para dejar sin efecto la inscripción del gravamen de una prenda.',
  },
  {
    id: 'prenda-inscripcion',
    label: 'Anotación de Prenda (inscripción)',
    help: 'Se utiliza para inscribir y dar a conocer a terceros una prenda con fines de garantía constituida sobre una marca.',
  },
  {
    id: 'prohibicion-alzamiento',
    label: 'Anotación de Prohibición (alzamiento)',
    help: 'Se deja sin efecto la inscripción de la medida precautoria de prohibición de celebrar actos y contratos sobre la marca, que hubiere sido decretada por un Tribunal ordinario o especial.',
  },
  {
    id: 'prohibicion-inscripcion',
    label: 'Anotación de Prohibición (inscripción)',
    help: 'Se inscribe al margen del registro la medida precautoria de Prohibición de celebrar actos y contratos ordenada por un Tribunal ordinario o especial.',
  },
]

export const ANOTACIONES_PATENTE: { id: string; label: string; help: string }[] = [
  { id: 'cambio-nombre', label: 'Anotación Cambio de Nombre', help: 'Se anota el cambio de nombre del titular de la patente, modelo de utilidad, diseño o dibujo, para que produzca efecto respecto de terceros.' },
  { id: 'embargo-inscripcion', label: 'Anotación de Embargo (Inscripción)', help: 'Anota el embargo decretado por un Tribunal, ordinario o especial, sobre el derecho.' },
  { id: 'embargo-alzamiento', label: 'Anotación de Embargo (Alzamiento)', help: 'Deja sin efecto un embargo inscrito.' },
  { id: 'licencia-inscripcion', label: 'Anotación de Licencia (Inscripción)', help: 'Inscribe el contrato por el cual el titular autoriza a un tercero a usar el derecho.' },
  { id: 'licencia-alzamiento', label: 'Anotación de Licencia (Alzamiento)', help: 'Deja sin efecto una licencia inscrita.' },
  { id: 'medida-inscripcion', label: 'Anotación de Medida precautoria (inscripción)', help: 'Anota una medida precautoria decretada por un Tribunal.' },
  { id: 'medida-alzamiento', label: 'Anotación de Medida precautoria (alzamiento)', help: 'Deja sin efecto una medida precautoria inscrita.' },
  { id: 'prenda-inscripcion', label: 'Anotación de Prenda (inscripción)', help: 'Inscribe una prenda constituida sobre el derecho.' },
  { id: 'prenda-alzamiento', label: 'Anotación de Prenda (alzamiento)', help: 'Deja sin efecto la inscripción de una prenda.' },
  { id: 'prohibicion-inscripcion', label: 'Anotación de Prohibición (inscripción)', help: 'Inscribe la prohibición de celebrar actos y contratos ordenada por un Tribunal.' },
  { id: 'prohibicion-alzamiento', label: 'Anotación de Prohibición (alzamiento)', help: 'Deja sin efecto la prohibición inscrita.' },
  { id: 'transferencia', label: 'Anotación de Transferencia', help: 'Anota el traspaso del derecho de una persona a otra.' },
  { id: 'quiebra-inscripcion', label: 'Anotación de Quiebra (inscripción)', help: 'Anota la quiebra decretada respecto del titular.' },
  { id: 'quiebra-alzamiento', label: 'Anotación de Quiebra (alzamiento)', help: 'Deja sin efecto la anotación de quiebra.' },
  { id: 'otros-inscripcion', label: 'Anotación de Otros (inscripción)', help: 'Otras anotaciones de inscripción no listadas.' },
  { id: 'otros-alzamiento', label: 'Anotación de Otros (alzamiento)', help: 'Otras anotaciones de alzamiento no listadas.' },
]

export const ESTADOS_ANOTACION = ['Borrador', 'Confirmada con Pago', 'Confirmada sin Pago'] as const

export const ESTADOS_SOLICITUD = ['Todos', 'Borrador', 'Confirmada con Pago', 'Confirmada sin Pago'] as const

export const CONCEPTOS_PAGO_MARCA = [
  'Nueva Marca - Tasa de Presentación',
  'Nueva Marca - Tasa de Concesión Final',
  'Nueva Marca - Pago Complementario',
  'Renovación Marca - Tasa de Anotación de Renovación',
  'Renovación Marca - Pago Complementario',
  'Tasa de Anotación de Marcas',
  'Tasa de Apelación de Marcas',
]

export const CONCEPTOS_PAGO_PATENTE = [
  'Patentes - Tasa de Presentación',
  'Pago de Mantenimiento (Anualidad)',
  'Pago de Primer Decenio o Quinquenio',
  'Pago de Segundo Decenio o Quinquenio',
  'Pago Extensión de 5 años (Diseños)',
  'Patentes - Pago Complementario',
  'Tasa de Anotación de Patentes',
  'Tasa de Apelación de Patentes',
  'Patentes - Tasa de Exceso de hojas',
  'Patentes - Tasa de Desarchivo',
]

export const CATEGORIAS_MARCA = [
  'Marca',
  'Frase de Propaganda',
  'Marca Colectiva',
  'Marca de Certificación',
  'Indicación Geográfica',
  'Denominación de Origen',
]

export const TIPOS_SIGNO_MARCA = [
  'Denominativa',
  'Figurativa',
  'Mixta',
  'Sonora',
  'Tridimensional',
  'de Posición',
  'de Patrón',
  'de Movimiento',
  'Multimedia',
  'Holográfica',
  'Olfativa',
  'Frase de Propaganda',
  'Táctil',
  'Combinación de Colores',
]

export const TIPOS_DERECHO_PATENTE = [
  'Patente de Invención',
  'Modelo de Utilidad',
  'Patente de Invención Provisional',
  'Modelo de Utilidad Provisional',
  'Diseño Industrial',
  'Dibujo Industrial',
  'Certificado de Diseño Industrial',
  'Certificado de Dibujo Industrial',
  'Esquemas y Trazados',
]

export const TIPOS_SOLICITUD_PATENTE = ['Patente de invención', 'Modelo de utilidad']
export const TIPOS_SOLICITUD_DISENO = ['Diseño industrial', 'Dibujo industrial']

export const DESTINOS_ESCRITO_PATENTE = [
  'Solicitud de Patente',
  'Anotación de Patente',
  'Demanda Nulidad de Patente',
]

export const DESTINOS_ESCRITO_MARCA = [
  'Solicitud de Marcas',
  'Proceso de Anotación y Renovación',
  'Juicio de Nulidad de Marca',
  'Juicio de Caducidad',
  'Juicio de Cancelación de IG/DO',
  'Juicio de Limitación Territorial',
]

export const TIPOS_DOCUMENTO_PODER = ['Poder o Personería', 'Documento Fundante de Anotación']

export const FIRMA_ELECTRONICA_OPCIONES = [
  'Documento Original con Firma Electrónica',
  'Documento Digital sin Firma Electrónica',
]

export const REGIONES_CHILE = [
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  "Libertador General Bernardo O'Higgins",
  'Maule',
  'Biobío',
  'La Araucanía',
  'Los Lagos',
  'Aysén del General Carlos Ibáñez del Campo',
  'Magallanes y de la Antártica Chilena',
  'Metropolitana de Santiago',
  'Los Ríos',
  'Arica y Parinacota',
  'Ñuble',
]

export const COMUNAS_POR_REGION: Record<string, string[]> = {
  'Metropolitana de Santiago': [
    'Santiago',
    'Cerrillos',
    'Cerro Navia',
    'Conchalí',
    'El Bosque',
    'Estación Central',
    'Huechuraba',
    'Independencia',
    'La Cisterna',
    'La Florida',
    'La Granja',
    'La Pintana',
    'La Reina',
    'Las Condes',
    'Lo Barnechea',
    'Lo Espejo',
    'Lo Prado',
    'Macul',
    'Maipú',
    'Ñuñoa',
    'Pedro Aguirre Cerda',
    'Peñalolén',
    'Providencia',
    'Pudahuel',
    'Quilicura',
    'Quinta Normal',
    'Recoleta',
    'Renca',
    'San Joaquín',
    'San Miguel',
    'San Ramón',
    'Vitacura',
    'Puente Alto',
    'San Bernardo',
  ],
  Valparaíso: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón', 'San Antonio'],
  Biobío: ['Concepción', 'Talcahuano', 'Hualpén', 'Chiguayante', 'San Pedro de la Paz', 'Los Ángeles'],
}

export const URLS_EXTERNAS = {
  madrid: 'https://madrid.inapi.cl/',
  diarioOficialMarcas: 'https://pagos.diarioficial.cl/Servicios/Marca/',
  diarioOficialPatentes: 'https://pagos.diarioficial.cl/Servicios/Patente/',
  consultaMarcaDominio: 'https://www.registrodeempresasysociedades.cl/MarcaDominio.aspx',
  datosSolicitudesMarcas: 'https://datos.gob.cl/dataset/solicitudes-de-marcas',
  datosRegistrosMarcas: 'https://datos.gob.cl/dataset/registros-de-marcas',
  datosGobInapi: 'https://datos.gob.cl/organization/instituto-nacional-de-propiedad-industrial-inapi',
  documentosInapi: 'https://documentos.inapi.cl',
  ompiNiza: 'https://www.wipo.int/classifications/nice/nclpub/es/fr/',
  entidadesAcreditadas: 'https://www.entidadacreditadora.gob.cl/entidades/',
} as const

export type BorradorGuardado = {
  nAtencion: string
  nSolicitud: string
  titular: string
  tipo: string
  ultima: string
  estado: string
}

export const BORRADORES_PATENTE_DETALLE: BorradorGuardado[] = [
  {
    nAtencion: 'SP1196641',
    nSolicitud: '',
    titular: '',
    tipo: 'Diseño Industrial',
    ultima: '2026/10/06 11:59:43',
    estado: 'Borrador',
  },
  {
    nAtencion: 'SP1196625',
    nSolicitud: '',
    titular: '',
    tipo: 'Patente de Invención',
    ultima: '2026/10/06 11:57:02',
    estado: 'Borrador',
  },
]

export const DEMO_NUMEROS = {
  registroMarca: '1234567',
  solicitudMarca: '1000000',
  solicitudPatente: '201401234',
  pct: 'PCT/CL2023/123456',
  cve: 'INAPI-CVE-DEMO-2026',
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function isoDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function datesBack(start: string, count: number, stepDays: number) {
  const out: string[] = []
  const d = new Date(`${start}T12:00:00`)
  for (let i = 0; i < count; i++) {
    out.push(isoDate(d))
    d.setDate(d.getDate() - stepDays)
  }
  return out
}

function businessDaysBack(start: string, count: number) {
  const out: string[] = []
  const d = new Date(`${start}T12:00:00`)
  while (out.length < count) {
    const dow = d.getDay()
    if (dow !== 0 && dow !== 6) out.push(isoDate(d))
    d.setDate(d.getDate() - 1)
  }
  return out
}

export const GACETA_MARCAS_FECHAS = datesBack('2026-10-02', 42, 7)
export const ESTADOS_DIARIOS_MARCAS_FECHAS = businessDaysBack('2026-10-07', 40)
export const ESTADOS_DIARIOS_PATENTES_FECHAS = businessDaysBack('2026-10-07', 40)

export const PCT_XML_2026 = [
  'CL202500790_20260140_XML',
  'CL202403973_20260154_XML',
  'CL202403736_20260108_XML',
  'CL202403557_20260157_XML',
  'CL202403531_20260145_XML',
  'CL202403407_20260108_XML',
  'CL202403116_20260110_XML',
  'CL202403099_20260145_XML',
  'CL202402650_20260151_XML',
  'CL202402534_20260156_XML',
  'CL202402410_20260112_XML',
  'CL202402201_20260120_XML',
  'CL202401988_20260133_XML',
  'CL202401750_20260102_XML',
  'CL202401512_20260118_XML',
]

export const PCT_XML_HISTORICO = [
  'CL202400576_20250801_XML',
  'CL202400049_20250801_XML',
  'CL202303826_20250801_XML',
  'CL202303763_20250801_XML',
  'CL202303393_20250801_XML',
  'CL202303131_20250801_XML',
  'CL202303026_20250801_XML',
  'CL202301755_20250801_XML',
  'CL202301750_20250801_XML',
  'CL202301701_20250801_XML',
  'CL202301540_20250801_XML',
  'CL202301220_20250801_XML',
]

export type ClasificadorTermino = {
  clase: number
  es: string
  en: string
  niza: boolean
  inapi: boolean
  adp: boolean
  madrid: boolean
}

export const CLASIFICADOR_TERMINOS: ClasificadorTermino[] = [
  { clase: 9, es: 'software', en: 'software', niza: true, inapi: true, adp: true, madrid: true },
  { clase: 9, es: 'programas informáticos', en: 'computer programs', niza: true, inapi: true, adp: true, madrid: true },
  { clase: 9, es: 'aplicaciones móviles', en: 'mobile applications', niza: false, inapi: true, adp: true, madrid: false },
  { clase: 25, es: 'prendas de vestir', en: 'clothing', niza: true, inapi: true, adp: true, madrid: true },
  { clase: 25, es: 'calzado', en: 'footwear', niza: true, inapi: true, adp: true, madrid: true },
  { clase: 30, es: 'café', en: 'coffee', niza: true, inapi: true, adp: true, madrid: true },
  { clase: 32, es: 'aguas minerales', en: 'mineral waters', niza: true, inapi: true, adp: false, madrid: true },
  { clase: 33, es: 'vinos', en: 'wines', niza: true, inapi: true, adp: true, madrid: true },
  { clase: 35, es: 'publicidad', en: 'advertising', niza: true, inapi: true, adp: true, madrid: true },
  { clase: 35, es: 'gestión de negocios', en: 'business management', niza: true, inapi: true, adp: true, madrid: true },
  { clase: 41, es: 'educación', en: 'education', niza: true, inapi: true, adp: true, madrid: true },
  { clase: 42, es: 'diseño de software', en: 'software design', niza: true, inapi: true, adp: true, madrid: true },
  { clase: 43, es: 'servicios de restaurante', en: 'restaurant services', niza: true, inapi: true, adp: true, madrid: true },
  { clase: 5, es: 'productos farmacéuticos', en: 'pharmaceuticals', niza: true, inapi: true, adp: true, madrid: true },
  { clase: 3, es: 'cosméticos', en: 'cosmetics', niza: true, inapi: true, adp: true, madrid: true },
]

export const NIZA_HEADING_CLASE_9 =
  'Aparatos e instrumentos científicos, de investigación, de navegación, geodésicos, fotográficos, cinematográficos, audiovisuales, ópticos, de pesaje, de medición, de señalización, de detección, de pruebas, de inspección, de control (inspección), de salvamento y de enseñanza; Aparatos e instrumentos de conducción, distribución, transformación, acumulación, regulación o control de la distribución o consumo de electricidad; Aparatos e instrumentos de grabación, transmisión, reproducción o tratamiento de sonidos, imágenes o datos; Soportes grabados o telecargables, software, soportes de registro y almacenamiento digitales o análogos vírgenes; Mecanismos para aparatos de previo pago; Cajas registradoras, dispositivos de cálculo; Ordenadores y periféricos de ordenador; Trajes de buceo, máscaras de buceo, tapones auditivos para buceo, pinzas nasales para submarinistas y nadadores, guantes de buceo, aparatos de respiración para la natación subacuática; Extintores'
