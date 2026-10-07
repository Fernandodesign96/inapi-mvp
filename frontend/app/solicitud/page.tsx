'use client'

import { useEffect } from 'react'
import { goTramites } from '@/lib/tramites/go'

export default function SolicitudRedirectPage() {
  useEffect(() => {
    goTramites('/tramites/solicitudmarca')
  }, [])

  return (
    <p className="p-gob-6 text-gri-body text-muted-foreground">
      Te llevamos a la solicitud de marca…
    </p>
  )
}
