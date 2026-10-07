'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { AlertBanner, ServicePanel, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { LookupForm, SiteMessage } from '@/components/tramites/part2-forms'
import {
  CATEGORIAS_MARCA,
  COMUNAS_POR_REGION,
  CONCEPTOS_PAGO_MARCA,
  CONCEPTOS_PAGO_PATENTE,
  DEMO_NUMEROS,
  REGIONES_CHILE,
  TIPOS_DERECHO_PATENTE,
  TIPOS_SIGNO_MARCA,
  UTM_OCTUBRE_CLP,
} from '@/lib/tramites/catalogs'
import {
  AVISO_PAGO_COMPLEMENTARIO,
  LEGAL_ARANCEL_PERICIAL,
  LEGAL_CONCESION_FINAL,
  LEGAL_CUPON_TGR,
  LEGAL_DERECHOS_FINALES,
  LEGAL_DERECHOS_FINALES_DISENO,
  LEGAL_OTROS_PAGOS_MARCA,
  LEGAL_OTROS_PAGOS_PATENTE,
  LEGAL_PCT_PAGO,
  LEGAL_POSTERGAR_PAGO_PATENTE,
} from '@/lib/tramites/legal'
import { useTramitesSession } from '@/lib/tramites/use-session'

function formatClp(n: number) {
  return n.toLocaleString('es-CL')
}

export function ConcesionFinalScreen() {
  const [ok, setOk] = useState('')
  return (
    <RequireAuth>
      <TramitesMain>
        <LookupForm
          domain="marcas"
          title="Pagar tasa de concesión de marcas"
          description={LEGAL_CONCESION_FINAL}
          label="Número de Solicitud"
          tooltip={`Prueba con ${DEMO_NUMEROS.solicitudMarca}.`}
          demoValue={DEMO_NUMEROS.solicitudMarca}
          errorMessage="La solicitud no existe o no está en condiciones de pagar la tasa de concesión."
          onValid={v => setOk(v)}
        />
        {ok && (
          <AlertBanner>
            Solicitud {ok} lista para pago de demostración. En el MVP no se cobra ni se envía a Tesorería.
          </AlertBanner>
        )}
      </TramitesMain>
    </RequireAuth>
  )
}

export function OtrosPagosMarcasScreen() {
  const [aviso, setAviso] = useState(true)
  const [tipo, setTipo] = useState('')
  const [numero, setNumero] = useState('')
  const [msg, setMsg] = useState(false)

  return (
    <RequireAuth>
      <TramitesMain>
        <SiteMessage open={aviso} onClose={() => setAviso(false)} title="Advertencia">
          {AVISO_PAGO_COMPLEMENTARIO}
        </SiteMessage>
        <ServicePanel title="Otros pagos en línea marcas" domain="marcas">
          <AlertBanner>{LEGAL_OTROS_PAGOS_MARCA}</AlertBanner>
          <div className="max-w-xl space-y-gob-4">
            <div className="space-y-gob-2">
              <label htmlFor="presentar" className="text-gri-body-sm font-medium">
                Presentar
              </label>
              <select id="presentar" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
                <option value="">Seleccione...</option>
                <option value="solicitud">Pago a una Solicitud de Marca</option>
                <option value="anotacion">Pago a una Anotación de Marcas</option>
              </select>
            </div>
            {tipo && (
              <div className="space-y-gob-2 animate-in fade-in duration-200">
                <label htmlFor="num" className="text-gri-body-sm font-medium">
                  {tipo === 'solicitud' ? 'Número de solicitud' : 'Número de anotación'}
                </label>
                <Input
                  id="num"
                  placeholder="Ej: 1234567"
                  value={numero}
                  onChange={e => setNumero(e.target.value)}
                  className="h-11"
                />
              </div>
            )}
            <div className="flex flex-wrap gap-gob-3">
              <Button size="form" disabled={!tipo || !numero.trim()} onClick={() => setMsg(true)}>
                Buscar
              </Button>
              <Button
                size="form"
                variant="secondary"
                onClick={() => {
                  setTipo('')
                  setNumero('')
                }}
              >
                Limpiar
              </Button>
            </div>
          </div>
        </ServicePanel>
        <SiteMessage open={msg} onClose={() => setMsg(false)}>
          Pago complementario de demostración. En el MVP no se cobra.
        </SiteMessage>
      </TramitesMain>
    </RequireAuth>
  )
}

