import type { TramitesDomain } from './nav'

export const CERT_PRICE_CLP = 500
export const UTM_CLP = 72151

export type Notificacion = {
  id: string
  dominio: TramitesDomain
  numero: string
  titular: string
  fecha: string
  tipo: string
  resumen: string
}

export const NOTIFICACIONES: Notificacion[] = [
  {
    id: 'n1',
    dominio: 'marcas',
    numero: '1000000',
    titular: 'Fernando Ignacio Arriagada Castillo',
    fecha: '2026-04-12',
    tipo: 'Publicación',
    resumen: 'Tu solicitud OMNIdanz se publicó en el Diario Oficial.',
  },
  {
    id: 'n2',
    dominio: 'marcas',
    numero: 'SM1196003',
    titular: 'Fernando Ignacio Arriagada Castillo',
    fecha: '2026-03-02',
    tipo: 'Requerimiento',
    resumen: 'INAPI te pide complementar antecedentes de tu solicitud.',
  },
  {
    id: 'n3',
    dominio: 'patentes',
    numero: '202101234',
    titular: 'Fernando Ignacio Arriagada Castillo',
    fecha: '2026-05-18',
    tipo: 'Examen de fondo',
    resumen: 'Se inició el examen de fondo de tu solicitud de patente.',
  },
]

export type DocumentoExpediente = {
  id: string
  fecha: string
  tipo: string
  descripcion: string
}

export const EXPEDIENTE_MARCA = {
  numero: '1000000',
  signo: 'OMNIdanz',
  titular: 'Fernando Ignacio Arriagada Castillo',
  estado: 'En tramitación',
  documentos: [
    { id: 'd1', fecha: '2025-11-03', tipo: 'Solicitud', descripcion: 'Formulario de solicitud de marca' },
    { id: 'd2', fecha: '2025-11-03', tipo: 'Comprobante', descripcion: 'Pago de tasas de presentación' },
    { id: 'd3', fecha: '2025-11-10', tipo: 'Examen de forma', descripcion: 'Informe de examen de forma' },
    { id: 'd4', fecha: '2025-12-01', tipo: 'Publicación', descripcion: 'Aviso de publicación Diario Oficial' },
    { id: 'd5', fecha: '2026-01-15', tipo: 'Escrito', descripcion: 'Escrito de respuesta a requerimiento' },
    { id: 'd6', fecha: '2026-02-02', tipo: 'Oficio', descripcion: 'Oficio administrativo' },
    { id: 'd7', fecha: '2026-02-20', tipo: 'Informe', descripcion: 'Informe de similitud' },
    { id: 'd8', fecha: '2026-03-01', tipo: 'Resolución', descripcion: 'Resolución de trámite' },
    { id: 'd9', fecha: '2026-03-08', tipo: 'Notificación', descripcion: 'Cédula de notificación' },
    { id: 'd10', fecha: '2026-03-12', tipo: 'Anexo', descripcion: 'Poder del representante' },
    { id: 'd11', fecha: '2026-03-18', tipo: 'Anexo', descripcion: 'Traducción de prioridad' },
    { id: 'd12', fecha: '2026-03-22', tipo: 'Pago', descripcion: 'Comprobante de tasa complementaria' },
    { id: 'd13', fecha: '2026-04-01', tipo: 'Publicación', descripcion: 'Constancia de publicación' },
    { id: 'd14', fecha: '2026-04-12', tipo: 'Escrito', descripcion: 'Escrito de desistimiento parcial' },
    { id: 'd15', fecha: '2026-04-20', tipo: 'Informe', descripcion: 'Informe de examen de fondo' },
    { id: 'd16', fecha: '2026-05-02', tipo: 'Resolución', descripcion: 'Aceptación a trámite' },
    { id: 'd17', fecha: '2026-05-10', tipo: 'Notificación', descripcion: 'Notificación electrónica' },
    { id: 'd18', fecha: '2026-05-18', tipo: 'Anexo', descripcion: 'Etiqueta de la marca' },
    { id: 'd19', fecha: '2026-06-01', tipo: 'Pago', descripcion: 'Comprobante TGR' },
    { id: 'd20', fecha: '2026-06-08', tipo: 'Oficio', descripcion: 'Oficio judicial (copia)' },
    { id: 'd21', fecha: '2026-06-15', tipo: 'Escrito', descripcion: 'Escrito de cumplimiento' },
    { id: 'd22', fecha: '2026-07-01', tipo: 'Carátula', descripcion: 'Carátula del expediente digital' },
  ] satisfies DocumentoExpediente[],
}

