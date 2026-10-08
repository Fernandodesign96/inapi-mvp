'use client'

import { useState, useSyncExternalStore } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { UTM_CLP } from '@/lib/tramites/mock-data'
import { NIZA_CLASES } from '@/lib/tramites/mock-data'

type Payload = { signo: string; clases: number[]; email: string }

const FALLBACK: Payload = { signo: 'Optima', clases: [9, 42], email: '' }
const PAGO_KEY = 'inapi-pago-tgr'

let pagoCacheKey = '__unset__'
let pagoCache: Payload = FALLBACK

function subscribePago(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  return () => window.removeEventListener('storage', onStoreChange)
}

function getPagoSnapshot(): Payload {
  let raw = ''
  try {
    raw = sessionStorage.getItem(PAGO_KEY) ?? ''
  } catch {
    raw = ''
  }
  if (raw === pagoCacheKey) return pagoCache
  pagoCacheKey = raw
  try {
    pagoCache = raw ? (JSON.parse(raw) as Payload) : FALLBACK
  } catch {
    pagoCache = FALLBACK
  }
  return pagoCache
}

export default function PagoTgrPage() {
  const router = useRouter()
  const data = useSyncExternalStore(subscribePago, getPagoSnapshot, () => FALLBACK)
  const [fase, setFase] = useState<'form' | 'cargando' | 'ok'>('form')
  const [metodo, setMetodo] = useState('webpay')
  const [boleta, setBoleta] = useState('')

  const total = data.clases.length * UTM_CLP

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-gob-text">
      <header className="bg-[#003DA5] text-white px-gob-6 py-gob-4">
        <p className="text-gri-body-sm font-medium">Tesorería General de la República</p>
        <h1 className="font-heading text-xl">Pago de tasas INAPI</h1>
      </header>
      <main className="mx-auto max-w-3xl space-y-gob-5 p-gob-6">
        {fase !== 'ok' ? (
          <>
            <section className="rounded-gob-lg border border-gob-border bg-white p-gob-5 space-y-gob-3">
              <h2 className="font-heading text-lg font-medium">Resumen de la solicitud</h2>
              <p>
                Marca: <strong>{data.signo}</strong>
              </p>
              <ul className="space-y-2 text-gri-body-sm">
                {data.clases.map(n => (
                  <li key={n} className="flex justify-between border-b border-gob-border py-2">
                    <span>
                      Clase {n} · {NIZA_CLASES.find(c => c.n === n)?.titulo}
                    </span>
                    <span>1 UTM</span>
                  </li>
                ))}
              </ul>
              <p className="font-heading text-2xl text-gob-primary">${total.toLocaleString('es-CL')}</p>
            </section>
            <section className="rounded-gob-lg border border-gob-border bg-white p-gob-5 space-y-gob-3">
              <h2 className="font-heading text-lg font-medium">Método de pago</h2>
              <label className="flex min-h-11 items-center gap-gob-3">
                <input type="radio" name="m" checked={metodo === 'webpay'} onChange={() => setMetodo('webpay')} />
                Tarjeta de débito o crédito
              </label>
              <label className="flex min-h-11 items-center gap-gob-3">
                <input type="radio" name="m" checked={metodo === 'cuenta'} onChange={() => setMetodo('cuenta')} />
                Cuenta corriente
              </label>
              <Button
                size="form"
                className="bg-gob-primary hover:bg-gob-primary-dark"
                onClick={() => {
                  setFase('cargando')
                  const nro = `B-${Math.floor(Math.random() * 1e8)
                    .toString()
                    .padStart(8, '0')}`
                  window.setTimeout(() => {
                    setBoleta(nro)
                    setFase('ok')
                  }, 1400)
                }}
              >
                <CreditCard className="size-4" />
                Confirmar pago
              </Button>
            </section>
          </>
        ) : (
          <section className="rounded-gob-lg border border-gob-success/40 bg-white p-gob-6 space-y-gob-4">
            <h2 className="font-heading text-xl font-medium text-gob-success">Pago realizado</h2>
            <dl className="grid gap-gob-3 text-gri-body-sm min-[600px]:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">N.° de boleta</dt>
                <dd className="font-medium">{boleta}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Monto</dt>
                <dd className="font-medium">${total.toLocaleString('es-CL')}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Marca</dt>
                <dd>{data.signo}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Fecha</dt>
                <dd>08-10-2026</dd>
              </div>
            </dl>
            <Button size="form" onClick={() => router.push('/tramites')}>
              Aceptar y volver al inicio
            </Button>
          </section>
        )}
      </main>
      <Dialog open={fase === 'cargando'} onOpenChange={() => undefined}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cargando</DialogTitle>
          </DialogHeader>
          <p className="text-gri-body">Estamos procesando tu pago en Tesorería.</p>
          <DialogFooter />
        </DialogContent>
      </Dialog>
    </div>
  )
}
