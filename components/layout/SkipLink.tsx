'use client'

/**
 * Enlace de salto al contenido principal — WCAG 2.4.1 (Bypass Blocks)
 */
export function SkipLink() {
  return (
    <a
      href="#contenido-principal"
      className="skip-link"
    >
      Saltar al contenido principal
    </a>
  )
}
