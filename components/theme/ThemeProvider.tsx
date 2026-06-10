'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react'

export type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

const STORAGE_KEY = 'gri-theme'

interface ThemeSnapshot {
  theme: Theme
  resolvedTheme: ResolvedTheme
}

interface ThemeContextValue extends ThemeSnapshot {
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const SERVER_SNAPSHOT: ThemeSnapshot = {
  theme: 'system',
  resolvedTheme: 'light',
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const listeners = new Set<() => void>()
let snapshotVersion = 0
let clientCache: { version: number; snapshot: ThemeSnapshot } | null = null

function computeSnapshot(): ThemeSnapshot {
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  const theme: Theme =
    stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolvedTheme: ResolvedTheme =
    theme === 'system' ? (systemDark ? 'dark' : 'light') : theme
  return { theme, resolvedTheme }
}

function getClientSnapshot(): ThemeSnapshot {
  if (!clientCache || clientCache.version !== snapshotVersion) {
    clientCache = { version: snapshotVersion, snapshot: computeSnapshot() }
  }
  return clientCache.snapshot
}

function getServerSnapshot(): ThemeSnapshot {
  return SERVER_SNAPSHOT
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  const onMediaChange = () => {
    snapshotVersion++
    listener()
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      snapshotVersion++
      listener()
    }
  }

  media.addEventListener('change', onMediaChange)
  window.addEventListener('storage', onStorage)

  return () => {
    listeners.delete(listener)
    media.removeEventListener('change', onMediaChange)
    window.removeEventListener('storage', onStorage)
  }
}

function notifyThemeChange() {
  snapshotVersion++
  listeners.forEach((listener) => listener())
}

function applyThemeClass(resolved: ResolvedTheme) {
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  )

  useEffect(() => {
    applyThemeClass(resolvedTheme)
  }, [resolvedTheme])

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next)
    const resolved: ResolvedTheme =
      next === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : next
    applyThemeClass(resolved)
    notifyThemeChange()
  }, [])

  const toggleTheme = useCallback(() => {
    const current = getClientSnapshot()
    setTheme(current.resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [setTheme])

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider')
  }
  return ctx
}
