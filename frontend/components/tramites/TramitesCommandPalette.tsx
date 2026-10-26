'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ExternalLink, Zap } from 'lucide-react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { MARCAS_MEGA, PATENTES_MEGA, TRAMITES_SECONDARY_NAV, type MegaColumn } from '@/lib/tramites/nav'

export function useCommandShortcut(onToggle: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        onToggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onToggle])
}

export function TramitesCommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { tx } = useI18n()
  const router = useRouter()

  const go = (href: string, external?: boolean) => {
    onOpenChange(false)
    if (external) window.open(href, '_blank', 'noopener,noreferrer')
    else router.push(href)
  }

  const megaGroup = (heading: string, scope: string, columns: MegaColumn[]) => (
    <CommandGroup heading={tx(heading)}>
      {columns.flatMap(col =>
        col.items.map(item => (
          <CommandItem
            key={`${scope}-${item.href}-${item.label}`}
            value={`${scope} ${item.href} ${item.label}`}
            keywords={[tx(item.label), tx(item.tooltip), tx(col.title), tx(heading)]}
            onSelect={() => go(item.href, item.external)}
            className="min-h-11 items-start py-gob-2"
          >
            <span
              aria-hidden
              className={`mt-1.5 size-2 shrink-0 rounded-full ${scope === 'marcas' ? 'bg-gob-accent' : 'bg-gob-primary'}`}
            />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-gri-body-sm font-medium text-gob-text">{tx(item.label)}</span>
              <span className="text-gri-body-xs text-muted-foreground">{tx(item.tooltip)}</span>
            </span>
            {item.external ? <ExternalLink className="mt-1 size-3.5 text-muted-foreground" aria-label={tx('Se abre en otra pestaña')} /> : null}
          </CommandItem>
        )),
      )}
    </CommandGroup>
  )

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={tx('Buscar un trámite')}
      description={tx('Escribe el nombre del trámite o lo que necesitas hacer.')}
      className="top-[10vh] max-w-[40rem]"
    >
      <Command>
        <CommandInput placeholder={tx('Buscar un trámite, pago o documento')} />
        <CommandList className="max-h-[min(28rem,60vh)]">
          <CommandEmpty>{tx('No encontramos trámites con ese nombre.')}</CommandEmpty>
          <CommandGroup heading={tx('Atajos')}>
            {TRAMITES_SECONDARY_NAV.map(item => (
              <CommandItem
                key={item.href}
                value={`atajo ${item.href} ${item.label}`}
                keywords={[tx(item.label), tx(item.hint)]}
                onSelect={() => go(item.href)}
                className="min-h-11"
              >
                <Zap className="size-4 text-gob-text/70" aria-hidden />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-gri-body-sm font-medium text-gob-text">{tx(item.label)}</span>
                  <span className="text-gri-body-xs text-muted-foreground">{tx(item.hint)}</span>
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          {megaGroup('Marcas', 'marcas', MARCAS_MEGA)}
          {megaGroup('Patentes', 'patentes', PATENTES_MEGA)}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
