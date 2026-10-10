import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { GlossaryList } from '@/components/portal/GlossaryList'
import { PortalMain, PortalProse } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/glosario')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Glosario'} — INAPI`,
  description: meta?.description,
}

export default function GlosarioPage() {
  return (
    <PortalShell {...portalShellProps('/glosario')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalProse>
            Estas definiciones corresponden al glosario institucional de INAPI (más de 170 términos). Explican el
            sentido oficial de cada expresión; no reemplazan el texto legal.
          </PortalProse>
          <GlossaryList />
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
