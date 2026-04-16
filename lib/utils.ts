import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Valor UTM Abril 2026 (Proyectado/Estimado para el MVP)
export const UTM_VALOR = 67500

/**
 * Limpia y extrae palabras clave de un texto en español.
 * Elimina stop-words comunes y normaliza a minúsculas.
 */
export function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para', 'con', 'no', 'una', 'su', 'al', 'lo', 'como', 'más', 'pero', 'sus', 'le', 'ya', 'o', 'este', 'sí', 'porque', 'esta', 'entre', 'cuando', 'muy', 'sin', 'sobre', 'también', 'me', 'hasta', 'hay', 'donde', 'quien', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra', 'otros', 'ese', 'eso', 'ante', 'ellos', 'e', 'esto', 'mí', 'antes', 'algunos', 'qué', 'unos', 'yo', 'otro', 'otras', 'otra', 'él', 'tanto', 'esa', 'estos', 'mucho', 'quienes', 'nada', 'muchos', 'cual', 'poco', 'ella', 'estar', 'estas', 'algunas', 'algo', 'nosotros', 'mi', 'mis', 'tú', 'te', 'ti', 'tu', 'tus', 'vendemos', 'ofrecemos', 'servicio', 'producto', 'marca', 'comercial', 'empresa', 'negocio'
  ])

  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Elimina acentos
    .replace(/[^\w\s]/g, '') // Elimina puntuación
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word))
    .map(word => {
      // Normalización básica de plurales en español
      if (word.endsWith('es') && word.length > 4) return word.slice(0, -2)
      if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) return word.slice(0, -1)
      return word
    })
}

/**
 * Calcula las tasas según el número de clases.
 * En Chile, la tasa de solicitud es 1 UTM por clase.
 */
export function calculateTasas(numClases: number) {
  return {
    utm: numClases,
    totalCLP: numClases * UTM_VALOR
  }
}

/**
 * Valida un RUT chileno (con o sin puntos/guión)
 */
export function validarRUT(rut: string): boolean {
  if (!rut || rut.trim() === '') return false
  const tmp = rut.replace(/\./g, '').replace('-', '').toUpperCase()
  const v = tmp.slice(-1)
  const n = parseInt(tmp.slice(0, -1), 10)
  if (isNaN(n)) return false

  let m = 0, s = 1
  let num = n
  for (; num; num = Math.floor(num / 10)) {
    s = (s + num % 10 * (9 - m++ % 6)) % 11
  }
  const dv = s ? (s - 1).toString() : 'K'
  return dv === v
}
