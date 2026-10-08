'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ChevronDown, CreditCard, Flag, Info, Layers, UserRound, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { FormPersona } from '@/components/solicitud/FormPersona'
import { ClaseSugeridaPanel } from '@/components/tramites/ClaseSugeridaPanel'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { LegalNotice } from '@/components/tramites/LegalNotice'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { StatusTabs, type TabStatus } from '@/components/tramites/StatusTabs'
import { RequiredMark, StepSection, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { LEGAL_DENOMINATIVA, LEGAL_WIZARD_MARCA } from '@/lib/tramites/legal'
import { NIZA_CLASES, UTM_CLP } from '@/lib/tramites/mock-data'
import { useTramitesSession } from '@/lib/tramites/use-session'
import { cn } from '@/lib/utils'

const STEPS = [
  { id: 'datos', label: 'Datos' },
  { id: 'clases', label: 'Clases' },
  { id: 'prioridad', label: 'Prioridad' },
  { id: 'solicitante', label: 'Solicitante' },
  { id: 'representante', label: 'Representante' },
  { id: 'tasas', label: 'Tasas' },
  { id: 'revision', label: 'Revisión' },
]

export function MarcaWizard() {
  const router = useRouter()
  const { session } = useTramitesSession()
  const [step, setStep] = useState('datos')
  const [signo, setSigno] = useState('')
  const [tipo, setTipo] = useState('')
  const [clases, setClases] = useState<number[]>([])
  const [prio, setPrio] = useState(false)
  const [prioOpen, setPrioOpen] = useState(false)
  const [prioDraft, setPrioDraft] = useState({ pais: '', fecha: '', numero: '', das: false, dasCode: '' })
  const [priorities, setPriorities] = useState<typeof prioDraft[]>([])
  const [solicitanteOk, setSolicitanteOk] = useState(false)
  const [representanteOk, setRepresentanteOk] = useState(false)
  const [denominativaOpen, setDenominativaOpen] = useState(false)
  const [openBlocks, setOpenBlocks] = useState<string[]>([])
  const [saved, setSaved] = useState('')

  const toggleClase = (n: number) => {
    setClases(prev => (prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n].sort((a, b) => a - b)))
  }

  const completeness: Record<string, TabStatus> = useMemo(() => {
    const datos = signo.trim() && tipo ? 'ok' : signo.trim() || tipo ? 'error' : 'idle'
    const clasesSt = clases.length ? 'ok' : 'idle'
    const prioSt = !prio || priorities.length ? 'ok' : 'error'
    const sol = solicitanteOk ? 'ok' : 'idle'
    const rep = representanteOk ? 'ok' : 'idle'
    const tasas = clases.length ? 'ok' : 'idle'
    const rev = datos === 'ok' && clasesSt === 'ok' && solicitanteOk ? 'ok' : 'error'
    return { datos, clases: clasesSt, prioridad: prioSt, solicitante: sol, representante: rep, tasas, revision: rev }
  }, [signo, tipo, clases, prio, priorities, solicitanteOk, representanteOk])

  const tabs = STEPS.map(s => ({
    id: s.id,
    label: s.label,
    status: (step === s.id ? 'active' : completeness[s.id] ?? 'idle') as TabStatus,
  }))

  const go = (id: string) => setStep(id)
  const next = () => {
    if (step === 'revision') {
      sessionStorage.setItem('inapi-pago-tgr', JSON.stringify({ signo, clases, email: session.email }))
      router.push('/tramites/pago-tgr')
      return
    }
    const i = STEPS.findIndex(s => s.id === step)
    if (i < STEPS.length - 1) go(STEPS[i + 1].id)
  }

  const total = clases.length * UTM_CLP
  const toggleBlock = (id: string) => setOpenBlocks(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))

  return (
    <RequireAuth>
      <TramitesMain>
        <StatusTabs tabs={tabs} current={step} onSelect={go} accent="marcas" />

        {step === 'datos' && (
          <StepSection title="Datos de tu marca" description="Indica el nombre que quieres proteger y el tipo de signo.">
            <div className="max-w-xl space-y-gob-4">
              <div className="space-y-gob-2">
                <label htmlFor="signo" className="flex items-center gap-gob-2 text-gri-body-sm font-medium">
                  Nombre de tu marca <RequiredMark />
                  <HelpTooltip text="Escríbelo tal como quieres protegerlo." />
                </label>
                <Input id="signo" value={signo} onChange={e => setSigno(e.target.value)} placeholder="Ejemplo: Optima" className="h-11" />
              </div>
              <div className="space-y-gob-2">
                <label htmlFor="tipo" className="flex items-center gap-gob-2 text-gri-body-sm font-medium">
                  Tipo de marca <RequiredMark />
                  <HelpTooltip text="Denominativa protege la palabra. Mixta o figurativa incluyen diseño." />
                </label>
                <select
                  id="tipo"
                  className={selectClass()}
                  value={tipo}
                  onChange={e => {
                    setTipo(e.target.value)
                    if (e.target.value === 'denominativa') setDenominativaOpen(true)
                  }}
                >
                  <option value="">Seleccione...</option>
                  <option value="denominativa">Denominativa</option>
                  <option value="mixta">Mixta</option>
                  <option value="figurativa">Figurativa</option>
                </select>
              </div>
            </div>
          </StepSection>
        )}

        {step === 'clases' && (
          <StepSection
            title="Clases de productos y servicios"
            description="Indica qué productos o servicios distinguirá tu marca. Puedes buscar por palabras clave o elegir la clase de Niza por su número. Cada clase se cobra aparte (1 UTM) y define el alcance de la protección."
          >
            <ClaseSugeridaPanel selected={clases} onToggleClass={toggleClase} />
          </StepSection>
        )}

        {step === 'prioridad' && (
          <StepSection title="Prioridad" description="Declara si tu marca se pidió antes en otro país. Si reclamas prioridad, agrega al menos una presentación anterior.">
            <label className="flex items-center gap-gob-3 min-h-11">
              <input type="checkbox" checked={prio} onChange={e => setPrio(e.target.checked)} />
              Reclamo prioridad extranjera
            </label>
            {prio ? (
              <div className="space-y-gob-3">
                <Button type="button" size="form" onClick={() => setPrioOpen(true)}>
                  Agregar prioridad
                </Button>
                {priorities.length === 0 ? (
                  <p className="text-gri-body-sm text-muted-foreground">Aún no hay prioridades.</p>
                ) : (
                  <ul className="space-y-2">
                    {priorities.map((p, i) => (
                      <li key={p.numero + i} className="rounded-gob-md border border-gob-border px-gob-4 py-gob-3 text-gri-body-sm">
                        {p.pais} · {p.fecha} · {p.numero}
                        {p.das ? ` · DAS ${p.dasCode}` : ''}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </StepSection>
        )}

        {step === 'solicitante' && (
          <StepSection title="Solicitante" description="Quién pide el registro. Completa los datos de la persona o empresa.">
            <FormPersona title="Datos del solicitante" onChange={() => setSolicitanteOk(true)} />
          </StepSection>
        )}
        {step === 'representante' && (
          <StepSection title="Representante" description="Si alguien presenta el trámite por ti, completa sus datos. Si no, puedes seguir.">
            <FormPersona title="Datos del representante (opcional)" onChange={() => setRepresentanteOk(true)} />
          </StepSection>
        )}

        {step === 'tasas' && (
          <StepSection title="Tasas de presentación" description="El cobro se calcula por cada clase de Niza elegida. El valor UTM es de referencia.">
            <div className="grid gap-gob-4 min-[600px]:grid-cols-3">
              <article className="rounded-gob-md border border-gob-border p-gob-4">
                <p className="text-gri-body-sm text-muted-foreground">UTM de referencia</p>
                <p className="font-heading text-xl">${UTM_CLP.toLocaleString('es-CL')}</p>
              </article>
              <article className="rounded-gob-md border border-gob-border p-gob-4">
                <p className="text-gri-body-sm text-muted-foreground">Clases elegidas</p>
                <p className="font-heading text-xl">{clases.length || 0}</p>
              </article>
              <article className="rounded-gob-md border border-gob-primary/40 bg-gob-primary/5 p-gob-4">
                <p className="text-gri-body-sm text-muted-foreground">Total en pesos</p>
                <p className="font-heading text-xl">${total.toLocaleString('es-CL')}</p>
              </article>
            </div>
            {clases.length > 0 ? (
              <ul className="space-y-2 text-gri-body-sm">
                {clases.map(n => (
                  <li key={n} className="flex justify-between border-b border-gob-border py-2">
                    <span>
                      Clase {n} · {NIZA_CLASES[n - 1]?.titulo}
                    </span>
                    <span>1 UTM</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gri-body-sm text-muted-foreground">Aún no hay clases. Vuelve al paso Clases para elegir cobertura.</p>
            )}
          </StepSection>
        )}

        {step === 'revision' && (
          <StepSection title="Revisión final" description="Abre cada bloque para comprobar los datos.">
            {[
              { id: 'datos', ok: !!signo && !!tipo, label: 'Datos', detail: `${signo || 'Sin nombre'} · ${tipo || 'sin tipo'}` },
              {
                id: 'clases',
                ok: clases.length > 0,
                label: 'Clases',
                detail: clases.length ? clases.map(n => `Clase ${n} · ${NIZA_CLASES.find(c => c.n === n)?.titulo ?? ''}`).join('; ') : 'Sin clases',
              },
              {
                id: 'prioridad',
                ok: !prio || priorities.length > 0,
                label: 'Prioridad',
                detail: prio ? `${priorities.length} prioridad(es)` : 'Sin prioridad',
              },
              { id: 'solicitante', ok: solicitanteOk, label: 'Solicitante', detail: solicitanteOk ? session.nombre : 'Pendiente' },
              { id: 'representante', ok: representanteOk, label: 'Representante', detail: representanteOk ? 'Datos ingresados' : 'Sin representante' },
              {
                id: 'tasas',
                ok: clases.length > 0,
                label: 'Tasas',
                detail: clases.length ? `${clases.length} UTM · $${(clases.length * UTM_CLP).toLocaleString('es-CL')}` : 'Sin clases para calcular tasas',
              },
            ].map((item, i) => {
              const Icon =
                item.id === 'clases' ? Layers : item.id === 'prioridad' ? Flag : item.id === 'solicitante' ? UserRound : item.id === 'representante' ? Users : item.id === 'tasas' ? CreditCard : Info
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
              )
            })}
          </StepSection>
        )}

        <div className="flex flex-wrap gap-gob-3 pt-gob-2">
          <Button variant="outline" size="form" onClick={() => setSaved('Borrador guardado. Tienes 60 días para pagarlo.')}>
            Guardar
          </Button>
          <Button size="form" onClick={next}>
            {step === 'revision' ? 'Ir a pagar' : 'Siguiente'}
          </Button>
        </div>
        {saved ? <p className="text-gri-body-sm text-gob-success">{saved}</p> : null}
        <LegalNotice>{LEGAL_WIZARD_MARCA}</LegalNotice>

        <Dialog open={denominativaOpen} onOpenChange={setDenominativaOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-gob-3 font-heading text-xl">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-gob-info-bg text-gob-primary">
                  <Info className="size-5" aria-hidden />
                </span>
                Marca denominativa
              </DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-gob-3 pt-gob-2 text-left">
                  <p className="rounded-gob-md border border-gob-primary/25 bg-gob-primary/5 px-gob-4 py-gob-3 font-heading text-gri-body font-medium text-gob-text">
                    Se protege la palabra, no el diseño.
                  </p>
                  <p className="text-gri-body leading-relaxed text-gob-text">{LEGAL_DENOMINATIVA}</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button size="form" onClick={() => setDenominativaOpen(false)}>
                Entendido
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={prioOpen} onOpenChange={setPrioOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar prioridad</DialogTitle>
              <DialogDescription>País, fecha y número de la presentación anterior. Si tienes código DAS, decláralo aquí.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-gob-3">
              <Input placeholder="País. Ejemplo: AR" value={prioDraft.pais} onChange={e => setPrioDraft(d => ({ ...d, pais: e.target.value }))} className="h-11" />
              <Input type="date" value={prioDraft.fecha} onChange={e => setPrioDraft(d => ({ ...d, fecha: e.target.value }))} className="h-11" />
              <Input placeholder="Número. Ejemplo: 202312345" value={prioDraft.numero} onChange={e => setPrioDraft(d => ({ ...d, numero: e.target.value }))} className="h-11" />
              <label className="flex items-center gap-gob-3 min-h-11">
                <input type="checkbox" checked={prioDraft.das} onChange={e => setPrioDraft(d => ({ ...d, das: e.target.checked }))} />
                Declara código DAS
              </label>
              {prioDraft.das ? (
                <div className="flex items-center gap-gob-3">
                  <label className="text-gri-body-sm font-medium whitespace-nowrap">Código DAS</label>
                  <Input value={prioDraft.dasCode} onChange={e => setPrioDraft(d => ({ ...d, dasCode: e.target.value }))} className="h-11" />
                </div>
              ) : null}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPrioOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  if (!prioDraft.pais || !prioDraft.numero) return
                  setPriorities(p => [...p, prioDraft])
                  setPrioDraft({ pais: '', fecha: '', numero: '', das: false, dasCode: '' })
                  setPrioOpen(false)
                }}
              >
                Agregar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TramitesMain>
    </RequireAuth>
  )
}
