'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { TramitesDashboardHome, TramitesLockedDashboard } from '@/components/tramites/TramitesDashboard'
import { nextAfterAuth } from '@/lib/tramites/entry'
import { goTramites } from '@/lib/tramites/go'
import { useTramitesSession } from '@/lib/tramites/use-session'

export default function TramitesHomePage() {
  const { session, ready } = useTramitesSession()
  const params = useSearchParams()

  useEffect(() => {
    if (!ready || !session.authenticated) return
    const next = nextAfterAuth(params.toString())
    if (next !== '/tramites') goTramites(next)
  }, [ready, session.authenticated, params])

  if (!ready) {
    return <div className="min-h-svh bg-[var(--story-mist)]" aria-busy="true" aria-label="Cargando tu sesión" />
  }

  if (session.authenticated) return <TramitesDashboardHome session={session} />

  return <TramitesLockedDashboard />
}
