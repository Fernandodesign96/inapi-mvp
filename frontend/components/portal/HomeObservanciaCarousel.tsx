'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const items = [
  'Transparencia Activa · Ley de Transparencia',
  'Plan anual de Capacitación 2026',
  'MESU 2025',
  'Sistema de Teletrabajo',
  'Plataforma Ley del Lobby',
  'Código de Ética',
  'Información de interés',
  'Participación ciudadana',
]

export function HomeObservanciaCarousel() {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (dir: -1 | 1) => {
    ref.current?.scrollBy({ left: dir * 220, behavior: 'smooth' })
  }

  return (
    <section className="mt-gob-8">
      <div className="bg-card py-gob-4 text-center border-b-4 border-gob-primary">
        <h2 className="portal-h2 text-gob-text">Observancia</h2>
      </div>
      <div className="bg-gob-surface-elevated py-gob-8 px-gob-4">
        <div className="mx-auto max-w-[1140px] space-y-gob-6 text-center">
          <h3 className="portal-h3 text-inapi-cta max-w-3xl mx-auto">
            Conoce y utiliza las herramientas de protección de la propiedad intelectual en Chile
          </h3>
          <Button
            variant="outline"
            size="form"
            className="rounded-gob-md border-2 border-inapi-cta text-inapi-cta font-medium hover:bg-inapi-cta/5"
            asChild
          >
            <Link href="/observancia">Conoce más</Link>
          </Button>
          <div className="relative px-14">
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => scroll(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 size-11 rounded-full bg-card text-inapi-cta shadow-elevation-03 flex items-center justify-center hover:bg-gob-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div
              ref={ref}
              className="flex gap-gob-4 overflow-x-auto scroll-smooth pb-gob-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {items.map(label => (
                <div
                  key={label}
                  className="snap-start shrink-0 min-w-[190px] min-h-[120px] flex-[0_0_calc(20%-13px)] bg-inapi-cta text-gob-text-inverse rounded-gob-md p-gob-5 flex items-center shadow-elevation-02"
                >
                  <h4 className="text-gri-body font-medium leading-[1.5] text-left">{label}</h4>
                </div>
              ))}
            </div>
            <button
              type="button"
              aria-label="Siguiente"
              onClick={() => scroll(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 size-11 rounded-full bg-card text-inapi-cta shadow-elevation-03 flex items-center justify-center hover:bg-gob-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
