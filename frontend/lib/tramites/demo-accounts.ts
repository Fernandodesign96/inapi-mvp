import type { DemoPersona, MarcaEtapaId, SolicitudTone } from './marca-etapas'

export function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

export type DemoAccount = {
  runDigits: string
  clave: string
  nombre: string
  persona: DemoPersona
  stereotype?: boolean
  marca: string
  estadoIpas: string
  accionUsuario?: string
  required?: boolean
}

export const STEREOTYPE_ACCOUNTS: DemoAccount[] = [
  {
    runDigits: '18618492',
    clave: '8492',
    nombre: 'Fernando Ignacio Arriagada Castillo',
    persona: 'frecuente',
    stereotype: true,
    marca: 'Usuario frecuente',
    estadoIpas: 'Varias solicitudes en distintas etapas, como una oficina o un estudio.',
  },
  {
    runDigits: '22222222',
    clave: '2222',
    nombre: 'Luis Atiliano Vásquez Díaz',
    persona: 'natural',
    stereotype: true,
    marca: 'Persona natural',
    estadoIpas: 'Pocas solicitudes propias, sin agente.',
  },
  {
    runDigits: '33333333',
    clave: '3333',
    nombre: 'Camila Soto Núñez',
    persona: 'nuevo',
    stereotype: true,
    marca: 'Usuario nuevo',
    estadoIpas: 'Aún no presenta una solicitud en INAPI.',
  },
]

export type CaseSeed = {
  run: string
  titular: string
  marca: string
  estadoIpas: string
  accionUsuario?: string
  etapa: MarcaEtapaId
  tone: SolicitudTone
  claseNiza?: string
  ultimaAccion: string
}

