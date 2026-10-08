'use client'

import Link from 'next/link'
import { TramitesMain } from '@/components/tramites/ui-helpers'
import { useQueryParams } from '@/lib/tramites/use-query'

export default function ProximamentePage() {
  const servicio = useQueryParams().get('servicio') ?? 'este servicio'

  return (
    <TramitesMain>
      <div className="max-w-lg space-y-gob-4 rounded-gob-lg border border-gob-border bg-card p-gob-6">
        <p className="text-gri-body text-gob-text leading-relaxed">
          Disponible en una próxima entrega. El acceso «{servicio}» está en el menú, pero el flujo aún no está habilitado.
        </p>
        <Link href="/tramites" className="text-gob-link underline underline-offset-4">
          Volver a trámites
        </Link>
      </div>
    </TramitesMain>
  )
}
