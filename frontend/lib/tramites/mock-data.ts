import { CASE_SEEDS, digitsOnly, ifNoActFor, nextStepsFor, STEREOTYPE_ACCOUNTS } from './demo-accounts'
import type { DemoPersona, MarcaEtapaId, SolicitudTone } from './marca-etapas'
import type { TramitesDomain } from './nav'

export const CERT_PRICE_CLP = 500
export const UTM_CLP = 72151

export type Notificacion = {
  id: string
  dominio: TramitesDomain
  numero: string
  nAtencion: string
  titular: string
  fecha: string
  presentacion: string
  tipo: string
  resumen: string
  nombre: string
  categoria: string
  tipoDerecho: string
  etapa: MarcaEtapaId
  tone: SolicitudTone
  estadoIpas: string
  estadoUnificado: string
  ultimaAccion: string
  plazo: string
  claseNiza?: string
  contacto?: string
  accionUsuario?: string
  runDigits: string
  nextSteps: string[]
  ifNoAct: string
  dondePresentar: string
  personas: DemoPersona[]
}

export const NOTIFICACIONES: Notificacion[] = [
  {
    id: 'eco',
    dominio: 'marcas',
    numero: '1612458',
    nAtencion: 'SM1612458',
    titular: 'Fernando Ignacio Arriagada Castillo',
    fecha: '2026-03-10',
    presentacion: '2026-03-10',
    tipo: 'Requerimiento',
    resumen:
      'Estado IPAS: Aguardando fin de plazo de observaciones de forma. INAPI verifica que la solicitud cumpla los requisitos legales y formales. Última acción registrada: «Resolución de observaciones de forma». Esta gestión se realiza en los canales oficiales de INAPI, no dentro de MiINAPI.',
    nombre: 'Eco-Tech Solutions',
    categoria: 'Marca',
    tipoDerecho: 'Marca comercial',
    etapa: 'forma',
    tone: 'required',
    estadoIpas: 'Aguardando fin de plazo de observaciones de forma',
    estadoUnificado: 'En trámite',
    ultimaAccion: 'Resolución de observaciones de forma',
    accionUsuario: 'Resolución de observaciones de forma',
    plazo: 'Según expediente IPAS',
    claseNiza: 'Clase 9',
    contacto: 'forma@inapi.cl',
    nextSteps: [
      'Revisa el estado «Aguardando fin de plazo de observaciones de forma» y la acción «Resolución de observaciones de forma» en el expediente.',
      'Sigue las instrucciones del oficio o de la notificación oficial de INAPI.',
      'Presenta la gestión en los canales oficiales (portal INAPI, correo o ventanilla indicados en el oficio).',
    ],
    ifNoAct: 'Si el plazo del estado IPAS vence sin la gestión correspondiente, el expediente puede no avanzar o abandonarse, según la normativa aplicable a este estado.',
    dondePresentar: 'Canales oficiales de INAPI según el oficio o la notificación del expediente.',
    runDigits: '18618492',
    personas: ['frecuente'],
  },
  {
    id: 'neo',
    dominio: 'marcas',
    numero: '1647823',
    nAtencion: 'SM1647823',
    titular: 'Fernando Ignacio Arriagada Castillo',
    fecha: '2026-02-18',
    presentacion: '2026-02-18',
    tipo: 'Publicación',
    resumen:
      'Estado IPAS: Aguardando fin de plazo de pago de publicación al Diario Oficial. Su marca se publica en el Diario Oficial y terceros pueden oponerse dentro de un plazo. Última acción registrada: «Resolución de aceptación a trámite de marca».',
    nombre: 'NeoGraphix Design',
    categoria: 'Marca',
    tipoDerecho: 'Marca comercial',
    etapa: 'publicacion',
    tone: 'required',
    estadoIpas: 'Aguardando fin de plazo de pago de publicación al Diario Oficial',
    estadoUnificado: 'En trámite',
    ultimaAccion: 'Resolución de aceptación a trámite de marca',
    plazo: 'Según expediente IPAS',
    claseNiza: 'Clase 35',
    contacto: 'publicacion@inapi.cl',
    nextSteps: [
      'Revisa el estado «Aguardando fin de plazo de pago de publicación al Diario Oficial».',
      'Sigue las instrucciones del oficio de aceptación a trámite de marca.',
      'Efectúa el pago por los medios habilitados por INAPI, no desde esta pantalla.',
    ],
    ifNoAct: 'Si el plazo del estado IPAS vence sin el pago de publicación, la solicitud puede tenerse por no presentada por falta de publicación.',
    dondePresentar: 'Medios de pago y canales oficiales indicados en el oficio de INAPI.',
    runDigits: '18618492',
    personas: ['frecuente'],
  },
  {
    id: 'farma',
    dominio: 'marcas',
    numero: '1623891',
    nAtencion: 'SM1623891',
    titular: 'Fernando Ignacio Arriagada Castillo',
    fecha: '2026-01-22',
    presentacion: '2026-01-22',
    tipo: 'Examen de fondo',
    resumen:
      'Estado IPAS: Aguardando fin de plazo de observaciones de fondo. Se le ha asignado un especialista de INAPI, quien evalúa si su marca cumple con la ley para ser registrada. Última acción registrada: «Resolución de observaciones de fondo».',
    nombre: 'FarmaTech Chile',
    categoria: 'Marca',
    tipoDerecho: 'Marca comercial',
    etapa: 'fondo',
    tone: 'required',
    estadoIpas: 'Aguardando fin de plazo de observaciones de fondo',
    estadoUnificado: 'En trámite',
    ultimaAccion: 'Resolución de observaciones de fondo',
    plazo: 'Según expediente IPAS',
    claseNiza: 'Clase 5',
    contacto: 'fondo@inapi.cl',
    nextSteps: [
      'Revisa el estado «Aguardando fin de plazo de observaciones de fondo» y la acción «Resolución de observaciones de fondo» en el expediente.',
      'Sigue las instrucciones del oficio o de la notificación oficial de INAPI.',
      'Presenta la gestión en los canales oficiales de INAPI.',
    ],
    ifNoAct: 'Si el plazo del estado IPAS vence sin la gestión correspondiente, el expediente puede no avanzar, según la normativa aplicable a este estado.',
    dondePresentar: 'Canales oficiales de INAPI según el oficio o la notificación del expediente.',
    runDigits: '18618492',
    personas: ['frecuente'],
  },
  {
    id: 'aura',
    dominio: 'marcas',
    numero: '1634567',
    nAtencion: 'SM1634567',
    titular: 'Fernando Ignacio Arriagada Castillo',
    fecha: '2025-11-04',
    presentacion: '2025-11-04',
    tipo: 'Examen de fondo',
    resumen: 'INAPI evalúa si tu marca Aura Cosmetics cumple con la ley. No hay un plazo abierto a tu cargo en este momento.',
    nombre: 'Aura Cosmetics',
    categoria: 'Marca',
    tipoDerecho: 'Marca comercial',
    etapa: 'fondo',
    tone: 'progress',
    estadoIpas: 'En examen de fondo',
    estadoUnificado: 'En trámite',
    ultimaAccion: 'Asignación de responsable para examen de fondo',
    plazo: 'Sin plazo abierto a tu cargo',
    claseNiza: 'Clase 3',
    nextSteps: [
      'Revisa el expediente cuando INAPI publique una nueva resolución.',
      'No debes presentar un escrito mientras no haya observaciones.',
    ],
    ifNoAct: 'Si no hay plazo abierto, el expediente sigue en INAPI.',
    dondePresentar: 'Portal de trámites de INAPI, si más adelante se notifica un oficio.',
    runDigits: '18618492',
    personas: ['frecuente'],
  },
  {
    id: 'terra',
    dominio: 'marcas',
    numero: '1659012',
    nAtencion: 'SM1659012',
    titular: 'Fernando Ignacio Arriagada Castillo',
    fecha: '2025-03-15',
    presentacion: '2025-03-15',
    tipo: 'Registrada',
    resumen: 'Tu marca Terra Verde SPA está registrada. Desde aquí puedes renovar o pedir cambios al registro.',
    nombre: 'Terra Verde SPA',
    categoria: 'Marca',
    tipoDerecho: 'Marca comercial',
    etapa: 'pago',
    tone: 'registered',
    estadoIpas: 'Registrada',
    estadoUnificado: 'Registrada',
    ultimaAccion: 'Publicación de marca en Diario Oficial',
    plazo: 'Sin plazo de trámite',
    claseNiza: 'Clase 43',
    nextSteps: ['Guarda el título y anota la fecha de renovación.', 'Si cambian el titular o el nombre, presenta una anotación.'],
    ifNoAct: 'El registro se mantiene vigente mientras se paguen las renovaciones a tiempo.',
    dondePresentar: 'Portal de trámites de INAPI, en renovaciones y anotaciones.',
    runDigits: '18618492',
    personas: ['frecuente'],
  },
  {
    id: 'audilex',
    dominio: 'marcas',
    numero: '1694791',
    nAtencion: 'SM1694791',
    titular: 'Luis Atiliano Vásquez Díaz',
    fecha: '2026-10-12',
    presentacion: '2026-10-12',
    tipo: 'Requerimiento',
    resumen: 'Tu solicitud AUDILEX está en examen de forma. INAPI revisa que cumpla los requisitos legales y formales.',
    nombre: 'AUDILEX',
    categoria: 'Marca',
    tipoDerecho: 'Denominativa',
    etapa: 'forma',
    tone: 'progress',
    estadoIpas: 'En examen de forma',
    estadoUnificado: 'En trámite',
    ultimaAccion: 'Fin de captura diaria de expedientes',
    plazo: 'Sin plazo abierto a tu cargo',
    claseNiza: 'Clase 35',
    nextSteps: [
      'Espera el resultado del examen de forma.',
      'Si llega una resolución de observaciones, responde dentro del plazo del oficio.',
    ],
    ifNoAct: 'Si más adelante hay observaciones y no respondes a tiempo, la solicitud puede abandonarse.',
    dondePresentar: 'Portal de trámites de INAPI, cuando se notifique un oficio.',
    runDigits: '22222222',
    personas: ['natural'],
  },
  {
    id: 'capitan',
    dominio: 'marcas',
    numero: '1687456',
    nAtencion: 'SM1687456',
    titular: 'Pilar De Las Nieves Rodríguez Aros',
    fecha: '2026-08-24',
    presentacion: '2026-08-24',
    tipo: 'Publicación',
    resumen: 'Pagaste la publicación. INAPI espera la aparición de Capitán Emilio en el Diario Oficial.',
    nombre: 'Capitán Emilio',
    categoria: 'Marca',
    tipoDerecho: 'Denominativa',
    etapa: 'publicacion',
    tone: 'progress',
    estadoIpas: 'Aguardando por publicación en Diario Oficial',
    estadoUnificado: 'En trámite',
    ultimaAccion: 'Pago de publicación efectuado (Diario Oficial)',
    plazo: 'Según Diario Oficial',
    claseNiza: 'Clase 43',
    nextSteps: [
      'Revisa cuando se publique el extracto.',
      'Después corre el plazo de oposición de terceros.',
    ],
    ifNoAct: 'No hay un pago pendiente de publicación. El expediente sigue en INAPI.',
    dondePresentar: 'No aplica mientras espera la publicación.',
    runDigits: '22222222',
    personas: ['natural'],
  },
  {
    id: 'n3',
    dominio: 'patentes',
    numero: '202101234',
    nAtencion: 'PA202101234',
    titular: 'Fernando Ignacio Arriagada Castillo',
    fecha: '2026-05-18',
    presentacion: '2021-05-18',
    tipo: 'Examen de fondo',
    resumen: 'Se inició el examen de fondo de tu solicitud de patente.',
    nombre: 'Sistema de anclaje para tarima',
    categoria: 'Patente',
    tipoDerecho: 'Patente de invención',
    etapa: 'fondo',
    tone: 'progress',
    estadoIpas: 'En examen de fondo',
    estadoUnificado: 'En trámite',
    ultimaAccion: 'Asignación de responsable para examen de fondo',
    plazo: 'Sin plazo abierto a tu cargo',
    nextSteps: ['Revisa el expediente cuando INAPI publique una nueva resolución.'],
    ifNoAct: 'Si no hay plazo abierto, el expediente sigue en INAPI.',
    dondePresentar: 'Portal de trámites de INAPI.',
    runDigits: '18618492',
    personas: ['frecuente'],
  },
  ...CASE_SEEDS.map(seed => ({
    id: `ex-${seed.run}`,
    runDigits: seed.run,
    dominio: 'marcas' as const,
    numero: seed.run.padStart(7, '0'),
    nAtencion: `SM${seed.run}`,
    titular: seed.titular,
    fecha: '2026-10-12',
    presentacion: '2026-03-10',
    tipo: seed.tone === 'required' ? 'Requerimiento' : seed.tone === 'registered' ? 'Registrada' : seed.estadoIpas,
    resumen:
      seed.tone === 'required'
        ? `Estado IPAS: ${seed.estadoIpas}. INAPI verifica que la solicitud cumpla los requisitos legales y formales. Última acción registrada: «${seed.ultimaAccion}». Esta gestión se realiza en los canales oficiales de INAPI, no dentro de MiINAPI.`
        : `Estado IPAS: ${seed.estadoIpas}. Última acción registrada: «${seed.ultimaAccion}».`,
    nombre: seed.marca,
    categoria: 'Marca',
    tipoDerecho: 'Marca comercial',
    etapa: seed.etapa,
    tone: seed.tone,
    estadoIpas: seed.estadoIpas,
    estadoUnificado: seed.tone === 'registered' ? 'Registrada' : seed.tone === 'closed' ? seed.estadoIpas : 'En trámite',
    ultimaAccion: seed.ultimaAccion,
    plazo: seed.tone === 'required' ? 'Según expediente IPAS' : 'Sin plazo abierto a tu cargo',
    claseNiza: seed.claseNiza,
    accionUsuario: seed.accionUsuario,
    nextSteps: nextStepsFor(seed),
    ifNoAct: ifNoActFor(seed),
    dondePresentar:
      seed.tone === 'required'
        ? 'Canales oficiales de INAPI según el oficio o la notificación del expediente.'
        : 'Portal de trámites de INAPI, si más adelante se notifica un oficio.',
    personas: ['natural'] as DemoPersona[],
  })),
]

