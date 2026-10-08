'use client'

import { useMemo, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { CalendarDays, ChevronDown, Clock3, Download, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { notifyDownload } from '@/components/tramites/DownloadToast'
import { LegalNotice } from '@/components/tramites/LegalNotice'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { DataTable, Td } from '@/components/tramites/DataTable'
import { LookupForm, SiteMessage } from '@/components/tramites/part2-forms'
import { AlertBanner, ScopeTabs, ServicePanel, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import {
  DEMO_NUMEROS,
  DESTINOS_ESCRITO_MARCA,
  DESTINOS_ESCRITO_PATENTE,
  ESTADOS_DIARIOS_MARCAS_FECHAS,
  ESTADOS_DIARIOS_PATENTES_FECHAS,
  GACETA_MARCAS_FECHAS,
  PCT_XML_2026,
  PCT_XML_HISTORICO,
  URLS_EXTERNAS,
} from '@/lib/tramites/catalogs'
import {
  LEGAL_LIBRO_PATENTES,
  LEGAL_LIBRO_REGISTRO,
  LEGAL_PCT,
  LEGAL_VERIFICAR_TITULOS,
} from '@/lib/tramites/legal'
import { cn } from '@/lib/utils'

function pageWindow(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current, current - 1, current + 1, 2, 3, 4, 5])
  return [...pages].filter(p => p >= 1 && p <= total).sort((a, b) => a - b)
}

function Pager({
  page,
  pageSize,
  total,
  onPage,
}: {
  page: number
  pageSize: number
  total: number
  onPage: (n: number) => void
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)
  const nums = pageWindow(page, pages)
  return (
    <div className="flex flex-wrap items-center justify-between gap-gob-3 text-gri-body-sm text-gob-text">
      <p>
        Mostrando {from} a {to} de {total} registros
      </p>
      <nav className="flex flex-wrap items-center gap-1" aria-label="Paginación">
        <button
          type="button"
          className="px-2 py-1 disabled:opacity-40"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          ‹ Anterior
        </button>
        {nums.map((n, i) => {
          const prev = nums[i - 1]
          return (
            <span key={n} className="flex items-center">
              {prev && n - prev > 1 ? <span className="px-1">…</span> : null}
              <button
                type="button"
                className={cn(
                  'min-w-8 rounded px-2 py-1',
                  n === page ? 'bg-[#3d5a80] text-white' : 'hover:bg-gob-surface-elevated',
                )}
                aria-current={n === page ? 'page' : undefined}
                onClick={() => onPage(n)}
              >
                {n}
              </button>
            </span>
          )
        })}
        <button
          type="button"
          className="px-2 py-1 disabled:opacity-40"
          disabled={page >= pages}
          onClick={() => onPage(page + 1)}
        >
          Siguiente ›
        </button>
      </nav>
    </div>
  )
}

function ArchiveToolbar({
  pageSize,
  onPageSize,
  query,
  onQuery,
}: {
  pageSize: number
  onPageSize: (n: number) => void
  query: string
  onQuery: (s: string) => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-gob-3">
      <label className="flex items-center gap-gob-2 text-gri-body-sm">
        Mostrar
        <select
          className={cn(selectClass(), 'h-9 w-20')}
          value={pageSize}
          onChange={e => onPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map(n => (
            <option key={n}>{n}</option>
          ))}
        </select>
        filas por página
      </label>
      <label className="flex items-center gap-gob-2 text-gri-body-sm">
        Buscar:
        <Input value={query} onChange={e => onQuery(e.target.value)} className="h-9 w-48" />
      </label>
    </div>
  )
}

function FeaturedCard({
  title,
  date,
  onOpen,
}: {
  title: string
  date: string
  onOpen: () => void
}) {
  return (
    <article className="min-w-[16rem] flex-1 overflow-hidden rounded-gob-md border border-gob-border bg-white shadow-elevation-01 transition-shadow hover:shadow-elevation-02">
      <h3 className="bg-[#3d5a80] px-gob-4 py-gob-2 text-center text-gri-body-sm font-medium text-white">{title}</h3>
      <button
        type="button"
        onClick={() => {
          notifyDownload(date)
          onOpen()
        }}
        className="flex w-full items-center justify-center gap-gob-2 py-gob-8 text-gob-link underline underline-offset-4 hover:text-gob-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
      >
        <CalendarDays className="size-4" aria-hidden />
        {date}
      </button>
    </article>
  )
}

function DownloadLink({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => notifyDownload(typeof children === 'string' ? children : 'documento')}
      className="inline-flex items-center gap-gob-2 text-gob-link underline underline-offset-4 hover:text-gob-primary-dark"
    >
      <Download className="size-4" aria-hidden />
      {children}
    </button>
  )
}

