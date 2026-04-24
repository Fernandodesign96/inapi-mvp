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
    color: 'bg-[#059669]',
    textColor: 'text-[#059669]',
    bgAlert: '',
    showAlert: false,
  }
  if (pct <= 60) return {
    label: 'Existen marcas similares. Analiza las diferencias.',
    color: 'bg-[#D97706]',
    textColor: 'text-[#D97706]',
    bgAlert: '',
    showAlert: false,
  }
  if (pct <= 85) return {
    label: 'Riesgo moderado. Considera ajustar tu marca.',
    color: 'bg-[#EA580C]',
    textColor: 'text-[#EA580C]',
    bgAlert: 'border-l-4 border-[#EA580C] bg-orange-50',
    showAlert: true,
  }
  return {
    label: 'Alta probabilidad de rechazo. Revisa las similitudes.',
    color: 'bg-[#DC2626]',
    textColor: 'text-[#DC2626]',
    bgAlert: 'border-l-4 border-[#DC2626] bg-[#FEE2E2]',
    showAlert: true,
  }
}

const badgeEstado = {
  vigente:    { label: 'Vigente',    class: 'bg-green-100 text-green-700 border-green-200' },
  caducada:   { label: 'Caducada',   class: 'bg-gray-100 text-gray-500 border-gray-200'   },
  en_tramite: { label: 'En Trámite', class: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
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
        <h2 className="text-2xl font-black text-slate-900 leading-tight">
          ¿Existe una marca similar a la tuya?
        </h2>
        <p className="text-slate-500 leading-relaxed">
          Antes de continuar, buscamos en el registro de INAPI si ya existe una marca similar.
          Esto te ayuda a conocer las probabilidades de éxito de tu solicitud.
        </p>
      </div>

      {/* Formulario de búsqueda */}
      <div className="bg-white rounded-2xl border border-[#D1D5DB] p-6 space-y-5 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="pesquisa-nombre" className="text-sm font-bold text-slate-700 block">
            ¿Cómo se llama tu marca? <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <Input
            id="pesquisa-nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Ej: Patagonia, CopperBox, Lúmina..."
            className="h-12 border-[#D1D5DB] focus:ring-2 focus:ring-[#1A56DB] focus:ring-offset-2"
            aria-required="true"
            onKeyDown={e => e.key === 'Enter' && buscar()}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="pesquisa-descripcion" className="text-sm font-bold text-slate-700 block">
            ¿Qué hace o qué vende tu marca?{' '}
            <span className="text-slate-400 font-normal text-xs">(opcional)</span>
          </label>
          <Textarea
            id="pesquisa-descripcion"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            placeholder="Ej: Software para gestión de licencias empresariales..."
            className="resize-none border-[#D1D5DB] focus:ring-2 focus:ring-[#1A56DB] focus:ring-offset-2"
            rows={3}
          />
        </div>
        <Button
          onClick={buscar}
          disabled={!nombre.trim() || cargando}
          className="w-full h-12 bg-[#1A56DB] hover:bg-[#1E3A8A] text-white font-bold gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
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
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
          {/* Barra térmica */}
          <div
            role="status"
            aria-live="polite"
            aria-label={`Similitud: ${similitudMax}%. ${nivel.label}`}
            className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-slate-700 uppercase tracking-wide">
                Nivel de similitud encontrado
              </p>
              <span className={cn('text-2xl font-black font-mono tabular-nums', nivel.textColor)}>
                {similitudMax}%
              </span>
            </div>
            <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={cn('absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out', nivel.color)}
                style={{ width: `${similitudMax}%` }}
              />
            </div>
            {/* Leyenda */}
            <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
              <span>Verde</span><span>Amarillo</span><span>Naranja</span><span>Rojo</span>
            </div>
            <p className={cn('text-sm font-semibold', nivel.textColor)}>
              {nivel.label}
            </p>
            <span className="sr-only">{nivel.label}</span>
          </div>

          {/* Advertencia contextual */}
          {nivel.showAlert && (
            <div className={cn('p-4 rounded-xl flex gap-3', nivel.bgAlert)}>
              <AlertTriangle className="w-5 h-5 shrink-0 text-[#DC2626]" />
              <p className="text-sm font-semibold text-slate-800">
                Encontramos marcas con alta similitud a la tuya. Esto puede afectar la aprobación
                de tu solicitud. Te recomendamos revisar las diferencias antes de continuar.
              </p>
            </div>
          )}

          {/* Tabla de resultados */}
          {resultados.length > 0 ? (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-[#E5E7EB] bg-slate-50">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Marcas similares encontradas
                </p>
              </div>
              <div className="divide-y divide-[#E5E7EB]">
                {resultados.map(r => (
                  <div key={r.id} className="px-6 py-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 truncate">{r.nombre}</p>
                      <p className="text-xs text-slate-500 truncate">{r.descripcion}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-100 px-2 py-1 rounded">
                        Clase {r.clase}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn('text-[10px] font-bold uppercase', badgeEstado[r.estado].class)}
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
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex gap-3 items-center">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
              <div>
                <p className="font-bold text-green-800">¡Excelente! No encontramos marcas similares.</p>
                <p className="text-sm text-green-700 mt-1">Puedes continuar con alta probabilidad de éxito.</p>
              </div>
            </div>
          )}

          {/* Nota legal */}
          <div className="flex gap-2 p-4 bg-[#F3F4F6] rounded-xl border border-[#E5E7EB]">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
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
                className="h-12 border-[#D1D5DB] font-bold gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Ajustar mi marca
              </Button>
            )}
            <Button
              onClick={() => onContinuar(similitudMax)}
              className="flex-1 h-12 bg-slate-900 hover:bg-black text-white font-black gap-2"
            >
              Continuar con mi solicitud
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Estado inicial — sin buscar todavía */}
      {!buscado && !cargando && (
        <div className="text-center py-8 text-slate-400 space-y-2">
          <Search className="w-10 h-10 mx-auto opacity-30" />
          <p className="text-sm font-medium">Ingresa el nombre de tu marca para comenzar la búsqueda</p>
        </div>
      )}
    </div>
  )
}
