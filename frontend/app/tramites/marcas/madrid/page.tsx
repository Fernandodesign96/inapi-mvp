'use client'

import { AutoExternalRedirect } from '@/components/tramites/part2-forms'
import { MadridRedirectScreen } from '@/components/tramites/part2-screens'
import { URLS_EXTERNAS } from '@/lib/tramites/catalogs'

export default function Page() {
  return (
    <>
      <AutoExternalRedirect href={URLS_EXTERNAS.madrid} />
      <MadridRedirectScreen />
    </>
  )
}
