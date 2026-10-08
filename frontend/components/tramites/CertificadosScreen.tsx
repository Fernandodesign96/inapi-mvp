'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { InactiveField } from '@/components/tramites/InactiveField'
import { LegalNotice } from '@/components/tramites/LegalNotice'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { EmptyState, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { LEGAL_CERTIFICADOS } from '@/lib/tramites/legal'
import { CERT_PRICE_CLP, TIPOS_CERTIFICADO_MARCA, TIPOS_CERTIFICADO_PATENTE } from '@/lib/tramites/mock-data'
import { goTramites } from '@/lib/tramites/go'
import type { TramitesDomain } from '@/lib/tramites/nav'
import { useQueryParams } from '@/lib/tramites/use-query'

export function CertificadosScreen({ domain }: { domain: TramitesDomain }) {
  const params = useQueryParams()
  const expected = domain === 'marcas' ? '1000000' : '202101234'
  const tipos = domain === 'marcas' ? TIPOS_CERTIFICADO_MARCA : TIPOS_CERTIFICADO_PATENTE
  const [numero, setNumero] = useState('')
  const valid = numero.replace(/\s/g, '') === expected
  const [tipo, setTipo] = useState('')
  const [open, setOpen] = useState(false)

  const estado = params.get('estado') ?? ''

  const canPay = valid && !!tipo

  return (
    <RequireAuth>
      <TramitesMain>
        <ul className="grid gap-gob-3 min-[600px]:grid-cols-2">
          <li className="rounded-gob-md border border-gob-border bg-card p-gob-4">
            <p className="font-medium text-gob-text">Precio</p>
            <p className="text-gri-body-sm text-muted-foreground">${CERT_PRICE_CLP} por certificado</p>
          </li>
          <li className="rounded-gob-md border border-gob-border bg-card p-gob-4">
            <p className="font-medium text-gob-text">Plazo de emisión</p>
            <p className="text-gri-body-sm text-muted-foreground">Hasta 10 días hábiles</p>
          </li>
          <li className="rounded-gob-md border border-gob-border bg-card p-gob-4">
            <p className="font-medium text-gob-text">Vigencia</p>
            <p className="text-gri-body-sm text-muted-foreground">60 días corridos desde la emisión</p>
          </li>
          <li className="rounded-gob-md border border-gob-border bg-card p-gob-4">
            <p className="font-medium text-gob-text">CVE por correo</p>
            <p className="text-gri-body-sm text-muted-foreground">El código de verificación llega al correo de tu cuenta</p>
          </li>
        </ul>

        {estado === 'espera' && (
          <div className="rounded-gob-md border border-gob-warning/40 bg-gob-warning-bg p-gob-5 space-y-gob-3">
            <p className="font-medium text-gob-text">En espera de confirmación de pago</p>
            <p className="text-gri-body-sm text-gob-text">
              Tesorería aún no confirma el pago. Si ya pagaste, espera unos minutos. Si no, vuelve a Tesorería.
            </p>
            <Button size="form" onClick={() => goTramites(`/tramites/pago?origen=${domain}&numero=${expected}`)}>
              Pagar en TGR
            </Button>
          </div>
        )}

        <div className="space-y-gob-4 max-w-xl">
          <div className="space-y-gob-2">
            <label htmlFor="ncert" className="flex items-center text-gri-body-sm font-medium">
              Número de {domain === 'marcas' ? 'marca' : 'patente'}
              <HelpTooltip text={`Usa ${expected}.`} />
            </label>
            <Input id="ncert" value={numero} onChange={e => setNumero(e.target.value)} />
          </div>
          <InactiveField active={valid} hint="Ingresa un número válido para elegir el tipo de certificado.">
            <div className="space-y-gob-2">
              <label htmlFor="tipo" className="text-gri-body-sm font-medium">
                Tipo de certificado
              </label>
              <select id="tipo" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
                <option value="">Selecciona</option>
                {tipos.map(t => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </InactiveField>
          <InactiveField active={canPay}>
            <Button size="form" disabled={!canPay} onClick={() => setOpen(true)}>
              Pedir certificado y pagar
            </Button>
          </InactiveField>
        </div>
        {!canPay && <EmptyState>Completa el número y el tipo. Los campos inactivos siguen visibles.</EmptyState>}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Continuar al pago de Tesorería (TGR)?</DialogTitle>
              <DialogDescription>
                Continuarás al pago en Tesorería. El certificado cuesta ${CERT_PRICE_CLP}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button asChild>
                <Link
                  href={`/tramites/pago?origen=${domain}&numero=${numero}&tipo=${encodeURIComponent(tipo)}`}
                >
                  Ir al pago
                </Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <LegalNotice>{LEGAL_CERTIFICADOS}</LegalNotice>
      </TramitesMain>
    </RequireAuth>
  )
}
