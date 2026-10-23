import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeEssentials } from '@/components/home/HomeEssentials'
import { WhatToProtect } from '@/components/home/WhatToProtect'
import { HomeStats } from '@/components/home/HomeStats'
import { HomeTools } from '@/components/home/HomeTools'
import { HomeNews } from '@/components/home/HomeNews'
import { HomeObservanciaCarousel } from '@/components/portal/HomeObservanciaCarousel'
import { VideoShowcase } from '@/components/story/VideoSpotlight'

export const metadata: Metadata = {
  title: 'INAPI — Impulsa el valor de tus ideas con el registro oficial',
  description:
    'INAPI registra marcas, patentes, diseños y otros derechos de propiedad industrial en Chile. Infórmate en este portal y presenta con ClaveÚnica en el Sitio de Trámites.',
}

export default function HomePage() {
  return (
    <PortalShell active="home" variant="home" hero={<HomeHero />}>
      <HomeEssentials />
      <WhatToProtect />
      <HomeTools />
      <VideoShowcase
        video="patenteVsMarca"
        title="¿Marca o patente? Descubre la diferencia"
        lead="Este video explica qué protege cada derecho y cuándo te conviene pedir los dos."
        tone="paper"
      />
      <HomeStats />
      <HomeNews />
      <div className="story-night">
        <HomeObservanciaCarousel />
      </div>
    </PortalShell>
  )
}
