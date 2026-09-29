'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import glosario from '@/data/glosario.json'

interface Props {
  termino: string
  children: React.ReactNode
}

export function GlosarioTerm({ termino, children }: Props) {
  const entrada = glosario.find(
    g => g.termino.toLowerCase() === termino.toLowerCase()
  )

  if (!entrada) return <span>{children}</span>

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline border-b border-dashed border-gob-link cursor-help text-gob-link hover:text-gob-link/80 transition-colors bg-transparent p-0 font-inherit text-inherit focus-gob rounded-sm"
          aria-label={`Definición de ${entrada.termino}`}
        >
          {children}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-gob-4" side="top">
        <div className="space-y-2">
          <p className="font-medium text-gri-body-sm text-gob-text">
            {entrada.termino}
          </p>
          <p className="text-gri-body-sm text-muted-foreground leading-relaxed">
            {entrada.definicion}
          </p>
          {entrada.ejemplo && (
            <div className="pt-1 border-t border-gob-border">
              <p className="text-gri-body-xs text-muted-foreground">
                <span className="font-medium">Ejemplo: </span>
                {entrada.ejemplo}
              </p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
