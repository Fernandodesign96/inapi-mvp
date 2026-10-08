'use client'

import { useCallback, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { Ban, ChevronDown, ChevronLeft, ChevronRight, Info, Scale, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { selectClass } from '@/components/tramites/ui-helpers'
import { useClaseSugerida } from '@/hooks/useClaseSugerida'
import { NIZA_CLASES } from '@/lib/tramites/mock-data'
import { cn } from '@/lib/utils'
import marcasMock from '@/data/marcas-mock.json'

type MarcaMock = {
  id: string
  nombre: string
  clase: number
  estado: 'vigente' | 'caducada' | 'en_tramite'
  descripcion: string
  similitud_base: number
}

type Resultado = MarcaMock & {
  escritura: number
  pronunciacion: number
  mismaClase: boolean
  numero: string
  anio: number
  codigo: string
  clases: number[]
}

const fuse = new Fuse(marcasMock as MarcaMock[], {
  keys: [{ name: 'nombre', weight: 0.85 }, { name: 'descripcion', weight: 0.15 }],
  includeScore: true,
  threshold: 0.55,
  ignoreLocation: true,
})

const AVISO_LEGAL =
  'Este buscador permite identificar posibles coincidencias o similitudes de nombre con marcas previamente solicitadas o registradas ante INAPI. Sus resultados tienen un carácter meramente informativo y orientador para los usuarios, no incluye el análisis de los elementos figurativos, gráficos o de imagen. Los resultados pueden contener algunos errores o imprecisiones. En consecuencia, su uso es de exclusiva responsabilidad de quien lo utiliza y, en ningún caso, sustituye, anticipa ni prejuzga el examen sustantivo que corresponde realizar a INAPI conforme a la normativa vigente, ni asegura el resultado de dicho examen o la eventual concesión o rechazo de una solicitud de marca.'

const EJEMPLOS_PROD = ['ropa deportiva', 'restaurante', 'app de delivery']
const PAGE_SIZE = 4

function pct(score: number | undefined, base: number): number {
  const fromScore = score != null ? Math.round((1 - score) * 100) : 0
  return Math.min(100, Math.max(fromScore, Math.round(base * 100)))
}

function etiquetaEstado(estado: MarcaMock['estado']) {
  if (estado === 'vigente') return 'Registrada'
  if (estado === 'en_tramite') return 'En trámite'
  return 'Caducada'
}

function nivel(n: number) {
  if (n >= 75) return 'Alta similitud al escribir'
  if (n >= 50) return 'Similitud parcial al escribir'
  return 'Baja similitud al escribir'
}

function nivelPron(n: number) {
  if (n >= 75) return 'Alta similitud al pronunciar'
  if (n >= 50) return 'Similitud parcial al pronunciar'
  return 'Baja similitud al pronunciar'
}

export function BuscadorSimilitudMarca() {
  const [aceptado, setAceptado] = useState(false)
  const [legalOk, setLegalOk] = useState(false)
  const [query, setQuery] = useState('')
  const { query: prodQuery, setQuery: setProdQuery, sugerencias } = useClaseSugerida()
  const [clasesSel, setClasesSel] = useState<number[]>([])
  const [buscadoSug, setBuscadoSug] = useState(false)
  const [buscado, setBuscado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [resultados, setResultados] = useState<Resultado[]>([])
  const [page, setPage] = useState(1)
  const [avisoOpen, setAvisoOpen] = useState(true)
  const [detalle, setDetalle] = useState<Resultado | null>(null)

  const hasName = query.trim().length > 0
  const grouped = useMemo(() => {
    const map = new Map<number, typeof sugerencias>()
    for (const item of sugerencias) {
      const list = map.get(item.clase) ?? []
      list.push(item)
      map.set(item.clase, list)
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0])
  }, [sugerencias])

  const toggleClase = (n: number) => {
    setClasesSel(prev => (prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n].sort((a, b) => a - b)))
  }

  const handleBuscar = useCallback(() => {
    if (!hasName) return
    setCargando(true)
    setDetalle(null)
    setTimeout(() => {
      const raw = fuse.search(query.trim())
      const items: Resultado[] = raw.map((r, i) => {
        const item = r.item as MarcaMock
        const escritura = pct(r.score, item.similitud_base)
        const pronunciacion = Math.max(40, escritura - ((item.id.charCodeAt(2) ?? 0) % 10))
        const seed = 1000000 + i * 137 + item.nombre.length * 91
        return {
          ...item,
          escritura,
          pronunciacion,
          mismaClase: clasesSel.length === 0 || clasesSel.includes(item.clase),
          numero: String(1500000 + seed).slice(0, 7),
          anio: 2017 + (seed % 9),
          codigo: String(400000 + seed).slice(0, 6),
          clases: [...new Set([item.clase, item.clase === 9 ? 7 : item.clase > 34 ? (item.clase === 45 ? 42 : item.clase - 1) : Math.min(34, item.clase + 1)])],
        }
      })
      items.sort((a, b) => b.escritura - a.escritura)
      setResultados(items)
      setBuscado(true)
      setPage(1)
      setCargando(false)
    }, 350)
  }, [hasName, query, clasesSel])

  const pages = Math.max(1, Math.ceil(resultados.length / PAGE_SIZE))
  const slice = resultados.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  if (!aceptado) {
    return (
      <section className="space-y-gob-6">
        <div className="grid gap-gob-4 min-[800px]:grid-cols-2">
          <article className="rounded-gob-lg border border-gob-border bg-card p-gob-5 shadow-elevation-01">
            <h2 className="flex items-center gap-gob-3 font-heading text-lg font-medium text-gob-text">
              <Search className="size-5 text-gob-primary" aria-hidden />
              ¿Qué hace este buscador?
            </h2>
            <p className="mt-gob-3 text-gri-body-sm leading-relaxed text-gob-text">
              Te muestra qué tan parecida es tu marca —en su escritura o sonido— a otras marcas ya solicitadas o registradas en INAPI.
            </p>
          </article>
          <article className="rounded-gob-lg border border-gob-border bg-card p-gob-5 shadow-elevation-01">
            <h2 className="flex items-center gap-gob-3 font-heading text-lg font-medium text-gob-text">
              <Ban className="size-5 text-muted-foreground" aria-hidden />
              ¿Qué no hace este buscador?
            </h2>
            <p className="mt-gob-3 text-gri-body-sm leading-relaxed text-gob-text">
              No revisa logos, imágenes ni otros elementos gráficos de las marcas.
            </p>
          </article>
        </div>

        <aside className="rounded-gob-lg border border-gob-info/40 bg-gob-info-bg p-gob-5">
          <h2 className="flex items-center gap-gob-3 font-heading text-lg font-medium text-gob-text">
            <span className="inline-flex size-8 items-center justify-center rounded-full bg-white text-gob-primary shadow-elevation-01">
              <Info className="size-4" aria-hidden />
            </span>
            Ten en cuenta
          </h2>
          <ul className="mt-gob-4 space-y-gob-3 text-gri-body-sm text-gob-text leading-relaxed">
            <li className="flex gap-gob-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gob-primary" />
              Los resultados son solo una referencia y pueden tener errores.
            </li>
            <li className="flex gap-gob-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gob-primary" />
              Si tu marca tiene números, escríbelos también con palabras (ejemplo &apos;3&apos; o &apos;tres&apos;) para obtener resultados más precisos.
            </li>
            <li className="flex gap-gob-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gob-primary" />
              El uso de esta herramienta es tu responsabilidad.
            </li>
            <li className="flex gap-gob-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gob-primary" />
              No reemplaza el examen de INAPI, ni garantiza si tu marca será aceptada o rechazada.
            </li>
          </ul>
        </aside>

        <section className="rounded-gob-lg border border-gob-border bg-card p-gob-5 shadow-elevation-01 space-y-gob-5">
          <header className="flex items-start gap-gob-3">
            <Scale className="size-6 text-gob-primary mt-0.5" aria-hidden />
            <div>
              <h2 className="font-heading text-lg font-medium text-gob-text">Aviso legal</h2>
              <p className="text-gri-body-sm text-muted-foreground">Léelo antes de usar el buscador</p>
            </div>
          </header>
          <p className="text-gri-body-sm leading-relaxed text-gob-text">{AVISO_LEGAL}</p>
          <label className="flex min-h-11 cursor-pointer items-center gap-gob-3 rounded-gob-md border border-gob-border px-gob-4 py-gob-3">
            <input
              type="checkbox"
              checked={legalOk}
              onChange={e => setLegalOk(e.target.checked)}
              className="size-[18px] accent-[#0051A8]"
            />
            Leí el aviso y quiero continuar
          </label>
          <Button
            disabled={!legalOk}
            onClick={() => setAceptado(true)}
            className="h-12 rounded-gob-md bg-muted text-gob-text hover:bg-gob-surface-elevated disabled:opacity-40"
          >
            Ir al buscador
          </Button>
        </section>
      </section>
    )
  }

  if (detalle) {
    return (
      <section className="space-y-gob-5">
        <p className="text-gri-body-sm text-muted-foreground">
          Marcas parecidas › <span className="text-gob-text font-medium">{detalle.nombre}</span>
        </p>
        <h2 className="font-heading text-gri-h2 font-medium text-gob-text">{detalle.nombre}</h2>
        <article className="rounded-gob-lg border border-gob-border bg-card p-gob-5 space-y-gob-5">
          <h3 className="font-heading text-lg font-medium">Detalles de la marca</h3>
          <div className="grid gap-gob-5 min-[800px]:grid-cols-3">
            <div>
              <p className="text-gri-body-xs uppercase tracking-wide text-muted-foreground">Parecido al escribir</p>
              <p className="mt-1 font-medium">{nivel(detalle.escritura)}</p>
            </div>
            <div>
              <p className="text-gri-body-xs uppercase tracking-wide text-muted-foreground">Parecido al pronunciar</p>
              <p className="mt-1 font-medium">{nivelPron(detalle.pronunciacion)}</p>
            </div>
            <div>
              <p className="text-gri-body-xs uppercase tracking-wide text-muted-foreground">Misma clase de productos o servicios</p>
              <p className="mt-1 font-medium">
                {detalle.mismaClase
                  ? `Pertenece a la misma clase solicitada (${detalle.clase})`
                  : `Clase ${detalle.clase}, distinta a las que elegiste`}
              </p>
            </div>
          </div>
          <div className="grid gap-gob-4 min-[600px]:grid-cols-3 text-gri-body-sm">
            <p>
              <span className="block text-muted-foreground">Estado</span>
              <span className="inline-flex items-center gap-2 font-medium">
                <span className="size-2 rounded-full bg-gob-success" />
                {etiquetaEstado(detalle.estado)}
              </span>
            </p>
            <p>
              <span className="block text-muted-foreground">Código de marca</span>
              {detalle.codigo}
            </p>
            <p>
              <span className="block text-muted-foreground">Año del estado</span>
              {detalle.anio}
            </p>
          </div>
          <div>
            <p className="text-gri-body-sm text-muted-foreground mb-2">N.° de solicitud</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-gob-sm bg-gob-primary px-gob-3 py-1 text-white text-gri-body-sm">{detalle.numero}</span>
            </div>
          </div>
        </article>
        <article className="rounded-gob-lg border border-gob-border bg-card p-gob-5 space-y-gob-3">
          <h3 className="font-heading text-lg font-medium">Productos o servicios que cubre</h3>
          <ul className="grid gap-gob-3 min-[600px]:grid-cols-2">
            {detalle.clases.map((n, i) => (
              <li
                key={`${n}-${i}`}
                className={cn(
                  'rounded-gob-md border p-gob-4',
                  i === 0 ? 'border-gob-primary bg-gob-primary/5' : 'border-gob-border',
                )}
              >
                <p className="font-medium">
                  {n} Clase {n}
                </p>
                <p className="text-gri-body-sm text-gob-text">{NIZA_CLASES.find(c => c.n === n)?.titulo}</p>
                {i === 0 ? <p className="text-gri-body-xs text-gob-primary mt-1">Idéntica a la clase que solicitas</p> : null}
              </li>
            ))}
          </ul>
        </article>
        <Button variant="outline" size="form" onClick={() => setDetalle(null)}>
          Volver a marcas parecidas
        </Button>
      </section>
    )
  }

  return (
    <section className="space-y-gob-6">
      <p className="text-gri-body text-gob-text">Escribe el nombre de tu marca y el producto o servicio para ver marcas parecidas.</p>

      <div className="space-y-gob-2">
        <label htmlFor="marca-query" className="flex items-center gap-gob-2 text-gri-body-sm font-medium">
          Nombre de tu marca
          <HelpTooltip
            label="Ayuda"
            text="¿Cómo encuentra marcas este buscador? El buscador encuentra marcas parecidas por cómo se escriben (denominación) y cómo suenan al pronunciarlas. Ejemplo: Casa Blanca y Blanca Casa. Si tu marca contiene números, búscala de dos formas, con el número (ej. Café 24) y con el número escrito en palabras (ej. Café veinticuatro)."
          />
        </label>
        <Input
          id="marca-query"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ejemplo: Mi Marca"
          className="h-12 max-w-xl"
        />
      </div>

      <div className={cn('space-y-gob-5 rounded-gob-lg border p-gob-5', hasName ? 'border-gob-border bg-card' : 'border-dashed border-gob-border bg-muted/40')}>
        <div className="space-y-gob-2">
          <label htmlFor="prod-query" className="text-gri-body-sm font-medium">
            Producto o servicio de tu marca
          </label>
          <div className="flex flex-col gap-gob-3 min-[800px]:flex-row">
            <Input
              id="prod-query"
              value={prodQuery}
              disabled={!hasName}
              onChange={e => setProdQuery(e.target.value)}
              placeholder="Ejemplo: ropa deportiva, restaurante, app de delivery"
              className="h-12 flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="form"
              disabled={!hasName || prodQuery.trim().length < 2}
              onClick={() => {
                const clases = [...new Set(sugerencias.map(s => s.clase))]
                setClasesSel(prev => [...new Set([...prev, ...clases])])
                setBuscadoSug(true)
              }}
            >
              Sugerir clases
            </Button>
          </div>
          <p className="text-gri-body-sm text-muted-foreground">
            {hasName
              ? 'Cuéntanos con tus palabras qué vas a vender u ofrecer y te sugerimos las clases.'
              : 'Primero escribe el nombre de tu marca.'}
          </p>
          {hasName ? (
            <p className="flex flex-wrap items-center gap-2 text-gri-body-sm">
              Prueba con:
              {EJEMPLOS_PROD.map(ej => (
                <button
                  key={ej}
                  type="button"
                  className="rounded-full border border-gob-primary/40 px-gob-3 py-1 text-gob-primary hover:bg-gob-primary/5"
                  onClick={() => setProdQuery(ej)}
                >
                  {ej}
                </button>
              ))}
            </p>
          ) : null}
        </div>

        {buscadoSug && grouped.length > 0 ? (
          <div className="space-y-gob-3">
            <p className="rounded-gob-md border border-gob-warning/40 bg-gob-warning-bg p-gob-4 text-gri-body-sm">
              <strong>Para elegir bien.</strong> ¿Vendes software descargable o instalable (9) o ofreces acceso online como servicio (42)?
            </p>
            <h3 className="font-medium">Clases sugeridas</h3>
            <ul className="space-y-gob-3">
              {grouped.map(([clase, items]) => {
                const on = clasesSel.includes(clase)
                const tipo = clase <= 34 ? 'Producto' : 'Servicio'
                return (
                  <li key={clase}>
                    <label
                      className={cn(
                        'flex cursor-pointer gap-gob-3 rounded-gob-md border p-gob-4',
                        on ? 'border-gob-primary bg-gob-primary/5' : 'border-gob-border hover:border-gob-primary/50',
                      )}
                    >
                      <input type="checkbox" checked={on} onChange={() => toggleClase(clase)} className="mt-1" />
                      <span>
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="rounded bg-gob-primary px-2 py-0.5 text-white text-gri-body-xs">Clase {clase}</span>
                          <span className="font-medium">{NIZA_CLASES.find(c => c.n === clase)?.titulo}</span>
                          <span className="rounded-full bg-muted px-2 py-0.5 text-gri-body-xs">{tipo}</span>
                        </span>
                        <span className="mt-1 block text-gri-body-sm">{items.map(i => i.descripcion).join('; ')}</span>
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}

        <div className="space-y-gob-2">
          <label htmlFor="clase-niza" className="text-gri-body-sm font-medium">
            ¿Ya sabes tu clase? Elígela por su número
          </label>
          <select
            id="clase-niza"
            disabled={!hasName}
            className={selectClass(!hasName)}
            defaultValue=""
            onChange={e => {
              const n = Number(e.target.value)
              if (n) toggleClase(n)
              e.currentTarget.value = ''
            }}
          >
            <option value="">Elige una clase</option>
            {NIZA_CLASES.map(c => (
              <option key={c.n} value={c.n}>
                Clase {c.n} · {c.titulo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="font-medium">{clasesSel.length} clases elegidas</p>
          {clasesSel.length === 0 ? (
            <p className="text-gri-body-sm text-muted-foreground">Aún no has elegido ninguna clase.</p>
          ) : (
            <ul className="mt-2 flex flex-wrap gap-2">
              {clasesSel.map(n => (
                <li key={n}>
                  <button
                    type="button"
                    className="rounded-gob-sm border border-gob-border bg-gob-surface-elevated px-gob-3 py-1 text-gri-body-sm hover:border-gob-primary"
                    onClick={() => toggleClase(n)}
                  >
                    Clase {n} · {NIZA_CLASES.find(c => c.n === n)?.titulo} ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2 text-gri-body-xs text-muted-foreground">
            Si la sugerencia no te sirve, elige la clase por su número.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-gob-3">
        <Button size="form" disabled={!hasName || cargando} onClick={handleBuscar} className="bg-gob-primary hover:bg-gob-primary-dark">
          <Search className="size-4" aria-hidden />
          {cargando ? 'Buscando…' : 'Buscar marcas similares'}
        </Button>
        <Button
          variant="outline"
          size="form"
          onClick={() => {
            setQuery('')
            setProdQuery('')
            setClasesSel([])
            setBuscado(false)
            setResultados([])
          }}
        >
          Limpiar
        </Button>
      </div>

      {buscado ? (
        <div className="space-y-gob-4">
          <section className="overflow-hidden rounded-gob-lg border border-gob-info/40 bg-gob-info-bg">
            <button
              type="button"
              className="flex w-full items-center justify-between px-gob-5 py-gob-4 text-left"
              onClick={() => setAvisoOpen(v => !v)}
            >
              <span className="font-heading font-medium">Revisa antes de continuar</span>
              <ChevronDown className={cn('size-5 transition-transform', avisoOpen && 'rotate-180')} />
            </button>
            {avisoOpen ? (
              <div className="space-y-gob-3 border-t border-gob-info/30 px-gob-5 py-gob-4 text-gri-body-sm leading-relaxed">
                <p>
                  Hay {resultados.length} marcas parecidas a «{query}». Te recomendamos revisar esas similitudes.
                </p>
                <p>
                  Si otra persona ya tiene una marca igual o muy parecida en la misma clase de productos o servicios, puedes
                  cambiar el nombre antes de solicitar.
                </p>
                <p>Esto no decide si INAPI acepta o rechaza tu solicitud. Sirve para que compares y decidas si conviene ajustar el nombre o la cobertura.</p>
                <p className="font-medium">Revisa si se parecen en:</p>
                <ul className="list-disc pl-gob-5 space-y-1">
                  <li>Cómo se escriben</li>
                  <li>Cómo suenan al pronunciarlas</li>
                  <li>Qué productos o servicios cubren (Clase de Niza)</li>
                </ul>
              </div>
            ) : null}
          </section>

          <p className="text-gri-body-sm text-muted-foreground">
            Mostrando {slice.length} de {resultados.length} marcas parecidas
          </p>

          {slice.length === 0 ? (
            <p>No encontramos marcas parecidas con los criterios indicados.</p>
          ) : (
            <ul className="space-y-gob-3">
              {slice.map(m => (
                <li key={m.id}>
                  <article className="flex flex-col gap-gob-4 rounded-gob-lg border border-gob-border bg-card p-gob-5 transition-all hover:border-gob-primary hover:shadow-elevation-03 min-[800px]:flex-row min-[800px]:items-center">
                    <div className="min-w-[12rem] space-y-1">
                      <h3 className="font-heading text-xl font-medium">{m.nombre}</h3>
                      <p className="text-gri-body-xs font-medium text-gob-accent">Similitud alta</p>
                      <p className="inline-flex items-center gap-2 text-gri-body-sm">
                        <span className="size-2 rounded-full bg-gob-success" />
                        {etiquetaEstado(m.estado)}
                      </p>
                      <p className="text-gri-body-sm">{m.anio}</p>
                      <p className="text-gri-body-sm">N.° de solicitud: {m.numero}</p>
                    </div>
                    <div className="flex-1 space-y-gob-2 text-gri-body-sm">
                      <p>
                        <strong>Escritura:</strong> {nivel(m.escritura).replace(' al escribir', '')}
                      </p>
                      <p>
                        <strong>Pronunciación:</strong> {nivelPron(m.pronunciacion).replace(' al pronunciar', '')}
                      </p>
                      {m.mismaClase ? (
                        <p className="text-gob-primary">Misma clase de productos o servicios</p>
                      ) : (
                        <p>Clase distinta a la que elegiste</p>
                      )}
                    </div>
                    <Button size="form" className="bg-gob-primary hover:bg-gob-primary-dark shrink-0" onClick={() => setDetalle(m)}>
                      Ver detalle de la marca
                    </Button>
                  </article>
                </li>
              ))}
            </ul>
          )}

          {pages > 1 ? (
            <nav className="flex items-center justify-center gap-gob-3 pt-gob-2" aria-label="Paginación">
              <Button variant="ghost" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                <ChevronLeft className="size-4" />
                Página anterior
              </Button>
              {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
                <Button key={n} variant={n === page ? 'default' : 'outline'} size="icon" onClick={() => setPage(n)}>
                  {n}
                </Button>
              ))}
              <Button variant="ghost" disabled={page >= pages} onClick={() => setPage(p => p + 1)}>
                Página siguiente
                <ChevronRight className="size-4" />
              </Button>
            </nav>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
