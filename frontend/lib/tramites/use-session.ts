'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  emptySession,
  readSession,
  signIn,
  signOut,
  type MetodoIngreso,
  type TramitesSession,
} from '@/lib/tramites/session'

export function useTramitesSession() {
  const [session, setSession] = useState<TramitesSession>(emptySession)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const sync = () => {
      setSession(readSession())
      setReady(true)
    }
    sync()
    window.addEventListener('tramites-session', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('tramites-session', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const login = useCallback((metodo: MetodoIngreso, extra?: Partial<TramitesSession>) => {
    signIn({ metodo, ...extra })
  }, [])

  const logout = useCallback(() => {
    signOut()
  }, [])

  return { session, ready, login, logout }
}
