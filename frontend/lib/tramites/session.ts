'use client'

export const TRAMITES_SESSION_KEY = 'inapi-tramites-session'

export type MetodoIngreso = 'clave-unica' | 'clave-inapi'

export type TramitesSession = {
  authenticated: boolean
  run: string
  nombre: string
  email: string
  metodo: MetodoIngreso
  registered: boolean
}

export const DEMO_USER: Omit<TramitesSession, 'authenticated' | 'metodo'> = {
  run: '18618492-0',
  nombre: 'Fernando Ignacio Arriagada Castillo',
  email: 'fernando.arriagada@example.cl',
  registered: true,
}

export function emptySession(): TramitesSession {
  return {
    authenticated: false,
    run: '',
    nombre: '',
    email: '',
    metodo: 'clave-inapi',
    registered: false,
  }
}

export function readSession(): TramitesSession {
  if (typeof window === 'undefined') return emptySession()
  try {
    const raw = window.localStorage.getItem(TRAMITES_SESSION_KEY)
    if (!raw) return emptySession()
    return { ...emptySession(), ...JSON.parse(raw) }
  } catch {
    return emptySession()
  }
}

export function writeSession(session: TramitesSession) {
  window.localStorage.setItem(TRAMITES_SESSION_KEY, JSON.stringify(session))
  window.dispatchEvent(new Event('tramites-session'))
}

export function signIn(partial: Partial<TramitesSession> & { metodo: MetodoIngreso }) {
  const current = readSession()
  writeSession({
    ...current,
    ...DEMO_USER,
    ...partial,
    authenticated: true,
    registered: true,
  })
}

export function signOut() {
  const current = readSession()
  writeSession({ ...current, authenticated: false })
}

export function markRegistered() {
  const current = readSession()
  writeSession({ ...current, ...DEMO_USER, authenticated: true, metodo: 'clave-unica' })
}
