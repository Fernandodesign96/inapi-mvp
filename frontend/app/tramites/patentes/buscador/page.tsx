'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
import { DataTable, Td } from '@/components/tramites/DataTable'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { EmptyState, TramitesMain } from '@/components/tramites/ui-helpers'
import { RESULTADOS_PATENTES } from '@/lib/tramites/mock-data'

export default function BuscadorPatentesPage() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [ran, setRan] = useState(false)
  const results = ran
    ? RESULTADOS_PATENTES.filter(
        r =>
          !q ||
          r.titulo.toLowerCase().includes(q.toLowerCase()) ||
          r.numero.includes(q) ||
          r.solicitante.toLowerCase().includes(q.toLowerCase()),
      )
    : []

  return (
    <TramitesMain>
      <p className="text-gri-body text-gob-text max-w-3xl">
        Busca patentes de invención, modelos de utilidad y diseños industriales. Escribe un número, un título o un nombre.
      </p>
      <form
        className="flex flex-col min-[600px]:flex-row gap-gob-3 min-[600px]:items-end"
        onSubmit={e => {
          e.preventDefault()
          setRan(true)
        }}
      >
        <div className="flex-1 space-y-gob-2">
          <label htmlFor="q" className="flex items-center text-gri-body-sm font-medium">
            Palabra o número
            <HelpTooltip text="Prueba con danza, 202101234 o OMNIdanz." />
          </label>
          <Input id="q" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <Button type="submit" size="form">
          Buscar
        </Button>
      </form>
      <p>
        <Link href="/tramites/patentes/buscador/avanzada" className="text-gob-link underline underline-offset-4">
          Ir a búsqueda avanzada
        </Link>
      </p>
      <div className="flex flex-wrap items-center gap-gob-3 rounded-gob-md border border-gob-border p-gob-4">
        <p className="text-gri-body-sm text-gob-text flex-1">
          Si ingresas con ClaveÚnica, este prototipo no pide un captcha. El botón no te lleva al sitio oficial del Estado.
        </p>
        <ClaveUnicaButton
          className="max-w-xs"
          onClick={() => router.push('/tramites/clave-unica?next=/tramites/patentes/buscador')}
        />
      </div>
      {ran && results.length === 0 && <EmptyState>No hay resultados con estos filtros</EmptyState>}
      {results.length > 0 && (
        <DataTable headers={['Número', 'Tipo', 'Título', 'Solicitante', 'Fecha']} caption="Resultados">
          {results.map(r => (
            <tr key={r.numero}>
              <Td>{r.numero}</Td>
              <Td>{r.tipo}</Td>
              <Td>{r.titulo}</Td>
              <Td>{r.solicitante}</Td>
              <Td>{r.fecha}</Td>
            </tr>
          ))}
        </DataTable>
      )}
    </TramitesMain>
  )
}
