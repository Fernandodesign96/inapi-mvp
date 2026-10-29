'use client'

import { EXAMPLE_ACCOUNTS, STEREOTYPE_ACCOUNTS, type DemoAccount } from '@/lib/tramites/demo-accounts'
import { cn } from '@/lib/utils'

export function DemoAccountsPanel({
  onPick,
}: {
  onPick: (account: DemoAccount) => void
}) {
  return (
    <div className="overflow-hidden rounded-gob-xl border-2 border-gob-border bg-card">
      <button
        type="button"
        className="flex w-full items-center justify-between px-gob-4 py-gob-3 text-left"
        aria-expanded
      >
        <span className="font-heading text-gri-body-sm font-semibold text-gob-primary-dark">
          Cuentas de ejemplo (23)
        </span>
      </button>
      <div className="border-t border-gob-border px-gob-4 py-gob-3">
        <p className="text-gri-body-sm leading-relaxed text-gob-text">
          Primero aparecen los estereotipos de demostración (frecuente, natural y nuevo). Después, los casos
          prioritarios: el usuario debe pagar, responder o adjuntar antecedentes en un plazo. El resto está en
          revisión de INAPI o ya concluyó.
        </p>
      </div>
      <ul className="max-h-[28rem] divide-y divide-gob-border overflow-y-auto">
        {STEREOTYPE_ACCOUNTS.map(account => (
          <AccountRow key={account.runDigits} account={account} onPick={onPick} highlight />
        ))}
        {EXAMPLE_ACCOUNTS.map(account => (
          <AccountRow key={account.runDigits} account={account} onPick={onPick} />
        ))}
      </ul>
    </div>
  )
}

function AccountRow({
  account,
  onPick,
  highlight,
}: {
  account: DemoAccount
  onPick: (account: DemoAccount) => void
  highlight?: boolean
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onPick(account)}
        className={cn(
          'w-full px-gob-4 py-gob-3 text-left hover:bg-gob-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
          highlight && 'bg-[var(--story-mist)]',
        )}
      >
        <p className="flex flex-wrap items-center gap-gob-2 text-gri-body-sm font-semibold text-gob-text">
          {account.runDigits} / {account.clave}
          {account.required ? (
            <span className="rounded-full bg-gob-accent/15 px-2 py-0.5 text-[0.625rem] font-semibold tracking-wide text-gob-accent uppercase">
              Acción del usuario
            </span>
          ) : account.stereotype ? (
            <span className="rounded-full bg-[var(--story-night)] px-2 py-0.5 text-[0.625rem] font-semibold tracking-wide text-white uppercase">
              {account.persona === 'frecuente' ? 'Frecuente' : account.persona === 'natural' ? 'Natural' : 'Nuevo'}
            </span>
          ) : null}
        </p>
        <p className="mt-1 font-heading text-gri-body-sm text-gob-text">{account.marca}</p>
        <p className="text-gri-body-xs text-muted-foreground">{account.estadoIpas}</p>
        {account.accionUsuario ? <p className="text-gri-body-xs text-gob-text">{account.accionUsuario}</p> : null}
      </button>
    </li>
  )
}
