'use client'

import type { ComponentType } from 'react'
import Link from 'next/link'
import { TramitesLink } from '@/components/tramites/TramitesLink'
import { FileSearch, LayoutGrid, Search } from 'lucide-react'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { Button } from '@/components/ui/button'

type ToolItem = {
  icon: ComponentType<{ className?: string }>
  title: string
  what: string
  why: string
  how: string[]
  needs: string[]
  example: string
  href: string
  cta: string
}

const herramientas: ToolItem[] = [
  {
    icon: Search,
    title: 'Buscador de marcas',
    what: 'Es la consulta que compara tu nombre o logo con marcas ya solicitadas o registradas en Chile.',
    why: 'Sirve para detectar coincidencias antes de presentar y reducir el riesgo de rechazo u oposición.',
    how: [
      'Abre el buscador de similitud con el nombre o el logo.',
      'Revisa resultados iguales o parecidos en las mismas clases.',
      'Si hay conflicto, ajusta el signo o las clases antes de solicitar.',
    ],
    needs: ['El nombre o el archivo del logo.', 'Una idea de las clases de productos o servicios.'],
    example: 'Ejemplo: buscas “Andes Café” y ves una marca “Andes Coffee” en la misma clase.',
    href: '/marcas/buscador-similitud',
    cta: 'Abrir el buscador de marcas',
  },
  {
    icon: LayoutGrid,
    title: 'Buscador de productos y servicios',
    what: 'Es la consulta de las clases de Niza: el listado internacional que agrupa productos y servicios para registrar una marca.',
    why: 'Sirve para elegir las clases correctas. Cada clase se paga por separado y define el alcance de tu marca.',
    how: [
      'Escribe el producto o servicio con tus palabras.',
      'Revisa la clase de Niza que sugiere el clasificador.',
      'Anota las clases que usarás en la solicitud de marca.',
    ],
    needs: ['La lista de productos o servicios que quieres proteger.'],
    example: 'Ejemplo: escribes “café tostado” y el clasificador te sugiere la clase 30.',
    href: '/tramites/marcas/clasificador',
    cta: 'Abrir el buscador de productos y servicios',
  },
  {
    icon: FileSearch,
    title: 'Buscador de patentes',
    what: 'Es la consulta de patentes de invención, modelos de utilidad y diseños industriales ya solicitados o concedidos.',
    why: 'Sirve para ver si ya existe una invención parecida antes de presentar tu solicitud.',
    how: [
      'Busca por palabras, titular o número de solicitud.',
      'Abre el resultado y revisa el resumen y el estado.',
      'Usa la búsqueda avanzada si necesitas más filtros.',
    ],
    needs: ['Palabras que describan el invento, o un número de solicitud.'],
    example: 'Ejemplo: buscas “filtro de agua portátil” y ves solicitudes con un mecanismo similar.',
    href: '/tramites/patentes/buscador',
    cta: 'Abrir el buscador de patentes',
  },
]

function ToolCard({ item }: { item: ToolItem }) {
  const Icon = item.icon
  return (
    <article className="portal-card-motion flex flex-col rounded-gob-lg border border-gob-border bg-card p-gob-6 text-left shadow-elevation-03">
      <span className="inline-flex size-11 items-center justify-center rounded-gob-md bg-gob-info-bg text-gob-primary">
        <Icon className="size-6" aria-hidden />
      </span>
      <h3 className="mt-gob-4 font-heading text-gri-h2 font-medium text-gob-text">{item.title}</h3>
      <p className="mt-gob-3 text-gri-body-sm leading-[1.5] text-gob-text">
        <strong className="font-medium">Qué es.</strong> {item.what}
      </p>
      <p className="mt-gob-2 text-gri-body-sm leading-[1.5] text-gob-text">
        <strong className="font-medium">Para qué sirve.</strong> {item.why}
      </p>
      <p className="mt-gob-3 text-gri-body-sm font-medium text-gob-primary">Cómo se hace</p>
      <ul className="mt-gob-2 list-disc space-y-gob-1 pl-gob-5 text-gri-body-sm leading-[1.5] text-gob-text">
        {item.how.map(step => (
          <li key={step}>{step}</li>
        ))}
      </ul>
      <p className="mt-gob-3 text-gri-body-sm font-medium text-gob-primary">Qué necesitas</p>
      <ul className="mt-gob-2 list-disc space-y-gob-1 pl-gob-5 text-gri-body-sm leading-[1.5] text-gob-text">
        {item.needs.map(need => (
          <li key={need}>{need}</li>
        ))}
      </ul>
      <p className="mt-gob-3 flex-1 text-gri-body-sm leading-[1.5] text-muted-foreground">{item.example}</p>
      <TramitesLink
        href={item.href}
        className="mt-gob-4 inline-flex min-h-11 items-center text-gri-body-sm font-medium text-gob-link hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
      >
        {item.cta}
      </TramitesLink>
    </article>
  )
}

export function QuickAccess() {
  return (
    <>
      <section aria-labelledby="herramientas-inapi-title" className="py-gob-8 min-[905px]:py-20">
        <ContainerGRI size="wide" className="relative z-[1] space-y-gob-8">
          <div className="max-w-4xl space-y-gob-4">
            <h2 id="herramientas-inapi-title" className="portal-h2 text-gob-text">
              Revisa los tipos de herramientas de INAPI
            </h2>
            <p className="portal-lead text-gob-text">
              Compara marcas, elige las clases de Niza y busca patentes antes de presentar. Estas herramientas son de
              consulta: no inician un trámite ni reemplazan el examen de INAPI.
            </p>
          </div>
          <div className="grid gap-gob-6 min-[600px]:grid-cols-2 min-[905px]:grid-cols-3">
            {herramientas.map(item => (
              <ToolCard key={item.title} item={item} />
            ))}
          </div>
        </ContainerGRI>
      </section>

      <section aria-labelledby="tramites-digitales-cta-title" className="pb-gob-8 min-[905px]:pb-20">
        <ContainerGRI size="wide" className="relative z-[1]">
          <div className="flex flex-col items-start gap-gob-5 rounded-gob-lg border border-gob-border bg-card px-gob-6 py-gob-8 shadow-elevation-02 min-[905px]:flex-row min-[905px]:items-center min-[905px]:justify-between">
            <div className="max-w-3xl space-y-gob-3">
              <h2 id="tramites-digitales-cta-title" className="portal-h2 text-gob-text">
                Ver detalles de trámites digitales
              </h2>
              <p className="portal-lead text-gob-text">
                Qué es cada trámite, para qué sirve y qué necesitas. El formulario y el pago están en el Sitio de
                Trámites, con ClaveÚnica.
              </p>
            </div>
            <Button
              size="lg"
              className="h-14 min-h-14 shrink-0 rounded-full bg-gob-primary px-gob-8 text-gob-text-inverse hover:bg-gob-primary-dark"
              asChild
            >
              <Link href="/tramites-digitales">Ver detalles de trámites digitales</Link>
            </Button>
          </div>
        </ContainerGRI>
      </section>
    </>
  )
}
