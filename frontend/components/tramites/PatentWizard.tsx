'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, ChevronDown, FileText, Flag, Layers, UserRound } from 'lucide-react'
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
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { LegalNotice } from '@/components/tramites/LegalNotice'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { StatusTabs, type TabStatus } from '@/components/tramites/StatusTabs'
import { FileField, RequiredMark, StepSection, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
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
import { cn } from '@/lib/utils'

const BASE_STEPS = [
  { id: 'datos', label: 'Datos' },
  { id: 'cip', label: 'CIP' },
  { id: 'prioridad', label: 'Prioridad' },
  { id: 'solicitante', label: 'Solicitante' },
  { id: 'representante', label: 'Representante' },
  { id: 'inventores', label: 'Inventores' },
  { id: 'declaraciones', label: 'Declaraciones' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'tasas', label: 'Tasas' },
  { id: 'revision', label: 'Revisión' },
]

type CipRow = { seccion: string; clase: string; subclase: string; grupo: string; subgrupo: string; codigo: string }
type PrioridadRow = { pais: string; fecha: string; numero: string; adjunto: string; das: string }

export function PatentWizard({ variant }: { variant: 'patente' | 'diseno' }) {
  const steps = variant === 'diseno' ? BASE_STEPS.filter(s => s.id !== 'cip') : BASE_STEPS
  const [step, setStep] = useState('datos')
  const [titulo, setTitulo] = useState(
    variant === 'diseno' ? 'Diseño de tarima plegable' : 'Dispositivo de asistencia para danza',
  )
  const [tipo, setTipo] = useState(variant === 'diseno' ? 'diseno' : 'patente')
  const [cip, setCip] = useState<CipRow[]>([{ seccion: 'A', clase: '63', subclase: 'B', grupo: '25', subgrupo: '00', codigo: 'A63B 25/00' }])
  const [cipOpen, setCipOpen] = useState(false)
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
  const [openBlocks, setOpenBlocks] = useState<string[]>([])

  const go = (id: string) => setStep(id)
  const next = () => {
    if (step === 'prioridad' && prioMode === 'declara' && priorities.length === 0) {
      setNeedPrio(true)
      return
    }
    const i = steps.findIndex(s => s.id === step)
    if (i < steps.length - 1) go(steps[i + 1].id)
  }

  const completeness: Record<string, TabStatus> = useMemo(() => {
    const datos = titulo.trim() ? 'ok' : 'idle'
    const cipSt = cip.length ? 'ok' : 'idle'
    const prioSt =
      prioMode === 'sin' ? 'ok' : priorities.length ? 'ok' : 'error'
    const sol = solicitanteOk ? 'ok' : 'idle'
    const rep = representanteOk ? 'ok' : 'idle'
    const inv = inventor.trim() ? 'ok' : 'idle'
    const declaraciones = 'ok'
    const documentos = docs.memoria || docs.figura || docs.paginas ? 'ok' : 'idle'
    const tasas = tgr.rut.trim() && tgr.correo.trim() ? 'ok' : tgr.rut || tgr.correo ? 'error' : 'idle'
    const revision = datos === 'ok' && (variant === 'diseno' || cipSt === 'ok') && prioSt === 'ok' ? 'ok' : 'error'
    return { datos, cip: cipSt, prioridad: prioSt, solicitante: sol, representante: rep, inventores: inv, declaraciones, documentos, tasas, revision }
  }, [titulo, cip, prioMode, priorities, solicitanteOk, representanteOk, inventor, docs, tgr, variant])

  const tabs = steps.map(s => ({
    id: s.id,
    label: s.label,
    status: (step === s.id ? 'active' : completeness[s.id] ?? 'idle') as TabStatus,
  }))

  const toggleBlock = (id: string) => setOpenBlocks(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))

  const addCip = () => {
    const codigo = `${cipDraft.seccion}${cipDraft.clase}${cipDraft.subclase} ${cipDraft.grupo}/${cipDraft.subgrupo}`
    setCip(prev => [...prev, { ...cipDraft, codigo }])
    setCipOpen(false)
  }

  const addPrio = () => {
    if (!prioDraft.pais || !prioDraft.fecha || !prioDraft.numero) return
    setPriorities(prev => [...prev, prioDraft])
    setPrioDraft({ pais: '', fecha: '', numero: '', adjunto: '', das: '' })
    setPrioOpen(false)
  }

  return (
    <RequireAuth>
      <TramitesMain>
        <StatusTabs tabs={tabs} current={step} onSelect={go} accent="patentes" />

        {step === 'datos' && (
          <StepSection title="Datos de la solicitud" description="Indica el tipo y un título claro del objeto que quieres proteger.">
            {variant === 'patente' && (
              <div className="max-w-xl space-y-gob-2">
                <label htmlFor="tipo" className="flex items-center text-gri-body-sm font-medium">
                  Tipo de solicitud <RequiredMark />
                  <HelpTooltip text="Patente de invención o modelo de utilidad." />
                </label>
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
              <label htmlFor="tit" className="flex items-center text-gri-body-sm font-medium">
                Título <RequiredMark />
              </label>
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
          <StepSection
            title="Clasificación Internacional de Patentes"
            description="Agrega al menos un código CIP. Consulta la clasificación de la OMPI si lo necesitas."
          >
            <p className="text-gri-body-sm">
              <a className="text-gob-link underline" href="https://www.wipo.int/es/web/classification-ipc" rel="noopener noreferrer">
                Clasificación Internacional de Patentes (OMPI)
              </a>
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-gri-body-sm">
                <caption className="sr-only">Códigos CIP</caption>
                <thead>
                  <tr className="border-b border-gob-border text-left">
                    <th className="py-2">Código</th>
                    <th>Sección</th>
                    <th>Clase</th>
                    <th>Subclase</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {cip.map((row, i) => (
                    <tr key={row.codigo + i} className="border-b border-gob-border">
                      <td className="py-2">{row.codigo}</td>
                      <td>{row.seccion}</td>
                      <td>{row.clase}</td>
                      <td>{row.subclase}</td>
                      <td>
                        <Button variant="outline" size="sm" type="button" onClick={() => setCip(prev => prev.filter((_, idx) => idx !== i))}>
                          Quitar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gri-body-sm text-muted-foreground">Ejemplos de códigos CIP: {CIP_EJEMPLOS.map(c => c.codigo).join(', ')}</p>
            <Button type="button" size="form" onClick={() => setCipOpen(true)}>
              Agregar CIP
            </Button>
          </StepSection>
        )}

        {step === 'prioridad' && (
          <StepSection title="Prioridad" description="Elige si esta es la primera presentación o si declaras prioridades anteriores.">
            <fieldset className="space-y-gob-3">
              <legend className="sr-only">Tipo de prioridad</legend>
              <label className="flex items-start gap-gob-3 min-h-11">
                <input type="radio" name="prio" checked={prioMode === 'sin'} onChange={() => setPrioMode('sin')} />
                <span>
                  Sin prioridad
                  <HelpTooltip text={TOOLTIP_PRIORIDAD_SIN} />
                </span>
              </label>
              <label className="flex items-start gap-gob-3 min-h-11">
                <input type="radio" name="prio" checked={prioMode === 'declara'} onChange={() => setPrioMode('declara')} />
                <span>
                  Declara prioridades
                  <HelpTooltip text={TOOLTIP_PRIORIDAD_DECLARA} />
                </span>
              </label>
            </fieldset>

            {prioMode === 'declara' ? (
              <div className="space-y-gob-4">
                <Button type="button" size="form" onClick={() => setPrioOpen(true)}>
                  Agregar prioridad
                </Button>
                {priorities.length > 0 ? (
                  <ul className="space-y-2 text-gri-body-sm">
                    {priorities.map((p, i) => (
                      <li key={p.numero + i} className="flex justify-between rounded-gob-md border border-gob-border px-gob-4 py-gob-3">
                        <span>
                          {p.pais} · {p.fecha} · {p.numero}
                          {p.das ? ` · DAS ${p.das}` : ''}
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

            <div className="grid gap-gob-4 min-[600px]:grid-cols-2">
              <div className="rounded-gob-md border border-gob-border p-gob-4 space-y-gob-3">
                <label className="flex items-start gap-gob-3">
                  <input
                    type="checkbox"
                    checked={provisional}
                    onChange={e => {
                      const on = e.target.checked
                      setProvisional(on)
                      if (on) setDivisional(false)
                    }}
                  />
                  <span>
                    Solicitud provisional
                    <HelpTooltip text={TOOLTIP_PROVISIONAL} />
                  </span>
                </label>
                {provisional ? (
                  <Input value={provisionalNum} onChange={e => setProvisionalNum(e.target.value)} placeholder="Ejemplo: 202401234" className="h-11" />
                ) : null}
              </div>
              <div className="rounded-gob-md border border-gob-border p-gob-4 space-y-gob-3">
                <label className="flex items-start gap-gob-3">
                  <input
                    type="checkbox"
                    checked={divisional}
                    onChange={e => {
                      const on = e.target.checked
                      setDivisional(on)
                      if (on) setProvisional(false)
                    }}
                  />
                  <span>
                    Solicitud divisional
                    <HelpTooltip text={TOOLTIP_DIVISIONAL} />
                  </span>
                </label>
                {divisional ? (
                  <Input value={divisionalNum} onChange={e => setDivisionalNum(e.target.value)} placeholder="Ejemplo: 202201111" className="h-11" />
                ) : null}
              </div>
            </div>
          </StepSection>
        )}

        {step === 'solicitante' && (
          <StepSection title="Solicitante" description="Quién pide el derecho.">
            <FormPersona title="Datos del solicitante" onChange={() => setSolicitanteOk(true)} />
          </StepSection>
        )}
        {step === 'representante' && (
          <StepSection title="Representante" description="Opcional si presentas el trámite por otra persona.">
            <FormPersona title="Datos del representante (opcional)" onChange={() => setRepresentanteOk(true)} />
          </StepSection>
        )}
        {step === 'inventores' && (
          <StepSection title="Inventores o creadores" description="Quien concibió la invención o el diseño.">
            <div className="max-w-xl space-y-gob-2">
              <label htmlFor="inv" className="text-gri-body-sm font-medium">
                Nombre <RequiredMark />
              </label>
              <Input id="inv" value={inventor} onChange={e => setInventor(e.target.value)} placeholder="Ejemplo: Ana Soto" />
            </div>
          </StepSection>
        )}

        {step === 'declaraciones' && (
          <StepSection title="Declaraciones" description="Puedes marcar más de una. Cada opción abre el adjunto que acredita lo declarado.">
            {(
              [
                { id: 'divulgacion', label: 'Divulgación previa', tip: TOOLTIP_DIVULGACION, why: 'Adjunta el documento que describe la divulgación de los últimos 12 meses, para que no afecte novedad ni nivel inventivo.', tone: 'plain' as const },
                { id: 'restauracion', label: 'Restauración de prioridad', tip: TOOLTIP_RESTAURACION, why: 'Adjunta el respaldo si presentas la solicitud dentro de los 2 meses posteriores al vencimiento del plazo de prioridad.', tone: 'soft' as const },
                ...(variant === 'patente'
                  ? [{ id: 'pct' as const, label: 'Entrada en fase nacional PCT', tip: TOOLTIP_PCT_NACIONAL, why: 'Adjunta el comprobante PCT si pides que la solicitud se tenga por presentada dentro de los 30 meses.', tone: 'strong' as const }]
                  : []),
                { id: 'diferir', label: 'Diferir el pago de tasas', tip: TOOLTIP_DIFERIR_PAGO, why: 'Adjunta la declaración de carencia de medios si pides postergar el pago de tasas.', tone: 'plain' as const },
              ] as { id: keyof typeof decl; label: string; tip: string; why: string; tone: 'plain' | 'soft' | 'strong' }[]
            ).map(item => (
              <div key={item.id} className={cn('rounded-gob-lg border p-gob-5 space-y-gob-4', item.tone === 'soft' && 'border-gob-primary/25 bg-gob-primary/5', item.tone === 'strong' && 'border-gob-accent/30 bg-gob-accent/5')}>
                <label className="flex items-center justify-center gap-gob-3 font-heading font-medium">
                  <input
                    type="checkbox"
                    checked={decl[item.id]}
                    onChange={e => setDecl(d => ({ ...d, [item.id]: e.target.checked }))}
                  />
                  {item.label}
                  <HelpTooltip text={item.tip} />
                </label>
                <p className="text-center text-gri-body-sm text-gob-text">{item.why}</p>
                {decl[item.id] ? (
                  <FileField
                    label="Documento de respaldo"
                    description="Sube un PDF. El archivo acredita esta declaración ante INAPI."
                    tooltip="Formatos habituales: PDF de hasta 10 MB."
                    fileName={adjuntos[item.id]}
                    onFile={name => setAdjuntos(a => ({ ...a, [item.id]: name }))}
                    tone={item.tone}
                  />
                ) : null}
              </div>
            ))}
          </StepSection>
        )}

        {step === 'documentos' && (
          <StepSection title="Documentos" description="Adjunta los archivos técnicos de la solicitud. Usa PDF cuando sea posible y declara el total de páginas.">
            {variant === 'patente' ? (
              <div className="grid gap-gob-4 min-[600px]:grid-cols-2">
                <FileField label="Memoria descriptiva" description="Explica cómo funciona la invención, con el detalle suficiente para que una persona experta pueda reproducirla." tooltip="Ejemplo: memoria_descriptiva.pdf" fileName={docs.memoria} onFile={n => setDocs(d => ({ ...d, memoria: n }))} tone="soft" />
                <FileField label="Reivindicaciones" description="Define con precisión qué se pide proteger. Cada reivindicación delimita el derecho." tooltip="Ejemplo: reivindicaciones.pdf" fileName={docs.reivindicaciones} onFile={n => setDocs(d => ({ ...d, reivindicaciones: n }))} />
                <FileField label="Resumen" description="Texto breve para la publicación. No reemplaza la memoria." tooltip="Ejemplo: resumen.pdf" fileName={docs.resumen} onFile={n => setDocs(d => ({ ...d, resumen: n }))} />
                <FileField label="Dibujos" description="Figuras numeradas que ilustran la invención. Incluye vistas suficientes." tooltip="Ejemplo: dibujos.pdf" fileName={docs.dibujos} onFile={n => setDocs(d => ({ ...d, dibujos: n }))} tone="strong" />
                <div className="space-y-gob-2 min-[600px]:col-span-2 rounded-gob-md border border-gob-border p-gob-4">
                  <label className="flex items-center text-gri-body font-medium">
                    Total de páginas
                    <HelpTooltip text="Suma las páginas de memoria, reivindicaciones, resumen y dibujos. Ejemplo: 24." />
                  </label>
                  <p className="text-gri-body-sm">Este número se usa para el control formal del expediente.</p>
                  <Input value={docs.paginas} onChange={e => setDocs(d => ({ ...d, paginas: e.target.value }))} placeholder="Ejemplo: 24" className="h-11 max-w-xs" />
                </div>
              </div>
            ) : (
              <div className="grid gap-gob-4 min-[600px]:grid-cols-2">
                <FileField label="Figura principal" description="La vista que mejor identifica el diseño o dibujo." tooltip="Ejemplo: figura_principal.pdf" fileName={docs.figura} onFile={n => setDocs(d => ({ ...d, figura: n }))} tone="soft" />
                <FileField label="Memoria descriptiva" description="Describe las características ornamentales o de forma que se protegen." tooltip="Ejemplo: memoria.pdf" fileName={docs.memoria} onFile={n => setDocs(d => ({ ...d, memoria: n }))} />
                <FileField label="Figuras adicionales" description="Otras vistas (perfil, planta, perspectiva) para entender el objeto." tooltip="Ejemplo: figuras.pdf" fileName={docs.figuras} onFile={n => setDocs(d => ({ ...d, figuras: n }))} />
                <FileField label="Otros documentos" description="Poder, cesión u otros respaldos si corresponden." tooltip="Ejemplo: poder.pdf" fileName={docs.otros} onFile={n => setDocs(d => ({ ...d, otros: n }))} tone="strong" />
                <div className="space-y-gob-2 min-[600px]:col-span-2 rounded-gob-md border border-gob-border p-gob-4">
                  <label className="flex items-center text-gri-body font-medium">
                    Total de páginas
                    <HelpTooltip text="Suma todas las páginas del expediente. Ejemplo: 8." />
                  </label>
                  <Input value={docs.paginas} onChange={e => setDocs(d => ({ ...d, paginas: e.target.value }))} placeholder="Ejemplo: 8" className="h-11 max-w-xs" />
                </div>
              </div>
            )}
          </StepSection>
        )}

        {step === 'tasas' && (
          <StepSection title="Tasas de presentación" description="Valor UTM de referencia $72.151. Puedes postergar el pago 30 días si corresponde.">
            <div className="grid gap-gob-4 min-[600px]:grid-cols-2">
              <article className="rounded-gob-md border border-gob-border p-gob-4">
                <p className="text-gri-body-sm text-muted-foreground">UTM de referencia</p>
                <p className="font-heading text-xl">${UTM_CLP.toLocaleString('es-CL')}</p>
              </article>
              <article className="rounded-gob-md border border-gob-primary/40 bg-gob-primary/5 p-gob-4">
                <p className="text-gri-body-sm text-muted-foreground">Total estimado</p>
                <p className="font-heading text-xl">${(postergar ? 0 : UTM_CLP).toLocaleString('es-CL')}</p>
              </article>
            </div>
            <label className="flex items-start gap-gob-3">
              <input type="checkbox" checked={postergar} onChange={e => setPostergar(e.target.checked)} />
              <span>
                Postergar el pago 30 días
                <HelpTooltip text={TOOLTIP_DIFERIR_PAGO} />
              </span>
            </label>
            <section className="space-y-gob-4 rounded-gob-md border border-gob-border p-gob-4">
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
          <StepSection title="Revisión final" description="Abre cada bloque para comprobar los datos.">
            {[
              { id: 'datos', ok: !!titulo, label: 'Datos', detail: titulo },
              ...(variant === 'patente' ? [{ id: 'cip', ok: cip.length > 0, label: 'CIP', detail: cip.map(c => c.codigo).join(', ') }] : []),
              { id: 'prioridad', ok: prioMode === 'sin' || priorities.length > 0, label: 'Prioridad', detail: prioMode === 'sin' ? 'Sin prioridad' : `${priorities.length} prioridad(es)` },
              { id: 'inventores', ok: !!inventor, label: 'Inventores', detail: inventor },
            ].map((item, i) => {
              const Icon = item.id === 'cip' ? Layers : item.id === 'prioridad' ? Flag : item.id === 'inventores' ? UserRound : FileText
              return (
              <div key={item.id} className={cn('overflow-hidden rounded-gob-lg border shadow-elevation-01', item.ok ? 'border-gob-success/30' : 'border-gob-warning/40')}>
                <button type="button" className="flex w-full items-center gap-gob-3 px-gob-4 py-gob-4 text-left hover:bg-gob-surface-elevated" onClick={() => toggleBlock(item.id)}>
                  <span className={cn('inline-flex size-10 items-center justify-center rounded-gob-md text-white', item.ok ? 'bg-gob-success' : 'bg-gob-warning', i === 0 && 'bg-gob-primary')}>
                    {item.ok ? <CheckCircle2 className="size-5" /> : <Icon className="size-5" />}
                  </span>
                  <span className="flex-1">
                    <span className={cn('block font-heading font-medium', item.ok ? 'text-gob-text' : 'text-gob-warning')}>{item.label}</span>
                    <span className="text-gri-body-xs text-muted-foreground">{item.ok ? 'Completo' : 'Requiere revisión'}</span>
                  </span>
                  <ChevronDown className={cn('size-5 transition-transform', openBlocks.includes(item.id) && 'rotate-180')} />
                </button>
                {openBlocks.includes(item.id) ? <p className="border-t border-gob-border bg-gob-surface-elevated/50 px-gob-4 py-gob-3 text-gri-body-sm">{item.detail}</p> : null}
              </div>
            )})}
          </StepSection>
        )}

        <div className="flex flex-wrap gap-gob-3 pt-gob-4">
          <Button variant="outline" size="form" onClick={() => setSaved('Borrador guardado. Tienes 60 días para pagarlo.')}>
            Guardar
          </Button>
          {step !== 'revision' && (
            <Button size="form" onClick={next}>
              Siguiente
            </Button>
          )}
        </div>
        {saved ? <p className="text-gri-body-sm text-gob-success">{saved}</p> : null}
        <LegalNotice>{LEGAL_WIZARD_PATENTE}</LegalNotice>

        <Dialog open={cipOpen} onOpenChange={setCipOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar código CIP</DialogTitle>
              <DialogDescription>
                Completa sección, clase, subclase, grupo y subgrupo.{' '}
                <a className="text-gob-link underline" href="https://www.wipo.int/es/web/classification-ipc" rel="noopener noreferrer">
                  Clasificación Internacional de Patentes (OMPI)
                </a>
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-gob-3 min-[600px]:grid-cols-2">
              {(['seccion', 'clase', 'subclase', 'grupo', 'subgrupo'] as const).map(k => (
                <div key={k} className="space-y-1">
                  <label className="text-gri-body-sm font-medium capitalize">{k}</label>
                  <Input value={cipDraft[k]} onChange={e => setCipDraft(d => ({ ...d, [k]: e.target.value }))} className="h-11" />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCipOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={addCip}>Agregar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
