'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { LegalNotice } from '@/components/tramites/LegalNotice'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { AlertBanner, RequiredMark, ServicePanel, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
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
            Solicitud {ok} lista para pagar la tasa de concesión.
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
          Pago complementario listo para continuar.
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
          <p className="text-gri-body-sm text-gob-text">Los campos con (*) son obligatorios.</p>
          <p className="text-gri-body-sm">Fecha de emisión: {fecha}</p>

          <section className="space-y-gob-4 rounded-gob-lg border border-gob-primary/20 bg-gob-primary/5 p-gob-5">
            <h3 className="font-heading text-lg font-medium">Datos iniciales de pago</h3>
            <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
              <div className="space-y-gob-2">
                <label htmlFor="concepto" className="flex items-center gap-gob-2 text-gri-body-sm font-medium text-gob-text">
                  Concepto de pago <RequiredMark />
                </label>
                <select id="concepto" className={selectClass()} value={concepto} onChange={e => setConcepto(e.target.value)}>
                  <option value="">Seleccione...</option>
                  {conceptos.map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-gob-2">
                <label htmlFor="utm" className="flex items-center gap-gob-2 text-gri-body-sm font-medium text-gob-text">
                  Monto UTM <RequiredMark />
                </label>
                <Input id="utm" value={utm} onChange={e => setUtm(e.target.value)} className="h-11" />
                <p className="text-gri-body-xs text-muted-foreground">
                  UTM octubre ${formatClp(UTM_OCTUBRE_CLP)} CLP. Puedes cambiar la cantidad de UTM según lo requerido por INAPI.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-gob-2 rounded-gob-lg border-2 border-gob-accent/40 bg-gob-accent/10 p-gob-5">
            <h3 className="font-heading text-gri-body-sm font-medium uppercase tracking-wide text-gob-text">Monto total CLP</h3>
            <p className="font-heading text-4xl font-bold text-gob-accent">${formatClp(total)}</p>
          </section>

          <section className="space-y-gob-4 rounded-gob-lg border border-gob-border bg-gob-surface-elevated/50 p-gob-5">
          <h3 className="font-heading text-lg font-medium">{domain === 'marcas' ? 'Datos de marcas' : 'Datos de patentes'}</h3>
            <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
            <div className="space-y-gob-2 min-[905px]:col-span-2">
              <label htmlFor="nsol" className="text-gri-body-sm font-medium text-gob-text">
                Número de solicitud (o registro o anotación)
              </label>
              <Input id="nsol" placeholder="Ejemplo: 1234567" value={numero} onChange={e => setNumero(e.target.value)} className="h-11" />
            </div>
            {domain === 'marcas' ? (
              <>
                <div className="space-y-gob-2">
                  <label htmlFor="cat" className="flex items-center gap-gob-2 text-gri-body-sm font-medium text-gob-text">
                    Categoría <RequiredMark />
                    <HelpTooltip text="Producto, servicio o establecimiento, según corresponda a tu solicitud." />
                  </label>
                  <select id="cat" className={selectClass()} value={categoria} onChange={e => setCategoria(e.target.value)}>
                    <option value="">Seleccione...</option>
                    {CATEGORIAS_MARCA.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="tipo" className="flex items-center gap-gob-2 text-gri-body-sm font-medium text-gob-text">
                    Tipo
                    <HelpTooltip text="Denominativa, mixta o figurativa, según el signo que declaraste." />
                  </label>
                  <select id="tipo" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="">Seleccione...</option>
                    {TIPOS_SIGNO_MARCA.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="signo" className="flex items-center gap-gob-2 text-gri-body-sm font-medium text-gob-text">
                    Nombre de tu marca <RequiredMark />
                  </label>
                  <Input id="signo" placeholder="Ejemplo: Optima" value={signo} onChange={e => setSigno(e.target.value)} className="h-11" />
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="clases" className="text-gri-body-sm font-medium text-gob-text">
                    Clases de productos y servicios
                  </label>
                  <Input id="clases" placeholder="Ejemplo: 9, 42" value={clases} onChange={e => setClases(e.target.value)} className="h-11" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-gob-2">
                  <label htmlFor="tipo" className="flex items-center gap-gob-2 text-gri-body-sm font-medium text-gob-text">
                    Tipo
                    <HelpTooltip text="Patente de invención, modelo de utilidad, diseño o dibujo industrial." />
                  </label>
                  <select id="tipo" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
                    <option value="">Seleccione...</option>
                    {TIPOS_DERECHO_PATENTE.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="titulo" className="flex items-center gap-gob-2 text-gri-body-sm font-medium text-gob-text">
                    Título <RequiredMark />
                  </label>
                  <Input id="titulo" placeholder="Ejemplo: Dispositivo de asistencia para danza" value={titulo} onChange={e => setTitulo(e.target.value)} className="h-11" />
                </div>
              </>
            )}
            </div>
          </section>

          <section className="space-y-gob-4 rounded-gob-lg border border-gob-primary/20 bg-white p-gob-5">
          <h3 className="font-heading text-lg font-medium">Datos cupón TGR</h3>
          <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
            <div className="space-y-gob-2">
              <label htmlFor="rut" className="flex items-center gap-gob-2 text-gri-body-sm font-medium text-gob-text">
                RUT <RequiredMark />
              </label>
              <Input id="rut" placeholder="Ejemplo: 11.123.123-K" value={rut} onChange={e => setRut(e.target.value)} className="h-11" />
            </div>
            <div className="space-y-gob-2">
              <label htmlFor="nom" className="flex items-center gap-gob-2 text-gri-body-sm font-medium text-gob-text">
                Nombre completo <RequiredMark />
              </label>
              <Input id="nom" placeholder="Ejemplo: Juan Pérez" value={nombre} onChange={e => setNombre(e.target.value)} className="h-11" />
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
              <label htmlFor="mail" className="flex items-center gap-gob-2 text-gri-body-sm font-medium text-gob-text">
                Correo electrónico <RequiredMark />
              </label>
              <Input id="mail" type="email" placeholder="Ejemplo: correo@dominio.cl" value={correo} onChange={e => setCorreo(e.target.value)} className="h-11" />
            </div>
          </div>
          </section>
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
          Cupón generado por ${formatClp(total)} CLP. Preséntalo ante INAPI junto con el escrito respectivo.
        </SiteMessage>
        <LegalNotice>{LEGAL_CUPON_TGR}</LegalNotice>
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
        {ok && <AlertBanner>Solicitud {ok} lista para pago.</AlertBanner>}
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
        {ok && <AlertBanner>Solicitud {ok} lista para pago.</AlertBanner>}
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
