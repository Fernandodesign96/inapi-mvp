'use client'

import { useState, useMemo } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { StepperSolicitud } from '@/components/StepperSolicitud'
import { BuscadorClases } from '@/components/BuscadorClases'
import { PesquisaMarca } from '@/components/PesquisaMarca'
import { FormPersona } from '@/components/solicitud/FormPersona'
import { useSolicitud } from '@/hooks/useSolicitud'
import { HeaderINAPI } from '@/components/layout/HeaderINAPI'
import { FooterINAPI } from '@/components/layout/FooterINAPI'
import { ChatFAB } from '@/components/layout/ChatFAB'
import { RepresentanteData } from '@/lib/types'
import { extractKeywords, UTM_VALOR } from '@/lib/utils'
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Info, AlertCircle, ArrowRight, ArrowLeft, CheckCircle2, ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Acordeón simple ──────────────────────────────────────────
function Acordeon({ titulo, children, defaultOpen = false }: {
  titulo: string; children: React.ReactNode; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-[#E5E7EB] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-[#F9FAFB] hover:bg-[#F3F4F6] transition-colors"
      >
        <span className="text-sm font-black text-[#111827] uppercase tracking-wide">{titulo}</span>
        <ChevronDown className={cn('w-4 h-4 text-[#9CA3AF] transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="p-5 bg-white">{children}</div>}
    </div>
  )
}

// ── Botones de navegación (fuera del componente para evitar recreación en render) ──
function NavBtns({
  label = 'Siguiente',
  step,
  puedeAvanzar,
  irAtras,
  irSiguiente,
  maxStep,
}: {
  label?: string
  step: number
  puedeAvanzar: boolean
  irAtras: () => void
  irSiguiente: () => void
  maxStep: number
}) {
  return (
    <div className="flex gap-4 pt-4">
      {step > 1 && (
        <Button variant="outline" onClick={irAtras} className="h-12 border-[#D1D5DB] font-bold gap-2">
          <ArrowLeft className="w-4 h-4" /> Atrás
        </Button>
      )}
      {step < maxStep && (
        <Button
          onClick={irSiguiente}
          disabled={!puedeAvanzar}
          aria-disabled={!puedeAvanzar}
          className="flex-1 h-12 bg-[#111827] hover:bg-black text-white font-black gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {label} <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}

// ── Página principal ─────────────────────────────────────────
export default function SolicitudPage() {
  const {
    solicitud, guardando,
    actualizarDenominacion,
    actualizarPreguntasPerfil, actualizarTraduccion,
    actualizarTransliteracion, actualizarPrioridad,
    actualizarSolicitante, actualizarRepresentante,
    actualizarPesquisa,
    agregarClase, eliminarClase,
    guardarEnFirestore, completarSeccion, completarTodo,
  } = useSolicitud()

  const [step, setStep] = useState(1)
  const [modalConfirmar, setModalConfirmar] = useState(false)
  const [modalExito, setModalExito] = useState(false)

  // IDs de secciones: solicitante | pesquisa | marca | revision
  const secIds = solicitud.secciones.map(s => s.id)

  const queryInteligente = useMemo(() => {
    const combined = `${solicitud.denominacion} ${solicitud.descripcionMarca ?? ''} ${solicitud.preguntasPerfil.p1} ${solicitud.preguntasPerfil.p2}`
    return extractKeywords(combined).join(' ')
  }, [solicitud.denominacion, solicitud.descripcionMarca, solicitud.preguntasPerfil])

  const puedeAvanzar = useMemo(() => {
    if (step === 1) {
      const s = solicitud.solicitante
      if (!s) return false
      const base = !!(s.rut && s.correo && s.direccion && s.ciudad && s.telefono)
      return s.tipo === 'natural' ? base && !!(s.nombre && s.apellido) : base && !!s.razonSocial
    }
    if (step === 2) return solicitud.pesquisaRealizada === true
    if (step === 3) return solicitud.clases.length > 0 && solicitud.denominacion.length > 2
    return true
  }, [step, solicitud])

  const irSiguiente = () => {
    if (!puedeAvanzar) return
    const fromId = secIds[step - 1]
    const toId = secIds[step]
    if (fromId && toId) completarSeccion(fromId, toId)
    setStep(p => p + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const irAtras = () => {
    setStep(p => p - 1)
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
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {/* Indicador de autoguardado */}
          <div className="flex items-center justify-between text-xs text-[#9CA3AF] px-1">
            <span className="font-black uppercase tracking-widest">Solicitud de Marca</span>
            {guardando && <span className="font-bold animate-pulse">Guardando borrador...</span>}
          </div>

          {/* Stepper */}
          <StepperSolicitud secciones={solicitud.secciones} />

          {/* ── PASO 1 — Datos del Solicitante ── */}
          {step === 1 && (
            <Card className="border-[#E5E7EB] shadow-xl shadow-slate-200/50">
              <div className="h-1.5 bg-[#1A56DB] rounded-t-lg" />
              <CardHeader>
                <CardTitle className="text-2xl font-black text-[#111827]">
                  ¿Quién será el dueño de esta marca?
                </CardTitle>
                <CardDescription className="text-[#4B5563]">
                  Completa los datos de la persona o empresa que registrará la marca.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Acordeon titulo="Datos del titular" defaultOpen>
                  <FormPersona
                    initialData={solicitud.solicitante}
                    onChange={actualizarSolicitante}
                  />
                </Acordeon>

                <Acordeon titulo="¿Actúas como representante o agente? (opcional)">
                  <div className="space-y-4">
                    <p className="text-sm text-[#4B5563]">
                      Si representas a otra persona o empresa, completa los datos del representante legal o agente PI.
                    </p>
                    {solicitud.representante ? (
                      <>
                        <FormPersona
                          initialData={solicitud.representante}
                          onChange={actualizarRepresentante}
                          title="Datos del representante"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => actualizarRepresentante(undefined as unknown as RepresentanteData)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          Quitar representante
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => actualizarRepresentante({ tipo: 'natural', pais: 'Chile' } as RepresentanteData)}
                        className="border-[#D1D5DB] font-bold"
                      >
                        + Agregar datos del representante
                      </Button>
                    )}
                  </div>
                </Acordeon>

                <Acordeon titulo="¿Ya registraste esta marca en otro país? (opcional)">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                    <div>
                      <p className="text-sm font-bold text-[#111827]">Activar derecho de prioridad</p>
                      <p className="text-xs text-[#9CA3AF] mt-0.5">Solo aplica si tienes una solicitud extranjera previa.</p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-[#1A56DB]"
                      checked={solicitud.prioridad}
                      onChange={e => actualizarPrioridad(e.target.checked)}
                      aria-label="Activar derecho de prioridad"
                    />
                  </div>
                </Acordeon>

                <NavBtns
                  label="Siguiente — Verificar mi marca"
                  step={step} puedeAvanzar={puedeAvanzar}
                  irAtras={irAtras} irSiguiente={irSiguiente} maxStep={4}
                />
              </CardContent>
            </Card>
          )}

          {/* ── PASO 2 — Pesquisa de Marca ── */}
          {step === 2 && (
            <Card className="border-[#E5E7EB] shadow-xl shadow-slate-200/50">
              <div className="h-1.5 bg-[#1A56DB] rounded-t-lg" />
              <CardContent className="pt-8">
                <PesquisaMarca
                  nombreInicial={solicitud.denominacion}
                  onContinuar={(similitud) => {
                    actualizarPesquisa(similitud, true)
                    irSiguiente()
                  }}
                  onAjustar={() => {
                    actualizarDenominacion('')
                  }}
                />
                {!solicitud.pesquisaRealizada && (
                  <div className="mt-4 flex gap-3">
                    <Button variant="outline" onClick={irAtras} className="h-12 border-[#D1D5DB] font-bold gap-2">
                      <ArrowLeft className="w-4 h-4" /> Atrás
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* ── PASO 3 — Tu Marca ── */}
          {step === 3 && (
            <Card className="border-[#E5E7EB] shadow-xl shadow-slate-200/50">
              <div className="h-1.5 bg-[#1A56DB] rounded-t-lg" />
              <CardHeader>
                <CardTitle className="text-2xl font-black text-[#111827]">Tu Marca</CardTitle>
                <CardDescription className="text-[#4B5563]">
                  Define el nombre y las coberturas de lo que quieres proteger.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-7">
                <TooltipProvider>
                  {/* Nombre */}
                  <div className="space-y-2">
                    <label htmlFor="nombre-marca" className="text-sm font-bold text-[#111827] flex items-center gap-2">
                      Nombre de tu marca <span className="text-red-500" aria-hidden>*</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-[#9CA3AF] cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">El nombre tal como aparecerá en el Registro de Marcas de INAPI.</p>
                        </TooltipContent>
                      </Tooltip>
                    </label>
                    <Input
                      id="nombre-marca"
                      placeholder="Ej: Cafetería El Valle"
                      className="h-12 text-lg font-medium border-[#D1D5DB] focus:ring-2 focus:ring-[#1A56DB] focus:ring-offset-2"
                      value={solicitud.denominacion}
                      onChange={e => actualizarDenominacion(e.target.value)}
                      aria-required="true"
                    />
                  </div>

                  {/* Traducción / Transliteración */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="traduccion" className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest flex items-center gap-2">
                        Traducción
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-3 h-3 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Si el nombre está en otro idioma, indica su significado en español.</p>
                          </TooltipContent>
                        </Tooltip>
                      </label>
                      <Input
                        id="traduccion"
                        placeholder="Opcional"
                        value={solicitud.traduccion}
                        onChange={e => actualizarTraduccion(e.target.value)}
                        className="border-[#D1D5DB] focus:ring-2 focus:ring-[#1A56DB]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="transliteracion" className="text-xs font-bold text-[#9CA3AF] uppercase tracking-widest flex items-center gap-2">
                        Transliteración
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-3 h-3 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">Si usa caracteres no latinos, indica su pronunciación fonética.</p>
                          </TooltipContent>
                        </Tooltip>
                      </label>
                      <Input
                        id="transliteracion"
                        placeholder="Opcional"
                        value={solicitud.transliteracion}
                        onChange={e => actualizarTransliteracion(e.target.value)}
                        className="border-[#D1D5DB] focus:ring-2 focus:ring-[#1A56DB]"
                      />
                    </div>
                  </div>
                </TooltipProvider>

                {/* Preguntas de perfil */}
                <div className="p-5 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] space-y-4">
                  <p className="text-xs font-black text-[#9CA3AF] uppercase tracking-widest">
                    Cuéntanos sobre tu marca — esto mejora la clasificación automática
                  </p>
                  <div className="space-y-2">
                    <label htmlFor="p1" className="text-sm font-bold text-[#111827] italic">
                      ¿Qué productos o servicios ofreces?
                    </label>
                    <Textarea
                      id="p1"
                      placeholder="Ej: Vendo café orgánico de origen..."
                      value={solicitud.preguntasPerfil.p1}
                      onChange={e => actualizarPreguntasPerfil({ p1: e.target.value })}
                      className="border-[#D1D5DB] focus:ring-2 focus:ring-[#1A56DB] resize-none"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="p2" className="text-sm font-bold text-[#111827] italic">
                      Describe tu marca en palabras clave
                    </label>
                    <Textarea
                      id="p2"
                      placeholder="Ej: Artesanía, comercio justo, sostenible..."
                      value={solicitud.preguntasPerfil.p2}
                      onChange={e => actualizarPreguntasPerfil({ p2: e.target.value })}
                      className="border-[#D1D5DB] focus:ring-2 focus:ring-[#1A56DB] resize-none"
                      rows={2}
                    />
                  </div>
                </div>

                {/* Buscador de clases */}
                {queryInteligente && (
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 text-sm text-blue-800">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>Análisis: <span className="italic font-bold">&quot;{queryInteligente}&quot;</span>. Selecciona las coberturas que mejor describan tu marca.</p>
                  </div>
                )}

                {/* Costo proyectado */}
                {solicitud.clases.length > 0 && (
                  <div className="flex items-center justify-between bg-[#F3F4F6] rounded-xl p-4 border border-[#E5E7EB]">
                    <span className="text-xs font-black text-[#9CA3AF] uppercase tracking-wide">Costo proyectado</span>
                    <span className="text-sm font-black text-[#1A56DB] font-mono">
                      ${(solicitud.clases.length * UTM_VALOR).toLocaleString('es-CL')} CLP
                    </span>
                  </div>
                )}

                <BuscadorClases
                  clasesAgregadas={solicitud.clases}
                  onAgregar={agregarClase}
                  onEliminar={eliminarClase}
                  initialQuery={queryInteligente}
                />

                <NavBtns
                  label="Siguiente — Revisión y Pago"
                  step={step} puedeAvanzar={puedeAvanzar}
                  irAtras={irAtras} irSiguiente={irSiguiente} maxStep={4}
                />
              </CardContent>
            </Card>
          )}

          {/* ── PASO 4 — Revisión y Pago ── */}
          {step === 4 && (
            <Card className="border-[#E5E7EB] shadow-xl shadow-slate-200/50 animate-in fade-in slide-in-from-bottom-2 duration-400">
              <div className="h-1.5 bg-[#059669] rounded-t-lg" />
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-black text-[#111827] tracking-tighter uppercase italic">
                    Revisión Final
                  </CardTitle>
                  <span className="text-xs font-bold text-[#059669] uppercase tracking-widest bg-[#D1FAE5] px-3 py-1 rounded-full">
                    Todo listo
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Sección: Identidad */}
                <section className="space-y-3">
                  <h3 className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest border-l-4 border-[#E5E7EB] pl-2">
                    Identidad de Marca
                  </h3>
                  <div className="bg-white rounded-2xl border border-[#E5E7EB] divide-y divide-[#E5E7EB] px-5">
                    {[
                      { label: 'Nombre', val: `"${solicitud.denominacion}"`, bold: true },
                      { label: 'Traducción', val: solicitud.traduccion || 'No aplica' },
                      { label: 'Transliteración', val: solicitud.transliteracion || 'No aplica' },
                    ].map(r => (
                      <div key={r.label} className="grid grid-cols-3 py-3.5">
                        <span className="text-[10px] font-black uppercase text-[#9CA3AF] tracking-widest">{r.label}</span>
                        <span className={cn('col-span-2 text-sm', r.bold ? 'font-black text-lg text-[#111827]' : 'font-bold text-[#4B5563]')}>
                          {r.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Sección: Clases */}
                <section className="space-y-3">
                  <h3 className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest border-l-4 border-[#E5E7EB] pl-2">
                    Clasificación de Niza
                  </h3>
                  <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-2">
                    {solicitud.clases.map(c => (
                      <div key={c.id} className="flex gap-3 items-center p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
                        <span className="bg-[#1A56DB] text-white text-[10px] font-black px-2 py-1 rounded shrink-0">
                          CLASE {c.clase}
                        </span>
                        <span className="text-sm font-bold text-[#4B5563]">{c.descripcion}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Sección: Titular */}
                <section className="space-y-3">
                  <h3 className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest border-l-4 border-[#E5E7EB] pl-2">
                    La persona o empresa que será dueña de la marca
                  </h3>
                  <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 space-y-1">
                    <p className="text-sm font-black text-[#111827]">
                      {solicitud.solicitante?.nombre
                        ? `${solicitud.solicitante.nombre} ${solicitud.solicitante.apellido}`
                        : solicitud.solicitante?.razonSocial}
                    </p>
                    <p className="text-xs font-mono font-bold text-[#9CA3AF] uppercase">
                      {solicitud.solicitante?.rut}
                    </p>
                  </div>
                </section>

                {/* Tasas */}
                <section className="bg-[#111827] rounded-3xl p-6 text-white flex justify-between items-center shadow-xl shadow-slate-900/20">
                  <div>
                    <p className="text-[10px] font-black uppercase text-blue-300 tracking-widest mb-1">
                      Total a pagar (Tasa de solicitud)
                    </p>
                    <h4 className="text-4xl font-black font-mono">{solicitud.clases.length} UTM</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold opacity-60">Equivalente a</p>
                    <p className="text-2xl font-black text-blue-400 font-mono">
                      ${(solicitud.clases.length * UTM_VALOR).toLocaleString('es-CL')} CLP
                    </p>
                  </div>
                </section>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" onClick={irAtras} className="h-12 sm:w-1/3 border-[#D1D5DB] font-bold gap-2">
                    <ArrowLeft className="w-4 h-4" /> Atrás
                  </Button>
                  <Button
                    onClick={handlePresentar}
                    className="flex-1 h-14 bg-[#1A56DB] hover:bg-[#1E3A8A] text-white text-lg font-black uppercase shadow-2xl transition-all hover:scale-[1.02]"
                  >
                    Pagar y Presentar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Modal confirmación */}
      <Dialog open={modalConfirmar} onOpenChange={setModalConfirmar}>
        <DialogContent className="sm:max-w-md p-8 rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="space-y-3">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-black uppercase tracking-tight italic">¿Confirmar Envío?</DialogTitle>
            <DialogDescription className="text-[#4B5563] font-medium">
              Al confirmar, tu solicitud se enviará a INAPI y se procederá al portal de pago de la Tesorería General de la República.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-6">
            <Button onClick={handleConfirmarEnvio} className="w-full h-14 bg-[#1A56DB] hover:bg-[#1E3A8A] text-white font-black text-lg uppercase shadow-lg shadow-blue-600/20">
              Ir a Pagar Ahora
            </Button>
            <Button variant="ghost" onClick={() => setModalConfirmar(false)} className="w-full h-12 text-[#9CA3AF] font-bold uppercase tracking-widest text-xs">
              Cancelar y revisar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal éxito */}
      <Dialog open={modalExito}>
        <DialogContent className="sm:max-w-md p-10 text-center rounded-3xl">
          <DialogTitle className="sr-only">Solicitud enviada correctamente</DialogTitle>
          <DialogDescription className="sr-only">Tu solicitud de marca ha sido enviada. Recibirás el comprobante en tu correo.</DialogDescription>
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-[#111827]">¡Solicitud Enviada!</h2>
          <p className="text-[#4B5563] mt-2">Recibirás el comprobante en tu correo electrónico.</p>
          <Button
            onClick={() => { window.location.href = '/inapi-mvp/' }}
            className="w-full h-14 bg-[#1A56DB] hover:bg-[#1E3A8A] text-white font-black mt-8"
          >
            Volver al Inicio
          </Button>
        </DialogContent>
      </Dialog>

      <FooterINAPI />
      <ChatFAB />
    </div>
  )
}
