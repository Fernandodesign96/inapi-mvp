'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { PatentWizard } from '@/components/tramites/PatentWizard'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { AlertBanner, ServicePanel, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import {
  AnnotationCreateScreen,
  LookupForm,
  SavedListScreen,
  SiteMessage,
} from '@/components/tramites/part2-forms'
import {
  ANOTACIONES_MARCA,
  ANOTACIONES_PATENTE,
  BORRADORES_PATENTE_DETALLE,
  DEMO_NUMEROS,
  DESTINOS_ESCRITO_PATENTE,
  TIPOS_SOLICITUD_DISENO,
  TIPOS_SOLICITUD_PATENTE,
  URLS_EXTERNAS,
} from '@/lib/tramites/catalogs'
import {
  LEGAL_LIBRO_REGISTRO,
  LEGAL_OPOSICION,
  LEGAL_VERIFICAR_TITULOS,
  TOOLTIP_RENOVACION,
} from '@/lib/tramites/legal'

export function RenovacionMarcasScreen() {
  return (
    <RequireAuth>
      <TramitesMain>
        <LookupForm
          domain="marcas"
          title="Buscar registro de marca"
          description="Ingrese el número de registro de la marca a renovar."
          label="Número del Registro"
          tooltip={TOOLTIP_RENOVACION}
          demoValue={DEMO_NUMEROS.registroMarca}
          errorMessage="Registro no existe o no está en condiciones de renovación"
          onValid={() => undefined}
        />
      </TramitesMain>
    </RequireAuth>
  )
}

export function AnotacionesGuardadasScreen({ domain }: { domain: 'marcas' | 'patentes' }) {
  return (
    <RequireAuth>
      <TramitesMain>
        <SavedListScreen
          domain={domain}
          panelTitle={domain === 'marcas' ? 'Anotaciones guardadas de marcas' : 'Anotaciones guardadas de patentes'}
          createHref={domain === 'marcas' ? '/tramites/marcas/anotaciones' : '/tramites/patentes/anotaciones'}
          createLabel="Crear nueva anotación"
          emptyText="No hay anotaciones guardadas aún."
          rows={[]}
          headers={['N° Atención', 'N° Solicitud', 'Tipo', 'Última actualización', 'Estado']}
          showFilters="anotacion"
        />
      </TramitesMain>
    </RequireAuth>
  )
}

export function CrearAnotacionScreen({ domain }: { domain: 'marcas' | 'patentes' }) {
  return (
    <RequireAuth>
      <TramitesMain>
        <AnnotationCreateScreen
          domain={domain}
          items={domain === 'marcas' ? ANOTACIONES_MARCA : ANOTACIONES_PATENTE}
          hint={
            domain === 'marcas'
              ? 'Seleccione el tipo de Anotación que desea presentar y el número de registro de la Marca.'
              : 'Seleccione el tipo de Anotación que desea presentar y el número de registro de la Patente, Modelo de Utilidad, Diseño o Dibujo.'
          }
        />
      </TramitesMain>
    </RequireAuth>
  )
}

export function OposicionScreen() {
  return (
    <RequireAuth>
      <TramitesMain>
        <AlertBanner>{LEGAL_OPOSICION}</AlertBanner>
        <LookupForm
          domain="marcas"
          title="Presentar oposición de marcas"
          description="Ingrese el número de documento de la Marca a la que requiere presentar un escrito."
          label="Número de solicitud"
          demoValue={DEMO_NUMEROS.solicitudMarca}
          errorMessage="La solicitud no existe o no admite oposición en este momento."
        />
      </TramitesMain>
    </RequireAuth>
  )
}

export function DatosAbiertosMarcasScreen() {
  return (
    <RequireAuth>
      <TramitesMain>
        <ServicePanel title="Datos abiertos" domain="marcas">
          <div className="grid gap-gob-6 min-[905px]:grid-cols-2">
            <article className="space-y-gob-3">
              <h3 className="font-heading text-xl text-gob-accent">Marcas presentadas año 2009 - actualidad</h3>
              <p className="text-gri-body-sm text-gob-text">
                Contiene el listado de solicitudes de marcas presentadas en Chile desde el año 2009 a la actualidad
              </p>
              <Button asChild size="form">
                <a href={URLS_EXTERNAS.datosSolicitudesMarcas} rel="noopener noreferrer">
                  Ver datos
                </a>
              </Button>
            </article>
            <article className="space-y-gob-3">
              <h3 className="font-heading text-xl text-gob-accent">Marcas registradas año 2009 - actualidad</h3>
              <p className="text-gri-body-sm text-gob-text">
                Contiene el listado de solicitudes de marcas registradas en Chile desde el año 2009 a la actualidad
              </p>
              <Button asChild size="form">
                <a href={URLS_EXTERNAS.datosRegistrosMarcas} rel="noopener noreferrer">
                  Ver datos
                </a>
              </Button>
            </article>
          </div>
        </ServicePanel>
      </TramitesMain>
    </RequireAuth>
  )
}

