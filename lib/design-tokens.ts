/**
 * Tokens UI Kit v3.0.1 — Portal GRI INAPI
 * Fuente: docs/DESIGN_SYSTEM.md v2.0.0
 *
 * Uso:
 * - En TS/JS donde necesites hex literal (config de stepper, niveles de riesgo, etc.)
 * - Como referencia al migrar className con hex hardcodeado
 */

export const GOB_COLOR = {
    primary: {
      base: '#4282E0',
      dark: '#0F69C4',
      foreground: '#FFFFFF',
    },
    accent: {
      base: '#FF4731',
    },
    text: {
      base: '#373737',
      inverse: '#FFFFFF',
    },
    success: { base: '#4CAF50', bg: '#E8F5E9' },
    warning: { base: '#FF5722', bg: '#FBE9E7' },
    danger:  { base: '#FB3B3B', bg: '#FFEBEF' },
    info:    { base: '#2196F3', bg: '#E3F2FD' },
    link: {
      base: '#1D70B8',
      visited: '#4C2C92',
    },
    focus: {
      ring: '#FFBE5C',
      contrast: '#373737',
    },
    surface: {
      base: '#FFFFFF',
      elevated: '#F3F4F6',
      page: '#F9FAFB',
    },
    border: {
      base: '#E5E7EB',
      strong: '#D1D5DB',
    },
  } as const
  
  /** Colores del stepper — §10.2 DESIGN_SYSTEM.md */
  export const STEPPER_COLOR = {
    active:   { base: '#FF5722', bg: '#FBE9E7' },
    done:     { base: '#4CAF50', bg: '#E8F5E9' },
    pending:  { base: '#9CA3AF', bg: '#F3F4F6' }, // TBD: GOB.COLOR.GRIS
    error:    { base: '#FB3B3B', bg: '#FFEBEF' },
  } as const
  
  /** Excepciones de marca INAPI (header institucional) */
  export const INAPI_BRAND = {
    header: '#FF4134',
    headerSub: '#005fff',
    legacyBlue: '#0033A0',
    legacyRed: '#EE3124',
  } as const
  
  /** Escala de espaciado kit (px) */
  export const GOB_SPACING = [4, 8, 12, 16, 24, 36, 48, 64] as const
  
  /** Border radius kit (px) */
  export const GOB_RADIUS = {
    none: 0,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  } as const
  
  /** Breakpoints grilla kit (px) */
  export const GOB_BREAKPOINTS = {
    sm: 600,
    md: 905,
    lg: 1240,
    xl: 1440,
  } as const
  
  export const GOB_CONTAINER = {
    tablet: 840,
    desktop: 1040,
  } as const
  
  /**
   * Mapa de migración: hex legacy en componentes → token GOB / clase Tailwind
   * Usar en Fases 5–6 al reemplazar className
   */
  export const LEGACY_HEX_MAP = {
    // Paleta pre-kit (más usada en el repo)
    '#1A56DB': { token: 'gob-primary',        tailwind: 'bg-gob-primary text-gob-primary' },
    '#1E3A8A': { token: 'gob-primary-dark',   tailwind: 'bg-gob-primary-dark' },
    '#0033A0': { token: 'gob-primary-dark',   tailwind: 'bg-gob-primary-dark' }, // globals.css legacy
    '#111827': { token: 'gob-text',           tailwind: 'text-gob-text' },
    '#373737': { token: 'gob-text',           tailwind: 'text-gob-text' },
    '#4B5563': { token: 'foreground-secondary', tailwind: 'text-muted-foreground' },
    '#9CA3AF': { token: 'stepper-pending',    tailwind: 'text-stepper-pending' },
    '#E5E7EB': { token: 'gob-border',         tailwind: 'border-gob-border' },
    '#D1D5DB': { token: 'gob-border-strong',  tailwind: 'border-gob-border-strong' },
    '#F3F4F6': { token: 'gob-surface-elevated', tailwind: 'bg-gob-surface-elevated' },
    '#F9FAFB': { token: 'gob-surface-page',   tailwind: 'bg-background' },
    '#D97706': { token: 'stepper-active',     tailwind: 'text-stepper-active' },      // viejo stepper
    '#FEF3C7': { token: 'stepper-active-bg',  tailwind: 'bg-stepper-active-bg' },
    '#059669': { token: 'stepper-done',       tailwind: 'text-stepper-done' },
    '#D1FAE5': { token: 'stepper-done-bg',    tailwind: 'bg-stepper-done-bg' },
    '#DC2626': { token: 'stepper-error',      tailwind: 'text-stepper-error' },
    '#FEE2E2': { token: 'stepper-error-bg',   tailwind: 'bg-stepper-error-bg' },
    '#EE3124': { token: 'inapi-legacy-red',   tailwind: 'bg-inapi-header' },
    '#FF4134': { token: 'inapi-header',       tailwind: 'bg-inapi-header' },
  } as const
  
  /** Escala tipográfica GRI — docs/DESIGN_SYSTEM.md §5.6 */
  export const GRI_TYPOGRAPHY = {
    display: { size: '48px', weight: 400, lineHeight: 1.5, family: 'slab' },
    h1:      { size: '25px', weight: 500, lineHeight: 1.5, family: 'slab' },
    h2:      { size: '19px', weight: 500, lineHeight: 1.5, family: 'sans' },
    body:    { size: '16px', weight: 400, lineHeight: 1.5, family: 'sans' },
    bodySm:  { size: '14px', weight: 400, lineHeight: 1.5, family: 'sans' },
    bodyXs:  { size: '12px', weight: 400, lineHeight: 1.5, family: 'sans' },
    btn:     { size: '16px', weight: 500, lineHeight: 1.5, family: 'sans' },
    label:   { size: '11px', weight: 600, lineHeight: 1.5, family: 'sans' },
    mono:    { size: '13px', weight: 500, lineHeight: 1.25, family: 'mono' },
  } as const
  
  /** Clases Tailwind recomendadas por nivel GRI */
  export const GRI_TYPO_CLASSES = {
    sectionTitle: 'gri-section-title',
    sectionSubtitle: 'gri-section-subtitle',
    fieldLabel: 'gri-field-label',
    body: 'gri-body',
    bodySm: 'gri-body-sm',
    btn: 'gri-btn-text',
    mono: 'gri-mono',
  } as const
  
  export type LegacyHex = keyof typeof LEGACY_HEX_MAP