export const EXPEDIENTE_PATENTE = {
  numero: '202101234',
  titulo: 'Dispositivo de asistencia para danza',
  titular: 'Fernando Ignacio Arriagada Castillo',
  estado: 'Examen de fondo',
  documentos: EXPEDIENTE_MARCA.documentos.map((d, i) => ({
    ...d,
    id: `p${i + 1}`,
    descripcion: d.descripcion.replace('marca', 'patente'),
  })),
}

export type Borrador = {
  id: string
  signoOTitulo: string
  fecha: string
  vence: string
  dominio: TramitesDomain
}

export const BORRADORES_MARCA: Borrador[] = [
  { id: 'SM1196003', signoOTitulo: 'OMNIdanz Studio', fecha: '2026-03-01', vence: '2026-04-30', dominio: 'marcas' },
  { id: 'SM1163533', signoOTitulo: 'Paso Firme', fecha: '2026-02-12', vence: '2026-04-13', dominio: 'marcas' },
]

export const BORRADORES_PATENTE: Borrador[] = [
  { id: 'PA2026011', signoOTitulo: 'Sistema de anclaje para tarima', fecha: '2026-04-04', vence: '2026-06-03', dominio: 'patentes' },
]

export const TIPOS_PROCESO_MARCA = [
  'Solicitud de registro',
  'Oposición',
  'Nulidad',
  'Caducidad',
  'Renovación',
  'Anotación',
  'Requerimiento',
]

export const TIPOS_ESCRITO_MARCA = [
  'Escrito de respuesta',
  'Desistimiento',
  'Abandono',
  'Cumplimiento de observaciones',
  'Alegatos',
  'Oficio Administrativo',
  'Oficio Judicial',
  'Otros',
]

export const TIPOS_PROCESO_PATENTE = [
  'Solicitud de patente',
  'Solicitud de modelo de utilidad',
  'Solicitud de diseño industrial',
  'Requerimiento',
  'Oposición',
  'Anotación',
]

export const TIPOS_ESCRITO_PATENTE = [
  'Escrito de respuesta',
  'Modificación de reivindicaciones',
  'Desistimiento',
  'Cumplimiento de observaciones',
  'Oficio Administrativo',
  'Oficio Judicial',
  'Otros',
]

export const FORMULARIOS_MARCA = [
  { id: 'fm1', nombre: 'Solicitud de registro de marca', archivo: 'solicitud-marca.pdf' },
  { id: 'fm2', nombre: 'Poder para actuar ante INAPI', archivo: 'poder-marcas.pdf' },
  { id: 'fm3', nombre: 'Cesión de derechos de marca', archivo: 'cesion-marca.pdf' },
  { id: 'fm4', nombre: 'Oposición a solicitud de marca', archivo: 'oposicion-marca.pdf' },
]

export const FORMULARIOS_PATENTE = [
  { id: 'fp1', nombre: 'Solicitud de patente de invención', archivo: 'solicitud-patente.pdf' },
  { id: 'fp2', nombre: 'Solicitud de modelo de utilidad', archivo: 'solicitud-mu.pdf' },
  { id: 'fp3', nombre: 'Solicitud de diseño o dibujo industrial', archivo: 'solicitud-diseno.pdf' },
  { id: 'fp4', nombre: 'Poder para actuar ante INAPI', archivo: 'poder-patentes.pdf' },
]

export const TIPOS_CERTIFICADO_MARCA = [
  'Certificado de registro de marca',
  'Certificado de vigencia',
  'Certificado de tramitación',
  'Copia autorizada de resolución',
]

export const TIPOS_CERTIFICADO_PATENTE = [
  'Certificado de patente concedida',
  'Certificado de vigencia',
  'Certificado de tramitación',
  'Copia autorizada de reivindicaciones',
]

