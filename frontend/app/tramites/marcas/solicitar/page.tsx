'use client'

import { useState } from 'react'
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
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { LegalNotice } from '@/components/tramites/LegalNotice'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { StatusTabs, type TabStatus } from '@/components/tramites/StatusTabs'
import { TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { LEGAL_DENOMINATIVA, LEGAL_WIZARD_MARCA } from '@/lib/tramites/legal'
import { NIZA_CLASES, UTM_CLP } from '@/lib/tramites/mock-data'
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

export default function SolicitarMarcaPage() {
  const [step, setStep] = useState('datos')
  const [status, setStatus] = useState<Record<string, TabStatus>>({ datos: 'active' })
  const [signo, setSigno] = useState('OMNIdanz')
  const [tipo, setTipo] = useState('denominativa')
  const [clases, setClases] = useState<number[]>([41])
  const [nizaOpen, setNizaOpen] = useState(false)
  const [prio, setPrio] = useState(false)
  const [denominativaOpen, setDenominativaOpen] = useState(false)
  const [saved, setSaved] = useState('')

  const mark = (id: string, ok: boolean) => {
    setStatus(s => ({ ...s, [id]: ok ? 'ok' : 'error' }))
  }

  const tabs = STEPS.map(s => ({
    id: s.id,
    label: s.label,
    status: (step === s.id ? 'active' : status[s.id] ?? 'idle') as TabStatus,
  }))

  const go = (id: string) => {
    setStep(id)
    setStatus(s => ({ ...s, [id]: s[id] === 'ok' ? 'ok' : 'active' }))
  }

  const next = () => {
    const i = STEPS.findIndex(s => s.id === step)
    if (step === 'datos') mark('datos', !!signo)
    if (step === 'clases') mark('clases', clases.length > 0)
    if (i < STEPS.length - 1) go(STEPS[i + 1].id)
  }

  return (
    <RequireAuth>
      <TramitesMain>
        <LegalNotice>{LEGAL_WIZARD_MARCA}</LegalNotice>
        <StatusTabs tabs={tabs} current={step} onSelect={go} accent="marcas" />

        {step === 'datos' && (
          <section className="space-y-gob-4 max-w-xl">
            <div className="space-y-gob-2">
              <label htmlFor="signo" className="flex items-center text-gri-body-sm font-medium">
                Signo (nombre de la marca)
                <HelpTooltip text="Escríbelo tal como quieres protegerlo." />
              </label>
              <Input id="signo" value={signo} onChange={e => setSigno(e.target.value)} />
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="tipo" className="flex items-center text-gri-body-sm font-medium">
                Tipo de marca
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
                <option value="denominativa">Denominativa</option>
                <option value="mixta">Mixta</option>
                <option value="figurativa">Figurativa</option>
              </select>
            </div>
          </section>
        )}

        {step === 'clases' && (
          <section className="space-y-gob-4">
            <p className="text-gri-body text-gob-text">
              Elige las clases de Niza (1 a 45) que cubren tus productos o servicios. Cada clase se cobra aparte.
            </p>
            <Button type="button" variant="outline" onClick={() => setNizaOpen(true)}>
              Abrir listado de clases 1 a 45
            </Button>
            <ul className="flex flex-wrap gap-2">
              {clases.map(n => (
                <li key={n} className="rounded-gob-sm bg-gob-accent/10 text-gob-text px-gob-3 py-gob-2 text-gri-body-sm">
                  Clase {n} · {NIZA_CLASES[n - 1].titulo}
                </li>
              ))}
            </ul>
          </section>
        )}

        {step === 'prioridad' && (
          <section className="space-y-gob-4 max-w-xl">
            <label className="flex items-center gap-gob-3 min-h-11">
              <input type="checkbox" checked={prio} onChange={e => setPrio(e.target.checked)} />
              Reclamo prioridad extranjera
            </label>
            {prio && (
              <div className="space-y-gob-2">
                <label htmlFor="pais" className="text-gri-body-sm font-medium">
                  País y número
                </label>
                <Input id="pais" placeholder="Ej. AR · 123456" />
              </div>
            )}
          </section>
        )}

        {step === 'solicitante' && (
          <FormPersona title="Solicitante" onChange={() => mark('solicitante', true)} />
        )}
        {step === 'representante' && (
          <FormPersona title="Representante (opcional)" onChange={() => mark('representante', true)} />
        )}

        {step === 'tasas' && (
          <section className="space-y-gob-3 max-w-lg">
            <p className="text-gri-body">
              1 UTM por clase. Valor de referencia: ${UTM_CLP.toLocaleString('es-CL')}. Clases: {clases.length}. Total:{' '}
              ${(clases.length * UTM_CLP).toLocaleString('es-CL')}.
            </p>
          </section>
        )}

        {step === 'revision' && (
          <section className="space-y-gob-4">
            {[
              { id: 'datos', ok: !!signo, label: 'Datos del signo' },
              { id: 'clases', ok: clases.length > 0, label: 'Clases de Niza' },
              { id: 'solicitante', ok: status.solicitante === 'ok', label: 'Solicitante' },
            ].map(item => (
              <div
                key={item.id}
                className={cn(
                  'flex items-center justify-between rounded-gob-md border px-gob-4 py-gob-3',
                  item.ok ? 'border-gob-success/40 bg-gob-success-bg' : 'border-gob-warning/40 bg-gob-warning-bg',
                )}
              >
                <span>{item.label}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    mark(item.id, item.ok)
                    go(item.id)
                  }}
                >
                  Revisar
                </Button>
              </div>
            ))}
          </section>
        )}

        <div className="flex flex-wrap gap-gob-3 pt-gob-4">
          <Button
            variant="outline"
            size="form"
            onClick={() => {
              setSaved('Borrador guardado. Tienes 60 días para pagarlo.')
            }}
          >
            Guardar
          </Button>
          {step !== 'revision' && (
            <Button size="form" onClick={next}>
              Siguiente
            </Button>
          )}
        </div>
        {saved && <p className="text-gri-body-sm text-gob-success">{saved}</p>}

        <Dialog open={nizaOpen} onOpenChange={setNizaOpen}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Clases de Niza 1 a 45</DialogTitle>
              <DialogDescription>Marca las clases que aplican. Puedes elegir más de una.</DialogDescription>
            </DialogHeader>
            <ul className="grid gap-1">
              {NIZA_CLASES.map(c => {
                const on = clases.includes(c.n)
                return (
                  <li key={c.n}>
                    <label className="flex items-center gap-gob-3 min-h-11 text-gri-body-sm">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() =>
                          setClases(prev => (on ? prev.filter(n => n !== c.n) : [...prev, c.n].sort((a, b) => a - b)))
                        }
                      />
                      {c.n}. {c.titulo}
                    </label>
                  </li>
                )
              })}
            </ul>
            <DialogFooter>
              <Button onClick={() => setNizaOpen(false)}>Listo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={denominativaOpen} onOpenChange={setDenominativaOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Marca denominativa</DialogTitle>
              <DialogDescription>{LEGAL_DENOMINATIVA}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setDenominativaOpen(false)}>Entendido</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TramitesMain>
    </RequireAuth>
  )
}
