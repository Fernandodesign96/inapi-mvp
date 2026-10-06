'use client'

import { useEffect } from 'react'
import { goTramites } from '@/lib/tramites/go'

export default function IngresarRedirectPage() {
  useEffect(() => {
    goTramites('/tramites/auth')
  }, [])

  return (
    <p className="p-gob-6 text-gri-body text-muted-foreground">
      Te llevamos al inicio de sesión…
    </p>
  )
}
