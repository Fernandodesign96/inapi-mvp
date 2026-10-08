export type InapiChrome = 'portal' | 'tramites'

export const INAPI_CHROME_KEY = 'inapi-chrome'

const TRAMITES_HUBS = new Set([
  '/tramites',
  '/tramites/ingresar',
  '/tramites/auth',
  '/tramites/registrarse',
  '/tramites/clave-unica',
])

export function isTramitesHub(pathname: string) {
  return TRAMITES_HUBS.has(pathname)
}

export function readInapiChrome(): InapiChrome | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = sessionStorage.getItem(INAPI_CHROME_KEY)
    if (stored === 'portal' || stored === 'tramites') return stored
    const cookie = document.cookie.match(/(?:^|; )inapi-chrome=(portal|tramites)/)?.[1]
    if (cookie === 'portal' || cookie === 'tramites') return cookie
  } catch {
    /* ignore */
  }
  return null
}

export const INAPI_CHROME_EVENT = 'inapi-chrome-change'

export function writeInapiChrome(chrome: InapiChrome) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(INAPI_CHROME_KEY, chrome)
    document.cookie = `inapi-chrome=${chrome}; path=/; SameSite=Lax`
    window.dispatchEvent(new Event(INAPI_CHROME_EVENT))
  } catch {
    /* ignore */
  }
}

export function subscribeInapiChrome(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => undefined
  window.addEventListener(INAPI_CHROME_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(INAPI_CHROME_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

export function inferInapiChrome(pathname: string): InapiChrome {
  return pathname.startsWith('/tramites') ? 'tramites' : 'portal'
}
