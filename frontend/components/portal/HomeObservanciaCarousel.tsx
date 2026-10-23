'use client'

import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { HomeRuleHeading } from '@/components/home/HomeRuleHeading'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
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

const arrowClass =
  'border-2 border-white/55 bg-white/15 text-white shadow-elevation-03 hover:border-white hover:bg-white hover:text-[#092039] dark:border-white/55 dark:bg-white/15 dark:text-white dark:hover:bg-white dark:hover:text-[#092039]'

export function HomeObservanciaCarousel() {
  return (
    <section
      aria-labelledby="transparencia-title"
      className="relative z-[1] py-gob-8 min-[905px]:py-20"
    >
      <HomeRuleHeading id="transparencia-title" tone="inverse">
        Transparencia, ética y participación ciudadana
      </HomeRuleHeading>
      <ContainerGRI size="wide" className="mt-gob-8">
        <Carousel
          opts={{ align: 'start', loop: true, dragFree: true }}
          className="relative px-16 min-[905px]:px-20"
        >
          <CarouselContent className="-ml-gob-3">
            {items.map(item => (
              <CarouselItem
                key={item.href}
                className="basis-[168px] pl-gob-3 min-[905px]:basis-[176px]"
              >
                <a
                  data-i18n-skip
                  href={item.href}
                  aria-label={item.title}
                  title={item.title}
                  draggable={false}
                  onDragStart={event => event.preventDefault()}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'inline-flex min-h-14 w-full select-none items-center justify-center rounded-gob-lg border-2 border-white/25 bg-white/10 px-gob-3 py-gob-3 text-center text-gri-body-sm font-semibold leading-[1.3] text-white transition-colors',
                    'hover:border-[#A1D1FF] hover:bg-white/20 hover:text-white',
                    'active:border-[#A1D1FF] active:bg-white/24 active:text-white',
                    'visited:text-white visited:hover:text-white',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                  )}
                >
                  <span className="line-clamp-2 text-gri-body-sm font-semibold leading-[1.3] text-white">{item.label}</span>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label="Ver accesos anteriores" className={arrowClass} />
          <CarouselNext aria-label="Ver más accesos" className={arrowClass} />
        </Carousel>
      </ContainerGRI>
    </section>
  )
}
