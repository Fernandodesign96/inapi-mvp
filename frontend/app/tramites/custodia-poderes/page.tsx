'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { readDashboardPrefs } from '@/lib/tramites/dashboard'

export default function Page() {
  const router = useRouter()
  useEffect(() => {
    const scope = readDashboardPrefs().scope
    router.replace(scope === 'patentes' ? '/tramites/patentes/tramites?tipo=poderes' : '/tramites/marcas/tramites?tipo=poderes')
  }, [router])
  return null
}
