'use client'

import { Button } from '@/components/ui/button'
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
    <div className="min-h-screen bg-[#f4f6f8] text-gob-text">
      <header className="bg-[#003DA5] text-white px-gob-6 py-gob-4">
        <p className="text-gri-body-sm font-medium">Tesorería General de la República</p>
        <h1 className="font-heading text-xl">Pago de tasas INAPI</h1>
      </header>
      <main className="mx-auto max-w-3xl space-y-gob-5 p-gob-6">
        <section className="rounded-gob-lg border border-gob-border bg-white p-gob-5 space-y-gob-3">
          <h2 className="font-heading text-lg font-medium">Resumen</h2>
          <p>
            Convenio: <strong>Instituto Nacional de Propiedad Industrial</strong>
          </p>
          <p>
            Solicitud: <strong>{numero || '—'}</strong>
          </p>
          {tipo ? <p className="text-gri-body-sm">{tipo}</p> : null}
          <p className="font-heading text-4xl font-bold text-gob-accent">${CERT_PRICE_CLP}</p>
        </section>
        <div className="flex flex-col gap-gob-3">
          <Button size="form" className="bg-gob-primary hover:bg-gob-primary-dark" onClick={() => goTramites(back)}>
            Confirmar pago
          </Button>
          <Button variant="outline" size="form" onClick={() => goTramites(back)}>
            Volver sin pagar
          </Button>
        </div>
      </main>
    </div>
  )
}
