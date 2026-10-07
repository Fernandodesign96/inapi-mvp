'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTramitesSession } from '@/lib/tramites/use-session'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, ready } = useTramitesSession()
  const router = useRouter()

  useEffect(() => {
    if (ready && !session.authenticated) {
      router.replace('/tramites/ingresar')
    }
  }, [ready, session.authenticated, router])

  if (!ready || !session.authenticated) {
    return (
      <div className="mx-auto max-w-[1140px] px-gob-4 py-gob-8 text-gri-body text-muted-foreground">
        {ready ? 'Debes ingresar para continuar.' : 'Cargando sesión…'}
      </div>
    )
  }

  return <>{children}</>
}
