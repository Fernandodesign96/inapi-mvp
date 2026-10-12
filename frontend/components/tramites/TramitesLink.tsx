'use client'

import Link from 'next/link'
import { type ComponentProps } from 'react'
import { resolveTramitesHref } from '@/lib/tramites/entry'
import { useTramitesSession } from '@/lib/tramites/use-session'

export function TramitesLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { session, ready } = useTramitesSession()
  const dest =
    typeof href === 'string' ? resolveTramitesHref(href, ready && session.authenticated) : href
  return <Link href={dest} {...props} />
}
