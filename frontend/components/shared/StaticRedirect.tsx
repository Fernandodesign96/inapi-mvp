'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function StaticRedirect({ href }: { href: string }) {
  const router = useRouter()
  useEffect(() => {
    router.replace(href)
  }, [href, router])
  return (
    <p className="p-gob-6 text-gri-body text-gob-text" role="status">
      Redirigiendo…
    </p>
  )
}
