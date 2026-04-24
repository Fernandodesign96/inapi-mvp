'use client'

import type { SeccionEstado } from '@/lib/types'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  secciones: SeccionEstado[]
  pasoActual?: number
}

const estadoConfig = {
  pendiente: {
    circle: 'bg-[#F3F4F6] text-[#9CA3AF] border-[#E5E7EB]',
    linea: 'bg-[#E5E7EB]',
    label: 'text-[#9CA3AF]',
    icono: (num: number) => <span className="text-xs font-semibold">{num}</span>,
  },
  activa: {
    circle: 'bg-[#FEF3C7] text-[#D97706] border-[#D97706] ring-4 ring-[#D97706]/10 scale-110',
    linea: 'bg-[#E5E7EB]',
    label: 'text-[#D97706] font-bold',
    icono: (num: number) => <span className="text-xs font-bold">{num}</span>,
  },
  completada: {
    circle: 'bg-[#D1FAE5] text-[#059669] border-[#059669] shadow-sm shadow-green-100',
    linea: 'bg-[#059669]',
    label: 'text-[#059669] font-medium',
    icono: () => <Check className="w-3.5 h-3.5" strokeWidth={3} />,
  },
  error: {
    circle: 'bg-[#FEE2E2] text-[#DC2626] border-[#DC2626]',
    linea: 'bg-[#E5E7EB]',
    label: 'text-[#DC2626] font-medium',
    icono: () => <X className="w-3.5 h-3.5" strokeWidth={3} />,
  },
}

export function StepperSolicitud({ secciones }: Props) {
  const completadas = secciones.filter(s => s.estado === 'completada').length
  const porcentaje = Math.round((completadas / secciones.length) * 100)
  const idxActiva = secciones.findIndex(s => s.estado === 'activa')
  const pasoActualNum = idxActiva >= 0 ? idxActiva + 1 : completadas + 1

  return (
    <div className="w-full py-5 px-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E5E7EB] shadow-sm space-y-6">
      {/* Encabezado con progreso */}
      <div className="flex items-end justify-between px-1">
        <div className="space-y-0.5">
          {/* Vista móvil */}
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest sm:hidden">
            Paso {pasoActualNum} de {secciones.length}
          </p>
          {/* Vista desktop */}
          <h3 className="hidden sm:block text-sm font-black text-slate-900 tracking-tight uppercase">
            Avance de Solicitud
          </h3>
          <p className="hidden sm:block text-xs text-slate-500 font-medium">
            {completadas} de {secciones.length} etapas procesadas
          </p>
        </div>
        <span className="text-2xl font-black text-[#1A56DB] tabular-nums font-mono">
          {porcentaje}%
        </span>
      </div>

      {/* Barra de progreso lineal */}
      <div
        role="progressbar"
        aria-valuenow={porcentaje}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso del formulario"
        className="relative w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 h-full bg-[#1A56DB] rounded-full transition-all duration-700 ease-out"
          style={{ width: `${porcentaje}%` }}
        />
      </div>

      {/* Pasos — oculto en móvil cuando solo hay 1 paso activo */}
      <nav aria-label="Progreso del formulario" className="hidden sm:block">
        <div className="relative flex justify-between items-start">
          {secciones.map((seccion, index) => {
            const config = estadoConfig[seccion.estado]
            const isLast = index === secciones.length - 1
            const prevCompletada = index > 0 && secciones[index - 1].estado === 'completada'

            return (
              <div key={seccion.id} className="flex flex-col items-center flex-1 relative">
                {/* Línea conectora */}
                {!isLast && (
                  <div
                    className={cn(
                      'absolute top-[18px] left-[50%] w-full h-[2px] -z-10 transition-colors duration-500',
                      prevCompletada || seccion.estado === 'completada'
                        ? 'bg-[#059669]'
                        : 'bg-[#E5E7EB]'
                    )}
                  />
                )}

                {/* Círculo */}
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 border-2 z-10',
                    config.circle
                  )}
                  aria-current={seccion.estado === 'activa' ? 'step' : undefined}
                >
                  {config.icono(index + 1)}
                </div>

                {/* Etiqueta */}
                <div className="mt-2.5 text-center px-1">
                  <span
                    className={cn(
                      'block text-[10px] uppercase tracking-wider font-bold transition-colors duration-300 leading-tight',
                      config.label
                    )}
                  >
                    {seccion.nombre}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </nav>

      {/* Vista móvil — nombre del paso actual */}
      <div className="sm:hidden">
        {secciones.map((s, i) => s.estado === 'activa' && (
          <p key={s.id} className="text-sm font-bold text-[#D97706] text-center">
            {i + 1}. {s.nombre}
          </p>
        ))}
      </div>
    </div>
  )
}