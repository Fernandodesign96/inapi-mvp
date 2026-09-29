'use client'

import { useState, useCallback } from 'react'
import Fuse from 'fuse.js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Search, AlertTriangle, CheckCircle2, ArrowRight, RotateCcw, Info } from 'lucide-react'
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

interface Props {
  nombreInicial?: string
  onContinuar: (similitud: number) => void
  onAjustar?: () => void
}

const fuse = new Fuse(marcasMock as MarcaMock[], {
  keys: [
    { name: 'nombre', weight: 0.7 },
    { name: 'descripcion', weight: 0.3 },
  ],
  includeScore: true,
  threshold: 0.6,
  ignoreLocation: true,
})

function getNivelSimilitud(pct: number) {
  if (pct <= 25) return {
    label: 'Alta probabilidad de registro exitoso',
    color: 'bg-stepper-done',
    textColor: 'text-stepper-done',
    bgAlert: '',
    showAlert: false,
  }
  if (pct <= 60) return {
    label: 'Existen marcas similares. Analiza las diferencias.',
    color: 'bg-stepper-active',
    textColor: 'text-stepper-active',
    bgAlert: '',
    showAlert: false,
  }
  if (pct <= 85) return {
    label: 'Riesgo moderado. Considera ajustar tu marca.',
    color: 'bg-gob-warning',
    textColor: 'text-gob-warning',
    bgAlert: 'border-l-4 border-gob-warning bg-gob-warning-bg',
    showAlert: true,
  }
  return {
    label: 'Alta probabilidad de rechazo. Revisa las similitudes.',
    color: 'bg-stepper-error',
    textColor: 'text-stepper-error',
    bgAlert: 'border-l-4 border-stepper-error bg-stepper-error-bg',
    showAlert: true,
  }
}

const badgeEstado = {
  vigente:    { label: 'Vigente',    class: 'bg-gob-success-bg text-gob-success border-gob-success/30' },
  caducada:   { label: 'Caducada',   class: 'bg-gob-surface-elevated text-muted-foreground border-gob-border' },
  en_tramite: { label: 'En Trámite', class: 'bg-gob-warning-bg text-gob-warning border-gob-warning/30' },
}

