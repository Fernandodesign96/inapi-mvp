import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalMain, PortalProse, PortalSectionTitle } from '@/components/portal/content'

export const metadata: Metadata = {
  title: 'Observancia — INAPI',
  description:
    'Información sobre piratería, falsificación e infracciones a derechos de propiedad intelectual e industrial.',
}

export default function ObservanciaPage() {
  return (
    <PortalShell variant="page" pageTitle="Observancia">
      <ContainerGRI size="portal">
        <PortalMain>
          <section>
            <PortalSectionTitle>¿Qué es la piratería?</PortalSectionTitle>
            <PortalProse>
              El Acuerdo sobre los Derechos de Propiedad Intelectual relacionados con el Comercio (ADPIC) define las{' '}
              <strong className="text-gob-text">mercancías pirata</strong> como copias hechas sin el consentimiento del
              titular del derecho de autor, cuando esa copia habría infringido el derecho de autor en el país donde se
              importa.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>¿Qué es la falsificación?</PortalSectionTitle>
            <PortalProse>
              El ADPIC define las <strong className="text-gob-text">mercancías falsificadas</strong> como aquellas que
              llevan, sin autorización, una marca idéntica o similar a una marca válidamente registrada, de modo que
              infringen los derechos del titular de esa marca.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>Infracciones a otros derechos de propiedad intelectual</PortalSectionTitle>
            <PortalProse className="mb-gob-3">
              Además de marcas, derechos de autor y derechos conexos, se pueden infringir patentes, modelos de utilidad,
              esquemas de trazado de circuitos integrados, diseños industriales, indicaciones geográficas y
              denominaciones de origen. El titular puede ejercer acciones penales o civiles ante estas infracciones.
            </PortalProse>
            <PortalProse>
              La infracción a derechos de propiedad industrial se sanciona con multa. La infracción a derechos de autor y
              derechos conexos se sanciona con multa y, en casos determinados, con prisión o reclusión.
            </PortalProse>
            <p className="text-gri-body-xs text-muted-foreground mt-gob-5">
              Fuente: Acuerdo sobre los ADPIC, Organización Mundial del Comercio.
            </p>
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
