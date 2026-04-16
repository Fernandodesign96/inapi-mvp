'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { StepperSolicitud } from '@/components/StepperSolicitud'
import { BuscadorClases } from '@/components/BuscadorClases'
import { StepLanding } from '@/components/solicitud/StepLanding'
import { FormPersona } from '@/components/solicitud/FormPersona'
import { useSolicitud } from '@/hooks/useSolicitud'
import { RepresentanteData } from '@/lib/types'
import { extractKeywords, UTM_VALOR } from '@/lib/utils'
import { Info, AlertCircle, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { HeaderINAPI } from '@/components/layout/HeaderINAPI'
import { FooterINAPI } from '@/components/layout/FooterINAPI'
import { ChatFAB } from '@/components/layout/ChatFAB'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function SolicitudPage() {
  const {
    solicitud,
    guardando,
    actualizarDenominacion,
    actualizarPreguntasPerfil,
    actualizarTraduccion,
    actualizarTransliteracion,
    actualizarPrioridad,
    actualizarSolicitante,
    actualizarRepresentante,
    agregarClase,
    eliminarClase,
    guardarEnFirestore,
    completarSeccion,
    completarTodo,
  } = useSolicitud()

  const [step, setStep] = useState(0) // 0: Landing, 1-7: Stepper
  const [modalConfirmar, setModalConfirmar] = useState(false)
  const [modalExito, setModalExito] = useState(false)

  const queryInteligente = useMemo(() => {
    const combined = `${solicitud.preguntasPerfil.p1} ${solicitud.preguntasPerfil.p2} ${solicitud.preguntasPerfil.p3}`
    return extractKeywords(combined).join(' ')
  }, [solicitud.preguntasPerfil])

  const puedeAvanzar = useMemo(() => {
    if (step === 1) return solicitud.denominacion.length > 2
    if (step === 2) return solicitud.clases.length > 0
    if (step === 4) {
      const s = solicitud.solicitante
      if (!s) return false
      const basico = !!(s.rut && s.correo && s.direccion && s.ciudad && s.telefono)
      if (s.tipo === 'natural') return basico && !!(s.nombre && s.apellido)
      return basico && !!s.razonSocial
    }
    if (step === 5) {
      if (!solicitud.representante) return true 
      const r = solicitud.representante
      const basico = !!(r.rut && r.correo && r.direccion && r.ciudad && r.telefono)
      if (r.tipo === 'natural') return basico && !!(r.nombre && r.apellido)
      return basico && !!r.razonSocial
    }
    return true
  }, [step, solicitud])

  const irSiguiente = () => {
    if (!puedeAvanzar) {
       alert("Por favor, completa todos los campos requeridos marcados con * antes de continuar.")
       return
    }
    if (step > 0 && step < 7) {
      const currentId = solicitud.secciones[step - 1].id
      const nextId = solicitud.secciones[step].id
      completarSeccion(currentId, nextId)
    }
    setStep(prev => prev + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const irAtras = () => {
    setStep(prev => prev - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePresentar = () => setModalConfirmar(true)

  const handleConfirmarEnvio = async () => {
    await guardarEnFirestore()
    completarTodo()
    setModalConfirmar(false)
    setModalExito(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <HeaderINAPI />
      
      <main className="flex-1">
        {step === 0 ? (
          <StepLanding onStart={() => setStep(1)} />
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Registro de Progreso */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                 <span className="text-xs font-black uppercase tracking-widest text-slate-500">Paso {step} de 7</span>
              </div>
              {guardando && <span className="text-[10px] text-primary/50 font-bold uppercase animate-pulse">Guardando...</span>}
            </div>

            {/* Stepper Visual */}
            <StepperSolicitud secciones={solicitud.secciones} />

            {/* Contenido Dinámico */}
            <div className="min-h-[500px]">
              {step === 1 && (
                <Card className="border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                  <div className="h-2 bg-primary" />
                  <CardHeader className="pb-8">
                    <CardTitle className="text-2xl font-black text-slate-900 leading-tight">Define la identidad de tu marca</CardTitle>
                    <CardDescription className="text-slate-500">Comencemos con el nombre y una breve descripción de lo que haces.</CardDescription>
                  </CardHeader>
                   <CardContent className="space-y-8">
                    <TooltipProvider>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                          ¿Cuál es el nombre de la marca? 
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="w-4 h-4 text-slate-400 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Introduce el nombre distintivo de tu producto o servicio tal cual quieres que aparezca en el registro.</p>
                            </TooltipContent>
                          </Tooltip>
                        </label>
                        <Input placeholder="Ej: Cafetería El Valle" className="h-12 text-lg font-medium border-slate-200" value={solicitud.denominacion} onChange={e => actualizarDenominacion(e.target.value)} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                            Traducción
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-3 h-3 text-slate-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">Si el nombre está en otro idioma, indica aquí su significado en español.</p>
                              </TooltipContent>
                            </Tooltip>
                          </label>
                          <Input placeholder="..." value={solicitud.traduccion} onChange={e => actualizarTraduccion(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                            Transliteración
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="w-3 h-3 text-slate-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">Si el nombre usa caracteres no latinos (ej. chino), indica aquí su pronunciación fonética.</p>
                              </TooltipContent>
                            </Tooltip>
                          </label>
                          <Input placeholder="..." value={solicitud.transliteracion} onChange={e => actualizarTransliteracion(e.target.value)} />
                        </div>
                      </div>
                    </TooltipProvider>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                      <p className="text-sm font-semibold text-slate-800 italic">¿Qué productos o servicios ofreces?</p>
                      <Textarea placeholder="Ej: Vendo café orgánico..." value={solicitud.preguntasPerfil.p1} onChange={e => actualizarPreguntasPerfil({ p1: e.target.value })} />
                      <p className="text-sm font-semibold text-slate-800 italic">Describe tu marca en palabras clave.</p>
                      <Textarea placeholder="Ej: Artesanía, comercio justo..." value={solicitud.preguntasPerfil.p2} onChange={e => actualizarPreguntasPerfil({ p2: e.target.value })} />
                    </div>
                    <Button onClick={irSiguiente} className="w-full h-14 bg-slate-900 hover:bg-black text-white rounded-xl text-lg font-bold gap-2">Continuar a Clasificación <ArrowRight className="w-5 h-5" /></Button>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card className="border-slate-200 shadow-xl shadow-slate-200/50">
                   <CardHeader className="pb-8">
                    <CardTitle className="text-2xl font-black text-slate-900 leading-tight">Clasificación de tu Marca</CardTitle>
                    <CardDescription className="text-slate-500">Basado en lo que nos contaste, nuestro motor sugiere estas categorías oficiales.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl flex gap-3 text-sm text-orange-800">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>Análisis: <span className="italic font-bold">&quot;{queryInteligente}&quot;</span>. Selecciona las coberturas.</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-600 uppercase">Costo Proyectado</span>
                       <span className="text-sm font-black text-primary">${(solicitud.clases.length * UTM_VALOR).toLocaleString('es-CL')} CLP</span>
                    </div>
                    <BuscadorClases clasesAgregadas={solicitud.clases} onAgregar={agregarClase} onEliminar={eliminarClase} initialQuery={queryInteligente} />
                    <div className="flex gap-4 pt-4">
                      <Button variant="outline" onClick={irAtras} className="h-14"><ArrowLeft className="w-5 h-5 mr-2" /> Atrás</Button>
                      <Button onClick={irSiguiente} disabled={solicitud.clases.length === 0} className="flex-1 h-14 bg-primary text-white font-black uppercase">Confirmar Clases <ArrowRight className="w-5 h-5 ml-2" /></Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card className="border-slate-200 shadow-xl shadow-slate-200/50 p-8 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-black text-slate-900 uppercase">Prioridad de Registro</h2>
                    <p className="text-slate-500">¿Deseas reclamar prioridad por una solicitud extranjera previa?</p>
                  </div>
                  <div className="flex items-center justify-between p-6 rounded-2xl border-2 border-slate-100 bg-white">
                    <p className="font-bold">Activar derecho de prioridad</p>
                    <input type="checkbox" className="w-6 h-6 accent-primary" checked={solicitud.prioridad} onChange={(e) => actualizarPrioridad(e.target.checked)} />
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={irAtras} className="h-14">Atras</Button>
                    <Button onClick={irSiguiente} className="flex-1 h-14 bg-slate-900 text-white font-bold">Siguiente etapa</Button>
                  </div>
                </Card>
              )}

              {step === 4 && (
                 <Card className="border-slate-200 shadow-xl p-8 space-y-8">
                    <h2 className="text-2xl font-black">El Titular de la Marca</h2>
                    <FormPersona initialData={solicitud.solicitante} onChange={actualizarSolicitante} />
                    <div className="flex gap-4 border-t pt-8">
                      <Button variant="outline" onClick={irAtras} className="h-14">Atrás</Button>
                      <Button onClick={irSiguiente} disabled={!solicitud.solicitante?.rut} className="flex-1 h-14 bg-slate-900 text-white font-bold">Continuar a Representación</Button>
                    </div>
                 </Card>
              )}

              {step === 5 && (
                 <Card className="border-slate-200 shadow-xl p-8 space-y-8">
                    <h2 className="text-2xl font-black">Representación Legal</h2>
                    <div className="p-8 rounded-3xl bg-slate-50 text-center space-y-4 border border-slate-200">
                       <p className="text-sm font-medium">¿Ingresar datos de un agente PI?</p>
                       <div className="flex gap-4 justify-center">
                          <Button variant={!solicitud.representante ? "default" : "outline"} onClick={() => actualizarRepresentante(undefined as unknown as RepresentanteData)}>Omitir</Button>
                          <Button variant={solicitud.representante ? "default" : "outline"} onClick={() => actualizarRepresentante({ tipo: 'natural', pais: 'Chile' } as RepresentanteData)}>Ingresar datos</Button>
                       </div>
                    </div>
                    {solicitud.representante && <FormPersona initialData={solicitud.representante} onChange={actualizarRepresentante} title="Datos del Representante" />}
                    <div className="flex gap-4 border-t pt-8">
                      <Button variant="outline" onClick={irAtras} className="h-14">Atrás</Button>
                      <Button onClick={irSiguiente} className="flex-1 h-14 bg-slate-900 text-white font-bold">Continuar a Tasas</Button>
                    </div>
                 </Card>
              )}

              {step === 6 && (
                 <Card className="border-slate-200 shadow-xl p-8 space-y-8">
                    <h2 className="text-2xl font-black">Cálculo de Tasas (Pago 1)</h2>
                    <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-4">
                       <p className="text-xs font-black uppercase tracking-widest text-blue-200">Arancel Solicitud</p>
                       <div className="flex items-baseline gap-2">
                          <span className="text-6xl font-black">{solicitud.clases.length}</span>
                          <span className="text-2xl font-bold text-blue-200">UTM</span>
                       </div>
                       <div className="pt-4 border-t border-white/10 flex justify-between">
                          <span className="text-blue-200/60 font-medium whitespace-nowrap">Equivalente a:</span>
                          <span className="text-2xl font-black">${(solicitud.clases.length * UTM_VALOR).toLocaleString('es-CL')} CLP</span>
                       </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={irAtras} className="h-14">Atrás</Button>
                      <Button onClick={irSiguiente} className="flex-1 h-14 bg-primary text-white font-black uppercase">Continuar a Revisión Final</Button>
                    </div>
                 </Card>
              )}

              {step === 7 && (
                <Card className="border-slate-200 shadow-xl p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-3xl font-black uppercase tracking-tighter italic">Revisión Final</h2>
                    <div className="bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
                       <span className="text-xs font-bold text-primary uppercase">Resumen de Solicitud</span>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Etapa 1: Identidad */}
                    <section className="space-y-3">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-l-4 border-slate-200 pl-2">Etapa 1: Identidad de Marca</h3>
                      <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 px-6">
                        <div className="grid grid-cols-3 py-4">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Denominación</span>
                          <span className="col-span-2 font-black text-lg">&quot;{solicitud.denominacion}&quot;</span>
                        </div>
                        <div className="grid grid-cols-3 py-4">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Traducción</span>
                          <span className="col-span-2 text-sm font-bold">{solicitud.traduccion || "No aplica"}</span>
                        </div>
                        <div className="grid grid-cols-3 py-4">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Transliteración</span>
                          <span className="col-span-2 text-sm font-bold">{solicitud.transliteracion || "No aplica"}</span>
                        </div>
                      </div>
                    </section>

                    {/* Etapa 2: Clases */}
                    <section className="space-y-3">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-l-4 border-slate-200 pl-2">Etapa 2: Clasificación de Niza</h3>
                      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3">
                        {solicitud.clases.map(clase => (
                          <div key={clase.id} className="flex gap-4 items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded">CLASE {clase.clase}</span>
                            <span className="text-sm font-bold text-slate-700">{clase.descripcion}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Etapa 3-5: Otros Datos */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <section className="space-y-3">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-l-4 border-slate-200 pl-2">Etapas 3 y 5: Requisitos Opcionales</h3>
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 text-sm font-bold text-slate-600">
                          {(!solicitud.prioridad && !solicitud.representante) ? (
                            <p className="italic text-slate-400 font-medium">Has decidido no optar por estos requisitos opcionales.</p>
                          ) : (
                            <ul className="space-y-2">
                              {solicitud.prioridad && <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Prioridad de marca activada</li>}
                              {solicitud.representante && <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Representante PI designado</li>}
                            </ul>
                          )}
                        </div>
                      </section>

                      <section className="space-y-3">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-l-4 border-slate-200 pl-2">Etapa 4: Datos del Titular</h3>
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-2">
                          <p className="text-sm font-black text-slate-800">{solicitud.solicitante?.nombre || solicitud.solicitante?.razonSocial}</p>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">{solicitud.solicitante?.rut}</p>
                        </div>
                      </section>
                    </div>

                    {/* Etapa 6: Tasas */}
                    <section className="p-6 bg-slate-900 rounded-3xl text-white flex justify-between items-center shadow-xl shadow-slate-900/20">
                      <div>
                        <p className="text-[10px] font-black uppercase text-blue-300 tracking-widest mb-1">Total a Pagar en Etapa 1</p>
                        <h4 className="text-4xl font-black">{solicitud.clases.length} UTM</h4>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold opacity-60">Equivalente a</p>
                        <p className="text-2xl font-black text-blue-400">${(solicitud.clases.length * UTM_VALOR).toLocaleString('es-CL')} CLP</p>
                      </div>
                    </section>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button variant="outline" onClick={irAtras} className="h-14 sm:w-1/3 border-slate-200 font-bold uppercase tracking-tight">Atrás</Button>
                    <Button onClick={handlePresentar} className="flex-1 h-14 bg-orange-600 hover:bg-orange-700 text-white text-xl font-black uppercase shadow-2xl transition-all hover:scale-[1.02]">Pagar y Presentar</Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modales */}
      <Dialog open={modalConfirmar} onOpenChange={setModalConfirmar}>
        <DialogContent className="sm:max-w-md p-8 rounded-3xl border-0 shadow-2xl overflow-hidden">
          <DialogHeader className="space-y-3">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
               <AlertCircle className="w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-black uppercase tracking-tight italic">¿Confirmar Envío?</DialogTitle>
            <DialogDescription className="text-slate-600 font-medium">
              Al confirmar, tu solicitud se enviará a INAPI y se procederá al portal de pago de la Tesorería General de la República.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-8">
            <Button onClick={handleConfirmarEnvio} className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-black text-lg uppercase tracking-tight shadow-lg shadow-orange-600/20">IR A PAGAR AHORA</Button>
            <Button variant="ghost" onClick={() => setModalConfirmar(false)} className="w-full h-12 text-slate-500 font-bold uppercase tracking-widest text-xs hover:bg-slate-50">Cancelar y revisar</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={modalExito}>
        <DialogContent className="sm:max-w-md p-10 text-center rounded-3xl">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black tracking-tighter">¡Solicitud Enviada!</h2>
          <p className="text-slate-500 mt-2">Recibirás el comprobante en tu correo.</p>
          <Button onClick={() => window.location.href = '/inapi-mvp/solicitud'} className="w-full h-14 bg-primary text-white font-black mt-8">Volver al Inicio</Button>
        </DialogContent>
      </Dialog>

      <FooterINAPI />
      <ChatFAB />
    </div>
  )
}
