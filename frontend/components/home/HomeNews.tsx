'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { StoryCta } from '@/components/story/StoryCta'
import { StorySection } from '@/components/story/StorySection'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useI18n } from '@/lib/i18n/LocaleProvider'

const NEWS = [
  {
    fecha: 'Martes 20 octubre de 2026',
    titulo: 'Academia INAPI abre postulaciones para su nuevo curso gratuito y asincrónico sobre Propiedad Industrial',
    resumen:
      'El programa gratuito y en línea, busca acercar los conceptos fundamentales de la propiedad intelectual y destacar su rol estratégico en el emprendimiento y la innovación.',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-01-academia.jpg',
    alt: 'Persona trabajando en un computador portátil durante un curso de Academia INAPI.',
  },
  {
    fecha: 'Miércoles 14 octubre de 2026',
    titulo: 'INAPI y OMPI inician primer estudio en Chile sobre financiamiento respaldado en propiedad industrial',
    resumen:
      'La iniciativa permitirá conocer el estado actual del ecosistema nacional, identificar oportunidades y barreras, y generar recomendaciones para avanzar en el uso de la propiedad industrial como respaldo para acceder a financiamiento.',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-02-ompi.png',
    alt: 'Personas revisan notas adhesivas sobre una mesa de trabajo, en el estudio INAPI-OMPI.',
  },
  {
    fecha: 'Martes 29 septiembre de 2026',
    titulo: 'Chile mantiene el puesto 51 en el Índice Mundial de Innovación y lidera América Latina por segundo año consecutivo',
    resumen:
      'El país sube del lugar 43 al 41 en insumos de innovación, pero baja del 63 al 70 en resultados, según el ranking de la OMPI.',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-03-gii.png',
    alt: 'Vista de Santiago de Chile, con el Costanera Center y la cordillera de los Andes.',
  },
  {
    fecha: 'Viernes 25 septiembre de 2026',
    titulo:
      'INAPI promueve el apoyo a la innovación nacional con nueva plataforma digital del Programa de Asistencia a Inventores (PAI)',
    resumen:
      'Tras cuatro años de implementación, la iniciativa de la OMPI e INAPI fortalece su gestión operativa mediante una nueva normativa de administración e inscripción, sumada al lanzamiento de su portal oficial.',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-04-pai.png',
    alt: 'Personas trabajando en un computador con la plataforma del Programa de Asistencia a Inventores.',
  },
  {
    fecha: 'Viernes 25 septiembre de 2026',
    titulo: 'INAPI impulsa nuevo ciclo de talleres prácticos sobre Propiedad Industrial dirigido a mujeres',
    resumen:
      'La iniciativa busca promover el rol de la mujer en el ecosistema emprendedor y otorgarle capacidades para impulsar sus negocios, facilitando sus procesos de tramitación en marcas, dibujos y diseños industriales.',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-05-mujeres.jpeg',
    alt: 'Mujer trabajando en un computador portátil durante un taller de propiedad industrial.',
  },
  {
    fecha: 'Martes 15 septiembre de 2026',
    titulo: 'De la patente a la práctica: El despliegue de INAPI para conectar la vigilancia tecnológica con la industria',
    resumen:
      'A través de talleres, reuniones en terreno y una nueva plataforma pública, el organismo busca que empresas aprovechen la información de patentes para tomar mejores decisiones de inversión e innovación.',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-06-vigilancia.jpg',
    alt: 'INAPI conecta la vigilancia tecnológica de patentes con la industria.',
  },
  {
    fecha: 'Viernes 11 septiembre de 2026',
    titulo: 'INAPI expone sobre el rol estratégico de las patentes en foro internacional del litio',
    resumen:
      'El Director Nacional de INAPI, Esteban Figueroa, presentó la Plataforma de Información Tecnológica de Patentes para el Desarrollo Productivo Sostenible (DPS).',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-07-litio.jpg',
    alt: 'INAPI presenta la plataforma de información tecnológica de patentes en un foro del litio.',
  },
  {
    fecha: 'Martes 8 septiembre de 2026',
    titulo: 'Solicitudes de marcas en Chile aumentan un 18,2% al cierre de julio de 2026 e impulsan sectores de tecnología y salud',
    resumen:
      'El ingreso acumulado de marcas multiclase suma 29.787 presentaciones en los primeros siete meses del año, con alzas lideradas por las categorías de aparatos tecnológicos, equipamiento médico y productos farmacéuticos.',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-08-marcas.png',
    alt: 'Solicitudes de marcas en Chile aumentan en 2026.',
  },
  {
    fecha: 'Lunes 31 agosto de 2026',
    titulo: 'INAPI y ANID dan inicio a una nueva versión del programa INAPI Running 2026',
    resumen:
      'La iniciativa, dirigida a beneficiarios y beneficiarias del programa StartUp Ciencia 2026, contempla un Bootcamp intensivo de cinco días para fortalecer las estrategias de propiedad intelectual.',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-09-running.png',
    alt: 'INAPI Running 2026, programa conjunto con ANID.',
  },
  {
    fecha: 'Lunes 31 agosto de 2026',
    titulo: 'INAPI actualiza su Protocolo, Programa y Plan de Trabajo de Prevención de la Violencia en el Trabajo, Acoso Sexual y Laboral (VALS) 2026-2027',
    resumen:
      'La medida, formalizada mediante la Resolución Exenta N.° 388, fortalece las acciones institucionales en el marco de la Ley Karin para garantizar espacios laborales seguros.',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-10-vals.png',
    alt: 'Edificio institucional de INAPI, sede del protocolo de prevención de violencia y acoso laboral.',
  },
]

