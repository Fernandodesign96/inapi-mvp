'use client'

import { useState, useMemo, useId } from 'react'
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
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { ChatFAB } from '@/components/layout/ChatFAB'
import { SkipLink } from '@/components/layout/SkipLink'
import { RepresentanteData } from '@/lib/types'
import { extractKeywords, UTM_VALOR } from '@/lib/utils'
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Info, AlertCircle, ArrowRight, ArrowLeft, CheckCircle2, ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

function Acordeon({ titulo, children, defaultOpen = false }: {
  titulo: string; children: React.ReactNode; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const headingId = useId()
  return (
    <div className="border border-gob-border rounded-gob-lg overflow-hidden">
      <button
        type="button"
        id={headingId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-gob-4 py-gob-4 text-left bg-background hover:bg-gob-surface-elevated transition-colors focus-gob"
      >
        <span className="text-gri-body-sm font-semibold text-gob-text uppercase tracking-wide">{titulo}</span>
        <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open && (
        <div id={panelId} role="region" aria-labelledby={headingId} className="p-gob-4 bg-gob-surface">
          {children}
        </div>
      )}
    </div>
  )
}

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
    <div className="flex gap-gob-4 pt-gob-4">
      {step > 1 && (
        <Button variant="outline" onClick={irAtras} size="form" className="font-semibold gap-2">
          <ArrowLeft className="w-4 h-4" /> Atrás
        </Button>
      )}
      {step < maxStep && (
        <Button
          onClick={irSiguiente}
          disabled={!puedeAvanzar}
          aria-disabled={!puedeAvanzar}
          variant="primary-dark"
          size="form"
          className="flex-1 font-semibold gap-2"
        >
          {label} <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}

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
    <div className="flex flex-col min-h-screen bg-background">
      <SkipLink />
      <HeaderINAPI />
      <main id="contenido-principal" tabIndex={-1} className="flex-1 py-gob-5 outline-none">
        <ContainerGRI
          size="desktop"
          className="space-y-gob-5 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div className="flex items-center justify-between text-gri-body-xs text-muted-foreground px-1">
            <span className="font-semibold uppercase tracking-widest">Solicitud de Marca</span>
            <span className="sr-only" aria-live="polite" aria-atomic="true">
              {guardando ? 'Guardando borrador de la solicitud' : ''}
            </span>
            {guardando && (
              <span className="font-semibold animate-pulse" aria-hidden>
                Guardando borrador...
              </span>
            )}
          </div>

          <StepperSolicitud secciones={solicitud.secciones} />

          {step === 1 && (
            <Card className="border-gob-border shadow-elevation-03">
              <div className="h-1.5 bg-gob-primary rounded-t-lg" />
              <CardHeader>
                <CardTitle className="font-heading text-gri-h1 font-medium text-gob-text">
                  ¿Quién será el dueño de esta marca?
                </CardTitle>
                <CardDescription>
                  Completa los datos de la persona o empresa que registrará la marca.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-gob-4">
                <Acordeon titulo="Datos del titular" defaultOpen>
                  <FormPersona
                    initialData={solicitud.solicitante}
                    onChange={actualizarSolicitante}
                  />
                </Acordeon>

                <Acordeon titulo="¿Actúas como representante o agente? (opcional)">
                  <div className="space-y-gob-4">
                    <p className="text-gri-body-sm text-muted-foreground">
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
                          className="text-destructive hover:text-destructive hover:bg-gob-danger-bg"
                        >
                          Quitar representante
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => actualizarRepresentante({ tipo: 'natural', pais: 'Chile' } as RepresentanteData)}
                        className="font-semibold"
                      >
                        + Agregar datos del representante
                      </Button>
                    )}
                  </div>
                </Acordeon>

                <Acordeon titulo="¿Ya registraste esta marca en otro país? (opcional)">
                  <label htmlFor="prioridad-marca" className="flex items-center justify-between p-gob-4 rounded-gob-md bg-background border border-gob-border cursor-pointer gap-gob-4">
                    <div>
                      <p className="text-gri-body-sm font-semibold text-gob-text">Activar derecho de prioridad</p>
                      <p className="text-gri-body-xs text-muted-foreground mt-0.5">Solo aplica si tienes una solicitud extranjera previa.</p>
                    </div>
                    <input
                      id="prioridad-marca"
                      type="checkbox"
                      className="w-5 h-5 accent-primary shrink-0"
                      checked={solicitud.prioridad}
                      onChange={e => actualizarPrioridad(e.target.checked)}
                    />
                  </label>
                </Acordeon>

                <NavBtns
                  label="Siguiente — Verificar mi marca"
                  step={step} puedeAvanzar={puedeAvanzar}
                  irAtras={irAtras} irSiguiente={irSiguiente} maxStep={4}
                />
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-gob-border shadow-elevation-03">
              <div className="h-1.5 bg-gob-primary rounded-t-lg" />
              <CardContent className="pt-gob-6">
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
                  <div className="mt-gob-4 flex gap-gob-3">
                    <Button variant="outline" onClick={irAtras} size="form" className="font-semibold gap-2">
                      <ArrowLeft className="w-4 h-4" /> Atrás
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-gob-border shadow-elevation-03">
              <div className="h-1.5 bg-gob-primary rounded-t-lg" />
              <CardHeader>
                <CardTitle className="font-heading text-gri-h1 font-medium text-gob-text">Tu Marca</CardTitle>
                <CardDescription>
                  Define el nombre y las coberturas de lo que quieres proteger.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-gob-5">
                <TooltipProvider>
                  <div className="space-y-2">
                    <label htmlFor="nombre-marca" className="gri-field-label flex items-center gap-2">
                      Nombre de tu marca <span className="text-destructive" aria-hidden>*</span>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">El nombre tal como aparecerá en el Registro de Marcas de INAPI.</p>
                        </TooltipContent>
                      </Tooltip>
                    </label>
                    <Input
                      id="nombre-marca"
                      placeholder="Ej: Cafetería El Valle"
                      className="h-11 text-gri-body font-medium"
                      value={solicitud.denominacion}
                      onChange={e => actualizarDenominacion(e.target.value)}
                      aria-required="true"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-gob-4">
                    <div className="space-y-2">
                      <label htmlFor="traduccion" className="gri-field-label flex items-center gap-2">
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
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="transliteracion" className="gri-field-label flex items-center gap-2">
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
                      />
                    </div>
                  </div>
                </TooltipProvider>

                <div className="p-gob-4 bg-background rounded-gob-lg border border-gob-border space-y-gob-4">
                  <p className="gri-field-label">
                    Cuéntanos sobre tu marca — esto mejora la clasificación automática
                  </p>
                  <div className="space-y-2">
                    <label htmlFor="p1" className="text-gri-body-sm font-semibold text-gob-text italic">
                      ¿Qué productos o servicios ofreces?
                    </label>
                    <Textarea
                      id="p1"
                      placeholder="Ej: Vendo café orgánico de origen..."
                      value={solicitud.preguntasPerfil.p1}
                      onChange={e => actualizarPreguntasPerfil({ p1: e.target.value })}
                      className="resize-none"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="p2" className="text-gri-body-sm font-semibold text-gob-text italic">
                      Describe tu marca en palabras clave
                    </label>
                    <Textarea
                      id="p2"
                      placeholder="Ej: Artesanía, comercio justo, sostenible..."
                      value={solicitud.preguntasPerfil.p2}
                      onChange={e => actualizarPreguntasPerfil({ p2: e.target.value })}
                      className="resize-none"
                      rows={2}
                    />
                  </div>
                </div>

                {queryInteligente && (
                  <div className="p-gob-3 bg-gob-info-bg border border-gob-info/30 rounded-gob-md flex gap-gob-3 text-gri-body-sm text-gob-info">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>Análisis: <span className="italic font-semibold">&quot;{queryInteligente}&quot;</span>. Selecciona las coberturas que mejor describan tu marca.</p>
                  </div>
                )}

                {solicitud.clases.length > 0 && (
                  <div className="flex items-center justify-between bg-gob-surface-elevated rounded-gob-md p-gob-4 border border-gob-border">
                    <span className="gri-field-label">Costo proyectado</span>
                    <span className="text-gri-body-sm font-semibold text-gob-primary font-mono">
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

          {step === 4 && (
            <Card className="border-gob-border shadow-elevation-03 animate-in fade-in slide-in-from-bottom-2 duration-400">
              <div className="h-1.5 bg-stepper-done rounded-t-lg" />
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="font-heading text-gri-h1 font-medium text-gob-text tracking-tight uppercase italic">
                    Revisión Final
                  </CardTitle>
                  <span className="text-gri-label font-semibold text-stepper-done uppercase tracking-widest bg-stepper-done-bg px-gob-3 py-1 rounded-full">
                    Todo listo
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-gob-6">
                <section className="space-y-gob-3">
                  <h3 className="gri-field-label border-l-4 border-gob-border pl-2">
                    Identidad de Marca
                  </h3>
                  <div className="bg-gob-surface rounded-gob-lg border border-gob-border divide-y divide-gob-border px-gob-4">
                    {[
                      { label: 'Nombre', val: `"${solicitud.denominacion}"`, bold: true },
                      { label: 'Traducción', val: solicitud.traduccion || 'No aplica' },
                      { label: 'Transliteración', val: solicitud.transliteracion || 'No aplica' },
                    ].map(r => (
                      <div key={r.label} className="grid grid-cols-3 py-3.5">
                        <span className="gri-field-label">{r.label}</span>
                        <span className={cn('col-span-2 text-gri-body-sm', r.bold ? 'font-semibold text-gri-body text-gob-text' : 'font-semibold text-muted-foreground')}>
                          {r.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-gob-3">
                  <h3 className="gri-field-label border-l-4 border-gob-border pl-2">
                    Clasificación de Niza
                  </h3>
                  <div className="bg-gob-surface rounded-gob-lg border border-gob-border p-gob-4 space-y-2">
                    {solicitud.clases.map(c => (
                      <div key={c.id} className="flex gap-gob-3 items-center p-gob-3 bg-background rounded-gob-md border border-gob-border">
                        <span className="bg-gob-primary text-gob-text-inverse text-gri-label font-semibold px-2 py-1 rounded shrink-0">
                          CLASE {c.clase}
                        </span>
                        <span className="text-gri-body-sm font-semibold text-muted-foreground">{c.descripcion}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-gob-3">
                  <h3 className="gri-field-label border-l-4 border-gob-border pl-2">
                    La persona o empresa que será dueña de la marca
                  </h3>
                  <div className="bg-gob-surface rounded-gob-lg border border-gob-border p-gob-4 space-y-1">
                    <p className="text-gri-body-sm font-semibold text-gob-text">
                      {solicitud.solicitante?.nombre
                        ? `${solicitud.solicitante.nombre} ${solicitud.solicitante.apellido}`
                        : solicitud.solicitante?.razonSocial}
                    </p>
                    <p className="text-gri-body-xs font-mono font-semibold text-muted-foreground uppercase">
                      {solicitud.solicitante?.rut}
                    </p>
                  </div>
                </section>

                <section className="bg-gob-text rounded-gob-xl p-gob-5 text-gob-text-inverse flex justify-between items-center shadow-elevation-04">
                  <div>
                    <p className="gri-field-label text-primary/70 mb-1">
                      Total a pagar (Tasa de solicitud)
                    </p>
                    <h4 className="text-4xl font-black font-mono">{solicitud.clases.length} UTM</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-gri-body-sm font-semibold opacity-60">Equivalente a</p>
                    <p className="text-2xl font-black text-primary font-mono">
                      ${(solicitud.clases.length * UTM_VALOR).toLocaleString('es-CL')} CLP
                    </p>
                  </div>
                </section>

                <div className="flex flex-col sm:flex-row gap-gob-3">
                  <Button variant="outline" onClick={irAtras} size="form" className="sm:w-1/3 font-semibold gap-2">
                    <ArrowLeft className="w-4 h-4" /> Atrás
                  </Button>
                  <Button
                    onClick={handlePresentar}
                    size="form"
                    className="flex-1 font-semibold uppercase text-gri-btn transition-all hover:scale-[1.02]"
                  >
                    Pagar y Presentar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </ContainerGRI>
      </main>

      <Dialog open={modalConfirmar} onOpenChange={setModalConfirmar}>
        <DialogContent className="sm:max-w-md p-gob-6 rounded-gob-xl border-0 shadow-elevation-04">
          <DialogHeader className="space-y-gob-3">
            <div className="w-12 h-12 bg-gob-warning-bg text-gob-warning rounded-gob-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <DialogTitle className="font-heading text-gri-h1 font-medium uppercase tracking-tight italic">
              ¿Confirmar Envío?
            </DialogTitle>
            <DialogDescription className="text-muted-foreground font-medium">
              Al confirmar, tu solicitud se enviará a INAPI y se procederá al portal de pago de la Tesorería General de la República.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-gob-3 mt-gob-5">
            <Button onClick={handleConfirmarEnvio} size="form" className="w-full font-semibold uppercase text-gri-btn">
              Ir a Pagar Ahora
            </Button>
            <Button
              variant="ghost"
              onClick={() => setModalConfirmar(false)}
              className="w-full text-muted-foreground font-semibold uppercase tracking-widest text-gri-label"
            >
              Cancelar y revisar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={modalExito}>
        <DialogContent className="sm:max-w-md p-gob-7 text-center rounded-gob-xl">
          <div className="w-20 h-20 bg-gob-success-bg text-gob-success rounded-full flex items-center justify-center mx-auto mb-gob-5" aria-hidden>
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <DialogHeader className="space-y-2 text-center sm:text-center">
            <DialogTitle className="font-heading text-3xl font-medium tracking-tight text-gob-text">
              ¡Solicitud enviada!
            </DialogTitle>
            <DialogDescription>
              Recibirás el comprobante en tu correo electrónico.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={() => { window.location.href = '/inapi-mvp/' }}
            size="form"
            className="w-full font-semibold mt-gob-6"
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
