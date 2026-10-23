export type FaqTopic = 'inapi' | 'propiedad' | 'marcas' | 'patentes' | 'pct' | 'origen' | 'leyes'

export type FaqItem = {
  id: string
  topic: FaqTopic
  title: string
  paragraphs: string[]
  bullets?: { lead: string; text: string }[]
  steps?: { title: string; body: string }[]
  quote?: string
  example?: string
}

export const FAQ_TOPICS: { id: FaqTopic; label: string }[] = [
  { id: 'inapi', label: 'INAPI' },
  { id: 'propiedad', label: 'Propiedad industrial' },
  { id: 'marcas', label: 'Marcas' },
  { id: 'patentes', label: 'Patentes' },
  { id: 'pct', label: 'PCT' },
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
    bullets: [
      { lead: 'Sí cubre', text: 'marcas, patentes, modelos de utilidad, diseños, topografías de circuitos e indicaciones geográficas.' },
      { lead: 'No cubre', text: 'derecho de autor, derechos conexos ni variedades vegetales (otras instituciones).' },
    ],
    example: 'Ejemplo: el logo de tu café se registra en INAPI; la receta escrita como libro se registra en derechos de autor.',
  },
  {
    id: 'pi-que-es',
    topic: 'propiedad',
    title: '¿Qué es la propiedad intelectual e industrial?',
    paragraphs: [
      'En sentido amplio, la propiedad intelectual dice relación con toda creación que produce la mente humana: inventos, modelos de utilidad, marcas, obras literarias y artísticas.',
    ],
    bullets: [
      {
        lead: 'Propiedad industrial',
        text: 'incluye patentes de invención, modelos de utilidad, marcas comerciales, colectivas, de certificación e indicaciones geográficas y denominaciones de origen. En Chile el organismo a cargo del registro, según la Ley 19.039 y su Reglamento, es INAPI.',
      },
      {
        lead: 'Derecho de autor',
        text: 'protege obras literarias y artísticas, y derechos conexos (intérpretes, productores de fonogramas y organismos de radiodifusión). Lo administra el Servicio Nacional del Patrimonio Cultural (antes DIBAM), no INAPI.',
      },
    ],
    quote: '«El organismo que tiene a su cargo el Registro de los derechos de Propiedad Industrial, a que alude la Ley 19.039, es el INAPI.»',
  },
  {
    id: 'pi-derechos',
    topic: 'propiedad',
    title: '¿Cuáles son los principales derechos de propiedad intelectual?',
    paragraphs: ['Cinco familias concentran la mayor parte de las consultas:'],
    bullets: [
      { lead: 'Marcas', text: 'signo distintivo de productos, servicios o establecimientos. Protección territorial (Chile) y temporal: 10 años, renovables.' },
      { lead: 'Patentes', text: 'derecho exclusivo sobre una invención. Requisitos: novedad, nivel inventivo y aplicación industrial. 20 años desde la presentación.' },
      { lead: 'Indicaciones geográficas y denominaciones de origen', text: 'protegen cualidades ligadas al territorio. La DO, además, considera factores humanos.' },
      { lead: 'Derecho de autor', text: 'obras literarias y artísticas, software y bases de datos originales. No lo registra INAPI.' },
      { lead: 'Variedades vegetales', text: 'Registro de Variedades Protegidas (Ley 19.342): nueva, distinta, homogénea y estable. No lo lleva INAPI.' },
    ],
  },
  {
    id: 'pi-importancia',
    topic: 'propiedad',
    title: '¿Cuál es la importancia legal de la propiedad intelectual?',
    paragraphs: [
      'Los países promulgan estas leyes por dos razones: proteger derechos morales y patrimoniales de quien crea, y dar acceso a la sociedad; e incentivar la creatividad, el uso del conocimiento y prácticas comerciales leales.',
    ],
    quote: 'El Convenio de París (1883) y el Convenio de Berna (1886) sentaron esa base. La OMPI administra ambos tratados.',
  },
  {
    id: 'marca-duracion',
    topic: 'marcas',
    title: '¿Qué es una marca y cuánto dura?',
    paragraphs: [
      'Por marca comercial se entiende todo signo utilizado para distinguir en el mercado productos, servicios, establecimientos industriales y comerciales.',
      'La principal característica es el carácter distintivo: debe poder distinguirse de otras que existan en el mercado.',
    ],
    bullets: [
      { lead: 'Territorial', text: 'la protección vale en Chile, no en el extranjero por sí sola.' },
      { lead: 'Temporal', text: '10 años, renovables indefinidamente por periodos iguales, previo pago de las tasas.' },
    ],
    example: 'Ejemplo: “Andes Café” en clase 43 distingue tu cafetería de otras con nombres parecidos.',
  },
  {
    id: 'marca-clases',
    topic: 'marcas',
    title: '¿Por qué se paga por cada clase?',
    paragraphs: [
      'El Clasificador de Niza agrupa productos y servicios. Cada clase es un mercado distinto: la misma palabra puede coexistir en clases lejanas y chocar en clases vecinas.',
    ],
    bullets: [
      { lead: 'Presentación', text: '1 UTM por cada clase al ingresar la solicitud.' },
      { lead: 'Concesión', text: '2 UTM por cada clase si INAPI acepta el registro.' },
      { lead: 'Publicación', text: 'pagas además el extracto en el Diario Oficial.' },
    ],
    example: 'Ejemplo: pides clase 30 (café) y clase 43 (cafetería): pagas dos veces cada tasa.',
  },
  {
    id: 'marca-renovar',
    topic: 'marcas',
    title: '¿Cuándo y cómo se renueva una marca?',
    paragraphs: [
      'Puedes renovar dentro de los 6 meses anteriores al vencimiento o en los 6 meses posteriores (plazo de gracia), pagando la tasa de renovación.',
    ],
    steps: [
      { title: 'Revisa la vigencia', body: 'El título indica la fecha de registro. Cuenta 10 años desde esa fecha.' },
      { title: 'Entra con ClaveÚnica', body: 'En el Portal de trámites elige renovación de marcas.' },
      { title: 'Paga por clase', body: 'La renovación se cobra por cada clase que mantienes.' },
    ],
  },
  {
    id: 'patente-requisitos',
    topic: 'patentes',
    title: '¿Qué se necesita para una patente?',
    paragraphs: [
      'Las patentes proporcionan derechos exclusivos para utilizar y explotar una invención e impedir que terceros la usen sin consentimiento.',
    ],
    bullets: [
      { lead: 'Novedad', text: 'no debe existir antes en el estado de la técnica (divulgación en cualquier lugar del mundo).' },
      { lead: 'Nivel inventivo', text: 'no puede resultar obvia para una persona normalmente versada en la materia.' },
      { lead: 'Aplicación industrial', text: 'debe poder producirse o usarse en cualquier tipo de industria.' },
    ],
    quote: '«La protección que le entrega el Estado es territorial, es decir, sólo a nivel nacional y por un periodo único de 20 años desde la fecha de presentación de la solicitud.»',
  },
  {
    id: 'patente-tipos',
    topic: 'patentes',
    title: '¿Qué tipos de “patente” existen en INAPI?',
    paragraphs: ['En el lenguaje cotidiano se dice “patente”, pero INAPI distingue varias figuras:'],
    bullets: [
      { lead: 'Patente de invención', text: 'solución técnica nueva. 20 años.' },
      { lead: 'Modelo de utilidad', text: 'mejora de uso o fabricación de un objeto. Plazo distinto y más corto que la invención.' },
      { lead: 'Diseño industrial', text: 'apariencia estética de un producto.' },
      { lead: 'Esquema de trazado', text: 'topografía de un circuito integrado.' },
    ],
  },
  {
    id: 'pct-que-es',
    topic: 'pct',
    title: '¿Qué es el PCT?',
    paragraphs: [
      'El Tratado de Cooperación en materia de Patentes (PCT) es un sistema de presentación de solicitudes, no de concesión. Una solicitud internacional no “otorga” una patente mundial.',
    ],
    bullets: [
      { lead: 'Fase internacional', text: 'presentas una solicitud, búsqueda e informe preliminar opcionales.' },
      { lead: 'Fase nacional', text: 'entras a cada país u oficina regional y allí se decide si concede o no.' },
    ],
    example: 'Ejemplo: presentas PCT con oficina receptora INAPI y luego entras a Chile, Perú y Europa por separado.',
  },
  {
    id: 'pct-chile',
    topic: 'pct',
    title: '¿Cómo se usa el PCT desde Chile?',
    paragraphs: [
      'INAPI actúa como oficina receptora de solicitudes PCT. Debes cumplir los requisitos del tratado y pagar las tasas internacionales además de las nacionales cuando ingresas a fase chilena.',
    ],
    steps: [
      { title: 'Presenta la internacional', body: 'Con ClaveÚnica en el Portal de trámites, eligiendo PCT.' },
      { title: 'Sigue los plazos', body: 'El ingreso a fase nacional tiene plazos estrictos (por regla, 30 meses).' },
      { title: 'Examen local', body: 'En Chile, INAPI examina según la Ley 19.039, no según el PCT solo.' },
    ],
  },
  {
    id: 'ig-do',
    topic: 'origen',
    title: '¿Qué diferencia hay entre indicación geográfica y denominación de origen?',
    paragraphs: [
      'Con el registro, las cualidades y la reputación del producto quedan protegidas frente a usos desleales, y el consumidor sabe que el producto tiene el origen que declara.',
    ],
    bullets: [
      { lead: 'Indicación geográfica', text: 'identifica un producto como originario de una región y le atribuye características, cualidades o reputación debidas fundamentalmente a ese origen.' },
      { lead: 'Denominación de origen', text: 'lo mismo, más factores humanos (oficios, recetas, formas de elaborar) que inciden en el carácter del producto.' },
    ],
    example: 'Ejemplo: Limón de Pica es indicación geográfica; otras figuras del Sello de Origen pueden ser marca colectiva o de certificación.',
  },
  {
    id: 'sello-costo',
    topic: 'origen',
    title: '¿Cuánto cuesta un Sello de Origen?',
    paragraphs: [
      'El registro de indicaciones geográficas, denominaciones de origen, marcas colectivas o de certificación está afecto al pago de un derecho equivalente a 3 UTM.',
    ],
    steps: [
      { title: 'Prepara la solicitud', body: 'Reglamento de uso, zona, producto y titulares.' },
      { title: 'Ingresa en INAPI', body: 'Examen de forma, informe del Ministerio de Agricultura cuando corresponde, publicación y oposición.' },
      { title: 'Examen de fondo y resolución', body: 'Si se concede, el sello identifica el producto en el mercado.' },
    ],
  },
  {
    id: 'por-que-leyes',
    topic: 'leyes',
    title: '¿Por qué existen estas leyes?',
    paragraphs: [
      'Protegen a quien crea y, al mismo tiempo, permiten que la sociedad acceda a esas creaciones con reglas claras.',
      'También premian la innovación y frenan prácticas desleales.',
    ],
    quote: '«De la importancia que reviste la propiedad intelectual se deja por primera vez constancia en el Convenio de París (1883) y en el Convenio de Berna (1886).»',
  },
]