export function TgrCouponScreen({ domain }: { domain: 'marcas' | 'patentes' }) {
  const { session } = useTramitesSession()
  const [concepto, setConcepto] = useState('')
  const [utm, setUtm] = useState('1,05')
  const [categoria, setCategoria] = useState('')
  const [tipo, setTipo] = useState('')
  const [signo, setSigno] = useState('')
  const [clases, setClases] = useState('')
  const [numero, setNumero] = useState('')
  const [titulo, setTitulo] = useState('')
  const [rut, setRut] = useState('')
  const [nombre, setNombre] = useState(session.nombre ?? '')
  const [region, setRegion] = useState('')
  const [comuna, setComuna] = useState('')
  const [calle, setCalle] = useState('')
  const [depto, setDepto] = useState('')
  const [zip, setZip] = useState('')
  const [correo, setCorreo] = useState('')
  const [ok, setOk] = useState(false)

  const utmNum = Number(utm.replace(',', '.')) || 0
  const total = Math.round(utmNum * UTM_OCTUBRE_CLP)
  const conceptos = domain === 'marcas' ? CONCEPTOS_PAGO_MARCA : CONCEPTOS_PAGO_PATENTE
  const fecha = '07/10/2026'

  const canSubmit =
    !!concepto && utmNum > 0 && !!rut && !!nombre && !!correo && (domain === 'marcas' ? !!categoria && !!signo : !!titulo)

  return (
    <RequireAuth>
      <TramitesMain>
        <div className="flex gap-gob-2 border-b border-gob-border">
          <Link
            href="/tramites/marcas/comprobante-pago"
            className={`min-h-11 px-gob-4 py-gob-2 text-gri-body-sm font-medium rounded-t-gob-md ${
              domain === 'marcas' ? 'bg-gob-accent text-white' : 'bg-muted text-gob-text hover:bg-gob-surface-elevated'
            }`}
          >
            Marcas
          </Link>
          <Link
            href="/tramites/patentes/comprobante-pago"
            className={`min-h-11 px-gob-4 py-gob-2 text-gri-body-sm font-medium rounded-t-gob-md ${
              domain === 'patentes' ? 'bg-gob-accent text-white' : 'bg-muted text-gob-text hover:bg-gob-surface-elevated'
            }`}
          >
            Patentes
          </Link>
        </div>
        <ServicePanel title="Comprobante para pago Formulario 10" domain={domain}>
          <AlertBanner tone="warning">{LEGAL_CUPON_TGR}</AlertBanner>
          <p className="text-gri-body-sm text-muted-foreground">(*) Campos obligatorios</p>
          <p className="text-gri-body-sm">Fecha de Emisión: {fecha}</p>
          <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
            <div className="space-y-gob-2">
              <label htmlFor="concepto" className="text-gri-body-sm font-medium text-gob-danger">
                Concepto de Pago(*)
              </label>
              <select id="concepto" className={selectClass()} value={concepto} onChange={e => setConcepto(e.target.value)}>
                <option value="">Seleccione...</option>
                {conceptos.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="utm" className="text-gri-body-sm font-medium text-gob-danger">
                Monto UTM:(*)
              </label>
              <Input id="utm" value={utm} onChange={e => setUtm(e.target.value)} className="h-11" />
              <p className="text-gri-body-xs text-muted-foreground">
                UTM octubre ${formatClp(UTM_OCTUBRE_CLP)} CLP. Puede cambiar la cantidad de UTM según lo requerido por INAPI.
              </p>
            </div>
          </div>
          <p className="text-gri-body font-medium">TOTAL PESOS CLP: {formatClp(total)}</p>
          <h3 className="font-heading text-lg">{domain === 'marcas' ? 'Datos de Marcas' : 'Datos de Patentes'}</h3>
          <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
            <div className="space-y-gob-2 min-[905px]:col-span-2">
              <label htmlFor="nsol" className="text-gri-body-sm font-medium">
                Número de Solicitud (o Registro o anotación)
              </label>
              <Input id="nsol" value={numero} onChange={e => setNumero(e.target.value)} className="h-11" />
            </div>
            {domain === 'marcas' ? (
              <>
                <div className="space-y-gob-2">
                  <label htmlFor="cat" className="text-gri-body-sm font-medium text-gob-danger">
                    Categoría(*)
                  </label>
                  <select id="cat" className={selectClass()} value={categoria} onChange={e => setCategoria(e.target.value)}>
                    <option value="">Seleccione...</option>
                    {CATEGORIAS_MARCA.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="tipo" className="text-gri-body-sm font-medium">
                    Tipo
                  </label>
                  <select id="tipo" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="">Seleccione...</option>
                    {TIPOS_SIGNO_MARCA.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="signo" className="text-gri-body-sm font-medium text-gob-danger">
                    Signo o Denominación (*)
                  </label>
                  <Input id="signo" placeholder="Ej: Nombre de marca" value={signo} onChange={e => setSigno(e.target.value)} className="h-11" />
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="clases" className="text-gri-body-sm font-medium">
                    Clases
                  </label>
                  <Input id="clases" placeholder="Ej: 1,3,12,35" value={clases} onChange={e => setClases(e.target.value)} className="h-11" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-gob-2">
                  <label htmlFor="tipo" className="text-gri-body-sm font-medium">
                    Tipo
                  </label>
                  <select id="tipo" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="">Seleccione...</option>
                    {TIPOS_DERECHO_PATENTE.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="titulo" className="text-gri-body-sm font-medium text-gob-danger">
                    Título (*)
                  </label>
                  <Input id="titulo" placeholder="Ej: Nombre de marca" value={titulo} onChange={e => setTitulo(e.target.value)} className="h-11" />
                </div>
              </>
            )}
          </div>
          <h3 className="font-heading text-lg">Datos para cupón de pago TGR</h3>
          <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
            <div className="space-y-gob-2">
              <label htmlFor="rut" className="text-gri-body-sm font-medium text-gob-danger">
                RUT(*)
              </label>
              <Input id="rut" placeholder="EJ: 11.123.123-k" value={rut} onChange={e => setRut(e.target.value)} className="h-11" />
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="nom" className="text-gri-body-sm font-medium text-gob-danger">
                Nombre Completo(*)
              </label>
              <Input id="nom" placeholder="EJ: Juan Perez" value={nombre} onChange={e => setNombre(e.target.value)} className="h-11" />
            </div>
            <div className="space-y-gob-2">
              <label className="text-gri-body-sm font-medium">País de Residencia</label>
              <Input value="CHILE" disabled className="h-11" />
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="reg" className="text-gri-body-sm font-medium">
                Región
              </label>
              <select
                id="reg"
                className={selectClass()}
                value={region}
                onChange={e => {
                  setRegion(e.target.value)
                  setComuna('')
                }}
              >
                <option value="">Seleccione...</option>
                {REGIONES_CHILE.map(r => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="com" className="text-gri-body-sm font-medium">
                Comuna o ciudad
              </label>
              <select id="com" className={selectClass(!region)} disabled={!region} value={comuna} onChange={e => setComuna(e.target.value)}>
                <option value="">Seleccione...</option>
                {(COMUNAS_POR_REGION[region] ?? []).map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="calle" className="text-gri-body-sm font-medium">
                Calle
              </label>
              <Input id="calle" value={calle} onChange={e => setCalle(e.target.value)} className="h-11" />
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="depto" className="text-gri-body-sm font-medium">
                Número/Depto/Block
              </label>
              <Input id="depto" value={depto} onChange={e => setDepto(e.target.value)} className="h-11" />
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="zip" className="text-gri-body-sm font-medium">
                Código Postal
              </label>
              <Input id="zip" value={zip} onChange={e => setZip(e.target.value)} className="h-11" />
            </div>
            <div className="space-y-gob-2 min-[905px]:col-span-2">
              <label htmlFor="mail" className="text-gri-body-sm font-medium text-gob-danger">
                Correo Electrónico(*)
              </label>
              <Input id="mail" type="email" value={correo} onChange={e => setCorreo(e.target.value)} className="h-11" />
            </div>
          </div>
          <div className="flex flex-wrap gap-gob-3">
            <Button size="form" variant="secondary" type="button" onClick={() => window.location.reload()}>
              Limpiar
            </Button>
            <Button size="form" className="bg-gob-accent hover:bg-gob-accent/90" disabled={!canSubmit} onClick={() => setOk(true)}>
              Generar cupón de pago
            </Button>
          </div>
        </ServicePanel>
        <SiteMessage open={ok} onClose={() => setOk(false)}>
          Cupón de demostración generado por ${formatClp(total)} CLP. En el MVP no se envía a Tesorería.
        </SiteMessage>
      </TramitesMain>
    </RequireAuth>
  )
}

export function PatentPaymentLookup({
  title,
  description,
  extra,
}: {
  title: string
  description: React.ReactNode
  extra?: React.ReactNode
}) {
  const [ok, setOk] = useState('')
  return (
    <RequireAuth>
      <TramitesMain>
        {description}
        <LookupForm
          domain="patentes"
          title={title}
          label="Número de Solicitud"
          placeholder={`Ej: ${DEMO_NUMEROS.solicitudPatente}`}
          tooltip={`Prueba con ${DEMO_NUMEROS.solicitudPatente}.`}
          demoValue={DEMO_NUMEROS.solicitudPatente}
          errorMessage="La solicitud no existe o no está en condiciones de pago."
          onValid={v => setOk(v)}
          extra={extra}
        />
        {ok && <AlertBanner>Solicitud {ok} lista para pago de demostración. En el MVP no se cobra.</AlertBanner>}
      </TramitesMain>
    </RequireAuth>
  )
}

export function PagoPresentacionPatentesScreen() {
  return (
    <PatentPaymentLookup
      title="Pagar tasa de presentación de patentes"
      description={<AlertBanner>{LEGAL_POSTERGAR_PAGO_PATENTE}</AlertBanner>}
    />
  )
}

export function PagoArancelScreen() {
  return (
    <PatentPaymentLookup
      title="Pago de aranceles periciales"
      description={<AlertBanner>{LEGAL_ARANCEL_PERICIAL}</AlertBanner>}
    />
  )
}

export function PagoDerechosFinalesScreen() {
  return (
    <PatentPaymentLookup
      title="Pago de derechos finales de patentes"
      description={
        <div className="space-y-gob-3">
          <p className="text-gri-body text-gob-text leading-relaxed">{LEGAL_DERECHOS_FINALES}</p>
          <AlertBanner tone="warning">{LEGAL_DERECHOS_FINALES_DISENO}</AlertBanner>
        </div>
      }
    />
  )
}

export function OtrosPagosPatentesScreen() {
  const [aviso, setAviso] = useState(true)
  return (
    <>
      <SiteMessage open={aviso} onClose={() => setAviso(false)} title="Advertencia">
        {AVISO_PAGO_COMPLEMENTARIO}
      </SiteMessage>
      <PatentPaymentLookup
        title="Otros pagos en línea patentes"
        description={<AlertBanner>{LEGAL_OTROS_PAGOS_PATENTE}</AlertBanner>}
      />
    </>
  )
}

export function PagoPctScreen() {
  const [ok, setOk] = useState('')
  const [medios, setMedios] = useState(false)
  const [numero, setNumero] = useState('')
  const [error, setError] = useState(false)

  return (
    <RequireAuth>
      <TramitesMain>
        <ServicePanel title="Pago de tasas PCT fase internacional" domain="patentes">
          <p className="text-gri-body">Ingrese el número de la solicitud PCT sobre la que requiere pagar sus tasas.</p>
          <div className="max-w-xl space-y-gob-2">
            <label htmlFor="pct" className="flex items-center text-gri-body-sm font-medium">
              Número de Solicitud Internacional PCT
              <HelpTooltip text={`Prueba con ${DEMO_NUMEROS.pct}.`} />
            </label>
            <Input
              id="pct"
              placeholder="Ej: PCT/CL2023/123456"
              value={numero}
              onChange={e => setNumero(e.target.value)}
              className="h-11"
            />
          </div>
          <div className="flex flex-wrap gap-gob-3">
            <Button
              size="form"
              onClick={() => {
                if (numero.trim() === DEMO_NUMEROS.pct) setOk(numero.trim())
                else setError(true)
              }}
              disabled={!numero.trim()}
            >
              Buscar
            </Button>
            <Button size="form" variant="secondary" className="bg-gob-accent hover:bg-gob-accent/90 text-white" onClick={() => setNumero('')}>
              Limpiar
            </Button>
          </div>
          <p className="text-gri-body-sm text-gob-text leading-relaxed">
            {LEGAL_PCT_PAGO} Para más información de otras opciones de pago y pago con moneda extranjera,{' '}
            <button type="button" className="text-gob-link underline" onClick={() => setMedios(true)}>
              haga clic aquí
            </button>
            .
          </p>
        </ServicePanel>
        {ok && <AlertBanner>Solicitud {ok} lista para pago de demostración.</AlertBanner>}
        <SiteMessage open={error} onClose={() => setError(false)}>
          La solicitud PCT no existe o no está en condiciones de pago.
        </SiteMessage>
        <SiteMessage open={medios} onClose={() => setMedios(false)} title="Información de medios de pago adicionales">
          <div className="space-y-gob-3 text-left text-gri-body-sm">
            <p>
              <strong>PayPal (pago en moneda extranjera con tarjeta de crédito).</strong> Use Multicaja PayPal en el portal de
              pagos de Tesorería.
            </p>
            <p>
              <strong>Transferencia directa a INAPI en pesos.</strong> Siga el instructivo TEF.
            </p>
            <p>
              <strong>Convenio BECB con BancoEstado Corredora de Bolsa.</strong> Escriba a pagospct@inapi.cl.
            </p>
            <p>
              <strong>Depósitos en cuentas corrientes INAPI.</strong> En sucursales BancoEstado que operen con moneda extranjera.
            </p>
          </div>
        </SiteMessage>
      </TramitesMain>
    </RequireAuth>
  )
}
