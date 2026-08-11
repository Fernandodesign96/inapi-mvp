import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import {
  PortalBlockquote,
  PortalImagePlaceholder,
  PortalMain,
  PortalSectionTitle,
} from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Récord de patentes nacionales — INAPI',
  description:
    'Chile alcanza su mayor cifra de solicitudes de patentes nacionales en más de una década. La Serena lidera el ranking comunal.',
}

const relatedNews = [
  {
    href: '/sala-de-prensa/cuenta-publica-2026',
    date: '21 de junio de 2026',
    title: 'INAPI realizó su Cuenta Pública Participativa 2026 en Valparaíso',
    imgAlt: 'Cuenta Pública 2026',
  },
  {
    href: '#',
    date: '23 de julio de 2026',
    title: 'INAPI reunió al ecosistema de innovación en torno a la información de patentes',
    imgAlt: 'Ecosistema de innovación',
  },
]

export default function PatentesNacionales2026Page() {
  return (
    <PortalShell
      {...portalShellProps('/sala-de-prensa/patentes-nacionales-2026', {
        pageTitle: 'Chile alcanza su mayor cifra de solicitudes de patentes nacionales en más de una década',
        active: 'prensa',
      })}
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <article>
            <p className="text-gri-body-sm text-muted-foreground mb-gob-2">
              <time dateTime="2026-06-21">21 de junio de 2026</time> · Publicado por INAPI
            </p>

            <PortalImagePlaceholder
              label="Foto de la nota sobre patentes nacionales"
              className="w-full h-[380px] mb-gob-5"
            />

            <p className="text-lg font-medium text-gob-text leading-relaxed mb-gob-6 pl-gob-4 border-l-4 border-inapi-cta max-w-3xl">
              En solo seis meses, inventores chilenos presentaron <strong>296 solicitudes</strong> de patentes de
              invención, la cifra más alta desde al menos 2017. La Serena lidera por primera vez el ranking comunal, por
              encima de Santiago.
            </p>

            <div className="text-gri-body text-muted-foreground leading-relaxed space-y-gob-4 max-w-3xl">
              <p>
                Chile recibió <strong className="text-gob-text">1.416 solicitudes</strong> de patentes de invención en el
                primer semestre de 2026, entre residentes y no residentes. De ese total,{' '}
                <strong className="text-gob-text">296 corresponden a inventores chilenos</strong>, una cifra histórica que
                supera el mismo periodo de todos los años de la serie disponible. El registro más alto previo se había
                producido en 2025, con 181 solicitudes de residentes.
              </p>
              <p>
                El contraste con la década anterior es marcado. Entre 2017 y 2024, las solicitudes de residentes variaron
                entre 119 y 152 en el mismo periodo. El salto de 2026 supera en un{' '}
                <strong className="text-gob-text">63%</strong> la cifra de 2025.
              </p>

              <PortalBlockquote>
                &ldquo;Cuando los inventores deciden proteger lo que crean, es porque confían en que esa protección tiene
                valor real; en otras palabras, las ideas de hoy son los activos del mañana.&rdquo;
              </PortalBlockquote>

              <p>
                Para el director nacional, <strong className="text-gob-text">Esteban Figueroa</strong>, el aumento no es
                espontáneo: &ldquo;Es el resultado de años de trabajo para acercar el sistema de patentes a emprendedores,
                investigadores y empresas&rdquo;.
              </p>
              <p>
                Una patente otorga a su titular el derecho exclusivo a explotar comercialmente una invención por hasta{' '}
                <strong className="text-gob-text">20 años</strong>. Durante ese periodo, ningún tercero puede fabricar,
                vender ni importar el producto o proceso protegido sin autorización.
              </p>

              <h3 className="font-heading text-xl font-medium text-gob-text mt-gob-6 mb-gob-3">
                La Serena lidera el ranking comunal
              </h3>
              <p>
                La Serena encabeza el ranking de comunas con <strong className="text-gob-text">44 presentaciones</strong>,
                seguida por Santiago (39) y Las Condes (26). Es la primera vez que una ciudad fuera de la Región
                Metropolitana lidera este indicador. Concepción aparece cuarta con 18 solicitudes y Antofagasta quinta con
                16.
              </p>

              <PortalBlockquote>
                &ldquo;Que La Serena encabece este ranking es una señal alentadora.&rdquo;
              </PortalBlockquote>

              <h3 className="font-heading text-xl font-medium text-gob-text mt-gob-6 mb-gob-3">
                Salud y ciencias aplicadas concentran la actividad
              </h3>
              <p>
                Los productos farmacéuticos reúnen el <strong className="text-gob-text">24,64%</strong> de las solicitudes
                de residentes, seguidos por biotecnología (15,76%), productos orgánicos elementales (12,57%), química de
                materiales (8,57%) e ingeniería química (8,19%). En conjunto, estas áreas superan el 60% del total.
              </p>
              <p>
                El perfil de los solicitantes también cambió. Las personas naturales registraron un alza del{' '}
                <strong className="text-gob-text">101%</strong> respecto al año anterior y explican la mayor parte del
                crecimiento. Las solicitudes de no residentes aumentaron apenas un 5%. El dinamismo, esta vez, es local.
              </p>
            </div>

            <p className="mt-gob-8">
              <Link
                href="/sala-de-prensa"
                className="inline-flex items-center gap-gob-2 font-bold text-gob-link hover:text-gob-primary-dark"
              >
                <ArrowLeft className="w-5 h-5" aria-hidden />
                Volver a Sala de Prensa
              </Link>
            </p>
          </article>

          <section aria-label="Otras noticias" className="mt-gob-10 pt-gob-8 border-t border-gob-border">
            <PortalSectionTitle>Otras noticias</PortalSectionTitle>
            <div className="grid min-[600px]:grid-cols-2 gap-gob-5">
              {relatedNews.map(item => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="bg-card border border-gob-border rounded-gob-md overflow-hidden hover:border-gob-link transition-colors no-underline text-inherit"
                >
                  <PortalImagePlaceholder label={item.imgAlt} className="h-[150px] rounded-none border-0 border-b border-gob-border" />
                  <div className="p-gob-4">
                    <p className="text-gri-body-xs text-muted-foreground mb-1.5">{item.date}</p>
                    <p className="text-gri-body-sm font-bold text-gob-text leading-snug">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
