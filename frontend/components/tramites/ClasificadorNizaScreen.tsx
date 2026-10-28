'use client'

import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlainTerm } from '@/components/GlosarioTerm'
import { FieldLabel } from '@/components/tramites/HelpTooltip'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { ControlChip, ControlChipRow } from '@/components/tramites/TramitesExperience'
import { TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import coberturas from '@/data/coberturas.json'
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

const CHIP = 'min-w-[11.5rem]'

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
        <p className="max-w-3xl text-gri-body leading-relaxed text-gob-text">
          Este buscador te ayuda a elegir los productos o servicios de tu marca. Te sugiere la{' '}
          <PlainTerm term="clase de Niza">clase de Niza</PlainTerm>. Cada clase se cobra aparte. Describe lo que vendes u
          ofreces: no hace falta usar el término oficial.
        </p>

        <h2 className="font-heading text-gri-h2 font-medium text-gob-text">Escoge tu producto o servicio</h2>

        <div className="grid gap-gob-5 min-[800px]:grid-cols-2">
          <div className="space-y-gob-2 rounded-gob-lg border-2 border-gob-border bg-transparent p-gob-5">
            <FieldLabel
              htmlFor="palabra"
              help={{
                title: 'Producto o servicio',
                text: 'Describe lo que vas a vender u ofrecer. No hace falta usar el término oficial.',
                example: 'software para gestión de certificados digitales, ropa deportiva, restaurante',
              }}
            >
              Producto o servicio
            </FieldLabel>
            <Input
              id="palabra"
              value={palabra}
              onChange={e => setPalabra(e.target.value)}
              placeholder="Escribe tu producto o servicio"
              className="h-12 border-2 border-gob-text/40 bg-card"
            />
          </div>
          <div className="space-y-gob-2 rounded-gob-lg border-2 border-gob-border bg-transparent p-gob-5">
            <FieldLabel
              htmlFor="clase"
              help={{
                title: 'Clase de Niza',
                text: 'Las clases 1 a 34 cubren productos. Las clases 35 a 45 cubren servicios. Cada clase se cobra aparte.',
              }}
            >
              ¿Ya sabes tu clase? Elígela por su número
            </FieldLabel>
            <select id="clase" className={cn(selectClass(), 'h-12 border-2 border-gob-text/40 bg-card')} value={clase} onChange={e => setClase(e.target.value)}>
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

        <section className="space-y-gob-4">
          <div className="flex flex-wrap items-end justify-between gap-gob-3">
            <h2 className="font-heading text-gri-h2 font-medium text-gob-text">Resultados</h2>
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
              por página
            </label>
          </div>

          {!buscado ? (
            <p className="text-gri-body-sm text-muted-foreground">Escribe un producto o servicio y pulsa Buscar.</p>
          ) : slice.length === 0 ? (
            <p className="text-gri-body-sm text-muted-foreground">No hay registros para mostrar.</p>
          ) : (
            <ul className="grid gap-gob-3">
              {slice.map(r => {
                const on = elegidas.includes(r.clase)
                const tipo = r.clase <= 34 ? 'Producto' : 'Servicio'
                return (
                  <li
                    key={`${r.clase}-${r.descripcion}`}
                    className={cn(
                      'flex flex-col gap-gob-3 rounded-gob-lg border bg-card p-gob-5 shadow-elevation-01 min-[800px]:flex-row min-[800px]:items-center',
                      on ? 'border-inapi-marcas-accent' : 'border-gob-border',
                    )}
                  >
                    <span className="inline-flex min-w-24 justify-center rounded-full bg-inapi-marcas-accent px-gob-3 py-1 text-gri-body-sm font-semibold text-white">
                      Clase {r.clase}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-gri-body font-medium text-gob-text">{r.descripcion}</span>
                      <span
                        className={cn(
                          'mt-1 inline-flex rounded-full px-gob-2 py-0.5 text-gri-body-xs font-semibold',
                          r.clase <= 34 ? 'bg-gob-primary text-white' : 'bg-gob-surface-elevated text-gob-text ring-1 ring-inapi-marcas-accent',
                        )}
                      >
                        {tipo}
                      </span>
                    </span>
                    <ControlChip pressed={on} accent="marcas" className={CHIP} onClick={() => toggle(r.clase)}>
                      {on ? 'Elegida' : 'Elegir clase'}
                    </ControlChip>
                  </li>
                )
              })}
            </ul>
          )}

          {buscado ? (
            <>
              <p className="text-gri-body-sm text-muted-foreground">
                Mostrando {resultados.length === 0 ? 0 : (page - 1) * pageSizeNum + 1} a {Math.min(page * pageSizeNum, resultados.length)} de {resultados.length}{' '}
                registros
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
            </>
          ) : null}
        </section>

        <section className="space-y-gob-3">
          <h2 className="font-heading text-gri-h2 font-medium text-gob-text">{elegidas.length} clases elegidas</h2>
          {elegidas.length === 0 ? (
            <p className="text-gri-body-sm text-muted-foreground">Aún no has elegido ninguna clase.</p>
          ) : (
            <>
              <ControlChipRow label="Clases elegidas">
                {elegidas.map(n => (
                  <ControlChip key={n} pressed accent="marcas" className={CHIP} onClick={() => toggle(n)}>
                    Clase {n}
                    <X className="ml-2 size-3.5" aria-hidden />
                  </ControlChip>
                ))}
              </ControlChipRow>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-gri-body-sm">
                  <caption className="sr-only">Clases elegidas</caption>
                  <thead>
                    <tr className="border-b border-gob-border">
                      <th className="py-gob-2 pr-gob-3 font-heading font-medium">Clase</th>
                      <th className="py-gob-2 pr-gob-3 font-heading font-medium">Cobertura</th>
                      <th className="py-gob-2 pr-gob-3 font-heading font-medium">Tipo de clase</th>
                      <th className="py-gob-2 font-heading font-medium">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {elegidas.map(n => {
                      const meta = NIZA_CLASES.find(c => c.n === n)
                      const tipo = n <= 34 ? 'Producto' : 'Servicio'
                      return (
                        <tr key={n} className="border-b border-gob-border">
                          <td className="py-gob-3 pr-gob-3 font-medium">Clase {n}</td>
                          <td className="py-gob-3 pr-gob-3">{meta?.titulo}</td>
                          <td className="py-gob-3 pr-gob-3">
                            <span
                              className={cn(
                                'inline-flex rounded-full px-gob-2 py-0.5 text-gri-body-xs font-semibold',
                                n <= 34 ? 'bg-gob-primary text-white' : 'bg-gob-surface-elevated text-gob-text ring-1 ring-inapi-marcas-accent',
                              )}
                            >
                              {tipo}
                            </span>
                          </td>
                          <td className="py-gob-3">
                            <button type="button" className="text-gob-link underline" onClick={() => toggle(n)}>
                              Quitar
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
        <p className="text-gri-body-sm text-gob-text">
          Si desea el listado alfabético de la Clasificación de Niza, consulte el que proporciona la Organización Mundial de la Propiedad Intelectual (OMPI).{' '}
          <a href={URLS_EXTERNAS.ompiNiza} className="text-gob-link underline" rel="noopener noreferrer">
            Ver listado OMPI
          </a>
          . Se abre en otro sitio.
        </p>
      </TramitesMain>
    </RequireAuth>
  )
}
