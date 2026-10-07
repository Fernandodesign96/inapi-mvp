import { Suspense } from 'react'
import { TramitesShell } from '@/components/tramites/TramitesShell'

export default function TramitesLayout({ children }: { children: React.ReactNode }) {
  return (
    <TramitesShell>
      <Suspense fallback={null}>{children}</Suspense>
    </TramitesShell>
  )
}
