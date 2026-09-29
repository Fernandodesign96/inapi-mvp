// Este hook tiene una sola responsabilidad: dado un texto de búsqueda, devolver las coberturas más relevantes del catálogo
import Fuse from 'fuse.js'
import { useMemo, useState } from 'react'
import type { Cobertura } from '@/lib/types'
import { extractKeywords } from '@/lib/utils'
import coberturas from '@/data/coberturas.json'

// Instancia Fuse: Busca coincidencias aproximadas en listas o conjuntos de datos.
const fuse = new Fuse(coberturas as Cobertura[], {
  keys: [
    { name: 'descripcion', weight: 0.7 },
    { name: 'palabrasClave', weight: 0.3 }
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
  useExtendedSearch: true // Habilita operadores lógicos si fuera necesario
})

export function useClaseSugerida(initialQuery: string = '') {
  const [query, setQuery] = useState(initialQuery)
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery)

  if (initialQuery !== prevInitialQuery) {
    setQuery(initialQuery)
    setPrevInitialQuery(initialQuery)
  }

  const sugerencias = useMemo(() => {
    const trimmedQuery = query.trim()
    if (trimmedQuery.length < 2) return []

    // Si la consulta es una frase larga, desestructuramos inteligentemente
    const keywords = extractKeywords(trimmedQuery)
    const uniqueKeywords = Array.from(new Set(keywords))
    
    // Tomamos los 5 términos más significativos (deduplicados y por longitud)
    const topKeywords = uniqueKeywords
      .sort((a, b) => b.length - a.length)
      .slice(0, 5)

    // Búsqueda lógica OR: permite que fuse encuentre coincidencias para CUALQUIERA de los términos
    // Esto es mucho más robusto para frases largas tipo "software para gestionar..."
    const searchString = topKeywords.length > 0 
      ? topKeywords.join(' | ') 
      : trimmedQuery

    const results = fuse.search(searchString)
    
    // Si no hay resultados combinados, probamos búsqueda individual por el término de mayor longitud como último recurso
    if (results.length === 0 && topKeywords.length > 0) {
      return fuse.search(topKeywords[0]).slice(0, 8).map(r => r.item as Cobertura)
    }

    return results
      .slice(0, 8)
      .map(r => r.item as Cobertura)
  }, [query])

  const limpiar = () => setQuery('')

  return { query, setQuery, sugerencias, limpiar }
}