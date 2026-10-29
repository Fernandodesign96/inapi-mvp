'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FileSearch, Search, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
import { DataTable, Td } from '@/components/tramites/DataTable'
import { PlainTerm } from '@/components/GlosarioTerm'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { EmptyState, TramitesMain } from '@/components/tramites/ui-helpers'
import { CardCarousel, ControlChip, ControlChipRow, HelperCard, RecordCard, ScreenIntro, WorkSplit } from '@/components/tramites/TramitesExperience'
import { useTramitesChrome } from '@/components/tramites/TramitesScreenChrome'
import { RESULTADOS_PATENTES } from '@/lib/tramites/mock-data'
import { useTramitesSession } from '@/lib/tramites/use-session'

const SUGGESTIONS = ['danza', '202101234', 'OMNIdanz', 'tarima']

export default function BuscadorPatentesPage() {
  const router = useRouter()
  const { session } = useTramitesSession()
  const [q, setQ] = useState('')
  const [ran, setRan] = useState(false)
  const [vista, setVista] = useState<'cards' | 'tabla'>('cards')
  const results = ran
    ? RESULTADOS_PATENTES.filter(
        r =>
          !q ||
          r.titulo.toLowerCase().includes(q.toLowerCase()) ||
          r.numero.includes(q) ||
          r.solicitante.toLowerCase().includes(q.toLowerCase()),
      )
    : []

  const run = (term?: string) => {
    if (term !== undefined) setQ(term)
    setRan(true)
  }

  useTramitesChrome(
    {
      views: [
        { id: 'cards', label: 'Tarjetas', icon: 'cards', pressed: vista === 'cards', onSelect: () => setVista('cards') },
        { id: 'tabla', label: 'Tabla', icon: 'table', pressed: vista === 'tabla', onSelect: () => setVista('tabla') },
      ],
    },
    [vista],
  )

  return (
    <TramitesMain>
      <WorkSplit
        main={
          <div className="space-y-gob-5">
            <ScreenIntro
              lead={
                <p>
                  Busca en el <strong>acervo de patentes</strong> por número, título o nombre de quien solicita. Los resultados son una{' '}
                  <em>orientación</em> y no reemplazan el examen de INAPI.
                </p>
              }
              points={[
                {
                  icon: <FileSearch />,
                  title: 'Qué puedes buscar',
                  body: 'Un número de solicitud, una palabra del título o el nombre del solicitante.',
                },
                {
                  icon: <Shield />,
                  title: 'Consulta más simple si ingresas',
                  body: 'Con ClaveÚnica esta consulta no pide captcha.',
                },
              ]}
            />
            <form
              className="rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-01"
              onSubmit={e => {
                e.preventDefault()
                run()
              }}
            >
              <div className="flex items-center gap-gob-2">
                <span className="inline-flex size-10 items-center justify-center rounded-gob-md bg-gob-primary/10 text-gob-primary-dark">
                  <Search className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-heading text-gri-body font-medium text-gob-text">
                    Busca en el <PlainTerm term="acervo">acervo</PlainTerm>
                  </p>
                  <p className="text-gri-body-xs text-muted-foreground">Escribe un número, un título o el nombre de quien solicita.</p>
                </div>
              </div>
              <div className="mt-gob-4 flex flex-col gap-gob-3 min-[600px]:flex-row min-[600px]:items-end">
                <div className="flex-1 space-y-gob-2">
                  <label htmlFor="q" className="flex items-center text-gri-body-sm font-medium">
                    Palabra o número
                    <HelpTooltip text="Prueba con danza, 202101234 o OMNIdanz." />
                  </label>
                  <Input id="q" value={q} onChange={e => setQ(e.target.value)} />
                </div>
                <Button type="submit" size="form">
                  Buscar
                </Button>
              </div>
              <div className="mt-gob-4">
                <ControlChipRow label="Prueba con">
                  {SUGGESTIONS.map(term => (
                    <ControlChip key={term} pressed={q === term && ran} onClick={() => run(term)}>
                      {term}
                    </ControlChip>
                  ))}
                </ControlChipRow>
              </div>
            </form>

            {ran && results.length === 0 ? <EmptyState>No hay resultados con estos filtros</EmptyState> : null}

            {results.length > 0 ? (
              <div className="space-y-gob-4">
                {vista === 'cards' ? (
                  results.length > 2 ? (
                  <CardCarousel label="Resultados de patentes">
                    {results.map(r => (
                      <RecordCard key={r.numero} kicker={r.tipo} title={r.titulo} body={`${r.numero} · ${r.solicitante}`} meta={<p className="text-gri-body-xs text-muted-foreground">{r.fecha}</p>} />
                    ))}
                  </CardCarousel>
                  ) : (
                    <ul className="grid gap-gob-3 min-[600px]:grid-cols-2">
                      {results.map(r => (
                        <li key={r.numero}>
                          <RecordCard kicker={r.tipo} title={r.titulo} body={`${r.numero} · ${r.solicitante}`} meta={<p className="text-gri-body-xs text-muted-foreground">{r.fecha}</p>} />
                        </li>
                      ))}
                    </ul>
                  )
                ) : (
                  <DataTable headers={['Número', 'Tipo', 'Título', 'Solicitante', 'Fecha']} caption="Resultados">
                    {results.map(r => (
                      <tr key={r.numero}>
                        <Td>{r.numero}</Td>
                        <Td>{r.tipo}</Td>
                        <Td>{r.titulo}</Td>
                        <Td>{r.solicitante}</Td>
                        <Td>{r.fecha}</Td>
                      </tr>
                    ))}
                  </DataTable>
                )}
              </div>
            ) : null}
          </div>
        }
        aside={
          <>
            <HelperCard title="Afinar la búsqueda" tone="night">
              <p>Si aparecen muchos resultados, filtra por fechas, titular o clasificación en la búsqueda avanzada.</p>
              <Link href="/tramites/patentes/buscador/avanzada" className="mt-gob-3 inline-flex min-h-11 items-center font-medium text-white underline underline-offset-4">
                Ir a búsqueda avanzada
              </Link>
            </HelperCard>
            {session.authenticated ? null : (
              <HelperCard title="Consulta sin captcha">
                <p className="text-gri-body-sm text-muted-foreground">Si ingresas con ClaveÚnica, esta consulta no pide captcha.</p>
                <div className="mt-gob-3">
                  <ClaveUnicaButton
                    className="max-w-xs"
                    onClick={() => router.push('/tramites/clave-unica?next=/tramites/patentes/buscador')}
                  />
                </div>
              </HelperCard>
            )}
          </>
        }
      />
    </TramitesMain>
  )
}