function DateArchiveScreen({
  domain,
  featuredTitle,
  featured,
  archiveTitle,
  dates,
  columns,
}: {
  domain: 'marcas' | 'patentes'
  featuredTitle: string
  featured: { title: string; date: string }[]
  archiveTitle: string
  dates: string[]
  columns: 'simple' | 'marcas-estados'
}) {
  const [query, setQuery] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim()
    return q ? dates.filter(d => d.includes(q)) : dates
  }, [dates, query])

  const slice = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <RequireAuth>
      <TramitesMain>
        <ServicePanel title={featuredTitle} domain={domain}>
          <div className="flex flex-wrap justify-center gap-gob-4">
            {featured.map(f => (
              <FeaturedCard key={f.title} title={f.title} date={f.date} onOpen={() => undefined} />
            ))}
          </div>
        </ServicePanel>
        <ServicePanel title={archiveTitle} domain={domain}>
          <ArchiveToolbar
            pageSize={pageSize}
            onPageSize={n => {
              setPageSize(n)
              setPage(1)
            }}
            query={query}
            onQuery={s => {
              setQuery(s)
              setPage(1)
            }}
          />
          {columns === 'simple' ? (
            <DataTable headers={['Fecha', 'Archivos']} caption={archiveTitle}>
              {slice.map(d => (
                <tr key={d}>
                  <Td className="text-right w-40">{d}</Td>
                  <Td>
                    <DownloadLink>Descargar Archivo</DownloadLink>
                  </Td>
                </tr>
              ))}
            </DataTable>
          ) : (
            <DataTable
              headers={['Fecha', 'Estado Diario (versión corta)', 'Estado Diario (versión extendida)', 'Presentaciones']}
              caption={archiveTitle}
            >
              {slice.map((d, i) => (
                <tr key={d}>
                  <Td>{d}</Td>
                  <Td>
                    <DownloadLink>{d}</DownloadLink>
                  </Td>
                  <Td>
                    <DownloadLink>{d}</DownloadLink>
                  </Td>
                  <Td>{i === 0 ? null : <DownloadLink>{d}</DownloadLink>}</Td>
                </tr>
              ))}
            </DataTable>
          )}
          <Pager page={page} pageSize={pageSize} total={filtered.length} onPage={setPage} />
        </ServicePanel>
      </TramitesMain>
    </RequireAuth>
  )
}

export function GacetaMarcasScreen() {
  const latest = GACETA_MARCAS_FECHAS[0]
  return (
    <DateArchiveScreen
      domain="marcas"
      featuredTitle="Último archivo de gaceta de marcas"
      featured={[{ title: 'Archivo publicado', date: latest }]}
      archiveTitle="Archivos anteriores (últimos 15 días)"
      dates={GACETA_MARCAS_FECHAS}
      columns="simple"
    />
  )
}

export function EstadosDiariosMarcasScreen() {
  const dates = ESTADOS_DIARIOS_MARCAS_FECHAS
  return (
    <DateArchiveScreen
      domain="marcas"
      featuredTitle="Últimos estados diarios disponibles"
      featured={[
        { title: 'Estado diario (versión corta)', date: dates[0] },
        { title: 'Estado diario (versión extendida)', date: dates[0] },
        { title: 'Presentaciones', date: dates[1] },
      ]}
      archiveTitle="Estados diarios anteriores (últimos 30 días)"
      dates={dates}
      columns="marcas-estados"
    />
  )
}

export function EstadosDiariosPatentesScreen() {
  const latest = ESTADOS_DIARIOS_PATENTES_FECHAS[0]
  return (
    <DateArchiveScreen
      domain="patentes"
      featuredTitle="Último estado diario disponible"
      featured={[{ title: 'Archivo publicado', date: latest }]}
      archiveTitle="Estados diarios anteriores (últimos 30 días)"
      dates={ESTADOS_DIARIOS_PATENTES_FECHAS}
      columns="simple"
    />
  )
}

