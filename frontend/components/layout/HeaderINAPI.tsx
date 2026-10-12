'use client'

import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { TramitesHeader } from '@/components/tramites/TramitesHeader'

export function HeaderINAPI() {
  return (
    <div className="home-atmosphere">
      <TramitesHeader />
      <div className="relative z-[1] mx-auto max-w-[1600px] space-y-gob-4 px-gob-4 pb-gob-6 min-[600px]:px-gob-5 min-[905px]:px-gob-8">
        <Breadcrumbs tone="inverse" homeHref="/tramites" items={[{ label: 'Solicitud de marca' }]} />
        <div className="home-chrome-sub flex w-full items-center justify-between gap-x-gob-4 px-gob-5 py-gob-3 min-[905px]:px-gob-6">
          <div className="flex min-w-0 items-center gap-gob-3">
            <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-[#FFBE5C]" aria-hidden />
            <p className="truncate text-gri-body-sm font-medium text-gob-text-inverse">
              Proceso de solicitud de marca
            </p>
          </div>
          <p className="hidden shrink-0 text-gri-body-xs text-gob-text-inverse/80 min-[700px]:block">
            Formulario GRI
          </p>
        </div>
      </div>
    </div>
  )
}
