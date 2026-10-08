'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormPersona } from '@/components/solicitud/FormPersona'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { AlertBanner, EmptyState, ServicePanel, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { SiteMessage } from '@/components/tramites/part2-forms'
import {
  FIRMA_ELECTRONICA_OPCIONES,
  TIPOS_DOCUMENTO_PODER,
  URLS_EXTERNAS,
} from '@/lib/tramites/catalogs'
import { LEGAL_PODERES, LEGAL_PODERES_REQ, LEGAL_RESPONSABILIDAD_PODER } from '@/lib/tramites/legal'
import { useTramitesSession } from '@/lib/tramites/use-session'

export function PoderesScreen() {
  const { session } = useTramitesSession()
  const [solicitantes, setSolicitantes] = useState<string[]>([])
  const [representantes, setRepresentantes] = useState<string[]>([])
  const [modalSol, setModalSol] = useState(false)
  const [modalRep, setModalRep] = useState(false)
  const [fecha, setFecha] = useState('')
  const [tipoDoc, setTipoDoc] = useState('')
  const [pais, setPais] = useState('')
  const [firma, setFirma] = useState('')
  const [notaria, setNotaria] = useState('')
  const [traduccion, setTraduccion] = useState(false)
  const [acepta, setAcepta] = useState(false)
  const [ok, setOk] = useState(false)

  return (
    <RequireAuth>
      <TramitesMain>
        <ServicePanel title="Información del trámite" domain="patentes">
          <p className="text-gri-body leading-relaxed">{LEGAL_PODERES}</p>
          <p className="text-gri-body-sm font-medium">Para presentar documentos electrónicos, estos deben cumplir con los siguientes requisitos:</p>
          <ul className="list-disc pl-gob-5 text-gri-body-sm space-y-gob-2">
            {LEGAL_PODERES_REQ.map(item => (
              <li key={item}>{item}</li>
            ))}
            <li>
              Los archivos deben ser firmados preferentemente con Firma Electrónica Avanzada (FEA), es decir, emitida por una{' '}
              <a
                href={URLS_EXTERNAS.entidadesAcreditadas}
                className="text-gob-link underline underline-offset-4"
                rel="noopener noreferrer"
              >
                empresa acreditada en Chile
              </a>
              , o debe existir tratado internacional de reciprocidad con el país emisor de la Firma Electrónica Avanzada.
            </li>
            <li>
              De no contar con Firma Electrónica Avanzada, se autoriza la presentación de documentos mediante una copia digital íntegra, esto quiere decir fiel a su original, para más información en Oficio Circular 524.
            </li>
          </ul>
        </ServicePanel>

        <ServicePanel title="Solicitante" domain="patentes">
          <p className="text-gri-body-sm">Ingrese la información del solicitante o solicitantes.</p>
          <div className="flex justify-end">
            <Button size="form" onClick={() => setModalSol(true)}>
              Agregar solicitante
            </Button>
          </div>
          {solicitantes.length === 0 ? (
            <EmptyState>No hay solicitantes agregados aún.</EmptyState>
          ) : (
            <ul className="list-disc pl-gob-5 text-gri-body">
              {solicitantes.map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </ServicePanel>

        <ServicePanel title="Representante" domain="patentes">
          <p className="text-gri-body-sm">Ingrese la información del representante o representantes.</p>
          <div className="flex justify-end">
            <Button size="form" onClick={() => setModalRep(true)}>
              Agregar representante
            </Button>
          </div>
          {representantes.length === 0 ? (
            <EmptyState>No hay representantes agregados aún.</EmptyState>
          ) : (
            <ul className="list-disc pl-gob-5 text-gri-body">
              {representantes.map(s => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </ServicePanel>

        <ServicePanel title="Información del documento o poder" domain="patentes">
          <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
            <div className="space-y-gob-2">
              <label htmlFor="fecha" className="flex items-center text-gri-body-sm font-medium">
                Fecha de creación del documento
                <HelpTooltip text="Fecha que aparece en el poder o personería." />
              </label>
              <Input id="fecha" type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="h-11" />
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="tipo" className="flex items-center text-gri-body-sm font-medium">
                Tipo de documento
                <HelpTooltip text="Poder o documento fundante de anotación." />
              </label>
              <select id="tipo" className={selectClass()} value={tipoDoc} onChange={e => setTipoDoc(e.target.value)}>
                <option value="">Seleccione...</option>
                {TIPOS_DOCUMENTO_PODER.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-gob-2">
              <label className="flex items-center text-gri-body-sm font-medium">
                Adjunte documento (PDF)
                <HelpTooltip text="Tamaño máximo 10 MB. Solo PDF." />
              </label>
              <Input type="file" accept="application/pdf" className="h-11" />
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="pais" className="flex items-center text-gri-body-sm font-medium">
                País de origen de documento
                <HelpTooltip text="País donde se otorgó el poder." />
              </label>
              <select id="pais" className={selectClass()} value={pais} onChange={e => setPais(e.target.value)}>
                <option value="">Seleccione...</option>
                <option>Chile</option>
                <option>Otro</option>
              </select>
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="firma" className="flex items-center text-gri-body-sm font-medium">
                Firma electrónica avanzada
                <HelpTooltip text="Indica si el PDF tiene firma electrónica avanzada." />
              </label>
              <select id="firma" className={selectClass()} value={firma} onChange={e => setFirma(e.target.value)}>
                <option value="">Seleccione...</option>
                {FIRMA_ELECTRONICA_OPCIONES.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-gob-2 min-[905px]:col-span-2">
              <label htmlFor="notaria" className="flex items-center text-gri-body-sm font-medium">
                Notaría o institución de emisión
                <HelpTooltip text="Nombre de la notaría o institución que emitió el documento." />
              </label>
              <Input id="notaria" value={notaria} onChange={e => setNotaria(e.target.value)} className="h-11" />
            </div>
          </div>
          <label className="flex items-center gap-gob-3 min-h-11">
            <input type="checkbox" checked={traduccion} onChange={e => setTraduccion(e.target.checked)} />
            <span className="text-gri-body-sm">Incluye traducción</span>
            <HelpTooltip text="Marca si adjuntas una traducción del documento." />
          </label>
        </ServicePanel>

        <ServicePanel title="Declaración de responsabilidad" domain="patentes">
          <div className="text-gri-body-sm text-gob-text leading-relaxed whitespace-pre-line">{LEGAL_RESPONSABILIDAD_PODER}</div>
          <p className="text-gri-body-sm pt-gob-4">
            Trámite presentado por: {session.nombre} / {session.run}
          </p>
          <label className="flex items-start gap-gob-3 min-h-11">
            <input type="checkbox" className="mt-1" checked={acepta} onChange={e => setAcepta(e.target.checked)} />
            <span className="text-gri-body-sm">Estoy de acuerdo con los términos y condiciones de la tramitación electrónica en INAPI</span>
          </label>
          <div className="flex flex-wrap gap-gob-3">
            <Button size="form" variant="secondary" className="bg-gob-accent hover:bg-gob-accent/90 text-white" type="button">
              Limpiar
            </Button>
            <Button size="form" disabled={!acepta || !tipoDoc} onClick={() => setOk(true)}>
              Presentar documento
            </Button>
          </div>
        </ServicePanel>

        <Dialog open={modalSol} onOpenChange={setModalSol}>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar solicitante</DialogTitle>
            </DialogHeader>
            <FormPersona
              title="Solicitante"
              onChange={d => {
                const name = d.tipo === 'juridica' ? d.razonSocial : `${d.nombre} ${d.apellido}`.trim()
                if (name) setSolicitantes([name])
              }}
            />
            <Button size="form" onClick={() => setModalSol(false)}>
              Guardar
            </Button>
          </DialogContent>
        </Dialog>
        <Dialog open={modalRep} onOpenChange={setModalRep}>
          <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar representante</DialogTitle>
            </DialogHeader>
            <FormPersona
              title="Representante"
              onChange={d => {
                const name = d.tipo === 'juridica' ? d.razonSocial : `${d.nombre} ${d.apellido}`.trim()
                if (name) setRepresentantes([name])
              }}
            />
            <Button size="form" onClick={() => setModalRep(false)}>
              Guardar
            </Button>
          </DialogContent>
        </Dialog>
        <SiteMessage open={ok} onClose={() => setOk(false)}>
          Documento presentado. Quedó asociado a tu custodia de poderes.
        </SiteMessage>
        <AlertBanner>El archivo no se almacena. Esta pantalla replica el flujo de custodia de poderes.</AlertBanner>
      </TramitesMain>
    </RequireAuth>
  )
}
