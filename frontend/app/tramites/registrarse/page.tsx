'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
import { TramitesMain } from '@/components/tramites/ui-helpers'

export default function RegistrarsePage() {
  const router = useRouter()
  return (
    <TramitesMain>
      <div className="max-w-lg space-y-gob-4 rounded-gob-lg border border-gob-border bg-card p-gob-6">
        <p className="text-gri-body text-gob-text leading-relaxed">
          Para crear tu cuenta, primero validamos tu identidad con ClaveÚnica. Después completas tus datos en INAPI.
        </p>
        <ClaveUnicaButton
          onClick={() => {
            router.push('/tramites/clave-unica?next=/tramites/registrarse')
          }}
        />
        <p className="text-gri-body-sm text-muted-foreground">
          Si ya tienes cuenta,{' '}
          <Link href="/tramites/ingresar" className="text-gob-link underline underline-offset-4">
            ingresa con Clave INAPI
          </Link>
          .
        </p>
      </div>
    </TramitesMain>
  )
}