export const NIZA_CLASES: { n: number; titulo: string }[] = [
  { n: 1, titulo: 'Productos químicos' },
  { n: 2, titulo: 'Pinturas y barnices' },
  { n: 3, titulo: 'Cosméticos y limpieza' },
  { n: 4, titulo: 'Aceites y combustibles' },
  { n: 5, titulo: 'Farmacéuticos' },
  { n: 6, titulo: 'Metales comunes' },
  { n: 7, titulo: 'Máquinas y herramientas' },
  { n: 8, titulo: 'Herramientas de mano' },
  { n: 9, titulo: 'Aparatos científicos y software' },
  { n: 10, titulo: 'Aparatos médicos' },
  { n: 11, titulo: 'Iluminación y climatización' },
  { n: 12, titulo: 'Vehículos' },
  { n: 13, titulo: 'Armas de fuego' },
  { n: 14, titulo: 'Joyería' },
  { n: 15, titulo: 'Instrumentos musicales' },
  { n: 16, titulo: 'Papel e impresos' },
  { n: 17, titulo: 'Caucho y plásticos' },
  { n: 18, titulo: 'Cuero y maletas' },
  { n: 19, titulo: 'Materiales de construcción' },
  { n: 20, titulo: 'Muebles' },
  { n: 21, titulo: 'Utensilios de hogar' },
  { n: 22, titulo: 'Cuerdas y lonas' },
  { n: 23, titulo: 'Hilos' },
  { n: 24, titulo: 'Tejidos' },
  { n: 25, titulo: 'Prendas de vestir' },
  { n: 26, titulo: 'Encajes y bordados' },
  { n: 27, titulo: 'Alfombras' },
  { n: 28, titulo: 'Juegos y juguetes' },
  { n: 29, titulo: 'Alimentos de origen animal' },
  { n: 30, titulo: 'Café, pan y condimentos' },
  { n: 31, titulo: 'Productos agrícolas' },
  { n: 32, titulo: 'Cervezas y bebidas' },
  { n: 33, titulo: 'Bebidas alcohólicas' },
  { n: 34, titulo: 'Tabaco' },
  { n: 35, titulo: 'Publicidad y negocios' },
  { n: 36, titulo: 'Seguros y finanzas' },
  { n: 37, titulo: 'Construcción y reparación' },
  { n: 38, titulo: 'Telecomunicaciones' },
  { n: 39, titulo: 'Transporte y almacenamiento' },
  { n: 40, titulo: 'Tratamiento de materiales' },
  { n: 41, titulo: 'Educación y deporte' },
  { n: 42, titulo: 'Ciencia y tecnología' },
  { n: 43, titulo: 'Alimentación y hospedaje' },
  { n: 44, titulo: 'Servicios médicos y belleza' },
  { n: 45, titulo: 'Servicios jurídicos y seguridad' },
]

export const CIP_EJEMPLOS = [
  { codigo: 'A63B 25/00', titulo: 'Aparatos para danza o ejercicio rítmico' },
  { codigo: 'A63B 21/00', titulo: 'Aparatos de ejercicio' },
  { codigo: 'G06F 3/01', titulo: 'Dispositivos de entrada para interacción con el usuario' },
]

export type ResultadoPatente = {
  numero: string
  titulo: string
  solicitante: string
  fecha: string
  tipo: string
}

export const RESULTADOS_PATENTES: ResultadoPatente[] = [
  {
    numero: '202101234',
    titulo: 'Dispositivo de asistencia para danza',
    solicitante: 'Fernando Ignacio Arriagada Castillo',
    fecha: '2021-06-14',
    tipo: 'Patente de invención',
  },
  {
    numero: '201805512',
    titulo: 'Suela antideslizante para calzado de escenario',
    solicitante: 'Taller Paso Firme SpA',
    fecha: '2018-09-02',
    tipo: 'Modelo de utilidad',
  },
  {
    numero: 'D20200088',
    titulo: 'Diseño de tarima plegable',
    solicitante: 'OMNIdanz Ltda.',
    fecha: '2020-02-11',
    tipo: 'Diseño industrial',
  },
]