export const CASE_SEEDS: CaseSeed[] = [
  {
    run: '6329316',
    titular: 'Erico Dioscoro Primitivo Rojas Campos',
    marca: 'Campeonato mundial del pebre',
    estadoIpas: 'Para tener por no presentada por falta de publicación',
    accionUsuario: 'Pagar publicación en el Diario Oficial',
    etapa: 'publicacion',
    tone: 'required',
    claseNiza: 'Clase 41',
    ultimaAccion: 'Resolución de aceptación a trámite de marca',
  },
  {
    run: '5566057',
    titular: 'Juan Tomás Eguzki De Rementeria Durand',
    marca: 'CAP DUCAL',
    estadoIpas: 'Aguardando fin de plazo de pago de publicación al Diario Oficial',
    accionUsuario: 'Pagar publicación en el Diario Oficial',
    etapa: 'publicacion',
    tone: 'required',
    claseNiza: 'Clase 33',
    ultimaAccion: 'Resolución de aceptación a trámite de marca',
  },
  {
    run: '6873895',
    titular: 'Alejandro Alvarez Rapaport',
    marca: 'HOCKOK',
    estadoIpas: 'Aguardando fin de plazo de pago de concesión (marca nueva)',
    accionUsuario: 'Pagar derechos de concesión y registro',
    etapa: 'pago',
    tone: 'required',
    claseNiza: 'Clase 25',
    ultimaAccion: 'Resolución de aceptación a registro',
  },
  {
    run: '7034345',
    titular: 'Juan Esteban Sepúlveda Adriasola',
    marca: 'QUIÑANTU',
    estadoIpas: 'Para abandonar',
    accionUsuario: 'Regularizar el expediente antes de que se declare abandonado',
    etapa: 'forma',
    tone: 'required',
    claseNiza: 'Clase 33',
    ultimaAccion: 'Requerimiento de regularización',
  },
  {
    run: '6141533',
    titular: 'Erwin Hugo Arellano Carvajal',
    marca: 'Radio Alpina',
    estadoIpas: 'Para abandonar por falta de pago de concesión (marca nueva)',
    accionUsuario: 'Pagar derechos de concesión y registro',
    etapa: 'pago',
    tone: 'required',
    claseNiza: 'Clase 38',
    ultimaAccion: 'Aceptación a registro',
  },
  {
    run: '5598039',
    titular: 'Tomás Galván González',
    marca: 'TerAler',
    estadoIpas: 'Aguardando fin de plazo de pago de concesión (marca nueva)',
    accionUsuario: 'Pagar derechos de concesión y registro',
    etapa: 'pago',
    tone: 'required',
    claseNiza: 'Clase 5',
    ultimaAccion: 'Resolución de aceptación a registro',
  },
  {
    run: '4940352',
    titular: 'Hernán Víctor Duarte Ravello',
    marca: 'Club deportivo Social y Cultural Ferrobadminton',
    estadoIpas: 'Aguardando fin de plazo de observaciones de forma',
    accionUsuario: 'Responder observaciones de forma y adjuntar antecedentes',
    etapa: 'forma',
    tone: 'required',
    claseNiza: 'Clase 41',
    ultimaAccion: 'Resolución de observaciones de forma',
  },
  {
    run: '6437843',
    titular: 'Ahumada Alvarez, Aníbal',
    marca: 'ENAD Encuentro Nacional de Administradores de Condominios',
    estadoIpas: 'Aguardando fin de plazo de respuesta a oposiciones',
    accionUsuario: 'Responder a la oposición presentada',
    etapa: 'oposicion',
    tone: 'required',
    claseNiza: 'Clase 41',
    ultimaAccion: 'Notificación de oposición',
  },
  {
    run: '5634513',
    titular: 'Luis Fernando Hidalgo Álvarez',
    marca: 'REVISTA DEL CARABINERO R PROSPERIDAD MISIÓN CUMPLIDA FED. NAC. DE CARABINEROS DE NOMBRAMIENTO INSTITUCIONAL (R) PERSONERÍA JURÍDICA N°93 AÑO 1996',
    estadoIpas: 'Aguardando fin de plazo de observaciones de fondo',
    accionUsuario: 'Responder observaciones de fondo y adjuntar antecedentes',
    etapa: 'fondo',
    tone: 'required',
    claseNiza: 'Clase 16',
    ultimaAccion: 'Resolución de observaciones de fondo',
  },
  {
    run: '13367990',
    titular: 'Emma Care SpA',
    marca: "THE CHILDREN IN EMMA'S CARE",
    estadoIpas: 'Aguardando fin de plazo de docs de prioridad',
    accionUsuario: 'Adjuntar documentos de prioridad',
    etapa: 'forma',
    tone: 'required',
    claseNiza: 'Clase 41',
    ultimaAccion: 'Requerimiento de documentos de prioridad',
  },
  {
    run: '5316975',
    titular: 'Luis Atiliano Vásquez Díaz',
    marca: 'AUDILEX',
    estadoIpas: 'En examen de forma',
    etapa: 'forma',
    tone: 'progress',
    claseNiza: 'Clase 35',
    ultimaAccion: 'Fin de captura diaria de expedientes',
  },
  {
    run: '4436593',
    titular: 'Juan Enrique Carrera Salinas',
    marca: 'caleta de lobos',
    estadoIpas: 'Para asignar responsable de examen de fondo (luego de plazo de oposiciones)',
    etapa: 'fondo',
    tone: 'progress',
    claseNiza: 'Clase 29',
    ultimaAccion: 'Fin de plazo de oposiciones',
  },
  {
    run: '5139418',
    titular: 'Pilar De Las Nieves Rodríguez Aros',
    marca: 'Capitán Emilio',
    estadoIpas: 'Aguardando por publicación en Diario Oficial',
    etapa: 'publicacion',
    tone: 'progress',
    claseNiza: 'Clase 43',
    ultimaAccion: 'Pago de publicación efectuado (Diario Oficial)',
  },
  {
    run: '4962833',
    titular: 'Héctor Miguel Gutiérrez Lazo',
    marca: 'CONJUNTO GRANEROS',
    estadoIpas: 'En examen de fondo',
    etapa: 'fondo',
    tone: 'progress',
    claseNiza: 'Clase 41',
    ultimaAccion: 'Asignación de responsable para examen de fondo',
  },
  {
    run: '5473021',
    titular: 'Raúl Gustavo Aguilera Parada',
    marca: 'LabCann , LabCann-Skin',
    estadoIpas: 'En examen de admisibilidad de todos los escritos de oposiciones',
    etapa: 'oposicion',
    tone: 'progress',
    claseNiza: 'Clase 3',
    ultimaAccion: 'Ingreso de escritos de oposición',
  },
  {
    run: '4064679',
    titular: 'Yolanda Yamna Nandwani Nandwani',
    marca: 'My Emperor Elixir',
    estadoIpas: 'Aguardando que resolución de aceptación a registro sea publicada',
    etapa: 'aceptacion',
    tone: 'progress',
    claseNiza: 'Clase 3',
    ultimaAccion: 'Resolución de aceptación a registro',
  },
  {
    run: '7108856',
    titular: 'José Andrés Moya Miranda',
    marca: 'SEAPROP',
    estadoIpas: 'Para emitir título',
    etapa: 'pago',
    tone: 'progress',
    claseNiza: 'Clase 36',
    ultimaAccion: 'Pago de derechos de concesión',
  },
  {
    run: '3800446',
    titular: 'Ana María Baez Sáez',
    marca: 'Siemprevivas',
    estadoIpas: 'Aguardando fin de plazo de presentación de oposiciones',
    etapa: 'oposicion',
    tone: 'progress',
    claseNiza: 'Clase 31',
    ultimaAccion: 'Publicación en Diario Oficial',
  },
  {
    run: '7046527',
    titular: 'Carlos Andrés De Costa-nora Monti',
    marca: 'VITAID',
    estadoIpas: 'Para asignar responsable de examen formal',
    etapa: 'forma',
    tone: 'progress',
    claseNiza: 'Clase 5',
    ultimaAccion: 'Solicitud recibida',
  },
  {
    run: '4323087',
    titular: 'Jorge Elso Sanhueza',
    marca: 'Aguamarina FM',
    estadoIpas: 'Registrada',
    etapa: 'pago',
    tone: 'registered',
    claseNiza: 'Clase 38',
    ultimaAccion: 'Publicación de marca en Diario Oficial',
  },
  {
    run: '5522560',
    titular: 'Guillermo Diaz De Valdes Gumucio',
    marca: 'Cafe Amazonas',
    estadoIpas: 'Desistida',
    etapa: 'fondo',
    tone: 'closed',
    claseNiza: 'Clase 30',
    ultimaAccion: 'Desistimiento de la solicitud',
  },
  {
    run: '2699024',
    titular: 'José Manuel Rodríguez Placin',
    marca: 'Panadería Santa María',
    estadoIpas: 'Rechazada',
    etapa: 'fondo',
    tone: 'closed',
    claseNiza: 'Clase 30',
    ultimaAccion: 'Resolución de rechazo',
  },
  {
    run: '5340920',
    titular: 'Emma Agustina De Lourdes Valenzuela Riveros',
    marca: 'VISA USA',
    estadoIpas: 'Abandonada',
    etapa: 'forma',
    tone: 'closed',
    claseNiza: 'Clase 36',
    ultimaAccion: 'Declaración de abandono',
  },
]

