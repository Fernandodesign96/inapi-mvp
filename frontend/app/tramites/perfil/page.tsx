'use client'

import { useState } from 'react'
import { UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { COMUNAS_POR_REGION, REGIONES_CHILE } from '@/lib/tramites/catalogs'
import { useTramitesSession } from '@/lib/tramites/use-session'
import { cn } from '@/lib/utils'

type Tab = 'clave' | 'email' | 'datos' | 'claveunica' | 'olvidar'

export default function PerfilPage() {
  const { session } = useTramitesSession()
  const [tab, setTab] = useState<Tab>('clave')
  const [msg, setMsg] = useState('')
  const [region, setRegion] = useState('Valparaíso')
  const partes = session.nombre.split(' ')
  const nombres = partes.slice(0, 2).join(' ')
  const apellidos = partes.slice(2).join(' ')

  const tabs: { id: Tab; label: string }[] = [
    { id: 'clave', label: 'Cambiar contraseña INAPI' },
    { id: 'email', label: 'Cambiar email' },
    { id: 'datos', label: 'Cambiar datos personales' },
    { id: 'claveunica', label: 'Cambiar Clave Única' },
  ]

  return (
    <RequireAuth>
      <TramitesMain>
        <h1 className="font-heading text-gri-h2 font-medium text-gob-text">Panel del Usuario</h1>
        <div className="flex flex-col gap-gob-6 min-[905px]:flex-row">
          <aside className="min-[905px]:w-64 space-y-gob-4">
            <div className="flex items-center gap-gob-4">
              <span className="inline-flex size-24 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <UserRound className="size-14" aria-hidden />
              </span>
              <dl className="text-gri-body-sm space-y-1 min-[905px]:hidden">
                <dd>
                  <strong>RUN:</strong> {session.run}
                </dd>
                <dd>
                  <strong>Nombres:</strong> {nombres}
                </dd>
              </dl>
            </div>
            <dl className="hidden min-[905px]:block text-gri-body-sm space-y-1">
              <dt className="text-muted-foreground">RUN</dt>
              <dd>{session.run}</dd>
              <dt className="mt-2 text-muted-foreground">Nombres</dt>
              <dd>{nombres}</dd>
              <dt className="mt-2 text-muted-foreground">Apellidos</dt>
              <dd>{apellidos}</dd>
              <dt className="mt-2 text-muted-foreground">Correo principal</dt>
              <dd>{session.email}</dd>
            </dl>
            <nav className="flex flex-col border border-gob-border rounded-gob-md overflow-hidden">
              {tabs.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className={cn(
                    'min-h-12 px-gob-4 text-left text-gri-body-xs font-medium uppercase tracking-wide border-b border-gob-border last:border-0',
                    tab === t.id || (tab === 'olvidar' && t.id === 'clave')
                      ? 'bg-gob-primary text-white'
                      : 'bg-card hover:bg-gob-surface-elevated',
                  )}
                  onClick={() => {
                    setTab(t.id)
                    setMsg('')
                  }}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 space-y-gob-5">
            <dl className="hidden min-[905px]:block" />
            {tab === 'clave' && (
              <form
                className="max-w-xl space-y-gob-4"
                onSubmit={e => {
                  e.preventDefault()
                  setMsg('Contraseña actualizada.')
                }}
              >
                <div className="flex justify-end">
                  <button type="button" className="text-gob-link text-gri-body-sm underline" onClick={() => setTab('olvidar')}>
                    ¿Olvidó su contraseña INAPI?
                  </button>
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="act" className="text-gri-body-sm font-medium">
                    Contraseña INAPI actual
                  </label>
                  <Input id="act" type="password" className="h-11" />
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="nva" className="text-gri-body-sm font-medium">
                    Contraseña INAPI nueva
                  </label>
                  <Input id="nva" type="password" className="h-11" />
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="conf" className="text-gri-body-sm font-medium">
                    Confirmar contraseña INAPI nueva
                  </label>
                  <Input id="conf" type="password" className="h-11" />
                </div>
                <Button size="form" className="bg-gob-accent hover:bg-gob-accent/90">
                  Guardar cambios
                </Button>
              </form>
            )}

            {tab === 'olvidar' && (
              <form
                className="max-w-xl space-y-gob-4"
                onSubmit={e => {
                  e.preventDefault()
                  setMsg('Enviamos las instrucciones a tu correo registrado.')
                }}
              >
                <h2 className="font-heading text-xl font-medium">¿Olvidó su contraseña INAPI?</h2>
                <p className="text-gri-body">Especifique su RUN asociado a la cuenta.</p>
                <div className="space-y-gob-2">
                  <label htmlFor="run" className="text-gri-body-sm font-medium">
                    RUN
                  </label>
                  <Input id="run" defaultValue={session.run} className="h-11" />
                </div>
                <Button size="form" variant="outline">
                  Enviar correo para recuperar contraseña
                </Button>
              </form>
            )}

            {tab === 'email' && (
              <form
                className="max-w-xl space-y-gob-4"
                onSubmit={e => {
                  e.preventDefault()
                  setMsg('Correo actualizado.')
                }}
              >
                <div className="space-y-gob-2">
                  <label htmlFor="mail1" className="text-gri-body-sm font-medium">
                    Nuevo correo electrónico
                  </label>
                  <Input id="mail1" type="email" className="h-11" />
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="mail2" className="text-gri-body-sm font-medium">
                    Confirmar nuevo correo electrónico
                  </label>
                  <Input id="mail2" type="email" className="h-11" />
                </div>
                <Button size="form" className="bg-gob-accent hover:bg-gob-accent/90">
                  Guardar cambios
                </Button>
              </form>
            )}

            {tab === 'datos' && (
              <form
                className="grid gap-gob-4 min-[600px]:grid-cols-2"
                onSubmit={e => {
                  e.preventDefault()
                  setMsg('Datos personales actualizados.')
                }}
              >
                <div className="space-y-gob-2">
                  <label className="text-gri-body-sm font-medium">País de Residencia</label>
                  <Input value="CHILE" disabled className="h-11" />
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="reg" className="text-gri-body-sm font-medium">
                    Región
                  </label>
                  <select id="reg" className={selectClass()} value={region} onChange={e => setRegion(e.target.value)}>
                    {REGIONES_CHILE.map(r => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="com" className="text-gri-body-sm font-medium">
                    Comuna o ciudad
                  </label>
                  <select id="com" className={selectClass()} defaultValue={(COMUNAS_POR_REGION[region] ?? [])[0]}>
                    {(COMUNAS_POR_REGION[region] ?? []).map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="calle" className="text-gri-body-sm font-medium">
                    Calle
                  </label>
                  <Input id="calle" defaultValue="San Pablo" className="h-11" />
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="num" className="text-gri-body-sm font-medium">
                    Número/Depto/Block
                  </label>
                  <Input id="num" defaultValue="453" className="h-11" />
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="zip" className="text-gri-body-sm font-medium">
                    Código Postal
                  </label>
                  <Input id="zip" defaultValue="2340000" className="h-11" />
                </div>
                <div className="space-y-gob-2 min-[600px]:col-span-2">
                  <label htmlFor="tel" className="text-gri-body-sm font-medium">
                    Número de teléfono
                  </label>
                  <div className="flex gap-2">
                    <span className="inline-flex h-11 items-center rounded-gob-md border border-gob-border px-3">+</span>
                    <Input id="tel" defaultValue="56974515195" className="h-11" />
                  </div>
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="gen" className="text-gri-body-sm font-medium">
                    Género (Dato opcional - No obligatorio)
                  </label>
                  <select id="gen" className={selectClass()} defaultValue="Masculino">
                    <option>Masculino</option>
                    <option>Femenino</option>
                    <option>Otro</option>
                    <option>Prefiero no decir</option>
                  </select>
                </div>
                <div className="space-y-gob-2">
                  <label htmlFor="pue" className="text-gri-body-sm font-medium">
                    Pueblo Originario (Dato opcional - No obligatorio)
                  </label>
                  <select id="pue" className={selectClass()} defaultValue="No Pertenece">
                    <option>No Pertenece</option>
                    <option>Mapuche</option>
                    <option>Aymara</option>
                    <option>Rapa Nui</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div className="min-[600px]:col-span-2">
                  <Button size="form" className="bg-gob-accent hover:bg-gob-accent/90">
                    Guardar cambios
                  </Button>
                </div>
              </form>
            )}

            {tab === 'claveunica' && (
              <div className="max-w-xl rounded-gob-md border border-gob-border p-gob-5 space-y-gob-3 text-gri-body">
                <p>Haga click en el siguiente link para recuperar su Clave Única.</p>
                <a className="block text-gob-link underline" href="https://claveunica.gob.cl/recuperar" rel="noopener noreferrer">
                  https://claveunica.gob.cl/recuperar
                </a>
                <p>Para actualizar su información de Clave Única haga click en</p>
                <a className="block text-gob-link underline" href="https://claveunica.gob.cl/" rel="noopener noreferrer">
                  https://claveunica.gob.cl/
                </a>
              </div>
            )}

            {msg ? <p className="text-gob-success text-gri-body-sm">{msg}</p> : null}
          </div>
        </div>
      </TramitesMain>
    </RequireAuth>
  )
}
