export type FaqTopic = 'inapi' | 'marcas' | 'patentes' | 'origen' | 'leyes'

export type FaqItem = {
  id: string
  topic: FaqTopic
  title: string
  paragraphs: string[]
}

export const FAQ_TOPICS: { id: FaqTopic; label: string }[] = [
  { id: 'inapi', label: 'INAPI' },
  { id: 'marcas', label: 'Marcas' },
  { id: 'patentes', label: 'Patentes' },
  { id: 'origen', label: 'Sello de Origen' },
  { id: 'leyes', label: 'Leyes' },
]

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'que-cubre-inapi',
    topic: 'inapi',
    title: '¿Qué cubre INAPI y qué no?',
    paragraphs: [
      'INAPI registra y administra la propiedad industrial: marcas, patentes, modelos de utilidad, diseños, esquemas de trazado e indicaciones geográficas o denominaciones de origen, según la Ley N.° 19.039.',
      'El derecho de autor (libros, música, software como obra, entre otros) lo lleva el Departamento de Derechos Intelectuales, no este Instituto.',
    ],
  },
  {
    id: 'marca-duracion',
    topic: 'marcas',
    title: '¿Qué es una marca y cuánto dura?',
    paragraphs: [
      'Es un signo que distingue tus productos o servicios de los de otras personas. Debe ser distintivo: el público tiene que poder reconocerlo.',
      'La protección vale en Chile y dura diez años. Puedes renovarla por periodos iguales, pagando la tasa a tiempo.',
    ],
  },
  {
    id: 'patente-requisitos',
    topic: 'patentes',
    title: '¿Qué se necesita para una patente?',
    paragraphs: [
      'El Estado concede un derecho exclusivo si la invención es nueva, tiene nivel inventivo y puede usarse en la industria.',
      'La protección es nacional y dura 20 años desde el día en que presentas la solicitud. Nadie puede fabricar, vender o usar esa invención sin tu permiso mientras el derecho esté vigente.',
    ],
  },
  {
    id: 'ig-do',
    topic: 'origen',
    title: '¿Qué diferencia hay entre indicación geográfica y denominación de origen?',
    paragraphs: [
      'Ambas ligan un producto a un territorio y protegen su fama frente a usos desleales.',
      'La denominación de origen, además, considera factores humanos —oficios, recetas, formas de elaborar— que dan carácter al producto.',
    ],
  },
  {
    id: 'por-que-leyes',
    topic: 'leyes',
    title: '¿Por qué existen estas leyes?',
    paragraphs: [
      'Protegen a quien crea y, al mismo tiempo, permiten que la sociedad acceda a esas creaciones con reglas claras.',
      'También premian la innovación y frenan prácticas desleales. El Convenio de París (1883) y el Convenio de Berna (1886) sentaron esa base; la OMPI administra ambos tratados.',
    ],
  },
]
