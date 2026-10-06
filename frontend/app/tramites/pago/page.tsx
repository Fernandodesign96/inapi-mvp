'use client'

import { Button } from '@/components/ui/button'
import { TramitesMain } from '@/components/tramites/ui-helpers'
import { goTramites } from '@/lib/tramites/go'
import { CERT_PRICE_CLP } from '@/lib/tramites/mock-data'
import { useQueryParams } from '@/lib/tramites/use-query'

export default function PagoPage() {
  const q = useQueryParams()
  const origen = q.get('origen') === 'patentes' ? 'patentes' : 'marcas'
  const numero = q.get('numero') ?? ''
  const tipo = q.get('tipo') ?? ''
  const back = `/tramites/${origen}/certificados?estado=espera`

  return (
    <TramitesMain>
      <div className="max-w-lg rounded-gob-lg border border-gob-border bg-card p-gob-6 space-y-gob-4">
        <p className="rounded-gob-md bg-gob-warning-bg border border-gob-warning/30 px-gob-4 py-gob-3 text-gri-body-sm">
          Simulación de Tesorería General de la República. Este no es el sitio real de la TGR.
        </p>
        <p className="text-gri-body text-gob-text">
          Convenio: Instituto Nacional de Propiedad Industrial. Monto: ${CERT_PRICE_CLP}. Solicitud {numero}.
        </p>
        {tipo && <p className="text-gri-body-sm text-muted-foreground">{tipo}</p>}
        <div className="flex flex-col gap-gob-3">
          <Button size="form" onClick={() => goTramites(back)}>
            Pagar ${CERT_PRICE_CLP} (simulación)
          </Button>
          <Button variant="outline" size="form" onClick={() => goTramites(back)}>
            Volver sin pagar
          </Button>
        </div>
      </div>
    </TramitesMain>
  )
}