export const EXAMPLE_ACCOUNTS: DemoAccount[] = CASE_SEEDS.map(seed => ({
  runDigits: seed.run,
  clave: seed.run.slice(-4),
  nombre: seed.titular,
  persona: 'natural',
  marca: seed.marca,
  estadoIpas: seed.estadoIpas,
  accionUsuario: seed.accionUsuario,
  required: seed.tone === 'required',
}))

export const ALL_DEMO_ACCOUNTS = [...STEREOTYPE_ACCOUNTS, ...EXAMPLE_ACCOUNTS]

export function findDemoAccount(run: string, clave?: string) {
  const digits = digitsOnly(run)
  const account = ALL_DEMO_ACCOUNTS.find(item => item.runDigits === digits)
  if (!account) return undefined
  if (clave != null && clave.replace(/\D/g, '') !== account.clave) return undefined
  return account
}

export function personaForRun(run: string): DemoPersona {
  const digits = digitsOnly(run)
  const stereo = STEREOTYPE_ACCOUNTS.find(item => item.runDigits === digits)
  if (stereo) return stereo.persona
  if (EXAMPLE_ACCOUNTS.some(item => item.runDigits === digits)) return 'natural'
  return 'nuevo'
}

export function nextStepsFor(seed: CaseSeed): string[] {
  if (seed.tone === 'required') {
    return [
      `Revisa el estado «${seed.estadoIpas}»${seed.accionUsuario ? ` y la acción «${seed.accionUsuario}»` : ''} en el expediente.`,
      'Sigue las instrucciones del oficio o de la notificación oficial de INAPI.',
      'Presenta la gestión en los canales oficiales (portal INAPI, correo o ventanilla indicados en el oficio).',
    ]
  }
  if (seed.tone === 'closed') {
    return ['El expediente ya concluyó. Conserva las resoluciones del expediente digital.']
  }
  if (seed.tone === 'registered') {
    return ['Guarda el título y anota la fecha de renovación.', 'Si cambian el titular o el nombre, presenta una anotación.']
  }
  return [
    'Revisa el expediente cuando INAPI publique una nueva resolución.',
    'No debes presentar un escrito mientras no haya un oficio con plazo a tu cargo.',
  ]
}

export function ifNoActFor(seed: CaseSeed) {
  if (seed.tone === 'required') {
    return 'Si el plazo del estado IPAS vence sin la gestión correspondiente, el expediente puede no avanzar o abandonarse, según la normativa aplicable a este estado.'
  }
  if (seed.tone === 'closed') return 'Este expediente ya no está en trámite.'
  if (seed.tone === 'registered') return 'El registro se mantiene vigente mientras se paguen las renovaciones a tiempo.'
  return 'Si no hay plazo abierto, el expediente sigue en INAPI.'
}
