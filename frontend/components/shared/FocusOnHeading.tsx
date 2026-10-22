'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Moves keyboard focus to main after a route change, without painting a ring on the h1. */
export function FocusOnHeading() {
  const pathname = usePathname()
  useEffect(() => {
    const main = document.getElementById('contenido-principal') as HTMLElement | null
    if (!main) return
    if (!main.hasAttribute('tabindex')) main.tabIndex = -1
    main.focus({ preventScroll: true })
  }, [pathname])
  return null
}
