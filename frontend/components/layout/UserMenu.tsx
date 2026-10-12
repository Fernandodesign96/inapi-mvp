'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { ClipboardList, Home, LogOut, User } from 'lucide-react'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { goTramites } from '@/lib/tramites/go'
import { useTramitesSession } from '@/lib/tramites/use-session'
import { cn } from '@/lib/utils'

const iconBtn =
  'inline-flex size-11 min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus [&_svg]:text-white'

const itemClass =
  'flex min-h-11 w-full cursor-pointer items-center gap-gob-3 px-gob-4 text-left text-gri-body-sm text-[#373737] focus-visible:outline-none'

const shortcutClass =
  'group hover:bg-[#F3F4F6] hover:text-[#1D70B8] focus-visible:bg-[#F3F4F6] focus-visible:text-[#1D70B8]'

const shortcutIconClass =
  'size-4 shrink-0 text-[#373737]/70 group-hover:text-[#1D70B8] group-focus-visible:text-[#1D70B8]'

export function UserMenu({
  className,
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  const { tx } = useI18n()
  const { session, logout } = useTramitesSession()
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState({ top: 0, right: 16 })
  const wrapRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const iniciales = session.nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()

  const place = () => {
    const btn = wrapRef.current?.querySelector('button')
    if (!btn) return
    const r = btn.getBoundingClientRect()
    setCoords({ top: r.bottom + 8, right: Math.max(8, window.innerWidth - r.right) })
  }

  useLayoutEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(place)
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node
      if (wrapRef.current?.contains(target) || menuRef.current?.contains(target)) return
      setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDoc)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDoc)
    }
  }, [])

  const close = () => {
    setOpen(false)
    onNavigate?.()
  }

  const salir = () => {
    logout()
    close()
    goTramites('/')
  }

  const menu = open
    ? createPortal(
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          className="fixed z-[400] w-72 rounded-2xl border-2 border-sky-300 bg-white p-1 text-[#373737] shadow-elevation-04"
          style={{ top: coords.top, right: coords.right }}
        >
          <div className="flex items-center gap-gob-3 px-gob-3 py-gob-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gob-primary text-gri-body-sm font-semibold text-white">
              {iniciales || 'IN'}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-medium leading-snug text-[#373737]">{session.nombre}</span>
              <Link
                href="/tramites/perfil"
                role="menuitem"
                className="block text-gri-body-sm text-[#1D70B8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBE5C]"
                onClick={close}
              >
                {tx('Ver perfil')}
              </Link>
            </span>
          </div>
          <div className="mx-gob-2 h-px bg-[#E5E7EB]" aria-hidden />
          <div className="py-1">
            <Link
              href="/"
              role="menuitem"
              className={cn(itemClass, shortcutClass)}
              onClick={close}
            >
              <Home className={shortcutIconClass} aria-hidden />
              {tx('Ir a sitio informativo')}
            </Link>
            <Link
              href="/tramites"
              role="menuitem"
              className={cn(itemClass, shortcutClass)}
              onClick={close}
            >
              <ClipboardList className={shortcutIconClass} aria-hidden />
              {tx('Ir a sitio de trámites')}
            </Link>
            <Link
              href="/tramites/perfil"
              role="menuitem"
              className={cn(itemClass, shortcutClass)}
              onClick={close}
            >
              <User className={shortcutIconClass} aria-hidden />
              {tx('Ir a mi perfil')}
            </Link>
          </div>
          <div className="mx-gob-2 h-px bg-[#E5E7EB]" aria-hidden />
          <button
            type="button"
            role="menuitem"
            className={cn(itemClass, 'text-[#FB3B3B] hover:underline')}
            onClick={salir}
          >
            <LogOut className="size-4 shrink-0" aria-hidden />
            {tx('Cerrar sesión')}
          </button>
        </div>,
        document.body,
      )
    : null

  return (
    <div className={cn('relative', className)} ref={wrapRef}>
      <button
        type="button"
        className={iconBtn}
        aria-label={tx('Menú de usuario')}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={() => setOpen(value => !value)}
      >
        <User className="size-5" strokeWidth={2.25} aria-hidden />
      </button>
      {menu}
    </div>
  )
}
