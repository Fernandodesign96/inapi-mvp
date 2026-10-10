import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalMain, PortalProse, PortalSectionTitle } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/conoce-mas/historia-propiedad-industrial')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Historia de la propiedad industrial'} — INAPI`,
  description: meta?.description,
}

const hitos = [
  {
    year: '1833–1840',
    title: 'Primera protección constitucional y primera patente',
    body: 'La Constitución de 1833 reconoció a autores e inventores un derecho exclusivo sobre sus creaciones. En 1840 empezó a regir un decreto sobre patentes y se concedió la primera: un método para elaborar ron en Valparaíso.',
  },
  {
    year: '1874–1877',
    title: 'Nace el registro de marcas',
    body: 'Se abre un registro para marcas de fábrica o de comercio. El registro más antiguo que conserva INAPI es la marca Santa Rosa de Los Andes, de 1877, para vinos y licores.',
  },
  {
    year: '1925–1931',
    title: 'Primera ley moderna de propiedad industrial',
    body: 'El Decreto Ley N.° 588 reunió patentes, marcas y modelos industriales. Años después se refundió en el Decreto Ley N.° 958, texto base de la materia durante décadas.',
  },
  {
    year: '1960–1971',
    title: 'Un departamento especializado y clasificaciones internacionales',
    body: 'Se crea el Departamento de Propiedad Industrial. Chile adopta la Clasificación de Niza para marcas, la de Estrasburgo para patentes y la de Locarno para diseños.',
  },
  {
    year: '1991–2005',
    title: 'Ley N.° 19.039 y adecuación a la OMC',
    body: 'Entra en vigencia la Ley de Propiedad Industrial vigente. Más tarde se incorpora el marco del Acuerdo sobre los ADPIC: diseños, esquemas de trazado, indicaciones geográficas, un nuevo tribunal y reglas de observancia.',
  },
  {
    year: '2009–2014',
    title: 'Nace INAPI y entra el PCT',
    body: 'El 1 de enero de 2009 empieza a funcionar el Instituto Nacional de Propiedad Industrial. Chile adhiere al Tratado de Cooperación en materia de Patentes. En 2014 INAPI opera como autoridad internacional de búsqueda y examen preliminar.',
  },
  {
    year: '2012–2016',
    title: 'Sede nueva, Sello de Origen y estrategia nacional',
    body: 'Se inaugura el edificio institucional, se lanza el programa Sello de Origen junto al Ministerio de Economía y se publica la Estrategia Nacional de Propiedad Industrial.',
  },
]

export default function HistoriaPropiedadIndustrialPage() {
  return (
    <PortalShell {...portalShellProps('/conoce-mas/historia-propiedad-industrial')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalProse>
            Estos hitos resumen cómo Chile pasó de privilegios presidenciales del siglo XIX a un instituto público que
            registra, publica y explica los derechos de propiedad industrial.
          </PortalProse>
          <ol className="list-none space-y-gob-5">
            {hitos.map(item => (
              <li key={item.year} className="rounded-gob-md border border-gob-border bg-card p-gob-5">
                <p className="text-gri-body-sm font-medium text-gob-primary">{item.year}</p>
                <h2 className="mt-gob-2 font-heading text-gri-h2 font-medium text-gob-text">{item.title}</h2>
                <p className="mt-gob-2 text-gri-body-sm leading-[1.5] text-gob-text">{item.body}</p>
              </li>
            ))}
          </ol>
          <section>
            <PortalSectionTitle>Fuentes y visitas</PortalSectionTitle>
            <PortalProse>
              El detalle de cada periodo, con imágenes de libros históricos, está en el sitio institucional. El museo
              virtual recorre dos siglos de registros en Chile.
            </PortalProse>
            <ul className="list-none space-y-gob-2">
              <li>
                <a
                  href="https://www.inapi.cl/propiedad-intelectual-e-industrial/para-informarse/historia-de-la-propiedad-industrial"
                  className="text-gob-link font-medium hover:underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver la cronología completa en inapi.cl
                </a>
              </li>
              <li>
                <a
                  href="https://www.inapi.cl/galeria/"
                  className="text-gob-link font-medium hover:underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir el museo virtual de INAPI
                </a>
              </li>
            </ul>
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
