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
  title: 'INAPI — Registra y protege tu marca o patente en Chile',
  description:
    'Bienvenido al portal web de INAPI. Busca, solicita y protege tus ideas e invenciones en línea. Administra y sigue tus trámites de propiedad intelectual en Chile.',
}

export default function HomePage() {
  return (
    <PortalShell active="home" variant="home">
      <HeroSection />
      <WhatToProtect />
      <div className="portal-ambient-hero bg-inapi-portal-hero">
        <QuickAccess />
        <StatsSection />
      </div>
      <NewsSection />
      <HomePromoBanners />
      <HomeObservanciaCarousel />
    </PortalShell>
  )
}
