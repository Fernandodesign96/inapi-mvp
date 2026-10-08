'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { CheckCircle2 } from 'lucide-react'

const EVENT = 'inapi-download-ok'

export function DownloadPdfLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className="text-gri-body-xs font-bold text-gob-link hover:text-gob-primary-dark shrink-0"
      onClick={() => notifyDownload(typeof children === 'string' ? children : 'PDF')}
    >
      {children}
    </a>
  )
}

export function notifyDownload(nombre = 'documento') {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { nombre } }))
}

export function DownloadToast() {
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    const onOk = (e: Event) => {
      const nombre = (e as CustomEvent<{ nombre?: string }>).detail?.nombre ?? 'documento'
      setMsg(`Descarga lista: ${nombre}`)
      window.setTimeout(() => setMsg(null), 3200)
    }
    window.addEventListener(EVENT, onOk)
    return () => window.removeEventListener(EVENT, onOk)
  }, [])

  if (!msg) return null

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-[80] flex items-center gap-gob-3 rounded-gob-md border border-gob-success/40 bg-gob-success-bg px-gob-4 py-gob-3 text-gri-body-sm text-gob-text shadow-elevation-04"
    >
      <CheckCircle2 className="size-5 text-gob-success shrink-0" aria-hidden />
      {msg}
    </div>
  )
}