export function PresentarEscritosScreen({ domain }: { domain: 'marcas' | 'patentes' }) {
  const destinos = domain === 'marcas' ? DESTINOS_ESCRITO_MARCA : DESTINOS_ESCRITO_PATENTE
  const [destino, setDestino] = useState('')
  const [numero, setNumero] = useState('')
  const [msg, setMsg] = useState(false)
  const ejemplosHref = domain === 'marcas' ? '/tramites/marcas/formularios' : '/tramites/patentes/formularios'
  const ejemplosLabel = domain === 'marcas' ? 'MARCAS' : 'PATENTES'
  return (
    <RequireAuth>
      <TramitesMain>
        <ServicePanel title={`Presentar escritos de ${domain}`} domain={domain}>
          <p className="text-gri-body">
            Ingrese el número de documento de la {domain === 'marcas' ? 'Marca' : 'Patente'} a la que requiere presentar un
            escrito.
          </p>
          <div className="max-w-xl space-y-gob-2">
            <label htmlFor="dest" className="text-gri-body-sm font-medium">
              Presentar escrito a
            </label>
            <select id="dest" className={selectClass()} value={destino} onChange={e => setDestino(e.target.value)}>
              <option value="">Seleccione...</option>
              {destinos.map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </div>
          {destino ? (
            <div className="max-w-xl space-y-gob-2 animate-in fade-in duration-200">
              <label htmlFor="nsol" className="text-gri-body-sm font-medium">
                Número de documento
              </label>
              <Input id="nsol" value={numero} onChange={e => setNumero(e.target.value)} className="h-11" />
            </div>
          ) : null}
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
            Nota: Si lo requiere, puede descargar ejemplos tipo de escritos para {ejemplosLabel},{' '}
            <Link href={ejemplosHref} className="text-gob-link underline">
              en este link
            </Link>
            .
          </AlertBanner>
        </ServicePanel>
        <SiteMessage open={msg} onClose={() => setMsg(false)} title="Escrito asociado">
          El escrito quedó asociado al número {numero} para {destino}.
        </SiteMessage>
      </TramitesMain>
    </RequireAuth>
  )
}

export function DatosAbiertosScreen({ domain }: { domain: 'marcas' | 'patentes' }) {
  const cards =
    domain === 'marcas'
      ? [
          {
            title: 'Marcas presentadas año 2009 - actualidad',
            text: 'Contiene el listado de solicitudes de marcas presentadas en Chile desde el año 2009 a la actualidad',
            href: URLS_EXTERNAS.datosSolicitudesMarcas,
          },
          {
            title: 'Marcas registradas año 2009 - actualidad',
            text: 'Contiene el listado de solicitudes de marcas registradas en Chile desde el año 2009 a la actualidad',
            href: URLS_EXTERNAS.datosRegistrosMarcas,
          },
        ]
      : [
          {
            title: 'Patentes presentadas año 2009 - actualidad',
            text: 'Contiene el listado de solicitudes de patentes presentadas en Chile desde el año 2009 a la actualidad',
            href: URLS_EXTERNAS.datosGobInapi,
          },
          {
            title: 'Patentes concedidas año 2009 - actualidad',
            text: 'Contiene el listado de patentes concedidas en Chile desde el año 2009 a la actualidad',
            href: URLS_EXTERNAS.datosGobInapi,
          },
        ]
  return (
    <RequireAuth>
      <TramitesMain>
        <ScopeTabs
          current={domain}
          marcasHref="/tramites/marcas/datos-abiertos"
          patentesHref="/tramites/patentes/datos-abiertos"
        />
        <ServicePanel title="Datos abiertos" domain={domain}>
          <div className="grid gap-gob-6 min-[905px]:grid-cols-2">
            {cards.map(c => (
              <article key={c.title} className="space-y-gob-3">
                <h3 className="font-heading text-xl text-gob-accent">{c.title}</h3>
                <p className="text-gri-body-sm text-gob-text">{c.text}</p>
                <Button asChild size="form">
                  <a href={c.href} rel="noopener noreferrer">
                    Ver datos
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </ServicePanel>
      </TramitesMain>
    </RequireAuth>
  )
}

export function LibroRegistroScreen({ domain }: { domain: 'marcas' | 'patentes' }) {
  return (
    <RequireAuth>
      <TramitesMain>
        <LookupForm
          domain={domain}
          title="Filtro de búsqueda"
          description={`Ingrese el número de Registro de ${domain === 'marcas' ? 'marca' : 'Patente'}.`}
          label="Número de Registro"
          demoValue={domain === 'marcas' ? DEMO_NUMEROS.registroMarca : DEMO_NUMEROS.solicitudPatente}
          errorMessage="No se encontró el registro en el libro. Recuerde que la actualización ocurre 7 días hábiles después del acto."
          extra={
            <div className="max-w-xl space-y-gob-2">
              <label htmlFor="fecha-reg" className="text-gri-body-sm font-medium">
                Fecha de Registro
              </label>
              <Input id="fecha-reg" type="date" className="h-11" />
              <p className="text-right">
                <Link
                  href={domain === 'marcas' ? '/marcas/buscador-similitud' : '/tramites/patentes/buscador'}
                  className="text-gob-link text-gri-body-sm underline"
                >
                  {domain === 'marcas' ? 'Buscador de Marcas' : 'Buscar Número de Registro'}
                </Link>
              </p>
            </div>
          }
        />
        <section className="rounded-gob-lg border border-gob-info/35 bg-gob-info-bg p-gob-5 space-y-gob-4">
          <h3 className="font-heading text-xl font-medium text-gob-text">Aviso sobre el Libro de registro</h3>
          <ul className="space-y-gob-3">
            <li className="flex gap-gob-3">
              <Clock3 className="mt-0.5 size-5 shrink-0 text-gob-primary" aria-hidden />
              <span className="text-gri-body-sm leading-relaxed">
                La actualización del Libro de registro ocurre 7 días hábiles después del acto administrativo.
              </span>
            </li>
            <li className="flex gap-gob-3">
              <Shield className="mt-0.5 size-5 shrink-0 text-gob-primary" aria-hidden />
              <span className="text-gri-body-sm leading-relaxed">
                Usa estos datos solo para consultar el registro. No comuniques a terceros datos personales que consten en el
                expediente o en el libro electrónico.
              </span>
            </li>
          </ul>
        </section>
        <LegalNotice>{domain === 'patentes' ? LEGAL_LIBRO_PATENTES : LEGAL_LIBRO_REGISTRO}</LegalNotice>
      </TramitesMain>
    </RequireAuth>
  )
}

export function VerificarTitulosScreen({ domain }: { domain: 'marcas' | 'patentes' }) {
  const [cve, setCve] = useState('')
  const [ok, setOk] = useState(false)
  const [error, setError] = useState(false)
  return (
    <RequireAuth>
      <TramitesMain>
        <ScopeTabs
          current={domain}
          marcasHref="/tramites/marcas/verificar-titulos"
          patentesHref="/tramites/patentes/verificar-titulos"
        />
        <ServicePanel
          title={`Validar títulos y certificados ${domain === 'marcas' ? 'marcas' : 'patentes'}`}
          domain={domain}
        >
          {domain === 'patentes' ? (
            <AlertBanner tone="warning">
              PARA VERIFICAR CERTIFICADO DE DEVOLUCIÓN DE TGR POR FAVOR INGRESAR EN EL SIGUIENTE ENLACE:{' '}
              <a href={URLS_EXTERNAS.documentosInapi} className="text-gob-link underline" rel="noopener noreferrer">
                {URLS_EXTERNAS.documentosInapi}
              </a>
            </AlertBanner>
          ) : null}
          <p className="text-gri-body">
            Ingrese el Código de Verificación Electrónica (CVE), para validar el documento electrónico.
          </p>
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
            <Button
              size="form"
              variant="secondary"
              onClick={() => {
                setCve('')
                setOk(false)
              }}
            >
              Limpiar
            </Button>
          </div>
        </ServicePanel>
        {ok ? <AlertBanner>Documento válido. CVE {DEMO_NUMEROS.cve}.</AlertBanner> : null}
        <SiteMessage open={error} onClose={() => setError(false)}>
          El código CVE no es válido o el documento ya no está disponible.
        </SiteMessage>
        <LegalNotice>{LEGAL_VERIFICAR_TITULOS}</LegalNotice>
      </TramitesMain>
    </RequireAuth>
  )
}

function AccordionBlock({
  title,
  open,
  onToggle,
  children,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-gob-md border border-gob-border">
      <button
        type="button"
        className="flex w-full items-center justify-between bg-gob-accent px-gob-4 py-gob-3 text-left text-white"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span className="font-medium">{title}</span>
        <ChevronDown className={cn('size-5 transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open ? <div className="space-y-gob-4 bg-card p-gob-5">{children}</div> : null}
    </section>
  )
}

function XmlFileTable({ files }: { files: string[] }) {
  const [query, setQuery] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const filtered = files.filter(f => f.toLowerCase().includes(query.trim().toLowerCase()))
  const slice = filtered.slice((page - 1) * pageSize, page * pageSize)
  return (
    <>
      <p className="text-right">
        <button type="button" className="inline-flex items-center gap-gob-2 text-gob-link hover:underline" onClick={() => notifyDownload('colección XML')}>
          <Download className="size-4" aria-hidden />
          Descargar la colección completa de archivos XML (.zip)
        </button>
      </p>
      <ArchiveToolbar
        pageSize={pageSize}
        onPageSize={n => {
          setPageSize(n)
          setPage(1)
        }}
        query={query}
        onQuery={s => {
          setQuery(s)
          setPage(1)
        }}
      />
      <DataTable headers={['Nombre del Documento', 'Acción']}>
        {slice.map(name => (
          <tr key={name}>
            <Td>{name}</Td>
            <Td>
              <DownloadLink>Descargar</DownloadLink>
            </Td>
          </tr>
        ))}
      </DataTable>
      <Pager page={page} pageSize={pageSize} total={filtered.length} onPage={setPage} />
    </>
  )
}

export function DocumentacionPctScreen() {
  const [open, setOpen] = useState<'af' | 'xml' | 'hist' | null>(null)
  return (
    <RequireAuth>
      <TramitesMain>
        <ServicePanel title="Colección nacional de patentes de Chile" domain="patentes">
          <p className="text-gri-body leading-relaxed text-gob-text">
            Consulta los XML de registros concedidos y el Authority File de INAPI, conforme al Tratado de Cooperación en Materia de Patentes (PCT).
          </p>
        </ServicePanel>
        <AccordionBlock title="Authority File INAPI" open={open === 'af'} onToggle={() => setOpen(open === 'af' ? null : 'af')}>
          <p className="text-gri-body-sm">Registros de Patentes, desde el año 1991 (Actualizado al 31.03.2026)</p>
          <ArchiveToolbar pageSize={10} onPageSize={() => undefined} query="" onQuery={() => undefined} />
          <DataTable headers={['Nombre del Documento', 'Acción']}>
            <tr>
              <Td>Authority File INAPI</Td>
              <Td>
                <DownloadLink>Descargar</DownloadLink>
              </Td>
            </tr>
          </DataTable>
          <p className="text-gri-body-sm">Mostrando 1 a 1 de 1 registros</p>
        </AccordionBlock>
        <AccordionBlock
          title="XML - desde el 01 de enero de 2026 en adelante (.zip)."
          open={open === 'xml'}
          onToggle={() => setOpen(open === 'xml' ? null : 'xml')}
        >
          <p className="text-gri-body-sm">Registros de patentes concedidos a contar del año 2026.</p>
          <XmlFileTable files={PCT_XML_2026} />
        </AccordionBlock>
        <AccordionBlock
          title="Archivo histórico XML (1991-2025) (.zip)."
          open={open === 'hist'}
          onToggle={() => setOpen(open === 'hist' ? null : 'hist')}
        >
          <p className="text-gri-body-sm">
            Registros de patentes concedidos a contar del 01 de enero de 1991 hasta el 31 de diciembre de 2025.
          </p>
          <p className="text-gri-body-sm text-gob-text">
            Esta base de datos se irá completando a medida que INAPI vaya generando XML de sus registros históricos, conforme
            lo establecido por la normativa PCT.
          </p>
          <XmlFileTable files={PCT_XML_HISTORICO} />
        </AccordionBlock>
        <LegalNotice>{LEGAL_PCT}</LegalNotice>
      </TramitesMain>
    </RequireAuth>
  )
}
