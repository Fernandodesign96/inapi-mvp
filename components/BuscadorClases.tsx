// Resuelve el problema central del audit: la tabla de 500+ resultados sin filtrado inteligente. Este componente recibe las clases ya agregadas y dos callbacks como props.
'use client'

import { useState } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useClaseSugerida } from '@/hooks/useClaseSugerida'
import { GlosarioTerm } from '@/components/GlosarioTerm'
import { cn } from '@/lib/utils'
import { X, Search } from 'lucide-react'
import type { Cobertura } from '@/lib/types'

interface Props {
  clasesAgregadas: Cobertura[]
  onAgregar: (cobertura: Cobertura) => void
  onEliminar: (id: string) => void
  initialQuery?: string
}

export function BuscadorClases({ clasesAgregadas, onAgregar, onEliminar, initialQuery = '' }: Props) {
  const { query, setQuery, sugerencias, limpiar } = useClaseSugerida(initialQuery)
  const [seleccionada, setSeleccionada] = useState<Cobertura | null>(null)// Puede ser Valor Cobertura o Valor inicial (null), al empezar no hay nada seleccionado
  const [dialogAbierto, setDialogAbierto] = useState(false)

  const handleSeleccionar = (cobertura: Cobertura) => {
    setSeleccionada(cobertura)
    setDialogAbierto(true)
  }

  const handleConfirmar = () => {
    if (seleccionada) {
      onAgregar(seleccionada)
      setDialogAbierto(false)
      setSeleccionada(null)
      // Ya no llamamos a limpiar() para permitir selecciones múltiples rápidas
    }
  }

  const handleCancelar = () => {
    setDialogAbierto(false)
    setSeleccionada(null)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Escribe el nombre o descripción de tu producto o servicio para encontrar
          la <GlosarioTerm termino="Clase de Niza">clase de Niza</GlosarioTerm> correcta.
          Te recomendamos usar{' '}
          <GlosarioTerm termino="Cobertura preaprobada">coberturas preaprobadas</GlosarioTerm>{' '}
          para reducir el riesgo de rechazo.
        </p>
      </div>

      <Command shouldFilter={false} className="rounded-gob-lg border border-gob-border shadow-elevation-03 overflow-hidden bg-gob-surface">
        <div className="relative flex items-center w-full bg-gob-surface group select-none">
          <div className="pl-gob-5 text-muted-foreground">
            <Search className="w-5 h-5 flex-shrink-0" />
          </div>
          <CommandPrimitive.Input
            placeholder="Ej: software, ropa deportiva, café..."
            value={query}
            onValueChange={setQuery}
            className="h-11 text-gri-body pr-gob-6 pl-gob-4 w-full border-none focus:outline-none focus:ring-0 shadow-none bg-transparent text-gob-text placeholder:text-muted-foreground/50"
          />
          {query.length > 0 && (
            <button
              onClick={limpiar}
              className="absolute right-gob-4 p-2 rounded-full hover:bg-gob-danger-bg text-destructive transition-colors z-10"
              title="Borrar búsqueda"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <CommandList className="max-h-[300px]">
          {query.length >= 2 && sugerencias.length === 0 && (
            <CommandEmpty className="py-gob-5 text-muted-foreground font-medium">
              No encontramos coberturas para ese término. Intenta con otras palabras.
            </CommandEmpty>
          )}
          {sugerencias.length > 0 && (
            <CommandGroup heading="Coberturas sugeridas por el sistema">
              {sugerencias.map(cobertura => {
                const yaAgregada = clasesAgregadas.some(c => c.id === cobertura.id)
                return (
                  <CommandItem
                    key={cobertura.id}
                    onSelect={() => !yaAgregada && handleSeleccionar(cobertura)}
                    className={cn(
                      "py-3 px-4 transition-colors",
                      yaAgregada ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer hover:bg-gob-surface-elevated'
                    )}
                  >
                    <div className="flex items-center justify-between w-full gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Badge variant="outline" className="font-semibold uppercase shrink-0">
                          Clase {cobertura.clase}
                        </Badge>
                        <span className="text-gri-body-sm font-medium text-gob-text truncate">{cobertura.descripcion}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {cobertura.tipo === 'ICPA' && (
                          <Badge variant="success" className="font-semibold">
                            <GlosarioTerm termino="ICPA">ICPA</GlosarioTerm>
                          </Badge>
                        )}
                        {yaAgregada && (
                          <Badge variant="outline" className="font-semibold uppercase text-muted-foreground">
                            Agregada
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          )}
        </CommandList>
      </Command>

      {/* Clases agregadas */}
      {clasesAgregadas.length > 0 && (
        <div className="space-y-3 pt-4">
          <p className="text-gri-label font-semibold uppercase text-muted-foreground tracking-widest pl-1">
            Clases seleccionadas para tu solicitud
          </p>
          <div className="space-y-2">
            {clasesAgregadas.map(cobertura => (
              <div
                key={cobertura.id}
                className="flex items-center justify-between p-gob-4 rounded-gob-lg border border-gob-border bg-gob-surface-elevated/50 group hover:border-primary transition-all shadow-elevation-02"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="font-semibold uppercase shrink-0">
                    Clase {cobertura.clase}
                  </Badge>
                  <span className="text-gri-body-sm font-semibold text-gob-text">
                    {cobertura.descripcion}
                  </span>
                  {cobertura.tipo === 'ICPA' && (
                    <Badge variant="success" className="font-semibold">ICPA</Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEliminar(cobertura.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-gob-danger-bg font-semibold text-gri-label uppercase"
                >
                  Eliminar
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dialog de confirmación */}
      <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
        <DialogContent className="sm:max-w-md border-none shadow-elevation-04 rounded-gob-xl overflow-hidden p-0">
          <div className="h-2 bg-primary" />
          <div className="p-8 space-y-6">
            <DialogHeader>
              <DialogTitle className="font-heading text-gri-h1 font-medium text-gob-text tracking-tight uppercase">
                Confirmar Cobertura
              </DialogTitle>
              <DialogDescription className="text-muted-foreground font-medium leading-relaxed pt-gob-2 text-gri-body">
                ¿Deseas agregar esta descripción oficial a tu solicitud?
              </DialogDescription>
            </DialogHeader>
            {seleccionada && (
              <div className="p-gob-5 rounded-gob-xl border border-gob-border bg-gob-surface-elevated space-y-gob-3">
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-semibold">Clase {seleccionada.clase}</Badge>
                    {seleccionada.tipo === 'ICPA' && (
                    <Badge variant="success" className="font-semibold">ICPA</Badge>
                  )}
                </div>
                <p className="text-gri-body font-semibold text-gob-text leading-tight">
                  {seleccionada.descripcion}
                </p>
                <p className="text-gri-body-xs text-muted-foreground leading-relaxed font-medium">
                  Esta es una <span className="text-primary font-bold">cobertura preaprobada</span> por INAPI. 
                  Su uso garantiza rapidez en el examen legal de tu marca.
                </p>
              </div>
            )}
            <DialogFooter className="gap-3 sm:flex-col sm:space-x-0">
              <Button
                onClick={handleConfirmar}
                size="form"
                className="w-full font-semibold text-gri-btn uppercase tracking-tight"
              >
                Agregar a mi solicitud
              </Button>
              <Button
                variant="ghost"
                onClick={handleCancelar}
                className="w-full font-semibold text-muted-foreground uppercase text-gri-label tracking-widest"
              >
                Seguir buscando
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}