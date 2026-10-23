import {
  BadgeCheck,
  Briefcase,
  Building2,
  Clock,
  FileSearch,
  FileText,
  HelpCircle,
  KeyRound,
  Landmark,
  MapPin,
  Route,
  Scale,
  ScrollText,
  Stamp,
  User,
  UserCheck,
  Users,
} from 'lucide-react'
import { PriorityCarousel, type PriorityItem } from '@/components/story/PriorityCarousel'
import { StorySection } from '@/components/story/StorySection'

const CARDS: PriorityItem[] = [
  {
    id: 'que',
    eyebrow: '01 · Qué',
    icon: <HelpCircle />,
    title: 'Qué protege INAPI',
    lead: 'Elige el derecho según lo que quieres impedir que otros usen.',
    items: [
      '**Marcas:** nombre, logo o signo de tus productos o servicios.',
      '**Patentes:** invención o modelo de utilidad.',
      '**Diseños:** apariencia de un producto.',
      '**Esquemas de trazado:** diseño de un circuito integrado.',
    ],
    itemIcons: [<Stamp key="m" />, <Scale key="p" />, <BadgeCheck key="d" />, <FileText key="e" />],
    example:
      'Ejemplo: si vendes un filtro de agua, la marca cubre el nombre comercial; la patente cubre el mecanismo nuevo. Empieza por lo que quieres impedir que otros usen.',
    fact: 'INAPI registra y resuelve las solicitudes de propiedad industrial en Chile.',
    steps: [
      { label: 'Marca', icon: <Stamp /> },
      { label: 'Patente', icon: <Scale /> },
      { label: 'Diseño', icon: <BadgeCheck /> },
      { label: 'Circuito', icon: <FileText /> },
    ],
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
    itemIcons: [<HelpCircle key="i" />, <FileSearch key="b" />, <ScrollText key="p" />],
    example:
      'Ejemplo: en el Portal de trámites ingresas con ClaveÚnica, pagas la tasa y adjuntas los documentos, sin ir a una oficina.',
    fact: 'Los buscadores son de consulta: no inician un trámite ni reemplazan el examen de INAPI.',
    steps: [
      { label: 'Infórmate', icon: <HelpCircle /> },
      { label: 'Busca', icon: <FileSearch /> },
      { label: 'Presenta', icon: <ScrollText /> },
      { label: 'Paga', icon: <Landmark /> },
    ],
    href: '/tramites-digitales',
    cta: 'Conoce todos los trámites',
  },
  {
    id: 'donde',
    eyebrow: '03 · Dónde',
    icon: <MapPin />,
    title: 'Dónde te informas y dónde tramitas',
    lead: 'Este portal informa. El Portal de trámites es otra plataforma, con ClaveÚnica o Clave INAPI.',
    items: [
      'En el **sitio informativo** lees requisitos, plazos y tasas.',
      'En el **Portal de trámites** presentas, pagas y sigues el expediente.',
      'Ingresas con **ClaveÚnica**, sin ir a una oficina.',
    ],
    itemIcons: [<FileText key="s" />, <Landmark key="p" />, <KeyRound key="c" />],
    example:
      'Ejemplo: lees aquí cómo registrar una marca y, cuando tienes los datos, presentas la solicitud en el Portal de trámites con ClaveÚnica.',
    fact: 'El sitio informativo de INAPI explica. El Portal de trámites es donde presentas.',
    steps: [
      { label: 'Informarte', icon: <FileText /> },
      { label: 'Portal', icon: <Landmark /> },
      { label: 'ClaveÚnica', icon: <KeyRound /> },
      { label: 'Expediente', icon: <FileSearch /> },
    ],
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
    itemIcons: [<Clock key="t" />, <Scale key="o" />, <Landmark key="a" />],
    example:
      'Ejemplo: el plazo corre desde que INAPI recibe la solicitud completa y el pago de la tasa. Una oposición o un examen de fondo alarga ese tiempo.',
    fact: 'Una marca registrada dura 10 años y puedes renovarla.',
    steps: [
      { label: 'Presentas', icon: <ScrollText /> },
      { label: 'Examen', icon: <FileSearch /> },
      { label: 'Registro', icon: <BadgeCheck /> },
      { label: 'Renuevas', icon: <Clock /> },
    ],
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
    itemIcons: [<User key="pn" />, <Building2 key="em" />, <UserCheck key="in" />],
    example:
      'Ejemplo: si un abogado o un agente tramita en tu nombre, adjunta el poder notarial. El titular de la marca o la patente sigue siendo la persona o la empresa que indicaste.',
    fact: 'El titular puede ser una persona o una empresa, con o sin representante.',
    steps: [
      { label: 'Persona natural', icon: <User /> },
      { label: 'Empresa', icon: <Briefcase /> },
      { label: 'Inventor o creador', icon: <UserCheck /> },
      { label: 'Representante', icon: <ScrollText /> },
    ],
    href: '/marcas',
    cta: 'Ver quién puede solicitar',
  },
]

export function HomeEssentials() {
  return (
    <StorySection
      tone="paper"
      align="left"
      leadSingleLine
      eyebrow="Lo esencial"
      title="Qué, cómo, dónde, cuándo y para quién"
      lead="Cinco respuestas cortas antes de empezar. Cada tarjeta te lleva a la página con el detalle."
    >
      <PriorityCarousel label="Qué, cómo, dónde, cuándo y para quién" items={CARDS} />
    </StorySection>
  )
}
