'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FormPersona } from '@/components/solicitud/FormPersona'
import { PlainTerm } from '@/components/GlosarioTerm'
import { FieldLabel, HelpTooltip } from '@/components/tramites/HelpTooltip'
import { LegalNotice } from '@/components/tramites/LegalNotice'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { BulletList, Checklist, ControlChip, HelperCard, WorkSplit } from '@/components/tramites/TramitesExperience'
import { AccordionBlock, FileField, RequiredMark, ReviewGrid, StepSection, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import {
  LEGAL_WIZARD_PATENTE,
  TOOLTIP_DIFERIR_PAGO,
  TOOLTIP_DIVISIONAL,
  TOOLTIP_DIVULGACION,
  TOOLTIP_PCT_NACIONAL,
  TOOLTIP_PRIORIDAD_DECLARA,
  TOOLTIP_PRIORIDAD_SIN,
  TOOLTIP_PROVISIONAL,
  TOOLTIP_RESTAURACION,
} from '@/lib/tramites/legal'
import { CIP_EJEMPLOS, UTM_CLP } from '@/lib/tramites/mock-data'

const BASE_STEPS = [
  { id: 'datos', label: 'Datos' },
  { id: 'cip', label: 'CIP' },
  { id: 'usuario', label: 'Datos de usuario' },
  { id: 'declaraciones', label: 'Declaraciones' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'tasas', label: 'Cuánto pagarás' },
  { id: 'revision', label: 'Revisión' },
]

type CipRow = { seccion: string; clase: string; subclase: string; grupo: string; subgrupo: string; codigo: string }
type PrioridadRow = { pais: string; fecha: string; numero: string; adjunto: string; das: string }

const OMPI_CIP = 'https://www.wipo.int/es/web/classification-ipc'

export function PatentWizard({ variant }: { variant: 'patente' | 'diseno' }) {
  const steps = variant === 'diseno' ? BASE_STEPS.filter(s => s.id !== 'cip') : BASE_STEPS
  const [step, setStep] = useState('datos')
  const [titulo, setTitulo] = useState(
    variant === 'diseno' ? 'Diseño de tarima plegable' : 'Dispositivo de asistencia para danza',
  )
  const [tipo, setTipo] = useState(variant === 'diseno' ? 'diseno' : 'patente')
  const [cip, setCip] = useState<CipRow[]>([{ seccion: 'A', clase: '63', subclase: 'B', grupo: '25', subgrupo: '00', codigo: 'A63B 25/00' }])
  const [cipDraft, setCipDraft] = useState<CipRow>({ seccion: 'A', clase: '', subclase: '', grupo: '', subgrupo: '', codigo: '' })
  const [inventor, setInventor] = useState('Fernando Ignacio Arriagada Castillo')
  const [solicitanteOk, setSolicitanteOk] = useState(false)
  const [representanteOk, setRepresentanteOk] = useState(false)
  const [prioMode, setPrioMode] = useState<'sin' | 'declara'>('sin')
  const [provisional, setProvisional] = useState(false)
  const [divisional, setDivisional] = useState(false)
  const [provisionalNum, setProvisionalNum] = useState('')
  const [divisionalNum, setDivisionalNum] = useState('')
  const [priorities, setPriorities] = useState<PrioridadRow[]>([])
  const [prioOpen, setPrioOpen] = useState(false)
  const [prioDraft, setPrioDraft] = useState<PrioridadRow>({ pais: '', fecha: '', numero: '', adjunto: '', das: '' })
  const [needPrio, setNeedPrio] = useState(false)
  const [decl, setDecl] = useState({ divulgacion: false, restauracion: false, pct: false, diferir: false })
  const [adjuntos, setAdjuntos] = useState<Record<string, string>>({})
  const [docs, setDocs] = useState({
    memoria: '',
    reivindicaciones: '',
    resumen: '',
    dibujos: '',
    figura: '',
    figuras: '',
    otros: '',
    paginas: '',
  })
  const [postergar, setPostergar] = useState(false)
  const [tgr, setTgr] = useState({ nacionalidad: 'Chilena', rut: '', razon: '', correo: '', correo2: '' })
  const [saved, setSaved] = useState('')
  const router = useRouter()

  const go = (id: string) => setStep(id)
  const stepIndex = steps.findIndex(s => s.id === step)
  const prev = () => {
    if (stepIndex > 0) go(steps[stepIndex - 1].id)
  }
  const next = () => {
    if (step === 'usuario' && prioMode === 'declara' && priorities.length === 0) {
      setNeedPrio(true)
      return
    }
    if (step === 'revision') {
      router.push('/tramites/pago-tgr')
      return
    }
    if (stepIndex < steps.length - 1) go(steps[stepIndex + 1].id)
  }

  const completeness: Record<string, 'ok' | 'error' | 'idle'> = useMemo(() => {
    const datos = titulo.trim() ? 'ok' : 'idle'
    const cipSt = cip.length ? 'ok' : 'idle'
    const prioSt = prioMode === 'sin' ? 'ok' : priorities.length ? 'ok' : 'error'
    const usuario = prioSt === 'ok' && solicitanteOk && inventor.trim() ? 'ok' : prioSt === 'error' ? 'error' : 'idle'
    const declaraciones = 'ok'
    const documentos = docs.memoria || docs.figura || docs.paginas ? 'ok' : 'idle'
    const tasas = tgr.rut.trim() && tgr.correo.trim() ? 'ok' : tgr.rut || tgr.correo ? 'error' : 'idle'
    const revision = datos === 'ok' && (variant === 'diseno' || cipSt === 'ok') && prioSt === 'ok' ? 'ok' : 'error'
    return { datos, cip: cipSt, usuario, declaraciones, documentos, tasas, revision }
  }, [titulo, cip, prioMode, priorities, solicitanteOk, inventor, docs, tgr, variant])

  const addCip = () => {
    if (!cipDraft.seccion || !cipDraft.clase) return
    const codigo = `${cipDraft.seccion}${cipDraft.clase}${cipDraft.subclase} ${cipDraft.grupo}/${cipDraft.subgrupo}`
    setCip(prev => [...prev, { ...cipDraft, codigo }])
    setCipDraft({ seccion: 'A', clase: '', subclase: '', grupo: '', subgrupo: '', codigo: '' })
  }

  const addPrio = () => {
    if (!prioDraft.pais || !prioDraft.fecha || !prioDraft.numero) return
    setPriorities(prev => [...prev, prioDraft])
    setPrioDraft({ pais: '', fecha: '', numero: '', adjunto: '', das: '' })
    setPrioOpen(false)
  }

  const helpers: Record<string, { title: string; items: string[] }> = {
    datos: { title: 'Título', items: ['Describe el objeto, no el beneficio comercial.', 'El título no puede superar 15 palabras.'] },
    cip: { title: 'CIP', items: ['Agrega al menos un código.', 'Sección, clase y subclase identifican el campo técnico.'] },
    usuario: { title: 'Datos de usuario', items: ['Prioridad, solicitante, representante e inventores van juntos.', 'El representante es opcional.'] },
    declaraciones: { title: 'Declaraciones', items: ['Puedes marcar más de una.', 'Cada opción pide el adjunto que la acredita.'] },
    documentos: { title: 'Documentos', items: ['Usa PDF cuando sea posible.', 'Declara el total de páginas del expediente.'] },
    tasas: { title: 'Pago', items: ['Puedes postergar 30 días si corresponde.', 'Los datos TGR deben coincidir con el pagador.'] },
    revision: { title: 'Antes de enviar', items: ['Revisa cada card.', 'Puedes guardar el borrador 60 días.'] },
  }

  return (
    <RequireAuth>
      <TramitesMain>
        <WorkSplit
          main={
            <>
              {step === 'datos' ? (
                <LegalNotice>{LEGAL_WIZARD_PATENTE}</LegalNotice>
              ) : (
                <p className="rounded-full border border-gob-border bg-card px-gob-4 py-gob-2 text-gri-body-sm text-muted-foreground">
                  {helpers[step]?.items[0]}
                </p>
              )}

              {step === 'datos' && (
                <StepSection title="Datos de la solicitud" description="Indica el tipo y un título claro del objeto que quieres proteger.">
                  {variant === 'patente' && (
                    <div className="max-w-xl space-y-gob-2">
                      <FieldLabel htmlFor="tipo" help={{ text: 'Patente de invención o modelo de utilidad.' }}>
                        Tipo de solicitud <RequiredMark />
                      </FieldLabel>
                      <select id="tipo" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
                        <option value="patente">Patente de invención</option>
                        <option value="mu">Modelo de utilidad</option>
                      </select>
                    </div>
                  )}
                  {variant === 'diseno' && (
                    <div className="max-w-xl space-y-gob-2">
                      <label htmlFor="tipo" className="text-gri-body-sm font-medium">
                        Tipo <RequiredMark />
                      </label>
                      <select id="tipo" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
                        <option value="diseno">Diseño industrial</option>
                        <option value="dibujo">Dibujo industrial</option>
                      </select>
                    </div>
                  )}
                  <div className="max-w-xl space-y-gob-2">
                    <FieldLabel htmlFor="tit" help={{ text: 'Máximo 15 palabras. Describe el objeto, no el beneficio comercial.' }}>
                      Título <RequiredMark />
                    </FieldLabel>
                    <Input id="tit" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Ejemplo: Dispositivo de asistencia para danza" />
                  </div>
                  <div className="max-w-xl space-y-gob-2">
                    <label htmlFor="res" className="text-gri-body-sm font-medium">
                      Resumen
                    </label>
                    <Textarea id="res" rows={4} placeholder="Ejemplo: Prototipo que asiste el equilibrio en danza contemporánea." />
                  </div>
                </StepSection>
              )}

              {step === 'cip' && (
                <StepSection title="Clasificación Internacional de Patentes">
                  <div className="flex items-start gap-gob-2">
                    <p className="w-full text-gri-body-sm leading-[1.55] text-gob-text">
                      Agrega al menos un código <PlainTerm term="CIP">CIP</PlainTerm>. Completa sección, clase y subclase.
                    </p>
                    <HelpTooltip title="CIP" text="La Clasificación Internacional de Patentes agrupa invenciones por campo técnico.">
                      <a className="inline-flex text-gob-link underline" href={OMPI_CIP} rel="noopener noreferrer">
                        Clasificación Internacional de Patentes (OMPI). Se abre en otro sitio.
                      </a>
                    </HelpTooltip>
                  </div>

                  <div className="grid gap-gob-5 min-[800px]:grid-cols-2">
                    {(['seccion', 'clase', 'subclase', 'grupo', 'subgrupo'] as const).map(k => (
                      <div key={k} className="space-y-gob-2 rounded-gob-lg border-2 border-gob-border bg-card p-gob-4">
                        <FieldLabel
                          htmlFor={`cip-${k}`}
                          help={{
                            title: k,
                            text:
                              k === 'seccion'
                                ? 'Letra de la sección CIP (A a H).'
                                : k === 'clase'
                                  ? 'Número de dos dígitos de la clase.'
                                  : k === 'subclase'
                                    ? 'Letra de la subclase.'
                                    : k === 'grupo'
                                      ? 'Número del grupo principal.'
                                      : 'Número del subgrupo.',
                            example: k === 'seccion' ? 'A' : k === 'clase' ? '63' : k === 'subclase' ? 'B' : k === 'grupo' ? '25' : '00',
                          }}
                        >
                          {k === 'seccion' ? 'Sección' : k === 'clase' ? 'Clase' : k === 'subclase' ? 'Subclase' : k === 'grupo' ? 'Grupo' : 'Subgrupo'}
                        </FieldLabel>
                        <Input
                          id={`cip-${k}`}
                          value={cipDraft[k]}
                          onChange={e => setCipDraft(d => ({ ...d, [k]: e.target.value }))}
                          placeholder={k === 'seccion' ? 'Ejemplo: A' : k === 'clase' ? 'Ejemplo: 63' : k === 'subclase' ? 'Ejemplo: B' : k === 'grupo' ? 'Ejemplo: 25' : 'Ejemplo: 00'}
                          className="h-12 border-2 border-gob-text/40 bg-card"
                        />
                      </div>
                    ))}
                  </div>
                  <Button type="button" size="form" onClick={addCip}>
                    Agregar CIP
                  </Button>

                  <ul className="grid gap-gob-3">
                    {cip.map((row, i) => (
                      <li key={row.codigo + i} className="flex flex-wrap items-center gap-gob-3 rounded-gob-lg border border-gob-border bg-card p-gob-5">
                        <span className="inline-flex rounded-full bg-gob-primary px-gob-3 py-1 text-gri-body-sm font-semibold text-white">{row.codigo}</span>
                        <span className="flex-1 text-gri-body-sm text-gob-text">
                          Sección {row.seccion} · Clase {row.clase} · Subclase {row.subclase}
                        </span>
                        <ControlChip className="min-w-[11.5rem]" onClick={() => setCip(prev => prev.filter((_, idx) => idx !== i))}>
                          Quitar
                        </ControlChip>
                      </li>
                    ))}
                  </ul>
                  <p className="text-gri-body-sm text-muted-foreground">Ejemplos: {CIP_EJEMPLOS.map(c => c.codigo).join(', ')}</p>
                </StepSection>
              )}

              {step === 'usuario' && (
                <StepSection title="Datos de usuario">
                  <AccordionBlock title="Prioridad" defaultOpen>
                    <div className="flex items-center gap-gob-2">
                      <p className="font-heading text-gri-body font-medium">¿Esta es la primera presentación?</p>
                      <HelpTooltip title="Prioridad" text={TOOLTIP_PRIORIDAD_DECLARA} />
                    </div>
                    <label className="flex items-center gap-gob-3 min-h-11">
                      <input type="radio" name="prio" checked={prioMode === 'sin'} onChange={() => setPrioMode('sin')} />
                      Sin prioridad
                      <HelpTooltip text={TOOLTIP_PRIORIDAD_SIN} />
                    </label>
                    <label className="flex items-center gap-gob-3 min-h-11">
                      <input type="radio" name="prio" checked={prioMode === 'declara'} onChange={() => setPrioMode('declara')} />
                      Declara prioridades
                      <HelpTooltip text={TOOLTIP_PRIORIDAD_DECLARA} />
                    </label>
                    {prioMode === 'declara' ? (
                      <div className="space-y-gob-3">
                        <Button type="button" size="form" onClick={() => setPrioOpen(true)}>
                          Agregar prioridad
                        </Button>
                        {priorities.length > 0 ? (
                          <ul className="space-y-2 text-gri-body-sm">
                            {priorities.map((p, i) => (
                              <li key={p.numero + i} className="flex justify-between rounded-gob-md border border-gob-border px-gob-4 py-gob-3">
                                <span>
                                  {p.pais} · {p.fecha} · {p.numero}
                                </span>
                                <button type="button" className="text-gob-link underline" onClick={() => setPriorities(prev => prev.filter((_, idx) => idx !== i))}>
                                  Quitar
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gri-body-sm text-muted-foreground">Aún no hay prioridades. Debes agregar al menos una.</p>
                        )}
                      </div>
                    ) : null}
                    <label className="flex items-center gap-gob-3 min-h-11">
                      <input
                        type="checkbox"
                        checked={provisional}
                        onChange={e => {
                          const on = e.target.checked
                          setProvisional(on)
                          if (on) setDivisional(false)
                        }}
                      />
                      Solicitud provisional
                      <HelpTooltip text={TOOLTIP_PROVISIONAL} />
                    </label>
                    {provisional ? (
                      <Input value={provisionalNum} onChange={e => setProvisionalNum(e.target.value)} placeholder="Ejemplo: 202401234" className="h-11" />
                    ) : null}
                    <label className="flex items-center gap-gob-3 min-h-11">
                      <input
                        type="checkbox"
                        checked={divisional}
                        onChange={e => {
                          const on = e.target.checked
                          setDivisional(on)
                          if (on) setProvisional(false)
                        }}
                      />
                      Solicitud divisional
                      <HelpTooltip text={TOOLTIP_DIVISIONAL} />
                    </label>
                    {divisional ? (
                      <Input value={divisionalNum} onChange={e => setDivisionalNum(e.target.value)} placeholder="Ejemplo: 202201111" className="h-11" />
                    ) : null}
                  </AccordionBlock>
                  <AccordionBlock title="Solicitante" defaultOpen>
                    <FormPersona title="Datos del solicitante" onChange={() => setSolicitanteOk(true)} />
                  </AccordionBlock>
                  <AccordionBlock title="Representante">
                    <FormPersona title="Datos del representante (opcional)" onChange={() => setRepresentanteOk(true)} />
                  </AccordionBlock>
                  <AccordionBlock title="Inventores o creadores">
                    <div className="max-w-xl space-y-gob-2">
                      <label htmlFor="inv" className="text-gri-body-sm font-medium">
                        Nombre <RequiredMark />
                      </label>
                      <Input id="inv" value={inventor} onChange={e => setInventor(e.target.value)} placeholder="Ejemplo: Ana Soto" />
                    </div>
                  </AccordionBlock>
                </StepSection>
              )}

              {step === 'declaraciones' && (
                <StepSection title="Declaraciones" description="Puedes marcar más de una. Cada opción abre el adjunto que acredita lo declarado.">
                  <div className="grid gap-gob-4 min-[1100px]:grid-cols-4">
                    {(
                      [
                        { id: 'divulgacion', label: 'Divulgación previa', tip: TOOLTIP_DIVULGACION, why: 'Adjunta el documento de los últimos 12 meses.' },
                        { id: 'restauracion', label: 'Restauración de prioridad', tip: TOOLTIP_RESTAURACION, why: 'Si presentas dentro de los 2 meses posteriores al vencimiento.' },
                        ...(variant === 'patente'
                          ? [{ id: 'pct' as const, label: 'Entrada en fase nacional PCT', tip: TOOLTIP_PCT_NACIONAL, why: 'Adjunta el comprobante PCT.' }]
                          : []),
                        { id: 'diferir', label: 'Diferir el pago de tasas', tip: TOOLTIP_DIFERIR_PAGO, why: 'Adjunta la declaración de carencia de medios.' },
                      ] as { id: keyof typeof decl; label: string; tip: string; why: string }[]
                    ).map(item => (
                      <div key={item.id} className="rounded-gob-lg border border-gob-border p-gob-4 space-y-gob-3">
                        <label className="flex items-start gap-gob-2 font-heading text-gri-body-sm font-medium">
                          <input
                            type="checkbox"
                            className="mt-1"
                            checked={decl[item.id]}
                            onChange={e => setDecl(d => ({ ...d, [item.id]: e.target.checked }))}
                          />
                          <span className="flex-1">{item.label}</span>
                          <HelpTooltip text={item.tip} />
                        </label>
                        <p className="text-gri-body-xs text-gob-text">{item.why}</p>
                        {decl[item.id] ? (
                          <FileField
                            label="Documento de respaldo"
                            description="PDF de hasta 10 MB."
                            tooltip="Ejemplo: declaracion.pdf"
                            fileName={adjuntos[item.id]}
                            onFile={name => setAdjuntos(a => ({ ...a, [item.id]: name }))}
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </StepSection>
              )}

              {step === 'documentos' && (
                <StepSection title="Documentos" description="Adjunta los archivos técnicos. Usa PDF cuando sea posible.">
                  {variant === 'patente' ? (
                    <div className="grid gap-gob-4 min-[600px]:grid-cols-2">
                      <FileField label="Memoria descriptiva" description="Explica cómo funciona la invención." tooltip="Ejemplo: memoria_descriptiva.pdf" fileName={docs.memoria} onFile={n => setDocs(d => ({ ...d, memoria: n }))} />
                      <FileField label="Reivindicaciones" description="Define qué se pide proteger." tooltip="Ejemplo: reivindicaciones.pdf" fileName={docs.reivindicaciones} onFile={n => setDocs(d => ({ ...d, reivindicaciones: n }))} />
                      <FileField label="Resumen" description="Texto breve para la publicación." tooltip="Ejemplo: resumen.pdf" fileName={docs.resumen} onFile={n => setDocs(d => ({ ...d, resumen: n }))} />
                      <FileField label="Dibujos" description="Figuras numeradas de la invención." tooltip="Ejemplo: dibujos.pdf" fileName={docs.dibujos} onFile={n => setDocs(d => ({ ...d, dibujos: n }))} />
                      <div className="space-y-gob-2 min-[600px]:col-span-2 rounded-gob-md border-2 border-gob-border p-gob-4">
                        <FieldLabel htmlFor="paginas" help={{ text: 'Suma las páginas de memoria, reivindicaciones, resumen y dibujos.', example: '24' }}>
                          Total de páginas
                        </FieldLabel>
                        <Input id="paginas" value={docs.paginas} onChange={e => setDocs(d => ({ ...d, paginas: e.target.value }))} placeholder="Ejemplo: 24" className="h-11 max-w-xs" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-gob-4 min-[600px]:grid-cols-2">
                      <FileField label="Figura principal" description="La vista que mejor identifica el diseño." tooltip="Ejemplo: figura_principal.pdf" fileName={docs.figura} onFile={n => setDocs(d => ({ ...d, figura: n }))} />
                      <FileField label="Memoria descriptiva" description="Describe las características ornamentales." tooltip="Ejemplo: memoria.pdf" fileName={docs.memoria} onFile={n => setDocs(d => ({ ...d, memoria: n }))} />
                      <FileField label="Figuras adicionales" description="Otras vistas del objeto." tooltip="Ejemplo: figuras.pdf" fileName={docs.figuras} onFile={n => setDocs(d => ({ ...d, figuras: n }))} />
                      <FileField label="Otros documentos" description="Poder, cesión u otros respaldos." tooltip="Ejemplo: poder.pdf" fileName={docs.otros} onFile={n => setDocs(d => ({ ...d, otros: n }))} />
                      <div className="space-y-gob-2 min-[600px]:col-span-2 rounded-gob-md border-2 border-gob-border p-gob-4">
                        <FieldLabel htmlFor="paginas-d" help={{ text: 'Suma todas las páginas del expediente.', example: '8' }}>
                          Total de páginas
                        </FieldLabel>
                        <Input id="paginas-d" value={docs.paginas} onChange={e => setDocs(d => ({ ...d, paginas: e.target.value }))} placeholder="Ejemplo: 8" className="h-11 max-w-xs" />
                      </div>
                    </div>
                  )}
                </StepSection>
              )}

              {step === 'tasas' && (
                <StepSection title="Tasas de presentación" description="Valor UTM de referencia. Puedes postergar el pago 30 días si corresponde.">
                  <div className="grid gap-gob-4 min-[600px]:grid-cols-2">
                    <article className="rounded-gob-md border border-gob-border p-gob-4">
                      <p className="text-gri-body-sm text-muted-foreground">UTM de referencia</p>
                      <p className="font-heading text-2xl font-semibold text-gob-text">${UTM_CLP.toLocaleString('es-CL')}</p>
                      <p className="mt-1 text-gri-body-xs text-muted-foreground">Valor publicado para este cálculo.</p>
                    </article>
                    <article className="rounded-gob-md border-2 border-gob-text p-gob-4">
                      <p className="text-gri-body-sm text-muted-foreground">Total estimado</p>
                      <p className="font-heading text-2xl font-semibold text-gob-text">${(postergar ? 0 : UTM_CLP).toLocaleString('es-CL')}</p>
                      <p className="mt-1 text-gri-body-xs text-muted-foreground">{postergar ? 'Pago postergado 30 días.' : 'Se paga al presentar.'}</p>
                    </article>
                  </div>
                  <label className="flex items-center gap-gob-3 min-h-11">
                    <input type="checkbox" checked={postergar} onChange={e => setPostergar(e.target.checked)} />
                    Postergar el pago 30 días
                    <HelpTooltip text={TOOLTIP_DIFERIR_PAGO} />
                  </label>
                  <section className="space-y-gob-4 rounded-gob-md border-2 border-gob-border p-gob-4">
                    <h3 className="font-heading text-lg font-medium">Datos para Tesorería (TGR)</h3>
                    <div className="grid gap-gob-4 min-[600px]:grid-cols-2">
                      <div className="space-y-gob-2">
                        <label className="text-gri-body-sm font-medium">Nacionalidad</label>
                        <Input value={tgr.nacionalidad} onChange={e => setTgr(t => ({ ...t, nacionalidad: e.target.value }))} className="h-11" />
                      </div>
                      <div className="space-y-gob-2">
                        <label className="flex items-center gap-gob-2 text-gri-body-sm font-medium">
                          RUT <RequiredMark />
                        </label>
                        <Input value={tgr.rut} onChange={e => setTgr(t => ({ ...t, rut: e.target.value }))} placeholder="Ejemplo: 11.123.123-K" className="h-11" />
                      </div>
                      <div className="space-y-gob-2 min-[600px]:col-span-2">
                        <label className="text-gri-body-sm font-medium">Razón social o nombre</label>
                        <Input value={tgr.razon} onChange={e => setTgr(t => ({ ...t, razon: e.target.value }))} placeholder="Ejemplo: Taller Paso Firme SpA" className="h-11" />
                      </div>
                      <div className="space-y-gob-2">
                        <label className="flex items-center gap-gob-2 text-gri-body-sm font-medium">
                          Correo <RequiredMark />
                        </label>
                        <Input type="email" value={tgr.correo} onChange={e => setTgr(t => ({ ...t, correo: e.target.value }))} placeholder="Ejemplo: correo@dominio.cl" className="h-11" />
                      </div>
                      <div className="space-y-gob-2">
                        <label className="text-gri-body-sm font-medium">Correo de copia</label>
                        <Input type="email" value={tgr.correo2} onChange={e => setTgr(t => ({ ...t, correo2: e.target.value }))} placeholder="Ejemplo: copia@dominio.cl" className="h-11" />
                      </div>
                    </div>
                  </section>
                </StepSection>
              )}

              {step === 'revision' && (
                <StepSection title="Revisión final" description="Comprueba cada bloque.">
                  <ReviewGrid
                    items={[
                      { ok: !!titulo, label: 'Datos', detail: titulo },
                      ...(variant === 'patente' ? [{ ok: cip.length > 0, label: 'CIP', detail: cip.map(c => c.codigo).join(', ') }] : []),
                      { ok: prioMode === 'sin' || priorities.length > 0, label: 'Prioridad', detail: prioMode === 'sin' ? 'Sin prioridad' : `${priorities.length} prioridad(es)` },
                      { ok: solicitanteOk, label: 'Solicitante', detail: solicitanteOk ? 'Completo' : 'Pendiente' },
                      { ok: true, label: 'Representante', detail: representanteOk ? 'Datos ingresados' : 'Sin representante' },
                      { ok: !!inventor, label: 'Inventores', detail: inventor },
                    ]}
                  />
                </StepSection>
              )}

              <div className="flex flex-wrap gap-gob-3 pt-gob-4">
                <Button variant="outline" size="form" disabled={stepIndex <= 0} onClick={prev}>
                  Volver
                </Button>
                <Button variant="outline" size="form" onClick={() => setSaved('Borrador guardado. Tienes 60 días para pagarlo.')}>
                  Guardar
                </Button>
                <Button size="form" onClick={next}>
                  {step === 'revision' ? 'Ir a pagar' : 'Siguiente'}
                </Button>
              </div>
              {saved ? <p className="text-gri-body-sm text-gob-success">{saved}</p> : null}
            </>
          }
          aside={
            <>
              <HelperCard title="Tu avance">
                <Checklist
                  current={step}
                  onSelect={go}
                  items={steps.map(s => ({
                    id: s.id,
                    label: s.label,
                    done: completeness[s.id] === 'ok',
                  }))}
                />
              </HelperCard>
              <HelperCard
                title={helpers[step]?.title ?? 'Ayuda de este paso'}
                tone="night"
                collapsible
                hint="Abrir ayuda"
              >
                <BulletList items={helpers[step]?.items ?? []} />
                {step === 'tasas' ? <p className="pt-gob-2">Los datos TGR se usan solo para el pago de esta presentación.</p> : null}
              </HelperCard>
            </>
          }
        />

        <Dialog open={prioOpen} onOpenChange={setPrioOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar prioridad</DialogTitle>
              <DialogDescription>País, fecha, número, adjunto y código DAS si corresponde.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-gob-3">
              <Input placeholder="País. Ejemplo: AR" value={prioDraft.pais} onChange={e => setPrioDraft(d => ({ ...d, pais: e.target.value }))} className="h-11" />
              <Input type="date" value={prioDraft.fecha} onChange={e => setPrioDraft(d => ({ ...d, fecha: e.target.value }))} className="h-11" />
              <Input placeholder="Número. Ejemplo: 202312345" value={prioDraft.numero} onChange={e => setPrioDraft(d => ({ ...d, numero: e.target.value }))} className="h-11" />
              <Input type="file" onChange={e => setPrioDraft(d => ({ ...d, adjunto: e.target.files?.[0]?.name ?? '' }))} />
              <Input placeholder="Código DAS (opcional)" value={prioDraft.das} onChange={e => setPrioDraft(d => ({ ...d, das: e.target.value }))} className="h-11" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPrioOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={addPrio}>Agregar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={needPrio} onOpenChange={setNeedPrio}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Falta una prioridad</DialogTitle>
              <DialogDescription>Debe agregar al menos una prioridad si eligió “Declara prioridades”.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setNeedPrio(false)}>Entendido</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TramitesMain>
    </RequireAuth>
  )
}