export function LibroRegistroMarcasScreen() {
  return (
    <RequireAuth>
      <TramitesMain>
        <LookupForm
          domain="marcas"
          title="Filtro de búsqueda"
          description="Ingrese el número de Registro de marca."
          label="Número de Registro"
          demoValue={DEMO_NUMEROS.registroMarca}
          errorMessage="No se encontró el registro en el libro. Recuerde que la actualización ocurre 7 días hábiles después del acto."
          extra={
            <div className="max-w-xl space-y-gob-2">
              <label htmlFor="fecha-reg" className="text-gri-body-sm font-medium">
                Fecha de Registro
              </label>
              <Input id="fecha-reg" type="date" className="h-11" />
              <p className="text-right">
                <Link href="/marcas/buscador-similitud" className="text-gob-link text-gri-body-sm underline">
                  Buscador de Marcas
                </Link>
              </p>
            </div>
          }
        />
        <AlertBanner>
          <p className="whitespace-pre-line">{LEGAL_LIBRO_REGISTRO}</p>
        </AlertBanner>
      </TramitesMain>
    </RequireAuth>
  )
}

export function VerificarTitulosScreen() {
  const [cve, setCve] = useState('')
  const [ok, setOk] = useState(false)
  const [error, setError] = useState(false)
  return (
    <RequireAuth>
      <TramitesMain>
        <ServicePanel title="Validar títulos y certificados marcas" domain="marcas">
          <p className="text-gri-body">Ingrese el Código de Verificación Electrónica (CVE), para validar el documento electrónico.</p>
          <Input value={cve} onChange={e => setCve(e.target.value)} className="h-11 max-w-xl" />
          <div className="flex flex-wrap gap-gob-3">
            <Button
              size="form"
              disabled={!cve.trim()}
              onClick={() => {
                if (cve.trim() === DEMO_NUMEROS.cve) setOk(true)
                else setError(true)
              }}
            >
              Validar
            </Button>
            <Button size="form" variant="secondary" onClick={() => setCve('')}>
              Limpiar
            </Button>
          </div>
          <p className="text-gri-body-sm leading-relaxed text-gob-text">{LEGAL_VERIFICAR_TITULOS}</p>
        </ServicePanel>
        {ok && <AlertBanner>Documento de demostración válido. CVE {DEMO_NUMEROS.cve}.</AlertBanner>}
        <SiteMessage open={error} onClose={() => setError(false)}>
          El código CVE no es válido o el documento ya no está disponible.
        </SiteMessage>
      </TramitesMain>
    </RequireAuth>
  )
}

export function EscritosGuardadosPatentesScreen() {
  return (
    <RequireAuth>
      <TramitesMain>
        <SavedListScreen
          domain="patentes"
          panelTitle="Escritos guardados de patentes"
          createHref="/tramites/patentes/presentar-escritos"
          createLabel="Presentar nuevo escrito de patente"
          emptyText="No hay registros para mostrar"
          rows={[]}
          headers={['N° Atención', 'N° Solicitud Patente', 'Tipo', 'Última actualización', 'Estado']}
          showFilters="escrito"
        />
      </TramitesMain>
    </RequireAuth>
  )
}

