export type ProcessState = {
  label: string
  detail: string
}

export type ProcessStage = {
  title: string
  summary: string
  states: ProcessState[]
}

export type ProcessKind = 'marcas' | 'patentes' | 'disenos' | 'origen'

export type ProcessFlow = {
  kind: ProcessKind
  title: string
  lead: string
  source: string
  stages: ProcessStage[]
}

/** Resumen para el acordeón del home. Las fichas usan `PROCESS_FLOWS`. */
export const PROCESS_HOME_SUMMARY: Record<ProcessKind, ProcessStage[]> = {
  marcas: [
    {
      title: 'Presentación y forma',
      summary: 'Ingresas la solicitud y INAPI revisa que esté completa.',
      states: [
        { label: 'Ingresada', detail: 'La solicitud entra al expediente con la tasa inicial.' },
        { label: 'Observaciones de forma', detail: 'Tienes 30 días para corregir. Si no, se declara abandonada.' },
        { label: 'Aceptada a trámite', detail: 'El Conservador de Marcas da por válida la presentación.' },
      ],
    },
    {
      title: 'Publicación y oposición',
      summary: 'El extracto se publica en el Diario Oficial.',
      states: [
        { label: 'Extracto publicado', detail: 'Debes requerirlo en 20 días hábiles desde la aceptación a trámite.' },
        { label: 'Plazo de oposición', detail: 'Terceros pueden oponerse en 30 días hábiles desde la publicación.' },
      ],
    },
    {
      title: 'Examen de fondo y registro',
      summary: 'INAPI resuelve si la marca se puede registrar.',
      states: [
        { label: 'Examen de fondo', detail: 'Revisa semejanzas y causales de irregistrabilidad.' },
        { label: 'Aceptada a registro', detail: 'Pagas los derechos finales en 60 días hábiles.' },
        { label: 'Rechazo o apelación', detail: 'Puedes apelar ante el TDPI en 15 días hábiles.' },
      ],
    },
  ],
  patentes: [
    {
      title: 'Presentación y examen preliminar',
      summary: 'Adjuntas la memoria técnica y INAPI revisa la forma.',
      states: [
        { label: 'Ingresada', detail: 'Pagas 1 UTM y adjuntas los documentos técnicos.' },
        { label: 'Observaciones', detail: 'Tienes 60 días hábiles para subsanar. Si no, se tiene por no presentada.' },
        { label: 'Aceptada a trámite', detail: 'La solicitud puede pasar a publicación.' },
      ],
    },
    {
      title: 'Publicación y oposición',
      summary: 'El extracto se publica y se abre un plazo para terceros.',
      states: [
        { label: 'Publicación', detail: 'Debes requerirla en 60 días desde la aceptación a trámite.' },
        { label: 'Oposición', detail: 'Cualquier interesado puede oponerse en 45 días desde la publicación.' },
      ],
    },
    {
      title: 'Peritaje, resolución y registro',
      summary: 'Un perito evalúa el invento y INAPI resuelve.',
      states: [
        { label: 'Pago del peritaje', detail: 'Acreditas el arancel pericial en 60 días hábiles.' },
        { label: 'Informe pericial', detail: 'El perito evalúa novedad, nivel inventivo y aplicación industrial.' },
        { label: 'Resolución y registro', detail: 'Si se otorga, pagas los derechos de vigencia y recibes el número.' },
      ],
    },
  ],
  disenos: [
    {
      title: 'Presentación y examen preliminar',
      summary: 'Ingresas vistas o dibujos y INAPI revisa la forma.',
      states: [
        { label: 'Ingresada', detail: 'La solicitud entra con las imágenes del diseño o dibujo.' },
        { label: 'Observaciones', detail: 'Debes completar o aclarar los antecedentes formales.' },
        { label: 'Aceptada a trámite', detail: 'INAPI prepara el extracto para el Diario Oficial.' },
      ],
    },
    {
      title: 'Publicación y oposición',
      summary: 'El extracto se publica con el dibujo más representativo.',
      states: [
        { label: 'Publicación', detail: 'Debes requerirla en 60 días. Si no, la solicitud se tiene por abandonada.' },
        { label: 'Oposición', detail: 'Terceros pueden oponerse en 45 días desde la publicación.' },
      ],
    },
    {
      title: 'Peritaje y registro',
      summary: 'Se evalúa novedad y originalidad, y se resuelve el derecho.',
      states: [
        { label: 'Peritaje', detail: 'Se revisa si el diseño es nuevo y original.' },
        { label: 'Resolución', detail: 'INAPI acepta o rechaza el registro.' },
        { label: 'Número de registro', detail: 'Si se concede, pagas las tasas y se asigna el número.' },
      ],
    },
  ],
  origen: [
    {
      title: 'Ingreso e informe sectorial',
      summary: 'Presentas el expediente y un organismo sectorial informa.',
      states: [
        { label: 'Solicitud ingresada', detail: 'INAPI recibe antecedentes de origen, tradición y productores.' },
        { label: 'Examen de forma', detail: 'Se revisa que el expediente esté completo.' },
        { label: 'Informe sectorial', detail: 'Por ejemplo, el Ministerio de Agricultura informa cuando corresponde.' },
      ],
    },
    {
      title: 'Publicación y oposición',
      summary: 'La solicitud se publica para que la comunidad pueda oponerse.',
      states: [
        { label: 'Publicación', detail: 'El extracto se da a conocer en el Diario Oficial.' },
        { label: 'Oposición', detail: 'Una oposición comunitaria puede alargar el trámite.' },
      ],
    },
    {
      title: 'Examen de fondo y resolución',
      summary: 'INAPI resuelve si el producto merece el sello.',
      states: [
        { label: 'Examen de fondo', detail: 'Se evalúa el vínculo con el territorio y la tradición.' },
        { label: 'Resolución', detail: 'Si se reconoce, el sello queda inscrito.' },
      ],
    },
  ],
}

