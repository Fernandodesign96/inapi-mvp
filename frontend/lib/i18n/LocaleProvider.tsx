'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'
import { EN, normalizeI18nKey, translateText, type Locale } from '@/lib/i18n/dictionary'

const EN_TO_ES = new Map(Object.entries(EN).map(([es, en]) => [normalizeI18nKey(en), es]))

function spanishSource(value: string): string {
  const key = normalizeI18nKey(value)
  const es = key in EN ? key : EN_TO_ES.get(key)
  if (es === undefined) return value
  const lead = /^\s*/.exec(value)?.[0] ?? ''
  const trail = /\s*$/.exec(value)?.[0] ?? ''
  return lead + es + trail
}

const STORAGE_KEY = 'inapi-locale'
const COOKIE = 'inapi-locale'
const LOCALE_EVENT = 'inapi-locale-change'
const originals = new WeakMap<Text, string>()
const attrOriginals = new WeakMap<Element, Record<string, string>>()
const TRANSLATABLE_ATTRS = ['placeholder', 'aria-label', 'title', 'alt'] as const
const I18N_SKIP =
  'script, style, noscript, template, svg, canvas, [data-i18n-skip], nextjs-portal, [data-nextjs-dialog], [data-next-badge-root], [data-nextjs-toast]'

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  tx: (text: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'es') return stored
  } catch {
    /* ignore */
  }
  return 'es'
}

function persistLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
    document.cookie = `${COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`
  } catch {
    /* ignore */
  }
  document.documentElement.lang = locale === 'en' ? 'en' : 'es'
  window.dispatchEvent(new Event(LOCALE_EVENT))
}

function subscribeLocale(onStoreChange: () => void) {
  window.addEventListener(LOCALE_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(LOCALE_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

function translateTree(root: ParentNode, locale: Locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()
  while (node) {
    const textNode = node as Text
    if (textNode.parentElement?.closest(I18N_SKIP)) {
      node = walker.nextNode()
      continue
    }
    const current = textNode.textContent ?? ''
    const key = normalizeI18nKey(current)
    const stored = originals.get(textNode)
    const storedTranslated = stored !== undefined ? translateText(locale, stored) : null
    const textChanged =
      stored !== undefined && current !== stored && current !== storedTranslated
    if (key in EN || EN_TO_ES.has(key)) {
      originals.set(textNode, spanishSource(current))
    } else if (!stored || textChanged) {
      originals.set(textNode, current)
    }
    const source = originals.get(textNode) ?? ''
    if (normalizeI18nKey(source)) {
      const next = translateText(locale, source)
      if (textNode.textContent !== next) textNode.textContent = next
    }
    node = walker.nextNode()
  }
}

function translateAttrs(root: ParentNode, locale: Locale) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT)
  let node = walker.nextNode()
  while (node) {
    const el = node as Element
    if (el.closest(I18N_SKIP)) {
      node = walker.nextNode()
      continue
    }
    let snap = attrOriginals.get(el)
    if (!snap) {
      snap = {}
      attrOriginals.set(el, snap)
    }
    for (const attr of TRANSLATABLE_ATTRS) {
      const current = el.getAttribute(attr)
      if (!current) continue
      const stored = snap[attr]
      const storedTranslated = stored ? translateText(locale, stored) : null
      const attrChanged = Boolean(stored && current !== stored && current !== storedTranslated)
      const source = attrChanged || !stored ? spanishSource(current) : stored
      snap[attr] = source
      const next = translateText(locale, source)
      if (current !== next) el.setAttribute(attr, next)
    }
    node = walker.nextNode()
  }
}

function applyLocaleToDom(locale: Locale) {
  if (!document.body) return
  document.documentElement.lang = locale === 'en' ? 'en' : 'es'
  translateTree(document.body, locale)
  translateAttrs(document.body, locale)
}

export function LocaleProvider({
  children,
  initialLocale = 'es',
}: {
  children: ReactNode
  initialLocale?: Locale
}) {
  const pathname = usePathname()
  const locale = useSyncExternalStore(subscribeLocale, readStoredLocale, () => initialLocale)

  useEffect(() => {
    let cancelled = false
    const applying = { current: false }
    let frame = 0
    const run = () => {
      if (cancelled) return
      applying.current = true
      applyLocaleToDom(locale)
      queueMicrotask(() => {
        applying.current = false
      })
    }
    run()
    const trailing = window.setTimeout(run, 400)
    const observer = new MutationObserver(mutations => {
      if (applying.current || cancelled) return
      for (const mutation of mutations) {
        const node = mutation.target instanceof Element ? mutation.target : mutation.target.parentElement
        if (node?.closest(I18N_SKIP)) continue
        if (frame) return
        frame = window.requestAnimationFrame(() => {
          frame = 0
          run()
        })
        return
      }
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [...TRANSLATABLE_ATTRS],
    })
    return () => {
      cancelled = true
      observer.disconnect()
      window.clearTimeout(trailing)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [locale, pathname])

  const setLocale = useCallback((next: Locale) => {
    persistLocale(next)
    applyLocaleToDom(next)
  }, [])

  const tx = useCallback((text: string) => translateText(locale, text), [locale])

  const value = useMemo(() => ({ locale, setLocale, tx }), [locale, setLocale, tx])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    return {
      locale: 'es' as Locale,
      setLocale: () => undefined,
      tx: (text: string) => text,
    }
  }
  return ctx
}
