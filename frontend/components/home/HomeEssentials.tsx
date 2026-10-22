import { Clock, HelpCircle, MapPin, Route, Users } from 'lucide-react'
import { PriorityCarousel, type PriorityItem } from '@/components/story/PriorityCarousel'
import { StorySection } from '@/components/story/StorySection'

const CARDS: PriorityItem[] = [
  {
    id: 'que',
    eyebrow: '01 · Qué',
    icon: <HelpCircle />,
    title: 'Qué protege INAPI',
    lead: 'INAPI registra y resuelve las solicitudes de propiedad industrial en Chile.',
    items: [
      '**Marcas:** nombre, logo o signo de tus productos o servicios.',
      '**Patentes:** invención o modelo de utilidad.',
      '**Diseños:** apariencia de un producto.',
      '**Esquemas de trazado:** diseño de un circuito integrado.',
    ],
    example: 'Si dudas entre marca y patente, empieza por lo que quieres impedir que otros usen.',
    fact: 'Elige el derecho según lo que quieres proteger, no según el trámite más rápido.',
    href: '/que-proteger',
    cta: 'Leer qué puedes proteger',
  },
  {
    id: 'como',
    eyebrow: '02 · Cómo',
    icon: <Route />,
    title: 'Cómo iniciar el trámite',
    lead: 'El camino es el mismo para una marca, una patente o un diseño.',
    items: [
      '**Infórmate** sobre el derecho que necesitas.',
      '**Busca** si ya existe algo parecido.',
      '**Presenta, paga y adjunta** documentos en línea.',
    ],
    example: 'En el Portal de trámites ingresas con ClaveÚnica, sin ir a una oficina.',
    fact: 'Los buscadores son de consulta: no inician un trámite ni reemplazan el examen de INAPI.',
    href: '/tramites-digitales',
    cta: 'Conoce todos los trámites',
  },
  {
    id: 'donde',
    eyebrow: '03 · Dónde',
    icon: <MapPin />,
    title: 'Dónde te informas y dónde tramitas',
    lead: 'El sitio informativo de INAPI explica. El Portal de trámites es donde presentas.',
    items: [
      'En el **sitio informativo** lees requisitos, plazos y tasas.',
      'En el **Portal de trámites** presentas, pagas y sigues el expediente.',
      'Ingresas con **ClaveÚnica**, sin ir a una oficina.',
    ],
    example: 'Este portal informa. El Portal de trámites es otra plataforma, con ClaveÚnica o Clave INAPI.',
    fact: 'Puedes consultar el estado público de solicitudes sin iniciar sesión.',
    href: '/tramites',
    cta: 'Ingresa y realiza tus trámites',
  },
  {
    id: 'cuando',
    eyebrow: '04 · Cuándo',
    icon: <Clock />,
    title: 'Cuánto demora un registro',
    lead: 'Puedes presentar cuando quieras.',
    items: [
      'Una marca **sin oposición** tardó 4,5 meses en 2024.',
      'Una **oposición** o un examen de fondo alarga el plazo.',
      'Si rechazan, puedes **apelar** en el Tribunal de PI.',
    ],
    example: 'El plazo corre desde que INAPI recibe la solicitud completa y el pago de la tasa.',
    fact: 'Una marca registrada dura 10 años y puedes renovarla.',
    href: '/marcas/como-registrar',
    cta: 'Revisar plazos del registro',
  },
  {
    id: 'quien',
    eyebrow: '05 · Para quién',
    icon: <Users />,
    title: 'Quién puede solicitar',
    lead: 'Puede pedir protección una persona o una empresa.',
    items: ['**Personas naturales.**', '**Empresas** de cualquier tamaño.', '**Inventores, creadores y representantes.**'],
    example: 'Si alguien tramita en tu nombre, adjunta el poder notarial.',
    fact: 'El titular puede ser una persona o una empresa, con o sin representante.',
    href: '/marcas',
    cta: 'Ver quién puede solicitar',
  },
]

export function HomeEssentials() {
  return (
    <StorySection
      tone="paper"
      eyebrow="Lo esencial"
      title="Qué, cómo, dónde, cuándo y para quién"
      lead="Cinco respuestas cortas antes de empezar. Cada tarjeta te lleva a la página con el detalle."
    >
      <PriorityCarousel label="Qué, cómo, dónde, cuándo y para quién" items={CARDS} />
    </StorySection>
  )
}
