import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalMain } from '@/components/portal/content'

export const metadata: Metadata = {
  title: 'Glosario de propiedad industrial — INAPI',
  description:
    'Definiciones de términos clave sobre marcas, patentes, indicaciones geográficas y trámites en INAPI.',
}

const terminos = [
  {
    term: 'Marca comercial',
    definition:
      'Signo que distingue en el mercado productos, servicios o establecimientos industriales o comerciales de otros de la misma clase.',
  },
  {
    term: 'Patente de invención',
    definition:
      'Derecho exclusivo que otorga el Estado para proteger una invención nueva, con nivel inventivo y aplicable industrialmente.',
  },
  {
    term: 'Modelo de utilidad',
    definition:
      'Protege instrumentos, aparatos o dispositivos con una configuración o disposición que les otorga un beneficio o efecto técnico.',
  },
  {
    term: 'Indicación geográfica (I.G.)',
    definition:
      'Identifica un producto como originario de una región, atribuyéndole cualidades o reputación derivadas de ese origen.',
  },
  {
    term: 'Denominación de origen (D.O.)',
    definition:
      'Identifica un producto como originario de una región, con cualidades atribuibles a factores geográficos y humanos de ese lugar.',
  },
  {
    term: 'Examen de fondo',
    definition:
      'Revisión que realiza INAPI para verificar si una solicitud cumple los requisitos legales de registrabilidad.',
  },
  {
    term: 'Clase de Niza',
    definition:
      'Categoría de la Nomenclatura de Clasificación de Niza (NCL) que agrupa productos o servicios similares para efectos del registro de marcas.',
  },
  {
    term: 'ClaveÚnica',
    definition:
      'Clave de identificación digital del Estado de Chile que permite iniciar sesión en los trámites en línea de INAPI y otros servicios públicos.',
  },
]

export default function GlosarioPage() {
  return (
    <PortalShell variant="page" pageTitle="Glosario de propiedad industrial">
      <ContainerGRI size="portal">
        <PortalMain>
          <dl className="space-y-gob-5 max-w-3xl">
            {terminos.map(({ term, definition }) => (
              <div key={term}>
                <dt className="font-bold text-gob-text text-gri-body mb-1.5">{term}</dt>
                <dd className="text-gri-body-sm text-muted-foreground leading-relaxed">{definition}</dd>
              </div>
            ))}
          </dl>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
