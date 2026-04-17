// Resuelve el problema de que INAPI redirige al usuario a páginas externas para explicar términos técnicos. Este componente muestra la definición inline, sin salir del flujo.
'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import glosario from '@/data/glosario.json'

interface Props {
  termino: string
  children: React.ReactNode
}

export function GlosarioTerm({ termino, children }: Props) {
  const entrada = glosario.find(
    g => g.termino.toLowerCase() === termino.toLowerCase()// Búsqueda insensitive, ya sea con MAYÚSCULAS o minúsculas
  )

  if (!entrada) return <span>{children}</span>

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="border-b border-dashed border-blue-400 cursor-help text-blue-600 hover:text-blue-800 transition-colors">
          {children}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" side="top">
        <div className="space-y-2">
          <p className="font-medium text-sm text-foreground">
            {entrada.termino}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {entrada.definicion}
          </p>
          {entrada.ejemplo && (
            <div className="pt-1 border-t border-border">
              <p className="text-xs text-muted-foreground">
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