const FRECUENTE_RUN = STEREOTYPE_ACCOUNTS[0].runDigits
const NATURAL_RUN = STEREOTYPE_ACCOUNTS[1].runDigits

export function solicitudesForRun(run: string) {
  const digits = digitsOnly(run)
  if (!digits) return [] as Notificacion[]
  if (digits === STEREOTYPE_ACCOUNTS[2].runDigits) return []
  if (digits === FRECUENTE_RUN) return NOTIFICACIONES.filter(n => n.personas.includes('frecuente'))
  if (digits === NATURAL_RUN) return NOTIFICACIONES.filter(n => n.id === 'audilex' || n.id === 'capitan')
  return NOTIFICACIONES.filter(n => n.runDigits === digits)
}

export function solicitudesDe(persona: DemoPersona) {
  if (persona === 'nuevo') return [] as Notificacion[]
  if (persona === 'natural') return solicitudesForRun(NATURAL_RUN)
  return solicitudesForRun(FRECUENTE_RUN)
}

export type PagoPendiente = {
  id: string
  dominio: TramitesDomain
  numero: string
  concepto: string
  href: string
}

export const PAGOS_PENDIENTES: PagoPendiente[] = [
  {
    id: 'pg1',
    dominio: 'marcas',
    numero: '1647823',
    concepto: 'Pago de publicación en el Diario Oficial · NeoGraphix Design',
    href: '/tramites/marcas/pagos',
  },
]

export function pagosForRun(run: string) {
  const items = solicitudesForRun(run)
  return PAGOS_PENDIENTES.filter(p => items.some(n => n.numero === p.numero))
}

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
