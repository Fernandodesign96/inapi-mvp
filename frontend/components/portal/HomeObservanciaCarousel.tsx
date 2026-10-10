'use client'

import { useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { HomeRuleHeading } from '@/components/home/HomeRuleHeading'
import { cn } from '@/lib/utils'

type InstitutionalLink = {
  label: string
  title: string
  href: string
  external?: boolean
}

const items: InstitutionalLink[] = [
  {
    label: 'Transparencia Activa Ley de Transparencia',
    title: 'Transparencia Activa de la Ley de Transparencia',
    href: 'https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=AY001',
    external: true,
  },
  {
    label: 'Plan anual de Capacitación 2026',
    title: 'Plan anual de capacitación 2025 - 2027 (PDF 293 KB)',
    href: 'https://www.inapi.cl/docs/default-source/2025-doc/home/footer/res-pac-2025.pdf',
    external: true,
  },
  {
    label: 'MESU 2026',
    title: 'Medición de Satisfacción Usuaria INAPI 2026',
    href: 'https://satisfaccion.gob.cl/medicion-de-satisfaccion-usuaria/proceso-2026',
    external: true,
  },
  {
    label: 'Sistema de Teletrabajo',
    title: 'Sistema de Teletrabajo (PDF 3,26 KB)',
    href: 'https://www.inapi.cl/docs/default-source/2023/home/footer/inapi_informes_teletrabajo.pdf',
    external: true,
  },
  {
    label: 'Plataforma Ley del Lobby',
    title: 'Plataforma de la Ley del Lobby',
    href: 'https://www.leylobby.gob.cl/instituciones/AY001',
    external: true,
  },
  {
    label: 'Código de Ética',
    title: 'Código de Ética de INAPI 2026 (PDF 591 KB)',
    href: 'https://inapi.cl/docs/default-source/2026-doc/footer/codigo-de-etica_inapi-2026.pdf',
    external: true,
  },
  {
    label: 'Tribunal de Propiedad Industrial',
    title: 'Tribunal de Propiedad Industrial',
    href: 'https://www.tdpi.gob.cl/',
    external: true,
  },
  {
    label: 'Recursos Genéticos Microbianos',
    title: 'Recursos Genéticos Microbianos',
    href: 'https://www.cchrgm.cl/depositos/deposito_ida/',
    external: true,
  },
  {
    label: 'Departamento de Derechos Intelectuales',
    title: 'Departamento de Derechos Intelectuales',
    href: 'http://www.propiedadintelectual.cl/623/w3-channel.html',
    external: true,
  },
  {
    label: 'Empleos Públicos',
    title: 'Empleos Públicos',
    href: 'https://www.empleospublicos.cl/',
    external: true,
  },
  {
    label: 'Participe en nuestras licitaciones',
    title: 'Participe en nuestras licitaciones',
    href: 'http://www.mercadopublico.cl/Portal/FeedOrg.aspx?qs=lzKAE36ktKRtGr8VOYwf6w==',
    external: true,
  },
  {
    label: 'Solicitud de información',
    title: 'Solicitud de información de la Ley de Transparencia',
    href: 'https://www.portaltransparencia.cl/PortalPdT/web/guest/directorio-de-organismos-regulados?p_p_id=pdtorganismos_WAR_pdtorganismosportlet&orgcode=f165622f6b44eb212dd83942a6e02ddf',
    external: true,
  },
  {
    label: 'Gobierno Transparente Histórico',
    title: 'Gobierno Transparente Histórico',
    href: 'http://www.inapi.cl/transparencia/index.html',
    external: true,
  },
]

export function HomeObservanciaCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollByCards = useCallback((direction: -1 | 1) => {
    const node = scrollerRef.current
    if (!node) return
    const card = node.querySelector<HTMLElement>('[data-inst-card]')
    const step = (card?.offsetWidth ?? 180) + 16
    node.scrollBy({ left: direction * step * 2, behavior: 'smooth' })
  }, [])

  return (
    <section
      data-i18n-skip
      aria-labelledby="transparencia-title"
      className="bg-card py-gob-8 min-[905px]:py-20"
    >
      <HomeRuleHeading id="transparencia-title">
        Transparencia, ética y participación ciudadana
      </HomeRuleHeading>
      <ContainerGRI size="wide" className="mt-gob-8">
        <div className="flex items-center justify-center gap-gob-3">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            className="flex size-9 shrink-0 items-center justify-center rounded-gob-md border-2 border-gob-border bg-card text-inapi-cta shadow-elevation-01 transition-colors hover:border-gob-primary hover:bg-gob-surface hover:text-gob-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            aria-label="Ver accesos anteriores"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>

          <div
            ref={scrollerRef}
            className="flex min-w-0 max-w-[1180px] flex-1 justify-start gap-gob-3 overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map(item => (
              <a
                data-inst-card
                key={item.href}
                href={item.href}
                aria-label={item.title}
                title={item.title}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className={cn(
                  'inline-flex w-[168px] shrink-0 snap-start items-center justify-center rounded-gob-lg border-2 border-gob-border bg-card px-gob-3 py-gob-3 min-h-14 text-center text-gri-body-sm font-semibold leading-[1.3] text-gob-text transition-colors',
                  'hover:border-gob-primary hover:bg-gob-surface hover:text-gob-primary',
                  'active:border-gob-primary active:bg-gob-surface active:text-gob-primary',
                  'visited:text-gob-text visited:hover:text-gob-primary',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                  'min-[905px]:w-[176px]',
                )}
              >
                <span className="line-clamp-2 text-gri-body-sm font-semibold leading-[1.3]">{item.label}</span>
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCards(1)}
            className="flex size-9 shrink-0 items-center justify-center rounded-gob-md border-2 border-gob-border bg-card text-inapi-cta shadow-elevation-01 transition-colors hover:border-gob-primary hover:bg-gob-surface hover:text-gob-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            aria-label="Ver más accesos"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>
      </ContainerGRI>
    </section>
  )
}
