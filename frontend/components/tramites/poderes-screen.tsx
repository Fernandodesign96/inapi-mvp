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
import { FileSignature, ShieldCheck } from 'lucide-react'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { ScreenIntro } from '@/components/tramites/TramitesExperience'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { AlertBanner, EmptyState, ServicePanel, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { SiteMessage } from '@/components/tramites/part2-forms'
import {
  FIRMA_ELECTRONICA_OPCIONES,
  PODER_TIPO_HELP,
  TIPOS_DOCUMENTO_PODER,
  URLS_EXTERNAS,
} from '@/lib/tramites/catalogs'
import { LEGAL_PODERES, LEGAL_PODERES_REQ, LEGAL_RESPONSABILIDAD_PODER } from '@/lib/tramites/legal'
import { useTramitesSession } from '@/lib/tramites/use-session'

export function PoderesForm({ compact }: { compact?: boolean }) {
  const { session } = useTramitesSession()
  const [solicitantes, setSolicitantes] = useState<string[]>([])
  const [representantes, setRepresentantes] = useState<string[]>([])
  const [modalSol, setModalSol] = useState(false)
  const [modalRep, setModalRep] = useState(false)
  const [fecha, setFecha] = useState('')
  const [tipoDoc, setTipoDoc] = useState('')
  const [tipoHelp, setTipoHelp] = useState<string | null>(null)
  const [pais, setPais] = useState('')
  const [firma, setFirma] = useState('')
  const [notaria, setNotaria] = useState('')
  const [traduccion, setTraduccion] = useState(false)
  const [acepta, setAcepta] = useState(false)
  const [ok, setOk] = useState(false)

  const help = tipoHelp ? PODER_TIPO_HELP[tipoHelp] : null

  return (
    <div className="space-y-gob-5">
      <ServicePanel title="Información del trámite" domain="patentes">
        <ScreenIntro
          lead={<p>{LEGAL_PODERES}</p>}
          points={[
            {
              icon: <FileSignature />,
              title: 'Firma electrónica avanzada',
              body: 'Los archivos deben firmarse preferentemente con FEA emitida por una entidad acreditada.',
            },
            {
              icon: <ShieldCheck />,
              title: 'Quién tramita en tu nombre',
              body: 'Sube el poder notarial de la persona que presenta el trámite por ti.',
            },
          ]}
        />
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
              target="_blank"
            >
              empresa acreditada en Chile
            </a>
            , o debe existir tratado internacional de reciprocidad con el país emisor de la Firma Electrónica Avanzada.
          </li>
          <li>
            De no contar con Firma Electrónica Avanzada, se autoriza la presentación de documentos mediante una copia digital íntegra, esto quiere decir fiel a su original. Más información en el{' '}
            <a
              href={URLS_EXTERNAS.oficioCircular524}
              className="text-gob-link underline underline-offset-4"
              rel="noopener noreferrer"
              target="_blank"
            >
              Oficio Circular 524
            </a>
            .
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
              <HelpTooltip quiet text="Fecha que aparece en el poder, la personería o el documento fundante." />
            </label>
            <Input id="fecha" type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="h-11" />
          </div>
          <div className="space-y-gob-2">
            <label htmlFor="tipo" className="flex items-center text-gri-body-sm font-medium">
              Tipo de documento
              <HelpTooltip
                quiet
                text="Elige Poder o Personería para un representante, o Documento fundante de anotación para el instrumento que respalda un cambio en el registro."
              />
            </label>
            <select
              id="tipo"
              className={selectClass()}
              value={tipoDoc}
              onChange={e => {
                const next = e.target.value
                setTipoDoc(next)
                if (next) setTipoHelp(next)
              }}
            >
              <option value="">Seleccione...</option>
              {TIPOS_DOCUMENTO_PODER.map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="space-y-gob-2">
            <label className="flex items-center text-gri-body-sm font-medium">
              Adjunte documento (PDF)
              <HelpTooltip quiet text="Tamaño máximo 10 MB. Solo PDF. Se recomienda guardar como PDF desde Word." />
            </label>
            <Input type="file" accept="application/pdf" className="h-11" />
            <p className="text-gri-body-xs text-muted-foreground">Tamaño máximo 10 mb</p>
          </div>
          <div className="space-y-gob-2">
            <label htmlFor="pais" className="flex items-center text-gri-body-sm font-medium">
              País de origen de documento
              <HelpTooltip quiet text="País donde se otorgó el poder o se extendió el documento." />
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
              <HelpTooltip
                quiet
                title="Firma electrónica avanzada"
                text="Indica si el PDF tiene firma electrónica avanzada (FEA). La ficha de ChileAtiende explica qué es la FEA, quién la emite y cómo obtenerla."
                href={URLS_EXTERNAS.chileAtiendeFea}
                hrefLabel="Abrir ficha 21201 en ChileAtiende"
                hrefHint="Este enlace abre ChileAtiende, no INAPI. Ahí verás la ficha oficial de la firma electrónica avanzada."
              />
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
              <HelpTooltip quiet text="Nombre de la notaría o institución que emitió el documento." />
            </label>
            <Input id="notaria" value={notaria} onChange={e => setNotaria(e.target.value)} className="h-11" />
          </div>
        </div>
        <label className="flex items-center gap-gob-3 min-h-11">
          <input type="checkbox" checked={traduccion} onChange={e => setTraduccion(e.target.checked)} />
          <span className="text-gri-body-sm">Incluye traducción</span>
          <HelpTooltip quiet text="Marca si adjuntas una traducción simple del documento cuando no está en español." />
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
      <Dialog open={Boolean(help)} onOpenChange={open => !open && setTipoHelp(null)}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{help?.title}</DialogTitle>
          </DialogHeader>
          <ul className="list-disc space-y-gob-2 pl-gob-5 text-gri-body-sm text-gob-text">
            {help?.body.map(line => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="text-gri-body-sm">
            Consultas:{' '}
            <a className="text-gob-link underline underline-offset-4" href="mailto:inapi@inapi.cl">
              inapi@inapi.cl
            </a>
          </p>
          <Button size="form" onClick={() => setTipoHelp(null)}>
            Entendido
          </Button>
        </DialogContent>
      </Dialog>
      <SiteMessage open={ok} onClose={() => setOk(false)}>
        Documento presentado. Quedó asociado a tu custodia de poderes.
      </SiteMessage>
      {compact ? null : <AlertBanner>El archivo no se almacena. Esta pantalla replica el flujo de custodia de poderes.</AlertBanner>}
    </div>
  )
}

export function PoderesScreen() {
  return (
    <RequireAuth>
      <TramitesMain>
        <PoderesForm />
      </TramitesMain>
    </RequireAuth>
  )
}
