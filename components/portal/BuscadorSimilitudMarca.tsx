'use client'

import { useState, useCallback, useMemo } from 'react'
import Fuse from 'fuse.js'
import { Info, Search, X, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import marcasMock from '@/data/marcas-mock.json'

interface MarcaMock {
  id: string
  nombre: string
  clase: number
  estado: 'vigente' | 'caducada' | 'en_tramite'
  descripcion: string
  similitud_base: number
}

const CLASES_NIZA = [
  { id: 1, name: 'Productos químicos' },
  { id: 35, name: 'Publicidad y gestión comercial' },
  { id: 41, name: 'Educación y formación' },
  { id: 42, name: 'Servicios científicos y tecnológicos' },
  { id: 43, name: 'Servicios de restauración' },
]

const fuse = new Fuse(marcasMock as MarcaMock[], {
  keys: [{ name: 'nombre', weight: 0.8 }, { name: 'descripcion', weight: 0.2 }],
  includeScore: true,
  threshold: 0.55,
  ignoreLocation: true,
})

function similitudPct(score: number | undefined, base: number): number {
  const fromScore = score != null ? Math.round((1 - score) * 100) : 0
  return Math.min(100, Math.max(fromScore, base))
}

function colorSimilitud(pct: number) {
  if (pct >= 75) return { dot: 'bg-[#D32F2F]', label: 'Alta similitud' }
  if (pct >= 50) return { dot: 'bg-[#FF9800]', label: 'Similitud parcial' }
  return { dot: 'bg-[#43A047]', label: 'Baja similitud' }
}

const AVISO_LEGAL =
  'Este buscador fonético permite identificar potenciales coincidencias o similitudes denominativas con marcas previamente solicitadas o registradas ante INAPI. Sus resultados tienen un carácter meramente informativo y orientador para los usuarios, no incluye el análisis de los elementos figurativos, gráficos o de imagen. Los resultados pueden contener algunos errores o imprecisiones. En consecuencia, su uso es de exclusiva responsabilidad de quien lo utiliza y, en ningún caso, sustituye, anticipa ni prejuzga el examen sustantivo que corresponde realizar a INAPI conforme a la normativa vigente, ni asegura el resultado de dicho examen o la eventual concesión o rechazo de una solicitud de marca.'

export function BuscadorSimilitudMarca() {
  const [aceptado, setAceptado] = useState(false)
  const [legalOk, setLegalOk] = useState(false)
  const [query, setQuery] = useState('')
  const [clasesSel, setClasesSel] = useState<number[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [buscado, setBuscado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [resultados, setResultados] = useState<(MarcaMock & { similitud: number })[]>([])

  const toggleClase = (id: number) => {
    setClasesSel(prev => (prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]))
  }

  const handleBuscar = useCallback(() => {
    if (!query.trim()) return
    setCargado()
    setCargando(true)
    setTimeout(() => {
      const raw = fuse.search(query.trim()).slice(0, 12)
      let items = raw.map(r => ({
        ...(r.item as MarcaMock),
        similitud: similitudPct(r.score, (r.item as MarcaMock).similitud_base),
      }))
      if (clasesSel.length > 0) {
        items = items.filter(m => clasesSel.includes(m.clase))
      }
      items.sort((a, b) => b.similitud - a.similitud)
      setResultados(items)
      setBuscado(true)
      setCargando(false)
    }, 400)
  }, [query, clasesSel])

  function setCargado() {
    /* noop — placeholder for analytics hook */
  }

  const highCount = useMemo(() => resultados.filter(r => r.similitud >= 75).length, [resultados])

  if (!aceptado) {
    return (
      <section className="space-y-gob-5">
        <h2 className="font-heading text-xl font-medium text-gob-text">¿Qué es este buscador?</h2>
        <p className="text-gri-body text-gob-text leading-relaxed max-w-3xl">
          El buscador compara el nombre que escribiste con marcas previamente solicitadas o registradas ante INAPI.
          Te muestra un <strong>porcentaje de parecido</strong> (considera cómo se escribe y cómo suena en español):
          cuanto más alto es el porcentaje, más similar es tu marca respecto a la encontrada.
        </p>

        <div className="flex gap-gob-3 bg-gob-info-bg border-l-4 border-gob-primary-dark rounded-gob-sm p-gob-5 max-w-4xl">
          <Info className="w-6 h-6 text-gob-primary-dark shrink-0 mt-0.5" aria-hidden />
          <div className="space-y-gob-2">
            <h3 className="font-bold text-gob-text">Aviso legal</h3>
            <p className="text-gri-body-sm text-gob-text leading-relaxed">{AVISO_LEGAL}</p>
          </div>
        </div>

        <label className="flex items-center gap-gob-3 cursor-pointer text-gri-body">
          <input
            type="checkbox"
            checked={legalOk}
            onChange={e => setLegalOk(e.target.checked)}
            className="size-[18px] accent-[#0051A8]"
          />
          He leído y aceptado el aviso legal.
        </label>

        <Button
          disabled={!legalOk}
          onClick={() => setAceptado(true)}
          className="rounded-none bg-inapi-portal-hero hover:bg-inapi-portal-nav font-bold h-12 px-gob-6 disabled:opacity-40"
        >
          Comenzar
        </Button>
      </section>
    )
  }

  return (
    <section className="space-y-gob-6">
      <div className="grid gap-gob-4 min-[905px]:grid-cols-[1fr_280px_auto] min-[905px]:items-end">
        <div className="space-y-gob-2">
          <label htmlFor="marca-query" className="block text-gri-body-sm font-bold text-gob-text">
            Nombre de tu marca (denominación)
          </label>
          <div className="relative">
            <Input
              id="marca-query"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ejemplo: Mi Marca"
              className="rounded-none border-gob-border-strong pr-10 h-12 text-gri-body"
              onKeyDown={e => e.key === 'Enter' && handleBuscar()}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground p-1"
                aria-label="Limpiar nombre de marca"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-gob-2 relative">
          <div className="flex items-center gap-1">
            <span className="text-gri-body-sm font-bold text-gob-text">
              Clasificación Internacional de Niza (NCL)
            </span>
            <button
              type="button"
              onClick={() => setHelpOpen(v => !v)}
              className="inline-flex size-[18px] items-center justify-center rounded-full border border-gob-border-strong text-muted-foreground"
              aria-label="Ayuda sobre la Clasificación de Niza"
            >
              <HelpCircle className="w-3 h-3" />
            </button>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setDropdownOpen(v => !v)}
            className="w-full justify-between rounded-none h-12 border-gob-border-strong font-normal"
          >
            {clasesSel.length === 0 ? 'Todas las clases' : `${clasesSel.length} clase(s) seleccionada(s)`}
          </Button>
          {helpOpen && (
            <div className="absolute z-20 bottom-full mb-2 w-72 bg-card border border-gob-border shadow-elevation-04 rounded-gob-md p-gob-4 text-gri-body-sm">
              <p className="font-bold mb-gob-2">¿Qué es la Clasificación Internacional de Niza (NCL)?</p>
              <p className="text-muted-foreground leading-relaxed">
                La marca se inscribe en al menos una clase según el producto o servicio que representa. Existen 45 clases en total.
              </p>
            </div>
          )}
          {dropdownOpen && (
            <div className="absolute z-10 top-full mt-1 w-full max-h-64 overflow-y-auto bg-card border border-gob-border shadow-elevation-04">
              {CLASES_NIZA.map(cls => (
                <label
                  key={cls.id}
                  className="flex items-center gap-gob-3 px-gob-3 py-gob-2 hover:bg-gob-surface-elevated cursor-pointer border-b border-gob-border last:border-0"
                >
                  <input
                    type="checkbox"
                    checked={clasesSel.includes(cls.id)}
                    onChange={() => toggleClase(cls.id)}
                    className="accent-[#0051A8]"
                  />
                  <span className="text-gri-body-sm">
                    <strong>Clase {cls.id}</strong> {cls.name}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <Button
          onClick={handleBuscar}
          disabled={!query.trim() || cargando}
          className="rounded-none bg-inapi-cta hover:bg-[#003B8D] font-bold h-12 px-gob-6 whitespace-nowrap"
        >
          <Search className="w-5 h-5 mr-2" aria-hidden />
          {cargando ? 'Buscando…' : 'Buscar marcas parecidas'}
        </Button>
      </div>

      {clasesSel.length > 0 && (
        <div className="flex flex-wrap gap-gob-2">
          {clasesSel.map(id => {
            const cls = CLASES_NIZA.find(c => c.id === id)
            return (
              <Badge key={id} variant="secondary" className="rounded-full gap-1 pr-1">
                Clase {id}
                <button type="button" onClick={() => toggleClase(id)} aria-label={`Quitar clase ${id}`}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )
          })}
        </div>
      )}

      {/* Leyenda de porcentajes */}
      <div className="border border-gob-border rounded-gob-md p-gob-5 space-y-gob-4 bg-gob-surface-elevated/50">
        <h3 className="font-bold text-gob-text">¿Qué significa cada porcentaje?</h3>
        <ul className="space-y-gob-3 text-gri-body-sm">
          <li className="flex gap-gob-3">
            <span className="size-2.5 rounded-full bg-[#D32F2F] mt-2 shrink-0" aria-hidden />
            <p><strong>75% a 100%</strong> — Existe mucha similitud. Compara palabras y clases de Niza antes de presentar tu solicitud.</p>
          </li>
          <li className="flex gap-gob-3">
            <span className="size-2.5 rounded-full bg-[#FF9800] mt-2 shrink-0" aria-hidden />
            <p><strong>50% a 74%</strong> — Hay similitud parcial. Revisa tu propuesta antes de solicitar.</p>
          </li>
          <li className="flex gap-gob-3">
            <span className="size-2.5 rounded-full bg-[#43A047] mt-2 shrink-0" aria-hidden />
            <p><strong>0% a 49%</strong> — La similitud es baja. Los conflictos son poco probables.</p>
          </li>
        </ul>
      </div>

      {buscado && (
        <div className="space-y-gob-4">
          {highCount > 0 && (
            <p className="text-gri-body-sm text-gob-text bg-gob-warning-bg border-l-4 border-gob-warning p-gob-4 leading-relaxed">
              Encontramos {highCount} marca{highCount !== 1 ? 's' : ''} con similitud del 75% o más.
              Te recomendamos revisar las coincidencias y la clase de Niza elegida antes de solicitar.
            </p>
          )}
          {resultados.length === 0 ? (
            <p className="text-muted-foreground text-gri-body">No encontramos marcas parecidas con los criterios indicados.</p>
          ) : (
            <ul className="divide-y divide-gob-border border border-gob-border rounded-gob-md overflow-hidden">
              {resultados.map(m => {
                const c = colorSimilitud(m.similitud)
                return (
                  <li key={m.id} className="flex flex-wrap items-center gap-gob-4 p-gob-4 bg-card hover:bg-gob-surface-elevated/50">
                    <span className={cn('size-2.5 rounded-full shrink-0', c.dot)} aria-hidden />
                    <div className="flex-1 min-w-[200px]">
                      <p className="font-semibold text-gob-text">{m.nombre}</p>
                      <p className="text-gri-body-xs text-muted-foreground">Clase {m.clase} · {m.estado.replace('_', ' ')}</p>
                    </div>
                    <span className="font-bold text-gob-text tabular-nums">{m.similitud}%</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}
