'use client'

import { useEffect } from 'react'
import { nextAfterAuth } from '@/lib/tramites/entry'
import { goTramites } from '@/lib/tramites/go'
import { useQueryParams } from '@/lib/tramites/use-query'
import { useTramitesSession } from '@/lib/tramites/use-session'

export function SkipIfAuthenticated({ children }: { children: React.ReactNode }) {
  const { session, ready } = useTramitesSession()
  const params = useQueryParams()

  useEffect(() => {
    if (!ready || !session.authenticated) return
    goTramites(nextAfterAuth(params.toString()))
  }, [ready, session.authenticated, params])

  if (!ready) {
    return <p className="p-gob-6 text-gri-body text-muted-foreground">Cargando sesión…</p>
  }

  if (session.authenticated) {
    return (
      <p className="p-gob-6 text-gri-body text-muted-foreground">
        Ya tienes sesión iniciada. Te llevamos a tu trámite…
      </p>
    )
  }

  return <>{children}</>
}
