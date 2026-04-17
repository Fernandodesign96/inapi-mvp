'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Info, CreditCard, ChevronRight } from 'lucide-react'

interface Props {
  onStart: () => void
}

export function StepLanding({ onStart }: Props) {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Hero Section Institucional */}
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-4">
          <Badge variant="outline" className="px-4 py-1.5 text-primary border-primary/20 bg-primary/5 font-black tracking-widest uppercase text-[10px] rounded-full">
            Instituto Nacional de Propiedad Industrial · Chile
          </Badge>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9] uppercase">
          Portal de Solicitud <br />
          <span className="text-primary">de Marca Comercial</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          Bienvenido al <strong>Portal INAPI</strong>. Inicia el proceso de protección de tu identidad comercial con validación oficial y asistencia inteligente.
        </p>
      </div>

      {/* Info Cards Gubernamentales */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-8 border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 space-y-4 bg-white rounded-3xl group">
          <div className="w-14 h-14 bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white rounded-2xl flex items-center justify-center transition-colors">
            <Info className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm">¿Qué es una marca?</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Es el signo que distingue tus productos o servicios en el mercado chileno.</p>
          </div>
        </Card>

        <Card className="p-8 border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 space-y-4 bg-white rounded-3xl group">
          <div className="w-14 h-14 bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white rounded-2xl flex items-center justify-center transition-colors">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm">Derecho Exclusivo</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">El registro te otorga la propiedad y el derecho a impedir que otros usen tu nombre.</p>
          </div>
        </Card>

        <Card className="p-8 border-primary/10 shadow-xl shadow-primary/5 space-y-4 bg-primary/[0.02] rounded-3xl ring-1 ring-primary/10">
          <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <CreditCard className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm">Transparencia</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Costos claros fijados por ley. Sin cargos ocultos durante el proceso oficial.</p>
          </div>
        </Card>
      </div>

      {/* Payment Transparency Section - Formalized */}
      <div className="bg-primary text-white rounded-[40px] p-10 md:p-16 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-10">
          <div className="space-y-4">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md">Estructura de Tasas Legales</Badge>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none">Costos del Proceso <br />de Registro</h2>
            <p className="text-blue-100 max-w-xl text-lg font-medium opacity-80">El registro se divide en tres hitos de pago obligatorios según la Ley de Propiedad Industrial:</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 border-t border-white/10 pt-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center text-xs font-black">1</div>
                <h4 className="font-black uppercase tracking-widest text-xs">Presentación</h4>
              </div>
              <p className="text-sm text-blue-50 font-medium">Pago inicial de 1 UTM por cada clase al ingresar esta solicitud.</p>
            </div>
            <div className="space-y-3 opacity-60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center text-xs font-black">2</div>
                <h4 className="font-black uppercase tracking-widest text-xs">Publicación</h4>
              </div>
              <p className="text-sm text-blue-50 font-medium">Pago al Diario Oficial una vez que INAPI acepte la solicitud a trámite.</p>
            </div>
            <div className="space-y-3 opacity-60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center text-xs font-black">3</div>
                <h4 className="font-black uppercase tracking-widest text-xs">Finalización</h4>
              </div>
              <p className="text-sm text-blue-50 font-medium">2 UTM por clase, pagaderas solo si la marca es finalmente concedida.</p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements - Chile Flag subtle hint */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-accent/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
      </div>

      {/* Action Section */}
      <div className="flex flex-col items-center gap-8 py-8">
        <Button 
          onClick={onStart}
          size="lg" 
          className="bg-primary hover:bg-primary-dark text-white px-16 py-10 rounded-3xl text-2xl font-black uppercase tracking-tighter gap-4 shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
        >
          Iniciar Solicitud Formal
          <ChevronRight className="w-8 h-8" />
        </Button>
        <div className="flex items-center gap-2 text-slate-400">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <p className="text-xs font-bold uppercase tracking-widest">
             Sistema nacional de marcas conectado · {new Date().getFullYear()}
           </p>
        </div>
      </div>
    </div>
  )
}
