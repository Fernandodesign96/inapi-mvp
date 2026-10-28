'use client'

import { Suspense } from 'react'
import { TramitesScreenChrome } from '@/components/tramites/TramitesScreenChrome'

export function TramitesContextRail() {
  return (
    <Suspense fallback={null}>
      <TramitesScreenChrome />
    </Suspense>
  )
}
