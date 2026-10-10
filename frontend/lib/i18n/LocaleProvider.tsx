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
  if (key in EN) return key
  return EN_TO_ES.get(key) ?? value
}

const STORAGE_KEY = 'inapi-locale'
const COOKIE = 'inapi-locale'
const LOCALE_EVENT = 'inapi-locale-change'
const originals = new WeakMap<Text, string>()
const attrOriginals = new WeakMap<Element, Record<string, string>>()
const TRANSLATABLE_ATTRS = ['placeholder', 'aria-label', 'title', 'alt'] as const

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
    if (textNode.parentElement?.closest('script, style, noscript, [data-i18n-skip]')) {
      node = walker.nextNode()
      continue
    }
    const current = textNode.textContent ?? ''
    const key = normalizeI18nKey(current)
    if (key in EN || EN_TO_ES.has(key)) {
      originals.set(textNode, spanishSource(current))
    } else if (!originals.has(textNode)) {
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
    if (el.closest('script, style, noscript, [data-i18n-skip]')) {
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
      const source = spanishSource(current)
      snap[attr] = source
      const next = translateText(locale, source)
      if (current !== next) el.setAttribute(attr, next)
    }
    node = walker.nextNode()
  }
}

let applyingLocale = false

function applyLocaleToDom(locale: Locale) {
  if (applyingLocale) return
  applyingLocale = true
  try {
    document.documentElement.lang = locale === 'en' ? 'en' : 'es'
    translateTree(document.body, locale)
    translateAttrs(document.body, locale)
  } finally {
    applyingLocale = false
  }
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
    applyLocaleToDom(locale)
    const observer = new MutationObserver(() => {
      applyLocaleToDom(locale)
    })
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
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
