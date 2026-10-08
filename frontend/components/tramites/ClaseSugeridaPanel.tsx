'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { selectClass } from '@/components/tramites/ui-helpers'
import { useClaseSugerida } from '@/hooks/useClaseSugerida'
import { NIZA_CLASES } from '@/lib/tramites/mock-data'
import { cn } from '@/lib/utils'

export function ClaseSugeridaPanel({
  selected,
  onToggleClass,
}: {
  selected: number[]
  onToggleClass: (n: number) => void
}) {
  const { query, setQuery, sugerencias } = useClaseSugerida()
  const [manual, setManual] = useState('')
  const [buscado, setBuscado] = useState(false)

  const grouped = useMemo(() => {
    const map = new Map<number, typeof sugerencias>()
    for (const item of sugerencias) {
      const list = map.get(item.clase) ?? []
      list.push(item)
      map.set(item.clase, list)
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0])
  }, [sugerencias])

  return (
    <div className="space-y-gob-6">
      <section className="space-y-gob-2 rounded-gob-md border border-gob-primary/20 bg-gob-primary/5 p-gob-4">
        <label htmlFor="prod" className="flex items-center text-gri-body font-medium">
          Producto o servicio de tu marca
          <HelpTooltip text="Escribe lo que vas a vender o prestar. Te sugerimos las clases de Niza más cercanas." />
        </label>
        <p className="text-gri-body-sm text-gob-text">
          Describe con tus palabras lo que ofreces. Ejemplo: «software para gestionar certificados» o «ropa deportiva».
        </p>
        <div className="flex flex-wrap gap-gob-3">
          <Input
            id="prod"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ejemplo: software para gestión de certificados digitales"
            className="h-11 flex-1 min-w-[16rem]"
          />
          <Button type="button" size="form" disabled={query.trim().length < 2} onClick={() => setBuscado(true)}>
            <Search className="size-4" aria-hidden />
            Sugerir clases
          </Button>
        </div>
      </section>

      {buscado && grouped.length > 0 ? (
        <ul className="space-y-gob-3">
          {grouped.map(([clase, items]) => {
            const meta = NIZA_CLASES.find(c => c.n === clase)
            const on = selected.includes(clase)
            const tipo = clase <= 34 ? 'Producto' : 'Servicio'
            return (
              <li key={clase}>
                <label
                  className={cn(
                    'flex cursor-pointer gap-gob-3 rounded-gob-md border p-gob-4 transition-all',
                    on ? 'border-gob-primary bg-gob-primary/5 shadow-elevation-02' : 'border-gob-border hover:border-gob-primary/50',
                  )}
                >
                  <input type="checkbox" className="mt-1" checked={on} onChange={() => onToggleClass(clase)} />
                  <span className="space-y-1">
                    <span className="flex flex-wrap items-center gap-gob-2">
                      <span className="rounded bg-gob-primary px-2 py-0.5 text-gri-body-xs font-medium text-white">Clase {clase}</span>
                      <span className="font-medium">{meta?.titulo}</span>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-gri-body-xs">{tipo}</span>
                    </span>
                    <span className="block text-gri-body-sm">{items.map(i => i.descripcion).join('; ')}</span>
                  </span>
                </label>
              </li>
            )
          })}
        </ul>
      ) : null}

      <section className="space-y-gob-2 rounded-gob-md border border-gob-border p-gob-4">
        <label htmlFor="manual" className="flex items-center text-gri-body font-medium">
          ¿Ya sabes tu clase? Elígela por su número
          <HelpTooltip text="Las clases 1 a 34 son productos. Las clases 35 a 45 son servicios." />
        </label>
        <p className="text-gri-body-sm text-gob-text">Si ya conoces el número de Niza, selecciónalo aquí. Cada clase se cobra aparte.</p>
        <select
          id="manual"
          className={selectClass()}
          value={manual}
          onChange={e => {
            const n = Number(e.target.value)
            setManual('')
            if (n) onToggleClass(n)
          }}
        >
          <option value="">Elige una clase</option>
          {NIZA_CLASES.map(c => (
            <option key={c.n} value={c.n}>
              Clase {c.n} · {c.titulo}
            </option>
          ))}
        </select>
      </section>

      <section>
        <h3 className="font-heading text-gri-body font-medium">{selected.length} clases elegidas</h3>
        {selected.length === 0 ? (
          <p className="text-gri-body-sm text-muted-foreground">Aún no has elegido ninguna clase.</p>
        ) : (
          <ul className="mt-3 grid gap-gob-3 min-[600px]:grid-cols-2">
            {selected.map(n => (
              <li
                key={n}
                className="flex items-start justify-between gap-gob-3 rounded-gob-lg border border-gob-primary/30 bg-gob-primary/5 p-gob-4 shadow-elevation-01"
              >
                <span>
                  <span className="block font-heading font-medium">Clase {n}</span>
                  <span className="text-gri-body-sm">{NIZA_CLASES.find(c => c.n === n)?.titulo}</span>
                </span>
                <button type="button" className="rounded-full p-1 hover:bg-white" onClick={() => onToggleClass(n)} aria-label={`Quitar clase ${n}`}>
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
