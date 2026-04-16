import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">I</span>
            </div>
            <p className="text-sm font-medium text-foreground">INAPI — Prototipo MVP</p>
          </div>
          <Badge variant="outline" className="text-xs">
            UX Audit 2026
          </Badge>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 max-w-3xl mx-auto px-4 py-12 space-y-8">
        <div className="space-y-3">
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Propuesta de rediseño
          </Badge>
          <h1 className="text-2xl font-medium text-foreground leading-snug">
            Solicitud de marca simplificada
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Este prototipo demuestra tres intervenciones de diseño para reducir
            la fricción en el flujo de registro de marca de INAPI, basadas en
            un análisis heurístico del sistema actual.
          </p>
        </div>

        {/* Las 3 oportunidades */}
        <div className="grid gap-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Op. 1</Badge>
                <CardTitle className="text-sm font-medium">
                  Buscador inteligente de coberturas
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs leading-relaxed">
                Reemplaza la tabla de 500+ resultados paginados por un buscador
                con sugerencias automáticas basadas en lenguaje cotidiano.
                Reduce errores de clasificación y tiempo en tarea.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Op. 2</Badge>
                <CardTitle className="text-sm font-medium">
                  Stepper de progreso visible
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs leading-relaxed">
                Indicador persistente que muestra en qué paso está el usuario,
                cuánto falta y qué secciones están completas. Reduce la
                ansiedad de proceso y el drop-off.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">Op. 3</Badge>
                <CardTitle className="text-sm font-medium">
                  Glosario inline contextual
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs leading-relaxed">
                Los términos técnicos muestran su definición en un popover
                sin salir del flujo. Elimina la necesidad de redirigir al
                usuario a páginas externas.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Link href="/solicitud" className="block">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11">
            Ver prototipo — Solicitar marca
          </Button>
        </Link>

        <p className="text-xs text-muted-foreground text-center">
          Construido con Next.js 16 · TypeScript · shadcn/ui · Firebase · Fuse.js
        </p>
      </div>
    </div>
  )
}