export function PesquisaMarca({ nombreInicial = '', onContinuar, onAjustar }: Props) {
  const [nombre, setNombre] = useState(nombreInicial)
  const [descripcion, setDescripcion] = useState('')
  const [buscado, setBuscado] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [resultados, setResultados] = useState<(MarcaMock & { similitud: number })[]>([])
  const [similitudMax, setSimilitudMax] = useState(0)

  const buscar = useCallback(() => {
    if (!nombre.trim()) return
    setCargando(true)
    setBuscado(false)

    // Simular latencia de API real
    setTimeout(() => {
      const query = `${nombre} ${descripcion}`.trim()
      const fuseResults = fuse.search(query)

      const resultadosCalculados = fuseResults.slice(0, 8).map(r => {
        // Convertir score de Fuse (0=perfecto, 1=peor) a porcentaje
        const fuseScore = r.score ?? 1
        const similitudFuse = Math.round((1 - fuseScore) * 100)
        // Ponderar con similitud_base del mock
        const similitudFinal = Math.min(100, Math.round(
          similitudFuse * 0.6 + r.item.similitud_base * 100 * 0.4
        ))
        return { ...r.item, similitud: similitudFinal }
      }).sort((a, b) => b.similitud - a.similitud)

      const maxSim = resultadosCalculados.length > 0
        ? resultadosCalculados[0].similitud
        : 0

      setResultados(resultadosCalculados)
      setSimilitudMax(maxSim)
      setBuscado(true)
      setCargando(false)
    }, 800)
  }, [nombre, descripcion])

  const nivel = getNivelSimilitud(similitudMax)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-heading text-gri-h1 font-medium text-gob-text leading-tight">
          ¿Existe una marca similar a la tuya?
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Antes de continuar, buscamos en el registro de INAPI si ya existe una marca similar.
          Esto te ayuda a conocer las probabilidades de éxito de tu solicitud.
        </p>
      </div>

      {/* Formulario de búsqueda */}
      <div className="bg-gob-surface rounded-gob-lg border border-gob-border-strong p-gob-5 space-y-gob-4 shadow-elevation-02">
        <div className="space-y-2">
          <label htmlFor="pesquisa-nombre" className="gri-field-label block">
            ¿Cómo se llama tu marca? <span className="text-destructive" aria-hidden="true">*</span>
          </label>
          <Input
            id="pesquisa-nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Ej: Patagonia, CopperBox, Lúmina..."
            className="h-11"
            aria-required="true"
            onKeyDown={e => e.key === 'Enter' && buscar()}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="pesquisa-descripcion" className="gri-field-label block">
            ¿Qué hace o qué vende tu marca?{' '}
            <span className="text-muted-foreground font-normal text-gri-body-xs">(opcional)</span>
          </label>
          <Textarea
            id="pesquisa-descripcion"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            placeholder="Ej: Software para gestión de licencias empresariales..."
            className="resize-none"
            rows={3}
          />
        </div>
        <Button
          onClick={buscar}
          disabled={!nombre.trim() || cargando}
          size="form"
          className="w-full font-semibold gap-2"
          aria-disabled={!nombre.trim() || cargando}
        >
          {cargando ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Buscando marcas similares...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Buscar marcas similares
            </>
          )}
        </Button>
      </div>

      {/* Resultados */}
      {buscado && (
        <div className="bg-gob-surface rounded-gob-lg border border-gob-border p-gob-5 space-y-gob-4 shadow-elevation-02">
          {/* Barra térmica */}
          <div
            role="status"
            aria-live="polite"
            aria-label={`Similitud: ${similitudMax}%. ${nivel.label}`}
            className="bg-gob-surface rounded-gob-lg border border-gob-border p-gob-5 space-y-gob-4 shadow-elevation-02"
          >
            <div className="flex items-center justify-between">
              <p className="text-gri-body-sm font-semibold text-gob-text uppercase tracking-wide">
                Nivel de similitud encontrado
              </p>
              <span className={cn('text-2xl font-black font-mono tabular-nums', nivel.textColor)}>
                {similitudMax}%
              </span>
            </div>
            <div className="relative w-full h-3 bg-gob-surface-elevated rounded-full overflow-hidden">
              <div
                className={cn('absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out', nivel.color)}
                style={{ width: `${similitudMax}%` }}
              />
            </div>
            {/* Leyenda */}
            <div className="flex justify-between text-gri-label font-semibold uppercase text-muted-foreground">
              <span>Verde</span><span>Amarillo</span><span>Naranja</span><span>Rojo</span>
            </div>
            <p className={cn('text-sm font-semibold', nivel.textColor)}>
              {nivel.label}
            </p>
            <span className="sr-only">{nivel.label}</span>
          </div>

          {/* Advertencia contextual */}
          {nivel.showAlert && (
            <div className={cn('p-4 rounded-xl flex gap-3', nivel.bgAlert)} role="alert">
              <AlertTriangle className="w-5 h-5 shrink-0 text-stepper-error" />
              <p className="text-gri-body-sm font-semibold text-gob-text">
                Encontramos marcas con alta similitud a la tuya. Esto puede afectar la aprobación
                de tu solicitud. Te recomendamos revisar las diferencias antes de continuar.
              </p>
            </div>
          )}

          {/* Tabla de resultados */}
          {resultados.length > 0 ? (
            <div className="bg-gob-surface rounded-gob-lg border border-gob-border overflow-hidden shadow-elevation-02">
              <div className="px-gob-5 py-gob-4 border-b border-gob-border bg-gob-surface-elevated">
                <p className="text-gri-label font-semibold uppercase tracking-widest text-muted-foreground">
                  Marcas similares encontradas
                </p>
              </div>
              <div className="divide-y divide-gob-border">
                {resultados.map(r => (
                  <div key={r.id} className="px-gob-5 py-gob-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gob-text truncate">{r.nombre}</p>
                      <p className="text-gri-body-xs text-muted-foreground truncate">{r.descripcion}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-gri-label font-semibold uppercase text-muted-foreground bg-gob-surface-elevated px-2 py-1 rounded">
                        Clase {r.clase}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn('font-bold uppercase', badgeEstado[r.estado].class)}
                      >
                        {badgeEstado[r.estado].label}
                      </Badge>
                      <span className={cn('font-mono text-sm font-black tabular-nums w-12 text-right', nivel.textColor)}>
                        {r.similitud}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gob-success-bg border border-gob-success/30 rounded-gob-lg p-gob-5 flex gap-gob-3 items-center">
              <CheckCircle2 className="w-6 h-6 text-gob-success shrink-0" />
              <div>
                <p className="font-semibold text-gob-success">¡Excelente! No encontramos marcas similares.</p>
                <p className="text-gri-body-sm text-gob-success/80 mt-1">Puedes continuar con alta probabilidad de éxito.</p>
              </div>
            </div>
          )}

          {/* Nota legal */}
          <div className="flex gap-2 p-gob-4 bg-gob-surface-elevated rounded-gob-md border border-gob-border">
              <Info className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
              <p className="text-gri-body-xs text-muted-foreground leading-relaxed">
              Esta búsqueda es indicativa y no constituye una opinión jurídica. El examen oficial
              de fondo es realizado por los examinadores de INAPI una vez presentada la solicitud.
            </p>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3">
            {onAjustar && (
              <Button
                variant="outline"
                onClick={onAjustar}
                size="form"
                className="font-semibold gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Ajustar mi marca
              </Button>
            )}
            <Button
              onClick={() => onContinuar(similitudMax)}
              variant="primary-dark"
              size="form"
              className="flex-1 font-semibold gap-2"
            >
              Continuar con mi solicitud
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Estado inicial — sin buscar todavía */}
      {!buscado && !cargando && (
        <div className="text-center py-gob-7 text-muted-foreground space-y-2">
          <Search className="w-10 h-10 mx-auto opacity-30" />
          <p className="text-gri-body-sm font-medium">Ingresa el nombre de tu marca para comenzar la búsqueda</p>
        </div>
      )}
    </div>
  )
}
