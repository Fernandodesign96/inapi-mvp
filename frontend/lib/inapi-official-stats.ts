/** Cifras publicadas por INAPI. No interpolar ni completar años faltantes. */

export const MARCAS_MULTICLASE = [
  {
    anio: '2020',
    solicitudes: 43133,
    fuente: 'Reporte de género en solicitudes de marcas comerciales, INAPI',
  },
  {
    anio: '2021',
    solicitudes: 49744,
    fuente: 'Reporte de género en solicitudes de marcas comerciales, INAPI',
  },
  {
    anio: '2022',
    solicitudes: 42493,
    fuente: 'Reporte de género en solicitudes de marcas comerciales, INAPI',
  },
  {
    anio: '2023',
    solicitudes: 45780,
    fuente: 'Reporte de género en solicitudes de marcas comerciales, INAPI',
  },
  {
    anio: '2024',
    solicitudes: 44449,
    fuente: 'Cuenta Pública participativa INAPI 2025',
  },
  {
    anio: '2025',
    solicitudes: 50388,
    fuente: 'Reporte anual INAPI 2025',
  },
] as const

/** No residentes, conteo uniclase. Cuenta Pública 2025 y Reporte anual INAPI 2025. */
export const MARCAS_NO_RESIDENTES_UNICLASE = {
  '2022': { nacional: 12820, madrid: 2334 },
  '2023': { nacional: 7831, madrid: 10608 },
  '2024': { nacional: 7508, madrid: 11176 },
  '2025': { nacional: 7911, madrid: 11833 },
} as const

export const MARCAS_NO_RESIDENTES_YEARS = ['2023', '2024', '2025'] as const

/**
 * Residentes vs no residentes, conteo uniclase.
 * 2023: Reporte INAPI 2024. 2024: Reporte INAPI 2025. 2025: Reporte anual INAPI 2025.
 */
export const MARCAS_ORIGEN = {
  '2023': { residentes: 46560, noResidentes: 17931 },
  '2024': { residentes: 43689, noResidentes: 18702 },
  '2025': { residentes: 52646, noResidentes: 19744 },
} as const

export const MARCAS_ORIGEN_YEARS = ['2023', '2024', '2025'] as const

/**
 * Patentes agrupadas como en la Cuenta Pública 2025:
 * invenciones (incluye provisionales), diseños (incluye certificados de depósito)
 * y modelos de utilidad (incluye provisionales).
 */
export const PATENTES_POR_TIPO = {
  '2023': {
    total: 3995,
    invencion: 3356,
    diseno: 501,
    modeloUtilidad: 138,
    fuente: 'Sala de prensa INAPI (cierre 2023) y Cuenta Pública 2025',
  },
  '2024': {
    total: 4102,
    invencion: 3339,
    diseno: 620,
    modeloUtilidad: 144,
    fuente: 'Cuenta Pública participativa INAPI 2025',
  },
  '2025': {
    total: 4189,
    invencion: 3453,
    diseno: 556,
    modeloUtilidad: 180,
    fuente: 'Reporte anual INAPI 2025',
  },
} as const

export const PATENTES_TIPO_YEARS = ['2023', '2024', '2025'] as const

/** Totales combinados (invención, diseños, modelos y provisionales) publicados por INAPI. */
export const PATENTES_TOTAL = [
  { anio: '2023', solicitudes: 3995, fuente: 'Sala de prensa INAPI, cierre 2023' },
  { anio: '2024', solicitudes: 4102, fuente: 'Cuenta Pública participativa INAPI 2025' },
  { anio: '2025', solicitudes: 4189, fuente: 'Reporte anual INAPI 2025' },
] as const

/**
 * Residentes vs no residentes, total combinado de solicitudes de patente.
 * Serie 2017-2025 del Reporte anual INAPI 2025 (395 en 2023, 390 en 2024, 546 en 2025).
 */
export const PATENTES_ORIGEN = {
  '2023': { residentes: 395, noResidentes: 3600 },
  '2024': { residentes: 390, noResidentes: 3712 },
  '2025': { residentes: 546, noResidentes: 3643 },
} as const

export const PATENTES_ORIGEN_YEARS = ['2023', '2024', '2025'] as const

export const FUENTE_REPORTE_ANUAL_2025 =
  'https://www.inapi.cl/docs/default-source/2026-doc/cuenta-publica-doc/reporte-anual_inapi-06-07-26.pdf?sfvrsn=64b09c1f_1'

export const FUENTE_CUENTA_PUBLICA_2025 =
  'https://www.inapi.cl/docs/default-source/2025-doc/cuenta-publica/doc-cuentapublicainapi2025.pdf?sfvrsn=ad666a0d_1'