export const PROCESS_FLOWS: Record<ProcessKind, ProcessFlow> = {
  marcas: {
    kind: 'marcas',
    title: 'Etapas del registro de una marca',
    lead: 'Cuatro pasos oficiales: presentación, examen de forma, publicación y examen de fondo. Los plazos se cuentan en días hábiles.',
    source: 'Preguntas frecuentes y Directrices de marcas de INAPI.',
    stages: [
      {
        title: '1. Presentación',
        summary: 'Ingresas la solicitud en línea, con las clases de Niza y la tasa inicial.',
        states: [
          { label: 'Clasificación', detail: 'Eliges las clases de productos o servicios que cubre el signo.' },
          { label: 'Ingreso en línea', detail: 'Presentas con ClaveÚnica o clave INAPI en el Portal de trámites.' },
          { label: 'Tasa inicial', detail: 'Pagas 1 UTM por cada clase al presentar.' },
        ],
      },
      {
        title: '2. Examen de forma',
        summary: 'El Conservador de Marcas verifica que la solicitud cumpla las formalidades del art. 6 del reglamento.',
        states: [
          { label: 'Sin observaciones', detail: 'La solicitud se acepta a trámite y se notifica en el Estado Diario.' },
          { label: 'Observaciones de forma', detail: 'Tienes 30 días para corregir, sin perder la fecha de prioridad.' },
          { label: 'Abandono', detail: 'Si no subsanas, la solicitud se declara abandonada. Puedes reclamar ante el Director Nacional.' },
        ],
      },
      {
        title: '3. Publicación',
        summary: 'Aceptada a trámite, debes publicar un extracto en el Diario Oficial.',
        states: [
          { label: 'Plazo de 20 días hábiles', detail: 'Se cuenta desde la aceptación a trámite. Si no publicas, la solicitud se tiene por no presentada.' },
          { label: 'Extracto', detail: 'Incluye número, titular, representación del signo y el alcance de protección.' },
          { label: 'Oposición (30 días hábiles)', detail: 'Desde la publicación, terceros pueden oponerse. Si hay oposición, el trámite pasa a ser contencioso.' },
        ],
      },
      {
        title: '4. Examen de fondo y registro',
        summary: 'Vencido el plazo de oposición, INAPI analiza semejanzas y prohibiciones de registro.',
        states: [
          { label: 'Sin impedimentos', detail: 'La marca se acepta a registro. Tienes 60 días hábiles para pagar 2 UTM por clase.' },
          { label: 'Observaciones de fondo', detail: 'Tienes 30 días hábiles para responder. Si no contestas o se rechazan, la solicitud se deniega.' },
          { label: 'Apelación', detail: 'Del rechazo puedes apelar ante el Tribunal de Propiedad Industrial en 15 días hábiles.' },
          { label: 'Registro', detail: 'Pagados los derechos, INAPI asigna el número. El registro dura 10 años y se puede renovar.' },
        ],
      },
    ],
  },
  patentes: {
    kind: 'patentes',
    title: 'Etapas de una solicitud de patente',
    lead: 'El procedimiento va desde la presentación hasta el número de registro, con examen preliminar, publicación, peritaje y resolución.',
    source: 'Directrices de examen de invenciones y modelos de utilidad de INAPI.',
    stages: [
      {
        title: '1. Presentación de la solicitud',
        summary: 'Adjuntas la memoria técnica y pagas la tasa inicial de 1 UTM.',
        states: [
          { label: 'Documentos técnicos', detail: 'Memoria, reivindicaciones y dibujos, según el tipo de derecho.' },
          { label: 'Firma electrónica', detail: 'Ingresas con ClaveÚnica. En papel solo se admite por excepción.' },
        ],
      },
      {
        title: '2. Examen preliminar',
        summary: 'INAPI verifica tasas, poderes y que existan los documentos técnicos mínimos.',
        states: [
          { label: 'Observaciones', detail: 'Tienes 60 días hábiles para corregir. Si no contestas, la solicitud se tiene por no presentada.' },
          { label: 'Aceptación a trámite', detail: 'Sin observaciones, o ya subsanadas, la solicitud puede publicarse.' },
          { label: 'Suspensión de publicación', detail: 'En invenciones y modelos de utilidad puedes pedir hasta 18 meses de secreto.' },
        ],
      },
      {
        title: '3. Publicación en el Diario Oficial',
        summary: 'Debes requerir la publicación del extracto a tu costa.',
        states: [
          { label: 'Plazo de 60 días', detail: 'Se cuenta desde la aceptación a trámite.' },
          { label: 'Abandono y desarchivo', detail: 'Si no publicas, se abandona. Puedes pedir desarchivo en 45 días, pagando 2 UTM y publicando.' },
        ],
      },
      {
        title: '4. Período de oposición',
        summary: 'Cualquier interesado puede demandar oposición.',
        states: [
          { label: '45 días', detail: 'Se cuentan desde la publicación del extracto (art. 5 LPI).' },
          { label: 'Contencioso', detail: 'Si hay oposición, el procedimiento deja de ser solo administrativo.' },
        ],
      },
      {
        title: '5. Peritaje',
        summary: 'Se paga el arancel, se nombra perito y se evalúa la patentabilidad.',
        states: [
          { label: 'Pago del arancel pericial', detail: 'Debes acreditarlo en 60 días hábiles.' },
          { label: 'Nombramiento', detail: 'INAPI designa un perito del área técnica de la solicitud.' },
          { label: 'Informe', detail: 'El perito tiene 60 días para evaluar novedad, nivel inventivo y aplicación industrial.' },
        ],
      },
      {
        title: '6. Resolución y registro',
        summary: 'INAPI dicta la resolución definitiva y, si concede, asigna el número.',
        states: [
          { label: 'Aceptación o rechazo', detail: 'La resolución pone término al procedimiento de fondo.' },
          { label: 'Pago de derechos de vigencia', detail: 'Se pagan por periodos (por ejemplo, 2 UTM por cada 5 años, según el derecho).' },
          { label: 'Número de registro', detail: 'Con el pago se asigna el número. La patente de invención dura hasta 20 años desde la presentación.' },
          { label: 'Apelación', detail: 'Del rechazo puedes apelar ante el TDPI en 15 días desde la notificación.' },
        ],
      },
    ],
  },
  disenos: {
    kind: 'disenos',
    title: 'Etapas de un dibujo o diseño industrial',
    lead: 'El procedimiento es el de las Directrices de examen de diseños y dibujos de INAPI: de la presentación al número de registro.',
    source: 'Directrices de examen de diseños y dibujos industriales de INAPI (2022).',
    stages: [
      {
        title: '1. Presentación de la solicitud',
        summary: 'Ingresas las vistas o el dibujo más representativo del producto.',
        states: [
          { label: 'Imágenes', detail: 'Deben mostrar la apariencia con claridad. El diseño cubre cómo se ve, no cómo funciona.' },
          { label: 'Tasa de presentación', detail: 'Pagas el derecho inicial en UTM, según el valor vigente.' },
        ],
      },
      {
        title: '2. Examen preliminar',
        summary: 'INAPI verifica formalidades y documentos mínimos.',
        states: [
          { label: 'Observaciones formales', detail: 'Debes completar o aclarar lo que falte para seguir.' },
          { label: 'Aceptación a trámite', detail: 'INAPI prepara el extracto con un código de verificación (CVE) para el Diario Oficial.' },
        ],
      },
      {
        title: '3. Publicación en el Diario Oficial',
        summary: 'El extracto incluye el dibujo más representativo.',
        states: [
          { label: 'Plazo de 60 días', detail: 'Debes requerir la publicación a tu costa desde la aceptación a trámite.' },
          { label: 'Abandono', detail: 'Si no publicas, se abandona. Cabe desarchivo en 45 días, con 2 UTM y la publicación.' },
        ],
      },
      {
        title: '4. Oposición',
        summary: 'Cualquier interesado puede oponerse al dibujo o diseño.',
        states: [
          { label: '45 días', detail: 'Se cuentan desde la publicación (art. 5 LPI).' },
          { label: 'Contencioso', detail: 'La oposición transforma el procedimiento en un juicio administrativo.' },
        ],
      },
      {
        title: '5. Peritaje y etapa resolutiva',
        summary: 'Se evalúa novedad y originalidad, y INAPI resuelve.',
        states: [
          { label: 'Pago de peritaje', detail: 'Acreditas el arancel para que se nombre perito.' },
          { label: 'Informe pericial', detail: 'Revisa si el diseño es nuevo y original, no copiado de lo ya conocido.' },
          { label: 'Resolución', detail: 'INAPI acepta o rechaza el registro.' },
        ],
      },
      {
        title: '6. Pago de tasas y número de registro',
        summary: 'Si se concede, pagas los derechos y se asigna el número.',
        states: [
          { label: 'Derechos de vigencia', detail: 'Se pagan según el periodo que indica la resolución.' },
          { label: 'Número de registro', detail: 'Queda inscrito el dibujo o el diseño industrial.' },
        ],
      },
    ],
  },
  origen: {
    kind: 'origen',
    title: 'Etapas del Sello de Origen',
    lead: 'Indicación geográfica, denominación de origen, marca colectiva o de certificación. El trámite involucra a más de un organismo.',
    source: 'INAPI, Sello de Origen, y procedimiento de IG/DO ante el Instituto.',
    stages: [
      {
        title: '1. Preparación e ingreso',
        summary: 'Reúnes origen, tradición y quienes producen el bien, y presentas en INAPI.',
        states: [
          { label: 'Tipo de sello', detail: 'Defines indicación geográfica, denominación de origen, marca colectiva o de certificación.' },
          { label: 'Pago', detail: 'El registro de estos signos paga un derecho equivalente a 3 UTM.' },
          { label: 'Ingreso', detail: 'El expediente entra a INAPI, no a una oficina municipal.' },
        ],
      },
      {
        title: '2. Examen de forma',
        summary: 'INAPI revisa que el expediente esté completo.',
        states: [
          { label: 'Antecedentes suficientes', detail: 'Deben acreditar el vínculo con el territorio y la comunidad productora.' },
          { label: 'Observaciones', detail: 'Si falta un documento, se pide completar antes de seguir.' },
        ],
      },
      {
        title: '3. Informe sectorial',
        summary: 'Un organismo del sector opina sobre el producto, cuando corresponde.',
        states: [
          { label: 'Ministerio de Agricultura', detail: 'Informa en productos agroalimentarios, según el caso.' },
          { label: 'Otros organismos', detail: 'El informe depende del tipo de producto (artesanía, pesca u otro).' },
        ],
      },
      {
        title: '4. Publicación y oposición',
        summary: 'La solicitud se publica para que productores u otros interesados se opongan.',
        states: [
          { label: 'Publicación', detail: 'El extracto se da a conocer en el Diario Oficial.' },
          { label: 'Oposición comunitaria', detail: 'Puede alargar el plazo si hay controversia sobre el nombre o el territorio.' },
        ],
      },
      {
        title: '5. Examen de fondo y resolución',
        summary: 'INAPI resuelve si el producto merece el reconocimiento.',
        states: [
          { label: 'Examen de fondo', detail: 'Evalúa calidad, reputación u otra característica ligada al origen.' },
          { label: 'Resolución', detail: 'Si se reconoce, el sello queda inscrito. Dura mientras se mantengan los factores que lo justifican.' },
        ],
      },
    ],
  },
}
