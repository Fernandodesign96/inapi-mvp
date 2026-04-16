'use client'

import type { SeccionEstado } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  secciones: SeccionEstado[]
}

const estadoConfig = {
  pendiente: {
    circle: 'bg-slate-100 text-slate-400 border-slate-200',
    linea: 'bg-slate-200',
    label: 'text-slate-400',
    icono: (num: number) => <span className="text-xs font-semibold">{num}</span>,
  },
  activa: {
    circle: 'bg-white text-primary border-primary ring-4 ring-primary/5',
    linea: 'bg-slate-200',
    label: 'text-primary font-bold',
    icono: (num: number) => <span className="text-xs font-bold">{num}</span>,
  },
  completada: {
    circle: 'bg-green-600 text-white border-green-600 shadow-sm shadow-green-200',
    linea: 'bg-green-600',
    label: 'text-green-600 font-medium',
    icono: () => <span className="text-xs">✓</span>,
  },
  error: {
    circle: 'bg-red-600 text-white border-red-600',
    linea: 'bg-slate-200',
    label: 'text-red-600 font-medium',
    icono: () => <span className="text-xs">✕</span>,
  },
}

export function StepperSolicitud({ secciones }: Props) {
  const completadas = secciones.filter(s => s.estado === 'completada').length
  const porcentaje = Math.round((completadas / secciones.length) * 100)

  return (
    <div className="w-full py-6 px-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm space-y-8">
      {/* Encabezado de Progreso */}
      <div className="flex items-end justify-between px-1">
        <div className="space-y-1">
          <h3 className="text-sm font-black text-slate-900 tracking-tight uppercase">
            Avance de Solicitud
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            {completadas} de {secciones.length} etapas procesadas
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-primary tabular-nums">
            {porcentaje}%
          </span>
        </div>
      </div>

      {/* Barra de progreso sutil */}
      <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-700 ease-out"
          style={{ width: `${porcentaje}%` }}
        />
      </div>

      {/* Contenedor de Pasos */}
      <div className="relative flex justify-between items-start">
        {secciones.map((seccion, index) => {
          const config = estadoConfig[seccion.estado]
          const isLast = index === secciones.length - 1
          
          return (
            <div key={seccion.id} className="flex flex-col items-center flex-1 relative group">
              {/* Línea conectora */}
              {!isLast && (
                <div className={cn(
                  "absolute top-4 left-[50%] w-full h-[2px] -z-10 transition-colors duration-500",
                  seccion.estado === 'completada' ? 'bg-green-500' : 'bg-slate-200'
                )} />
              )}

              {/* Círculo */}
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 border-2 z-10",
                  config.circle,
                  seccion.estado === 'activa' && "scale-110"
                )}
              >
                {config.icono(index + 1)}
              </div>

              {/* Etiqueta */}
              <div className="mt-3 text-center px-1">
                <span className={cn(
                  "block text-[10px] uppercase tracking-wider font-bold transition-colors duration-300",
                  config.label
                )}>
                  {seccion.nombre}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}