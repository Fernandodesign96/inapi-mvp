import { FileSearch, LayoutGrid, Search } from 'lucide-react'
import { PriorityCarousel, type PriorityItem } from '@/components/story/PriorityCarousel'
import { StorySection } from '@/components/story/StorySection'
import { StoryCta } from '@/components/story/StoryCta'

const TOOLS: PriorityItem[] = [
  {
    id: 'marcas',
    icon: <Search />,
    title: 'Buscador de marcas',
    lead: 'Compara tu nombre o logo con marcas ya solicitadas o registradas en Chile.',
    items: [
      'Qué es. Compara tu nombre o logo con marcas ya solicitadas o registradas en Chile.',
      'Para qué sirve. Sirve para detectar coincidencias antes de presentar y reducir el riesgo de rechazo u oposición.',
      'Ejemplo: buscas “Andes Café” y ves una marca “Andes Coffee” en la misma clase.',
    ],
    href: '/marcas/buscador-similitud',
    cta: 'Abrir el Buscador de marcas',
    example: 'Ejemplo: buscas “Andes Café” y ves una marca “Andes Coffee” en la misma clase.',
    fact: 'Son de consulta: no inician un trámite ni reemplazan el examen de INAPI.',
  },
  {
    id: 'niza',
    icon: <LayoutGrid />,
    title: 'Buscador de productos y servicios',
    lead: 'Consulta las clases de Niza: el listado internacional que agrupa productos y servicios para registrar una marca.',
    items: [
      'Qué es. Consulta las clases de Niza: el listado internacional que agrupa productos y servicios para registrar una marca.',
      'Para qué sirve. Sirve para elegir las clases correctas. Cada clase se paga por separado y define el alcance de tu marca.',
      'Ejemplo: escribes “café tostado” y el clasificador te sugiere la clase 30.',
    ],
    href: '/tramites/marcas/clasificador',
    cta: 'Abrir el Buscador de productos y servicios',
  },
  {
    id: 'patentes',
    icon: <FileSearch />,
    title: 'Buscador de patentes',
    lead: 'Consulta patentes de invención, modelos de utilidad y diseños industriales ya solicitados o concedidos.',
    items: [
      'Qué es. Consulta patentes de invención, modelos de utilidad y diseños industriales ya solicitados o concedidos.',
      'Para qué sirve. Sirve para ver si ya existe una invención parecida antes de presentar tu solicitud.',
      'Ejemplo: buscas “filtro de agua portátil” y ves solicitudes con un mecanismo similar.',
    ],
    href: '/tramites/patentes/buscador',
    cta: 'Abrir el Buscador de patentes',
  },
]

export function HomeTools() {
  return (
    <StorySection
      tone="paper"
      align="left"
      eyebrow="Antes de presentar"
      title="Revisa los tipos de herramientas de INAPI"
      lead="Compara marcas, elige las clases de Niza y busca patentes. Son de consulta: no inician un trámite ni reemplazan el examen de INAPI."
      actions={<StoryCta href="/tramites-digitales" label="Ver detalles de trámites digitales" variant="secondary" />}
    >
      <PriorityCarousel layout="tools" label="Herramientas de INAPI" items={TOOLS} />
    </StorySection>
  )
}
