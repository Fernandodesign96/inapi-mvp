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

        <Command shouldFilter={false} className="rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden bg-white">
        <div className="relative flex items-center w-full bg-white group select-none">
          <div className="pl-6 text-slate-400">
            <Search className="w-5 h-5 flex-shrink-0" />
          </div>
          <CommandPrimitive.Input
            placeholder="Ej: software, ropa deportiva, café..."
            value={query}
            onValueChange={setQuery}
            className="h-16 text-lg pr-16 pl-4 w-full border-none focus:outline-none focus:ring-0 shadow-none bg-transparent text-slate-700 placeholder:text-slate-300"
          />
          {query.length > 0 && (
            <button
              onClick={limpiar}
              className="absolute right-5 p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors z-10"
              title="Borrar búsqueda"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
        <CommandList className="max-h-[300px]">
          {query.length >= 2 && sugerencias.length === 0 && (
            <CommandEmpty className="py-6 text-slate-500 font-medium">
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
                      yaAgregada ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50'
                    )}
                  >
                    <div className="flex items-center justify-between w-full gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Badge variant="outline" className="text-[10px] font-black uppercase shrink-0 bg-slate-50 border-slate-200 text-slate-600">
                          Clase {cobertura.clase}
                        </Badge>
                        <span className="text-sm font-medium text-slate-700 truncate">{cobertura.descripcion}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {cobertura.tipo === 'ICPA' && (
                          <Badge className="text-[10px] bg-green-100 text-green-700 hover:bg-green-100 border-none font-black px-1.5 py-0.5">
                            <GlosarioTerm termino="ICPA">ICPA</GlosarioTerm>
                          </Badge>
                        )}
                        {yaAgregada && (
                          <Badge variant="outline" className="text-[10px] font-bold uppercase border-slate-300 text-slate-400 bg-slate-50">
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
          <p className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">
            Clases seleccionadas para tu solicitud
          </p>
          <div className="space-y-2">
            {clasesAgregadas.map(cobertura => (
              <div
                key={cobertura.id}
                className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 group hover:border-primary transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-[10px] font-black bg-white border-slate-200">
                    Clase {cobertura.clase}
                  </Badge>
                  <span className="text-sm font-semibold text-slate-700">
                    {cobertura.descripcion}
                  </span>
                  {cobertura.tipo === 'ICPA' && (
                    <Badge className="text-[10px] bg-green-100 text-green-700 font-black">
                      ICPA
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEliminar(cobertura.id)}
                  className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 px-3 rounded-xl transition-colors font-bold text-xs uppercase"
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
        <DialogContent className="sm:max-w-md border-none shadow-2xl rounded-[32px] overflow-hidden p-0">
          <div className="h-2 bg-primary" />
          <div className="p-8 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Confirmar Cobertura</DialogTitle>
              <DialogDescription className="text-slate-500 font-medium leading-relaxed pt-2 text-base">
                ¿Deseas agregar esta descripción oficial a tu solicitud?
              </DialogDescription>
            </DialogHeader>
            {seleccionada && (
              <div className="p-6 rounded-3xl border border-slate-100 bg-slate-50 space-y-3 shadow-inner">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-white font-black">Clase {seleccionada.clase}</Badge>
                  {seleccionada.tipo === 'ICPA' && (
                    <Badge className="bg-green-100 text-green-700 font-black">
                      ICPA
                    </Badge>
                  )}
                </div>
                <p className="text-base font-bold text-slate-800 leading-tight">
                  {seleccionada.descripcion}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Esta es una <span className="text-primary font-bold">cobertura preaprobada</span> por INAPI. 
                  Su uso garantiza rapidez en el examen legal de tu marca.
                </p>
              </div>
            )}
            <DialogFooter className="gap-3 sm:flex-col sm:space-x-0">
              <Button 
                onClick={handleConfirmar}
                className="w-full h-14 bg-primary hover:bg-primary-dark text-white font-black text-lg uppercase tracking-tight rounded-2xl shadow-xl shadow-primary/20"
              >
                Agregar a mi solicitud
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleCancelar}
                className="w-full h-12 font-bold text-slate-400 uppercase text-[10px] tracking-widest"
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