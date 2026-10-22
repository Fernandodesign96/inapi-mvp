'use client'

import { TramitesDashboardHome, TramitesLockedDashboard } from '@/components/tramites/TramitesDashboard'
import { Spinner, TramitesMain } from '@/components/tramites/ui-helpers'
import { useTramitesSession } from '@/lib/tramites/use-session'

export default function TramitesHomePage() {
  const { session, ready } = useTramitesSession()

  if (!ready) {
    return (
      <TramitesMain>
        <Spinner label="Cargando tu sesión" />
      </TramitesMain>
    )
  }

  if (session.authenticated) return <TramitesDashboardHome session={session} />

  return <TramitesLockedDashboard />
}
