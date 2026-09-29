import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalMain, PortalProse, PortalSectionTitle } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/preguntas-frecuentes')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Preguntas frecuentes'} — INAPI`,
  description: meta?.description,
}

const derechos = [
  {
    title: '1. Las marcas',
    body: 'Distinguen productos, servicios o establecimientos en el mercado. La protección es territorial (nacional) y dura 10 años, renovables indefinidamente.',
  },
  {
    title: '2. Las patentes',
    body: 'Otorgan el derecho exclusivo de usar y explotar una invención. Deben ser novedosas, tener nivel inventivo y ser aplicables industrialmente. Duran 20 años desde la presentación de la solicitud.',
  },
  {
    title: '3. Indicaciones geográficas y denominaciones de origen',
    body: 'Identifican un producto como originario de una región, protegiendo sus cualidades y reputación frente a usos desleales de terceros.',
  },
  {
    title: '4. El derecho de autor',
    body: 'Protege obras literarias y artísticas, software y bases de datos originales. Incluye derechos patrimoniales (explotación económica) y derechos morales (paternidad e integridad de la obra).',
  },
  {
    title: '5. Las variedades vegetales',
    body: 'Todo obtentor de una nueva variedad vegetal puede inscribirla en el Registro de Variedades Protegidas si cumple los requisitos de la Ley 19.342: ser nueva, distinta, homogénea y estable.',
  },
]

export default function PreguntasFrecuentesPage() {
  return (
    <PortalShell {...portalShellProps('/preguntas-frecuentes')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <section>
            <PortalSectionTitle>¿Qué es la propiedad intelectual e industrial?</PortalSectionTitle>
            <PortalProse className="mb-gob-3">
              La propiedad intelectual protege toda creación de la mente humana: inventos, modelos de utilidad,
              marcas, obras literarias y artísticas, entre otras.
            </PortalProse>
            <PortalProse className="mb-gob-3">
              <strong className="text-gob-text">Propiedad industrial:</strong> incluye patentes de invención, modelos
              de utilidad, marcas comerciales, colectivas y de certificación, e indicaciones geográficas y
              denominaciones de origen. INAPI administra estos derechos según la Ley 19.039.
            </PortalProse>
            <PortalProse>
              <strong className="text-gob-text">Derecho de autor:</strong> protege a los artistas intérpretes,
              productores de fonogramas y organismos de radiodifusión. Lo administra el Departamento de Derechos
              Intelectuales, dependiente de la DIBAM, Ministerio de Educación.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>¿Cuáles son los principales derechos de propiedad intelectual?</PortalSectionTitle>
            <div className="space-y-gob-4 max-w-3xl">
              {derechos.map(item => (
                <div key={item.title}>
                  <h3 className="font-bold text-gob-text text-gri-body-sm mb-1.5">{item.title}</h3>
                  <p className="text-gri-body-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <PortalSectionTitle>¿Cuál es la importancia legal de la propiedad intelectual?</PortalSectionTitle>
            <PortalProse className="mb-gob-3">
              Las leyes de propiedad intelectual protegen los derechos morales y patrimoniales de los creadores, y a la
              vez el derecho de la sociedad a acceder a esas creaciones.
            </PortalProse>
            <PortalProse>
              También incentivan la creatividad y fomentan prácticas comerciales leales que contribuyen al desarrollo
              económico y social. El Convenio de París (1883) y el Convenio de Berna (1886) reconocen por primera vez
              esta importancia; la Organización Mundial de la Propiedad Intelectual (OMPI) administra ambos tratados.
            </PortalProse>
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
