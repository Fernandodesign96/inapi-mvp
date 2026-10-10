import Image from 'next/image'
import Link from 'next/link'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { Button } from '@/components/ui/button'

const novedades = [
  {
    fecha: 'Martes 29 septiembre de 2026',
    titulo:
      'Chile mantiene el puesto 51 en el Índice Mundial de Innovación y lidera América Latina por segundo año consecutivo',
    resumen:
      'El país sube del lugar 43 al 41 en insumos de innovación, pero baja del 63 al 70 en resultados, según el ranking de la OMPI.',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-gii.jpg',
    alt: 'Vista de Santiago de Chile, con el Costanera Center y la cordillera de los Andes.',
  },
  {
    fecha: 'Viernes 25 septiembre de 2026',
    titulo:
      'INAPI promueve el apoyo a la innovación nacional con nueva plataforma digital del Programa de Asistencia a Inventores (PAI)',
    resumen:
      'Tras cuatro años de implementación, la iniciativa de la OMPI e INAPI fortalece su gestión operativa mediante una nueva normativa de administración e inscripción, sumada al lanzamiento de su portal oficial.',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-pai.jpg',
    alt: 'Personas trabajando en un computador con la plataforma del Programa de Asistencia a Inventores.',
  },
  {
    fecha: 'Viernes 25 septiembre de 2026',
    titulo: 'INAPI impulsa nuevo ciclo de talleres prácticos sobre Propiedad Industrial dirigido a mujeres',
    resumen:
      'La iniciativa busca promover el rol de la mujer en el ecosistema emprendedor y otorgarle capacidades para impulsar sus negocios, facilitando sus procesos de tramitación en marcas, dibujos y diseños industriales.',
    href: '/sala-de-prensa',
    image: '/inapi-mvp/home/noticia-mujeres.jpg',
    alt: 'Mujer trabajando en un computador portátil durante un taller de propiedad industrial.',
  },
]

export function NewsSection() {
  return (
    <section aria-labelledby="noticias-title" className="bg-card py-gob-8 min-[905px]:py-20">
      <ContainerGRI size="wide" className="space-y-gob-8">
        <div className="space-y-gob-3">
          <h2
            id="noticias-title"
            className="font-heading text-[clamp(1.25rem,2.4vw,2.25rem)] font-medium leading-[1.5] text-gob-text min-[600px]:whitespace-nowrap"
          >
            Conoce las novedades más recientes de nuestra sala de prensa
          </h2>
          <p className="portal-lead max-w-none text-gob-text">
            Comunicados, hitos y actividades recientes del Instituto Nacional de Propiedad Industrial.
          </p>
        </div>
        <div className="grid gap-gob-5 min-[600px]:grid-cols-3">
          {novedades.map(n => (
            <article
              key={n.titulo}
              className="portal-card-motion flex flex-col overflow-hidden rounded-gob-lg border border-gob-border bg-background shadow-elevation-02"
            >
              <Image
                src={n.image}
                alt={n.alt}
                width={1024}
                height={769}
                className="h-44 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-gob-5">
                <p className="text-gri-body-sm text-muted-foreground">{n.fecha}</p>
                <h3 className="mt-gob-2 font-heading text-gri-h2 font-medium text-gob-text leading-[1.35]">
                  <Link
                    href={n.href}
                    className="hover:text-gob-link hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                  >
                    {n.titulo}
                  </Link>
                </h3>
                <p className="mt-gob-3 flex-1 text-gri-body leading-[1.5] text-muted-foreground">{n.resumen}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="flex justify-center">
          <Button size="form" className="rounded-gob-md" asChild>
            <Link href="/sala-de-prensa">Ver todas las noticias</Link>
          </Button>
        </div>
      </ContainerGRI>
    </section>
  )
}
