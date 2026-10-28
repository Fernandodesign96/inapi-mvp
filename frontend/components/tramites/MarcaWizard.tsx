'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Info } from 'lucide-react'
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
import { PlainTerm } from '@/components/GlosarioTerm'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { LegalNotice } from '@/components/tramites/LegalNotice'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { BulletList, Checklist, HelperCard, WorkSplit } from '@/components/tramites/TramitesExperience'
import { AccordionBlock, RequiredMark, ReviewGrid, StepSection, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { LEGAL_DENOMINATIVA, LEGAL_WIZARD_MARCA } from '@/lib/tramites/legal'
import { NIZA_CLASES, UTM_CLP } from '@/lib/tramites/mock-data'
import { useTramitesSession } from '@/lib/tramites/use-session'

const STEPS = [
  { id: 'datos', label: 'Datos de tu marca' },
  { id: 'clases', label: 'Clases y cobertura' },
  { id: 'usuario', label: 'Datos de usuario' },
  { id: 'tasas', label: 'Cuánto pagarás' },
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
  const [saved, setSaved] = useState('')

  const toggleClase = (n: number) => {
    setClases(prev => (prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n].sort((a, b) => a - b)))
  }

  const completeness: Record<string, 'ok' | 'error' | 'idle'> = useMemo(() => {
    const datos = signo.trim() && tipo ? 'ok' : signo.trim() || tipo ? 'error' : 'idle'
    const clasesSt = clases.length ? 'ok' : 'idle'
    const usuario = (!prio || priorities.length) && solicitanteOk ? 'ok' : prio && !priorities.length ? 'error' : 'idle'
    const tasas = clases.length ? 'ok' : 'idle'
    const rev = datos === 'ok' && clasesSt === 'ok' && solicitanteOk ? 'ok' : 'error'
    return { datos, clases: clasesSt, usuario, tasas, revision: rev }
  }, [signo, tipo, clases, prio, priorities, solicitanteOk])

  const go = (id: string) => setStep(id)
  const stepIndex = STEPS.findIndex(s => s.id === step)
  const prev = () => {
    if (stepIndex > 0) go(STEPS[stepIndex - 1].id)
  }
  const next = () => {
    if (step === 'revision') {
      sessionStorage.setItem('inapi-pago-tgr', JSON.stringify({ signo, clases, email: session.email }))
      router.push('/tramites/pago-tgr')
      return
    }
    if (stepIndex < STEPS.length - 1) go(STEPS[stepIndex + 1].id)
  }

  const total = clases.length * UTM_CLP

  const helpers: Record<string, { title: string; items: string[] }> = {
    datos: {
      title: 'Antes de escribir el nombre',
      items: [
        'La denominativa protege la palabra, no el logo.',
        'Compara el nombre en el buscador de marcas si aún no lo hiciste.',
        'Escríbelo tal como quieres verlo en el certificado.',
      ],
    },
    clases: {
      title: 'Cómo elegir clases',
      items: ['Pagas 1 UTM por cada clase de Niza.', 'Elige solo las que cubren lo que vendes u ofreces.'],
    },
    usuario: {
      title: 'Datos de quien presenta',
      items: [
        'La prioridad vale si pediste la misma marca en otro país hace menos de 6 meses.',
        'El solicitante puede ser una persona o una empresa.',
        'El representante es opcional si presentas el trámite a tu nombre.',
      ],
    },
    tasas: {
      title: 'Cómo se calcula',
      items: ['El total es 1 UTM por cada clase elegida.', 'El valor UTM es de referencia al día de hoy.'],
    },
    revision: {
      title: 'Antes de pagar',
      items: ['Revisa cada card y corrige lo incompleto.', 'Después del pago no podrás cambiar el signo ni las clases con facilidad.'],
    },
  }

  return (
    <RequireAuth>
      <TramitesMain>
        <WorkSplit
          main={
            <>
              {step === 'datos' ? <LegalNotice>{LEGAL_WIZARD_MARCA}</LegalNotice> : (
                <p className="rounded-full border border-gob-border bg-card px-gob-4 py-gob-2 text-gri-body-sm text-muted-foreground">
                  {helpers[step]?.items[0]}
                </p>
              )}

              {step === 'datos' && (
                <StepSection title="Datos de tu marca" description="Indica el nombre que quieres proteger y el tipo de signo.">
                  <div className="max-w-xl space-y-gob-4">
                    <div className="space-y-gob-2">
                      <label htmlFor="signo" className="flex items-center gap-gob-2 text-gri-body-sm font-medium">
                        Nombre de tu marca <RequiredMark />
                        <HelpTooltip text="Escríbelo tal como quieres protegerlo." example="Optima" />
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
                  title="Clases y cobertura"
                  description="Indica qué productos o servicios distinguirá tu marca. Cada clase se cobra aparte (1 UTM) y define el alcance de la protección."
                >
                  <ClaseSugeridaPanel selected={clases} onToggleClass={toggleClase} />
                </StepSection>
              )}

              {step === 'usuario' && (
                <StepSection title="Datos de usuario" description="Prioridad, solicitante y representante en un solo paso.">
                  <AccordionBlock title="¿Tienes registro previo en otro país?" defaultOpen>
                    <p className="text-gri-body-sm text-muted-foreground">
                      Si pediste la misma marca en otro país hace menos de 6 meses, puedes usar esa fecha como prioridad en Chile.
                    </p>
                    <label className="flex items-center gap-gob-3 min-h-11">
                      <input type="checkbox" checked={prio} onChange={e => setPrio(e.target.checked)} />
                      Reclamo prioridad extranjera
                      <HelpTooltip text="Vale si pediste la misma marca en otro país hace menos de 6 meses. No es un trámite urgente." />
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
                  </AccordionBlock>
                  <AccordionBlock title="Solicitante" defaultOpen>
                    <FormPersona title="Datos del solicitante" onChange={() => setSolicitanteOk(true)} />
                  </AccordionBlock>
                  <AccordionBlock title="Representante">
                    <p className="text-gri-body-sm text-muted-foreground">Opcional si presentas el trámite a tu nombre. Si designas a otra persona, necesitas un poder.</p>
                    <FormPersona title="Datos del representante (opcional)" onChange={() => setRepresentanteOk(true)} />
                  </AccordionBlock>
                </StepSection>
              )}

              {step === 'tasas' && (
                <StepSection title="Cuánto pagarás" description="El cobro se calcula por cada clase de Niza elegida.">
                  <div className="grid gap-gob-4 min-[600px]:grid-cols-3">
                    <article className="rounded-gob-md border border-gob-border p-gob-4">
                      <p className="text-gri-body-sm text-muted-foreground">
                        <PlainTerm term="UTM">UTM</PlainTerm> de referencia
                      </p>
                      <p className="font-heading text-2xl font-semibold text-gob-text">${UTM_CLP.toLocaleString('es-CL')}</p>
                      <p className="mt-1 text-gri-body-xs text-muted-foreground">Valor publicado para este cálculo.</p>
                    </article>
                    <article className="rounded-gob-md border border-gob-border p-gob-4">
                      <p className="text-gri-body-sm text-muted-foreground">Clases elegidas</p>
                      <p className="font-heading text-2xl font-semibold text-gob-text">{clases.length || 0}</p>
                      <p className="mt-1 text-gri-body-xs text-muted-foreground">Cada clase suma 1 UTM.</p>
                    </article>
                    <article className="rounded-gob-md border-2 border-gob-text p-gob-4">
                      <p className="text-gri-body-sm text-muted-foreground">Total en pesos</p>
                      <p className="font-heading text-2xl font-semibold text-gob-text">${total.toLocaleString('es-CL')}</p>
                      <p className="mt-1 text-gri-body-xs text-muted-foreground">Se paga al presentar la solicitud.</p>
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
                <StepSection title="Revisión final" description="Comprueba cada bloque antes de ir a pagar.">
                  <ReviewGrid
                    items={[
                      { ok: !!signo && !!tipo, label: 'Datos', detail: `${signo || 'Sin nombre'} · ${tipo || 'sin tipo'}` },
                      {
                        ok: clases.length > 0,
                        label: 'Clases y cobertura',
                        detail: clases.length ? clases.map(n => `Clase ${n}`).join(', ') : 'Sin clases',
                      },
                      {
                        ok: !prio || priorities.length > 0,
                        label: 'Registro previo',
                        detail: prio ? `${priorities.length} prioridad(es)` : 'Sin prioridad',
                      },
                      { ok: solicitanteOk, label: 'Solicitante', detail: solicitanteOk ? session.nombre : 'Pendiente' },
                      { ok: true, label: 'Representante', detail: representanteOk ? 'Datos ingresados' : 'Sin representante' },
                      {
                        ok: clases.length > 0,
                        label: 'Cuánto pagarás',
                        detail: clases.length ? `${clases.length} UTM · $${(clases.length * UTM_CLP).toLocaleString('es-CL')}` : 'Sin clases',
                      },
                    ]}
                  />
                </StepSection>
              )}

              <div className="flex flex-wrap gap-gob-3 pt-gob-2">
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
                  items={STEPS.map(s => ({
                    id: s.id,
                    label: s.label,
                    done: completeness[s.id] === 'ok',
                  }))}
                />
              </HelperCard>
              <HelperCard title={helpers[step]?.title ?? 'Ayuda de este paso'} tone="night" collapsible hint="Abrir ayuda">
                <BulletList items={helpers[step]?.items ?? []} />
              </HelperCard>
            </>
          }
        />

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
                  <p className="rounded-gob-md border border-gob-border px-gob-4 py-gob-3 font-heading text-gri-body font-medium text-gob-text">
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