const PROGRAMS = [
  {
    title: 'Plataforma de Datos',
    href: 'https://dps.inapi.cl/',
    src: '/inapi-mvp/home/banner-itp.png',
  },
  {
    title: 'Programa de asistencia a inventores',
    href: 'https://sites.google.com/inapi.cl/pai2026/inicio',
    src: '/inapi-mvp/home/banner-pai.png',
  },
  {
    title: 'Cuenta Pública 2026',
    href: '/sala-de-prensa/cuenta-publica-2026',
    src: '/inapi-mvp/home/banner-cuenta-publica.png',
  },
]

const cardClass =
  'story-lift group relative flex h-full min-h-[32rem] flex-col overflow-hidden rounded-gob-xl border border-gob-border bg-card shadow-elevation-02 focus-within:ring-2 focus-within:ring-gob-focus'

function ProgramBanners() {
  const { tx } = useI18n()
  return (
    <StorySection tone="paper" eyebrow="Programas">
      <Carousel opts={{ align: 'center', loop: true }} className="px-16 min-[905px]:px-20">
        <CarouselContent>
          {PROGRAMS.map(p => {
            const external = p.href.startsWith('http')
            const inner = (
              <figure className="flex flex-col items-center gap-gob-4 text-center">
                <figcaption className="portal-h2 text-gob-text">{tx(p.title)}</figcaption>
                <Image
                  src={p.src}
                  alt={tx(p.title)}
                  width={1280}
                  height={320}
                  className="mx-auto h-auto max-h-52 w-full rounded-gob-lg object-contain min-[905px]:max-h-64"
                />
              </figure>
            )
            return (
              <CarouselItem key={p.title} className="basis-full">
                {external ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus">
                    {inner}
                    <span className="sr-only"> {tx('(se abre en una pestaña nueva)')}</span>
                  </a>
                ) : (
                  <Link href={p.href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus">
                    {inner}
                  </Link>
                )}
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </StorySection>
  )
}

export function HomeNews() {
  return (
    <>
      <StorySection
        tone="mist"
        align="left"
        eyebrow="Sala de prensa"
        leadSingleLine
        title="Novedades de INAPI"
        lead="Comunicados, hitos y actividades recientes del Instituto Nacional de Propiedad Industrial."
        actions={<StoryCta href="/sala-de-prensa" label="Ver todas las noticias" variant="secondary" />}
      >
        <Carousel opts={{ align: 'start', loop: false }} className="relative px-16 min-[905px]:px-20">
          <CarouselContent>
            {NEWS.map(n => (
              <CarouselItem key={n.titulo} className="basis-full min-[905px]:basis-1/2 min-[1240px]:basis-1/3">
                <article className={cardClass}>
                  <div className="relative h-64 w-full overflow-hidden min-[905px]:h-72">
                    <Image src={n.image} alt={n.alt} width={1024} height={769} className="size-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col gap-gob-2 p-gob-5">
                    <p className="inline-flex items-center gap-gob-2 text-gri-body-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                      <Newspaper className="size-3.5 text-inapi-header" aria-hidden />
                      {n.fecha}
                    </p>
                    <h3 className="font-heading text-[1.0625rem] font-medium leading-[1.4] text-gob-text">
                      <Link href={n.href} className="after:absolute after:inset-0 hover:text-gob-link focus-visible:outline-none">
                        {n.titulo}
                      </Link>
                    </h3>
                    <p className="line-clamp-3 text-gri-body-sm leading-[1.55] text-muted-foreground">{n.resumen}</p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </StorySection>
      <ProgramBanners />
    </>
  )
}
