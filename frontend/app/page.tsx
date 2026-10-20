import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { HeroSection } from '@/components/home/HeroSection'
import { WhatToProtect } from '@/components/home/WhatToProtect'
import { QuickAccess } from '@/components/home/QuickAccess'
import { StatsSection } from '@/components/home/StatsSection'
import { NewsSection } from '@/components/home/NewsSection'
import { HomePromoBanners } from '@/components/home/HomePromoBanners'
import { HomeObservanciaCarousel } from '@/components/portal/HomeObservanciaCarousel'

export const metadata: Metadata = {
  title: 'INAPI — Impulsa el valor de tus ideas con el registro oficial',
  description:
    'INAPI registra marcas, patentes, diseños y otros derechos de propiedad industrial en Chile. Infórmate en este portal y presenta con ClaveÚnica en el Sitio de Trámites.',
}

export default function HomePage() {
  return (
    <PortalShell active="home" variant="home">
      <HeroSection />
      <div className="relative z-[1] bg-background">
        <WhatToProtect />
        <QuickAccess />
      </div>
      <StatsSection />
      <NewsSection />
      <HomePromoBanners />
      <HomeObservanciaCarousel />
    </PortalShell>
  )
}
