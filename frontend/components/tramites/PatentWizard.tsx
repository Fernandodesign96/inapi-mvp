'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormPersona } from '@/components/solicitud/FormPersona'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { LegalNotice } from '@/components/tramites/LegalNotice'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { StatusTabs, type TabStatus } from '@/components/tramites/StatusTabs'
import { TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { LEGAL_WIZARD_PATENTE } from '@/lib/tramites/legal'
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

export function PatentWizard({ variant }: { variant: 'patente' | 'diseno' }) {
  const steps = variant === 'diseno' ? BASE_STEPS.filter(s => s.id !== 'cip') : BASE_STEPS
  const [step, setStep] = useState('datos')
  const [status, setStatus] = useState<Record<string, TabStatus>>({ datos: 'active' })
  const [titulo, setTitulo] = useState(
    variant === 'diseno' ? 'Diseño de tarima plegable' : 'Dispositivo de asistencia para danza',
  )
  const [tipo, setTipo] = useState(variant === 'diseno' ? 'diseno' : 'patente')
  const [cip, setCip] = useState<string[]>(['A63B 25/00'])
  const [inventor, setInventor] = useState('Fernando Ignacio Arriagada Castillo')
  const [decl, setDecl] = useState(false)
  const [files, setFiles] = useState<string[]>([])
  const [saved, setSaved] = useState('')

  const mark = (id: string, ok: boolean) => setStatus(s => ({ ...s, [id]: ok ? 'ok' : 'error' }))
  const go = (id: string) => {
    setStep(id)
    setStatus(s => ({ ...s, [id]: s[id] === 'ok' ? 'ok' : 'active' }))
  }
  const tabs = steps.map(s => ({
    id: s.id,
    label: s.label,
    status: (step === s.id ? 'active' : status[s.id] ?? 'idle') as TabStatus,
  }))
  const next = () => {
    if (step === 'datos') mark('datos', !!titulo)
    if (step === 'cip') mark('cip', cip.length > 0)
    if (step === 'inventores') mark('inventores', !!inventor)
    if (step === 'declaraciones') mark('declaraciones', decl)
    const i = steps.findIndex(s => s.id === step)
    if (i < steps.length - 1) go(steps[i + 1].id)
  }

  return (
    <RequireAuth>
      <TramitesMain>
        <LegalNotice>{LEGAL_WIZARD_PATENTE}</LegalNotice>
        <StatusTabs tabs={tabs} current={step} onSelect={go} accent="patentes" />

        {step === 'datos' && (
          <section className="space-y-gob-4 max-w-xl">
            {variant === 'patente' && (
              <div className="space-y-gob-2">
                <label htmlFor="tipo" className="flex items-center text-gri-body-sm font-medium">
                  Tipo de solicitud
                  <HelpTooltip text="Patente de invención o modelo de utilidad." />
                </label>
                <select id="tipo" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
                  <option value="patente">Patente de invención</option>
                  <option value="mu">Modelo de utilidad</option>
                </select>
              </div>
            )}
            {variant === 'diseno' && (
              <div className="space-y-gob-2">
                <label htmlFor="tipo" className="text-gri-body-sm font-medium">
                  Tipo
                </label>
                <select id="tipo" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
                  <option value="diseno">Diseño industrial</option>
                  <option value="dibujo">Dibujo industrial</option>
                </select>
              </div>
            )}
            <div className="space-y-gob-2">
              <label htmlFor="tit" className="flex items-center text-gri-body-sm font-medium">
                Título
                <HelpTooltip text="Describe el objeto en una frase." />
              </label>
              <Input id="tit" value={titulo} onChange={e => setTitulo(e.target.value)} />
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="res" className="text-gri-body-sm font-medium">
                Resumen
              </label>
              <Textarea id="res" rows={4} defaultValue="Prototipo de demostración para el MVP de trámites." />
            </div>
          </section>
        )}

        {step === 'cip' && (
          <section className="space-y-gob-3">
            <p className="text-gri-body">Clasificación Internacional de Patentes (CIP). Elige al menos un código.</p>
            <ul className="space-y-2">
              {CIP_EJEMPLOS.map(c => {
                const on = cip.includes(c.codigo)
                return (
                  <li key={c.codigo}>
                    <label className="flex items-center gap-gob-3 min-h-11">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() =>
                          setCip(prev => (on ? prev.filter(x => x !== c.codigo) : [...prev, c.codigo]))
                        }
                      />
                      <span className="text-gri-body-sm">
                        {c.codigo} — {c.titulo}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {step === 'prioridad' && (
          <p className="text-gri-body">Si tienes una solicitud anterior en otro país, agrégala en una próxima versión. En este MVP el paso queda marcado como revisado.</p>
        )}
        {step === 'solicitante' && <FormPersona title="Solicitante" onChange={() => mark('solicitante', true)} />}
        {step === 'representante' && (
          <FormPersona title="Representante (opcional)" onChange={() => mark('representante', true)} />
        )}
        {step === 'inventores' && (
          <div className="max-w-xl space-y-gob-2">
            <label htmlFor="inv" className="flex items-center text-gri-body-sm font-medium">
              Inventor o creador
              <HelpTooltip text="Quien concibió la invención o el diseño." />
            </label>
            <Input id="inv" value={inventor} onChange={e => setInventor(e.target.value)} />
          </div>
        )}
        {step === 'declaraciones' && (
          <label className="flex items-start gap-gob-3 max-w-2xl">
            <input type="checkbox" className="mt-1" checked={decl} onChange={e => setDecl(e.target.checked)} />
            <span className="text-gri-body-sm">
              Declaro que la información es fidedigna y que la invención, el modelo o el diseño cumple las condiciones de la Ley N.º 19.039.
            </span>
          </label>
        )}
        {step === 'documentos' && (
          <section className="space-y-gob-3 max-w-xl">
            <p className="text-gri-body-sm">Adjunta memoria descriptiva, reivindicaciones o vistas del diseño. En el MVP el archivo no se envía.</p>
            <Input
              type="file"
              onChange={e => {
                const name = e.target.files?.[0]?.name
                if (name) setFiles(f => [...f, name])
              }}
            />
            <ul className="list-disc pl-gob-5 text-gri-body-sm">
              {files.map(f => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
        )}
        {step === 'tasas' && (
          <p className="text-gri-body">
            Tasa de presentación de referencia: ${UTM_CLP.toLocaleString('es-CL')} (1 UTM). El cobro real depende del tipo de derecho.
          </p>
        )}
        {step === 'revision' && (
          <section className="space-y-gob-3">
            {[
              { id: 'datos', ok: !!titulo, label: 'Datos' },
              ...(variant === 'patente' ? [{ id: 'cip', ok: cip.length > 0, label: 'Clasificaciones CIP' }] : []),
              { id: 'inventores', ok: !!inventor, label: 'Inventores' },
              { id: 'declaraciones', ok: decl, label: 'Declaraciones' },
            ].map(item => (
              <div
                key={item.id}
                className={cn(
                  'flex items-center justify-between rounded-gob-md border px-gob-4 py-gob-3',
                  item.ok ? 'border-gob-success/40 bg-gob-success-bg' : 'border-gob-warning/40 bg-gob-warning-bg',
                )}
              >
                <span>{item.label}</span>
                <Button variant="outline" size="sm" onClick={() => go(item.id)}>
                  Revisar
                </Button>
              </div>
            ))}
          </section>
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
        {saved && <p className="text-gri-body-sm text-gob-success">{saved}</p>}
      </TramitesMain>
    </RequireAuth>
  )
}