export function PresentarEscritosPatentesScreen() {
  const [destino, setDestino] = useState('')
  const [numero, setNumero] = useState('')
  const [msg, setMsg] = useState(false)
  return (
    <RequireAuth>
      <TramitesMain>
        <ServicePanel title="Presentar escritos de patentes" domain="patentes">
          <p className="text-gri-body">Ingrese el número de documento de la Patente a la que requiere presentar un escrito.</p>
          <div className="max-w-xl space-y-gob-2">
            <label htmlFor="dest" className="text-gri-body-sm font-medium">
              Presentar escrito a
            </label>
            <select id="dest" className={selectClass()} value={destino} onChange={e => setDestino(e.target.value)}>
              <option value="">Seleccione...</option>
              {DESTINOS_ESCRITO_PATENTE.map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          {destino && (
            <div className="max-w-xl space-y-gob-2 animate-in fade-in duration-200">
              <label htmlFor="nsol" className="text-gri-body-sm font-medium">
                Número de documento
              </label>
              <Input id="nsol" value={numero} onChange={e => setNumero(e.target.value)} className="h-11" />
            </div>
          )}
          <div className="flex flex-wrap gap-gob-3">
            <Button size="form" disabled={!destino || !numero.trim()} onClick={() => setMsg(true)}>
              Buscar
            </Button>
            <Button
              size="form"
              variant="secondary"
              onClick={() => {
                setDestino('')
                setNumero('')
              }}
            >
              Limpiar
            </Button>
          </div>
          <AlertBanner>
            Nota: Si lo requiere, puede descargar ejemplos tipo de escritos para PATENTES en{' '}
            <Link href="/tramites/patentes/formularios" className="text-gob-link underline">
              este link
            </Link>
            .
          </AlertBanner>
        </ServicePanel>
        <SiteMessage open={msg} onClose={() => setMsg(false)}>
          Escrito de demostración asociado. En el MVP no se envía a INAPI.
        </SiteMessage>
      </TramitesMain>
    </RequireAuth>
  )
}

export function SolicitudesGuardadasPatentesScreen() {
  return (
    <RequireAuth>
      <TramitesMain>
        <SavedListScreen
          domain="patentes"
          panelTitle="Filtros de búsqueda"
          createHref="/tramites/patentes/solicitar"
          createLabel="Crear nueva solicitud - patente / modelo de utilidad"
          emptyText="No hay solicitudes guardadas aún."
          rows={BORRADORES_PATENTE_DETALLE}
          headers={['N° Atención', 'N° Solicitud', 'Titular/Solicitante', 'Tipo', 'Última actualización', 'Estado']}
          showFilters="solicitud"
        />
      </TramitesMain>
    </RequireAuth>
  )
}

function wordCount(s: string) {
  return s.trim() ? s.trim().split(/\s+/).length : 0
}

export function PatentLanding({ variant }: { variant: 'patente' | 'diseno' }) {
  const [fase, setFase] = useState<'landing' | 'wizard'>('landing')
  const [tipo, setTipo] = useState('')
  const [titulo, setTitulo] = useState('')
  const tipos = variant === 'patente' ? TIPOS_SOLICITUD_PATENTE : TIPOS_SOLICITUD_DISENO
  const words = wordCount(titulo)
  const tooLong = words > 15

  if (fase === 'wizard') {
    return <PatentWizard variant={variant} />
  }

  return (
    <RequireAuth>
      <TramitesMain>
        <AlertBanner>
          ADVERTENCIA: Usted ya tiene solicitudes en borrador, revise{' '}
          <Link href="/tramites/patentes/solicitudes-guardadas" className="text-gob-link underline">
            aquí
          </Link>
          .
        </AlertBanner>
        <ServicePanel title="Nueva solicitud" domain="patentes">
          <p className="text-gri-body font-medium">Indique el tipo y título de la solicitud</p>
          <div className="max-w-xl space-y-gob-4">
            <div className="space-y-gob-2">
              <label htmlFor="tipo-sol" className="flex items-center text-gri-body-sm font-medium">
                Tipo de solicitud
                <HelpTooltip text="Elige el derecho que quieres pedir." />
              </label>
              <select id="tipo-sol" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
                <option value="">Seleccione...</option>
                {tipos.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="tit" className="flex items-center gap-gob-2 text-gri-body-sm font-medium">
                Título de la solicitud
                <span className="text-gob-danger">(*) Extensión máxima, 15 palabras</span>
              </label>
              <Input
                id="tit"
                placeholder="Extensión máxima 15 palabras."
                value={titulo}
                onChange={e => setTitulo(e.target.value)}
                className="h-11"
              />
              <p className={`text-gri-body-xs ${tooLong ? 'text-gob-danger' : 'text-muted-foreground'}`}>
                {words} de 15 palabras
              </p>
            </div>
            <div className="flex flex-wrap gap-gob-3 justify-center">
              <Button asChild variant="outline" size="form">
                <Link href="/tramites/patentes/solicitudes-guardadas">Cancelar</Link>
              </Button>
              <Button
                size="form"
                className="bg-gob-accent hover:bg-gob-accent/90"
                disabled={!tipo || !titulo.trim() || tooLong}
                onClick={() => setFase('wizard')}
              >
                Guardar
              </Button>
            </div>
          </div>
        </ServicePanel>
      </TramitesMain>
    </RequireAuth>
  )
}

export function MadridRedirectScreen() {
  return (
    <RequireAuth>
      <TramitesMain>
        <ServicePanel title="Solicitar marca Sistema de Madrid" domain="marcas">
          <p className="text-gri-body">
            El Sistema de Madrid se tramita en un sitio distinto a este portal. Te llevamos a Madrid e-filing de INAPI.
          </p>
          <Button asChild size="form">
            <a href={URLS_EXTERNAS.madrid} rel="noopener noreferrer">
              Ir a Madrid e-filing
            </a>
          </Button>
        </ServicePanel>
      </TramitesMain>
    </RequireAuth>
  )
}
