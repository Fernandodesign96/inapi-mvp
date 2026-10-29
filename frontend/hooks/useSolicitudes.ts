'use client'

import { solicitudesForRun } from '@/lib/tramites/mock-data'
import { personaForRun } from '@/lib/tramites/demo-accounts'
import { useTramitesSession } from '@/lib/tramites/use-session'

export function useSolicitudes() {
  const { session, ready } = useTramitesSession()
  const items = solicitudesForRun(session.run)
  return { items, persona: personaForRun(session.run), session, ready }
}
