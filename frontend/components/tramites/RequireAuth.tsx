'use client'

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { loginHref } from '@/lib/tramites/entry'
import { useTramitesSession } from '@/lib/tramites/use-session'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, ready } = useTramitesSession()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (ready && !session.authenticated) {
      const qs = searchParams.toString()
      router.replace(loginHref(qs ? `${pathname}?${qs}` : pathname))
    }
  }, [ready, session.authenticated, router, pathname, searchParams])

  if (!ready || !session.authenticated) {
    return <div className="min-h-svh bg-[var(--story-mist)]" aria-busy={!ready} aria-label={ready ? 'Redirigiendo al inicio de sesión' : 'Cargando sesión'} />
  }

  return <>{children}</>
}
