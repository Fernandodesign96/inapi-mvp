'use client'

import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable, Td } from '@/components/tramites/DataTable'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { ServicePanel, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import coberturas from '@/data/coberturas.json'
import { LEGAL_CLASIFICADOR } from '@/lib/tramites/legal'
import { NIZA_CLASES } from '@/lib/tramites/mock-data'
import type { Cobertura } from '@/lib/types'
import { URLS_EXTERNAS } from '@/lib/tramites/catalogs'
import { cn } from '@/lib/utils'

const fuse = new Fuse(coberturas as Cobertura[], {
  keys: [
    { name: 'descripcion', weight: 0.7 },
    { name: 'palabrasClave', weight: 0.3 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
})

function pageWindow(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current, current - 1, current + 1, 2, 3, 4, 5])
  return [...pages].filter(p => p >= 1 && p <= total).sort((a, b) => a - b)
}

export function ClasificadorNizaScreen() {
  const [palabra, setPalabra] = useState('')
  const [clase, setClase] = useState('')
  const [buscado, setBuscado] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [elegidas, setElegidas] = useState<number[]>([])
  const pageSizeNum = pageSize

  const resultados = useMemo(() => {
    if (!buscado) return []
    const term = palabra.trim()
    const claseN = Number(clase)
    let items: Cobertura[] = term.length >= 2 ? fuse.search(term).map(r => r.item) : (coberturas as Cobertura[])
    if (claseN) items = items.filter(i => i.clase === claseN)
    const seen = new Set<string>()
    return items.filter(i => {
      const key = `${i.clase}-${i.descripcion}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [buscado, palabra, clase])

  const slice = resultados.slice((page - 1) * pageSizeNum, page * pageSizeNum)
  const pages = Math.max(1, Math.ceil(resultados.length / pageSizeNum))

  const toggle = (n: number) => {
    setElegidas(prev => (prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n].sort((a, b) => a - b)))
  }

  const limpiar = () => {
    setPalabra('')
    setClase('')
    setBuscado(false)
    setPage(1)
  }

  return (
    <RequireAuth>
      <TramitesMain>
        <ServicePanel title="Buscador de productos y servicios" domain="marcas">
          <p className="whitespace-pre-line text-gri-body leading-relaxed text-gob-text">{LEGAL_CLASIFICADOR}</p>
          <p className="text-gri-body-sm text-gob-text">
            Escribe el producto o servicio con tus palabras. El buscador sugiere la clase de Niza más cercana para que la
            uses en tu solicitud.
          </p>
          <fieldset className="space-y-gob-4 rounded-gob-lg border border-gob-primary/25 bg-gob-primary/5 p-gob-5">
            <legend className="px-gob-2 font-heading text-gri-body font-medium">Filtros de búsqueda</legend>
            <div className="grid gap-gob-5 min-[800px]:grid-cols-2">
              <div className="space-y-gob-2">
                <label htmlFor="palabra" className="flex items-center text-gri-body font-medium">
                  Producto o servicio
                  <HelpTooltip text="Ejemplo: software para gestión de certificados digitales, ropa deportiva, restaurante." />
                </label>
                <p className="text-gri-body-sm">Describe lo que vas a vender u ofrecer. No hace falta usar el término oficial.</p>
                <Input
                  id="palabra"
                  value={palabra}
                  onChange={e => setPalabra(e.target.value)}
                  placeholder="Ejemplo: software para gestión de certificados digitales"
                  className="h-11"
                />
              </div>
              <div className="space-y-gob-2">
                <label htmlFor="clase" className="flex items-center text-gri-body font-medium">
                  ¿Ya sabes tu clase? Elígela por su número
                  <HelpTooltip text="Las clases 1 a 34 cubren productos. Las clases 35 a 45 cubren servicios. Cada clase se cobra aparte." />
                </label>
                <p className="text-gri-body-sm">Si ya conoces el número, úsalo para acotar los resultados.</p>
                <select id="clase" className={selectClass()} value={clase} onChange={e => setClase(e.target.value)}>
                  <option value="">Todas las clases</option>
                  {NIZA_CLASES.map(c => (
                    <option key={c.n} value={c.n}>
                      Clase {c.n} · {c.titulo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-gob-3">
              <Button
                size="form"
                disabled={palabra.trim().length < 2 && !clase}
                onClick={() => {
                  setBuscado(true)
                  setPage(1)
                }}
              >
                <Search className="size-4" aria-hidden />
                Buscar
              </Button>
              <Button size="form" variant="secondary" onClick={limpiar}>
                Limpiar
              </Button>
            </div>
          </fieldset>

          <div className="space-y-gob-3">
            <h3 className="font-heading text-xl font-medium">Resultados</h3>
            <div className="flex flex-wrap items-center justify-between gap-gob-3">
              <label className="flex items-center gap-gob-2 text-gri-body-sm">
                Mostrar
                <select
                  className={cn(selectClass(), 'w-24')}
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value))
                    setPage(1)
                  }}
                >
                  {[10, 25, 50].map(n => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
                filas por página
              </label>
            </div>
            <DataTable headers={['Clase', 'Descripción', 'Tipo', 'Acción']}>
              {slice.length === 0 ? (
                <tr>
                  <td className="px-gob-4 py-gob-6 text-center text-muted-foreground" colSpan={4}>
                    {buscado ? 'No hay registros para mostrar' : 'Escribe un producto o servicio y pulsa Buscar'}
                  </td>
                </tr>
              ) : (
                slice.map(r => (
                  <tr key={`${r.clase}-${r.descripcion}`}>
                    <Td>
                      <span className="inline-flex rounded bg-gob-primary px-2 py-0.5 text-gri-body-xs font-medium text-white">
                        Clase {r.clase}
                      </span>
                    </Td>
                    <Td>{r.descripcion}</Td>
                    <Td>{r.clase <= 34 ? 'Producto' : 'Servicio'}</Td>
                    <Td>
                      <Button type="button" size="sm" variant={elegidas.includes(r.clase) ? 'secondary' : 'outline'} onClick={() => toggle(r.clase)}>
                        {elegidas.includes(r.clase) ? 'Elegida' : 'Elegir clase'}
                      </Button>
                    </Td>
                  </tr>
                ))
              )}
            </DataTable>
            <p className="text-gri-body-sm text-muted-foreground">
              Mostrando {resultados.length === 0 ? 0 : (page - 1) * pageSizeNum + 1} a {Math.min(page * pageSizeNum, resultados.length)} de{' '}
              {resultados.length} registros
            </p>
            <nav className="flex flex-wrap items-center gap-2" aria-label="Paginación">
              <button type="button" className="min-h-11 px-3 disabled:opacity-40" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                ‹ Anterior
              </button>
              {pageWindow(page, pages).map(n => (
                <button
                  key={n}
                  type="button"
                  className={cn('min-h-11 min-w-11 rounded-gob-md px-3', n === page && 'bg-gob-primary text-white')}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button type="button" className="min-h-11 px-3 disabled:opacity-40" disabled={page >= pages} onClick={() => setPage(p => p + 1)}>
                Siguiente ›
              </button>
            </nav>
          </div>

          <section className="space-y-gob-3">
            <h3 className="font-heading text-gri-body font-medium">{elegidas.length} clases elegidas</h3>
            {elegidas.length === 0 ? (
              <p className="text-gri-body-sm text-muted-foreground">Aún no has elegido ninguna clase.</p>
            ) : (
              <ul className="grid gap-gob-3 min-[600px]:grid-cols-2">
                {elegidas.map(n => (
                  <li key={n} className="flex items-start justify-between gap-gob-3 rounded-gob-lg border border-gob-primary/30 bg-white p-gob-4 shadow-elevation-01">
                    <span>
                      <span className="block font-heading font-medium">Clase {n}</span>
                      <span className="text-gri-body-sm">{NIZA_CLASES.find(c => c.n === n)?.titulo}</span>
                    </span>
                    <button type="button" className="rounded-full p-1 hover:bg-gob-surface-elevated" onClick={() => toggle(n)} aria-label={`Quitar clase ${n}`}>
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </ServicePanel>
        <p className="text-gri-body-sm text-gob-text">
          Si desea el listado alfabético de la Clasificación de Niza, consulte el que proporciona la Organización Mundial de la
          Propiedad Intelectual (OMPI).{' '}
          <a href={URLS_EXTERNAS.ompiNiza} className="text-gob-link underline" rel="noopener noreferrer">
            Ver listado OMPI
          </a>
        </p>
      </TramitesMain>
    </RequireAuth>
  )
}
