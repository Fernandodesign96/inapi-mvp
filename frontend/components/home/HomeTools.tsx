'use client'

import {
  AlertTriangle,
  Coffee,
  FileSearch,
  Filter,
  LayoutGrid,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { TramitesLink } from '@/components/tramites/TramitesLink'
import { StoryCta } from '@/components/story/StoryCta'
import { StorySection } from '@/components/story/StorySection'
import { useI18n } from '@/lib/i18n/LocaleProvider'

const TOOLS = [
  {
    id: 'marcas',
    icon: <Search />,
    title: 'Buscador de marcas',
    fact: 'Es una consulta: no inicia un trámite ni reemplaza el examen de INAPI.',
    lead: 'Compara tu nombre o logo con marcas ya solicitadas o registradas en Chile.',
    items: [
      { icon: <Search />, text: '**Qué es.** Compara tu signo con marcas ya pedidas o registradas.' },
      { icon: <ShieldCheck />, text: '**Para qué sirve.** Detecta coincidencias **antes** de presentar y reduce el riesgo de rechazo u oposición.' },
      { icon: <AlertTriangle />, text: '**Ojo.** El buscador no decide si tu marca se puede registrar.' },
    ],
    example: 'Ejemplo: buscas «Andes Café» y aparece «Andes Coffee» en la misma clase. Eso es una alerta para cambiar el signo o pedir asesoría.',
    steps: [
      { icon: <Coffee />, label: 'Tu signo' },
      { icon: <Search />, label: 'La búsqueda' },
      { icon: <AlertTriangle />, label: 'La coincidencia' },
      { icon: <ShieldCheck />, label: 'La decisión' },
    ],
    href: '/marcas/buscador-similitud',
    cta: 'Abrir el Buscador de marcas',
  },
  {
    id: 'niza',
    icon: <LayoutGrid />,
    title: 'Buscador de productos y servicios',
    fact: 'Cada clase de Niza se paga por separado y define el alcance de tu marca.',
    lead: 'Consulta el listado internacional que agrupa productos y servicios para registrar una marca.',
    items: [
      { icon: <LayoutGrid />, text: '**Qué es.** El clasificador de **Niza** agrupa lo que ofreces en clases.' },
      { icon: <ShieldCheck />, text: '**Para qué sirve.** Te ayuda a elegir las clases **correctas** antes de pagar.' },
      { icon: <AlertTriangle />, text: '**Ojo.** Una clase de más se paga; una de menos deja tu marca descubierta.' },
    ],
    example: 'Ejemplo: escribes «café tostado» y el clasificador sugiere la **clase 30**. Si también vendes tazas, revisa la clase de vajilla.',
    steps: [
      { icon: <Coffee />, label: 'Tu producto' },
      { icon: <LayoutGrid />, label: 'La clase' },
      { icon: <Search />, label: 'La cobertura' },
      { icon: <ShieldCheck />, label: 'El pago' },
    ],
    href: '/tramites/marcas/clasificador',
    cta: 'Abrir el Buscador de productos y servicios',
  },
  {
    id: 'patentes',
    icon: <FileSearch />,
    title: 'Buscador de patentes',
    fact: 'Consulta invenciones, modelos de utilidad y diseños ya solicitados o concedidos.',
    lead: 'Sirve para ver si ya existe algo parecido antes de presentar tu solicitud.',
    items: [
      { icon: <FileSearch />, text: '**Qué es.** Busca patentes, modelos de utilidad y **diseños industriales** publicados.' },
      { icon: <ShieldCheck />, text: '**Para qué sirve.** Evita invertir en un trámite si el invento **ya está** descrito.' },
      { icon: <AlertTriangle />, text: '**Ojo.** No encontrar nada no garantiza que te concedan la patente.' },
    ],
    example: 'Ejemplo: buscas «filtro de agua portátil» y ves solicitudes con un mecanismo similar. Conviene revisar esas reivindicaciones antes de redactar las tuyas.',
    steps: [
      { icon: <Filter />, label: 'Tu invento' },
      { icon: <FileSearch />, label: 'La búsqueda' },
      { icon: <AlertTriangle />, label: 'Lo publicado' },
      { icon: <ShieldCheck />, label: 'Tu solicitud' },
    ],
    href: '/tramites/patentes/buscador',
    cta: 'Abrir el Buscador de patentes',
  },
]

function RichLine({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

function ToolCard({ tool }: { tool: (typeof TOOLS)[number] }) {
  const { tx } = useI18n()
  return (
    <article className="story-card-hover-night group flex h-full cursor-default flex-col rounded-gob-xl border border-gob-border bg-card p-gob-5 text-gob-text shadow-elevation-02 min-[905px]:p-gob-6">
      <div className="mb-gob-3 flex items-center gap-gob-3">
        <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-gob-md bg-gob-primary/10 text-gob-primary-dark group-hover:bg-white/15 group-hover:text-white">
          {tool.icon}
        </span>
        <h3 className="font-heading text-[1.25rem] font-medium leading-[1.35]">{tx(tool.title)}</h3>
      </div>
      <p className="text-gri-body-sm leading-[1.55]">
        <strong className="font-semibold">{tx(tool.fact)}</strong> {tx(tool.lead)}
      </p>
      <ul className="mt-gob-4 space-y-gob-2">
        {tool.items.map(item => (
          <li key={item.text} className="flex items-start gap-gob-2 text-gri-body-sm">
            <span aria-hidden className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-gob-md bg-gob-primary/10 text-gob-primary-dark group-hover:bg-white/15 group-hover:text-white [&_svg]:size-4">
              {item.icon}
            </span>
            <span>
              <RichLine text={tx(item.text)} />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-gob-4 rounded-gob-md bg-gob-surface-elevated px-gob-3 py-gob-2 text-gri-body-xs leading-[1.5] group-hover:bg-white/10">
        {tx(tool.example)}
      </p>
      <ol className="mt-gob-4 flex items-stretch gap-gob-2">
        {tool.steps.map((step, i) => (
          <li key={step.label} className="flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-gob-md bg-gob-surface-elevated px-gob-2 py-gob-3 text-center group-hover:bg-white/10">
            <span aria-hidden className="[&_svg]:size-4">
              {step.icon}
            </span>
            <span className="text-[0.6875rem] font-medium leading-[1.3]">{tx(step.label)}</span>
            {i < tool.steps.length - 1 ? <span className="sr-only">luego</span> : null}
          </li>
        ))}
      </ol>
      <TramitesLink
        href={tool.href}
        className="mt-auto inline-flex min-h-11 items-center pt-gob-5 text-gri-body-sm font-medium text-gob-link underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus group-hover:text-white"
      >
        {tx(tool.cta)}
      </TramitesLink>
    </article>
  )
}

export function HomeTools() {
  return (
    <StorySection
      tone="paper"
      align="left"
      leadSingleLine
      eyebrow="Antes de presentar"
      title="Revisa los tipos de herramientas de INAPI"
      lead="Compara marcas, elige las clases de Niza y busca patentes. Son de consulta: no inician un trámite ni reemplazan el examen de INAPI."
      actions={<StoryCta href="/tramites-digitales" label="Ver detalles de trámites digitales" variant="secondary" />}
    >
      <div className="grid gap-gob-5 min-[1100px]:grid-cols-3">
        {TOOLS.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </StorySection>
  )
}
