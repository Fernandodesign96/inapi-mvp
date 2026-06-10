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
    circle: 'bg-stepper-pending-bg text-stepper-pending border-gob-border',
    linea: 'bg-gob-border',
    label: 'text-stepper-pending',
    icono: (num: number) => <span className="text-gri-body-xs font-semibold">{num}</span>,
  },
  activa: {
    circle: 'bg-stepper-active-bg text-stepper-active border-stepper-active ring-4 ring-stepper-active/10 scale-110',
    linea: 'bg-gob-border',
    label: 'text-stepper-active font-bold',
    icono: (num: number) => <span className="text-gri-body-xs font-bold">{num}</span>,
  },
  completada: {
    circle: 'bg-stepper-done-bg text-stepper-done border-stepper-done shadow-sm shadow-stepper-done/20',
    linea: 'bg-stepper-done',
    label: 'text-stepper-done font-medium',
    icono: () => <Check className="w-3.5 h-3.5" strokeWidth={3} />,
  },
  error: {
    circle: 'bg-stepper-error-bg text-stepper-error border-stepper-error',
    linea: 'bg-gob-border',
    label: 'text-stepper-error font-medium',
    icono: () => <X className="w-3.5 h-3.5" strokeWidth={3} />,
  },
}

export function StepperSolicitud({ secciones }: Props) {
  const completadas = secciones.filter(s => s.estado === 'completada').length
  const porcentaje = Math.round((completadas / secciones.length) * 100)
  const idxActiva = secciones.findIndex(s => s.estado === 'activa')
  const pasoActualNum = idxActiva >= 0 ? idxActiva + 1 : completadas + 1

  return (
    <div className="w-full py-gob-5 px-gob-4 bg-gob-surface/80 backdrop-blur-sm rounded-gob-lg border border-gob-border shadow-elevation-02 space-y-gob-5">
      {/* Encabezado con progreso */}
      <div className="flex items-end justify-between px-1">
        <div className="space-y-0.5">
          <p className="text-gri-label font-semibold text-muted-foreground uppercase tracking-widest sm:hidden">
            Paso {pasoActualNum} de {secciones.length}
          </p>
          <h3 className="hidden sm:block font-heading text-gri-body-sm font-medium text-gob-text tracking-tight uppercase">
            Avance de Solicitud
          </h3>
          <p className="hidden sm:block text-gri-body-xs text-muted-foreground font-medium">
            {completadas} de {secciones.length} etapas procesadas
          </p>
        </div>
        <span className="text-2xl font-black text-gob-primary tabular-nums font-mono">
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
        className="relative w-full h-2 bg-gob-surface-elevated rounded-full overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 h-full bg-gob-primary rounded-full transition-all duration-700 ease-out"
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
                        ? 'bg-stepper-done'
                        : 'bg-gob-border'
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
                  aria-label={`${seccion.nombre}: ${seccion.estado === 'completada' ? 'completada' : seccion.estado === 'activa' ? 'paso actual' : seccion.estado === 'error' ? 'con error' : 'pendiente'}`}
                >
                  {config.icono(index + 1)}
                </div>

                {/* Etiqueta */}
                <div className="mt-2.5 text-center px-1">
                  <span
                    className={cn(
                      'block text-gri-label uppercase tracking-wider font-bold transition-colors duration-300 leading-tight',
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
          <p key={s.id} className="text-gri-body-sm font-bold text-stepper-active text-center">
            {i + 1}. {s.nombre}
          </p>
        ))}
      </div>
    </div>
  )
}