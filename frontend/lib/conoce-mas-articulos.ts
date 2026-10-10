export type ConoceMasArticle = {
  slug: string
  title: string
  body: string[]
  official: string
}

export const CONOCE_MAS_ARTICULOS: ConoceMasArticle[] = [
  {
    slug: 'que-es-la-propiedad-intelectual-e-industrial',
    title: 'Qué es la propiedad intelectual e industrial',
    official:
      'https://www.inapi.cl/propiedad-intelectual-e-industrial/para-informarse/que-es-la-propiedad-intelectual-e-industrial',
    body: [
      'La propiedad intelectual e industrial cubre las creaciones de la mente humana: inventos, modelos de utilidad, marcas, obras literarias y artísticas, y otras producciones similares.',
      'En Chile, INAPI administra los derechos de propiedad industrial (marcas, patentes, diseños, indicaciones geográficas y otras figuras de la Ley N.° 19.039). Los derechos de autor los administra otra institución del Estado.',
    ],
  },
  {
    slug: 'conceptos-fundamentales',
    title: 'Conceptos fundamentales',
    official: 'https://www.inapi.cl/propiedad-intelectual-e-industrial/para-informarse/conceptos-fundamentales',
    body: [
      'La propiedad industrial es una rama del derecho que busca, por una parte, fomentar la innovación, la creación y la transferencia tecnológica y, por la otra, ordenar los mercados para facilitar las decisiones del público consumidor.',
      'Para ello, el Estado reconoce derechos exclusivos por un tiempo y en un territorio, a cambio de que la información técnica se publique y pueda reutilizarse cuando el derecho caduca o expira.',
    ],
  },
  {
    slug: 'derechos-de-propiedad-intelectual',
    title: 'Derechos de la propiedad intelectual',
    official:
      'https://www.inapi.cl/propiedad-intelectual-e-industrial/para-informarse/derechos-de-propiedad-intelectual-y-las-instituciones-que-los-administran',
    body: [
      'Tradicionalmente, la concesión o el reconocimiento, el registro y la administración de los distintos derechos de propiedad intelectual han estado a cargo de áreas especializadas de la administración del Estado.',
      'INAPI se ocupa de la propiedad industrial. El Departamento de Derechos Intelectuales, en el Ministerio de las Culturas, las Artes y el Patrimonio, se ocupa de los derechos de autor y derechos conexos.',
    ],
  },
  {
    slug: 'tribunal-de-propiedad-industrial',
    title: 'Tribunal de Propiedad Industrial',
    official: 'https://www.inapi.cl/propiedad-intelectual-e-industrial/para-informarse/tribunal-de-propiedad-industrial',
    body: [
      'El Tribunal de Propiedad Industrial (TDPI) se creó por el artículo 17° bis C de la Ley N.° 19.039 de Propiedad Industrial y sus modificaciones.',
      'Conoce, entre otras materias, de las apelaciones contra sentencias del Director Nacional de INAPI. Su sitio es tdpi.cl.',
    ],
  },
]
