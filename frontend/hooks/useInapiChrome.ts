'use client'

import { useLayoutEffect, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import {
  inferInapiChrome,
  isTramitesHub,
  readInapiChrome,
  subscribeInapiChrome,
  writeInapiChrome,
  type InapiChrome,
} from '@/lib/inapi-chrome'

type ChromeMode = 'commit-portal' | 'commit-tramites' | 'tool' | 'tramites-layout'

function chromeFor(mode: ChromeMode, pathname: string, client: boolean): InapiChrome {
  if (mode === 'commit-portal') return 'portal'
  if (mode === 'commit-tramites') return 'tramites'
  if (mode === 'tramites-layout' && (!client || isTramitesHub(pathname))) return 'tramites'
  if (!client) return inferInapiChrome(pathname)
  return readInapiChrome() ?? inferInapiChrome(pathname)
}

/** `commit` fija el flujo. `tool` conserva el header con el que el usuario llegó. */
export function useInapiChrome(mode: ChromeMode) {
  const pathname = usePathname()
  const chrome = useSyncExternalStore(
    subscribeInapiChrome,
    () => chromeFor(mode, pathname, true),
    () => chromeFor(mode, pathname, false),
  )

  useLayoutEffect(() => {
    if (mode === 'commit-portal') writeInapiChrome('portal')
    else if (mode === 'commit-tramites') writeInapiChrome('tramites')
    else if (mode === 'tramites-layout' && isTramitesHub(pathname)) writeInapiChrome('tramites')
  }, [mode, pathname])

  return chrome
}
