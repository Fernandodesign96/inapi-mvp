'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TramitesMain } from '@/components/tramites/ui-helpers'
import { DEMO_USER, markRegistered, signIn } from '@/lib/tramites/session'
import { useQueryParams } from '@/lib/tramites/use-query'

export default function ClaveUnicaSimPage() {
  const router = useRouter()
  const params = useQueryParams()
  const fromRegister = (params.get('next') ?? '').includes('registrarse')
  const [step, setStep] = useState<'aviso' | 'datos'>('aviso')
  const [email, setEmail] = useState(DEMO_USER.email)

  return (
    <TramitesMain>
      <div className="max-w-lg space-y-gob-4 rounded-gob-lg border border-gob-warning/40 bg-gob-warning-bg p-gob-6">
        <h2 className="font-heading text-xl font-medium text-gob-text">Simulación de ClaveÚnica</h2>
        <p className="text-gri-body text-gob-text leading-relaxed">
          Esta pantalla no es el sitio de ClaveÚnica del Estado. En el MVP solo simulamos que validaste tu identidad y vuelves a INAPI.
        </p>
        {step === 'aviso' ? (
          <div className="flex flex-col gap-gob-3">
            <Button
              size="form"
              onClick={() => {
                if (fromRegister) setStep('datos')
                else {
                  signIn({ metodo: 'clave-unica' })
                  router.push('/tramites')
                }
              }}
            >
              Continuar la simulación
            </Button>
            <Button asChild variant="outline" size="form">
              <Link href="/tramites">Cancelar y volver</Link>
            </Button>
          </div>
        ) : (
          <form
            className="space-y-gob-4 bg-card rounded-gob-md p-gob-4"
            onSubmit={e => {
              e.preventDefault()
              markRegistered()
              router.push('/tramites')
            }}
          >
            <p className="text-gri-body-sm text-gob-text">
              Identidad simulada: {DEMO_USER.nombre} · RUN {DEMO_USER.run}
            </p>
            <div className="space-y-gob-2">
              <label htmlFor="mail" className="text-gri-body-sm font-medium">
                Correo para avisos de INAPI
              </label>
              <Input id="mail" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <Button type="submit" size="form" className="w-full">
              Crear cuenta y entrar
            </Button>
          </form>
        )}
      </div>
    </TramitesMain>
  )
}
