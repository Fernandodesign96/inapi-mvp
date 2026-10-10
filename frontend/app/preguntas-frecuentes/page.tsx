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

const bloques = [
  {
    title: '¿Qué cubre INAPI y qué no?',
    paragraphs: [
      'INAPI registra y administra la propiedad industrial: marcas, patentes, modelos de utilidad, diseños, esquemas de trazado e indicaciones geográficas o denominaciones de origen, según la Ley N.° 19.039.',
      'El derecho de autor (libros, música, software como obra, entre otros) lo lleva el Departamento de Derechos Intelectuales, no este Instituto.',
    ],
  },
  {
    title: '¿Qué es una marca y cuánto dura?',
    paragraphs: [
      'Es un signo que distingue tus productos o servicios de los de otras personas. Debe ser distintivo: el público tiene que poder reconocerlo.',
      'La protección vale en Chile y dura diez años. Puedes renovarla por periodos iguales, pagando la tasa a tiempo.',
    ],
  },
  {
    title: '¿Qué se necesita para una patente?',
    paragraphs: [
      'El Estado concede un derecho exclusivo si la invención es nueva, tiene nivel inventivo y puede usarse en la industria.',
      'La protección es nacional y dura 20 años desde el día en que presentas la solicitud. Nadie puede fabricar, vender o usar esa invención sin tu permiso mientras el derecho esté vigente.',
    ],
  },
  {
    title: '¿Qué diferencia hay entre indicación geográfica y denominación de origen?',
    paragraphs: [
      'Ambas ligan un producto a un territorio y protegen su fama frente a usos desleales.',
      'La denominación de origen, además, considera factores humanos —oficios, recetas, formas de elaborar— que dan carácter al producto.',
    ],
  },
  {
    title: '¿Por qué existen estas leyes?',
    paragraphs: [
      'Protegen a quien crea y, al mismo tiempo, permiten que la sociedad acceda a esas creaciones con reglas claras.',
      'También premian la innovación y frenan prácticas desleales. El Convenio de París (1883) y el Convenio de Berna (1886) sentaron esa base; la OMPI administra ambos tratados.',
    ],
  },
]

export default function PreguntasFrecuentesPage() {
  return (
    <PortalShell {...portalShellProps('/preguntas-frecuentes')}>
      <ContainerGRI size="portal">
        <PortalMain>
          {bloques.map(bloque => (
            <section key={bloque.title}>
              <PortalSectionTitle>{bloque.title}</PortalSectionTitle>
              {bloque.paragraphs.map(texto => (
                <PortalProse key={texto}>{texto}</PortalProse>
              ))}
            </section>
          ))}
          <p>
            <a
              href="https://www.inapi.cl/preguntas-frecuentes/propiedad-industrial"
              className="text-gob-link font-medium hover:underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver más preguntas sobre marcas, patentes, PCT y Sello de Origen en inapi.cl
            </a>
          </p>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
