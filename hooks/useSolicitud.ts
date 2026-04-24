'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { SolicitudBorrador, Cobertura, SeccionEstado, PersonaData, RepresentanteData } from '@/lib/types'

const SECCIONES_INICIALES: SeccionEstado[] = [
  { id: 'solicitante', nombre: 'Tus Datos',      estado: 'activa'    },
  { id: 'pesquisa',    nombre: '¿Ya existe?',     estado: 'pendiente' },
  { id: 'marca',       nombre: 'Tu Marca',         estado: 'pendiente' },
  { id: 'revision',    nombre: 'Revisión y Pago',  estado: 'pendiente' },
]

// Elimina claves con valor undefined para evitar el error de Firestore:
// "Unsupported field value: undefined"
function sanitizeForFirestore<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [
        k,
        v && typeof v === 'object' && !Array.isArray(v) && !(v instanceof Date)
          ? sanitizeForFirestore(v as object)
          : v,
      ])
  ) as Partial<T>
}

function avanzarSecciones(
  secciones: SeccionEstado[],
  completarId: string,
  activarId: string
): SeccionEstado[] {
  return secciones.map(s => {
    if (s.id === completarId) return { ...s, estado: 'completada' as const }
    if (s.id === activarId) return { ...s, estado: 'activa' as const }
    return s
  })
}

export function useSolicitud() {
  const [solicitud, setSolicitud] = useState<SolicitudBorrador>({
    tipo: 'marca',
    denominacion: '',
    traduccion: '',
    transliteracion: '',
    descripcionMarca: '',
    preguntasPerfil: { p1: '', p2: '', p3: '' },
    clases: [],
    prioridad: false,
    pesquisaRealizada: false,
    pesquisaSimilitud: 0,
    secciones: SECCIONES_INICIALES,
  })
  const [docId, setDocId] = useState<string | null>(null)
  const [guardando, setGuardando] = useState(false)
  const primeraVez = useRef(true)

  const actualizarDenominacion = (denominacion: string) => {
    setSolicitud(prev => ({ ...prev, denominacion }))
  }

  const actualizarDescripcionMarca = (descripcionMarca: string) => {
    setSolicitud(prev => ({ ...prev, descripcionMarca }))
  }

  const actualizarPreguntasPerfil = (preguntas: Partial<SolicitudBorrador['preguntasPerfil']>) => {
    setSolicitud(prev => ({
      ...prev,
      preguntasPerfil: { ...prev.preguntasPerfil, ...preguntas }
    }))
  }

  const actualizarTraduccion = (v: string) => setSolicitud(prev => ({ ...prev, traduccion: v }))
  const actualizarTransliteracion = (v: string) => setSolicitud(prev => ({ ...prev, transliteracion: v }))
  const actualizarPrioridad = (v: boolean) => setSolicitud(prev => ({ ...prev, prioridad: v }))

  const actualizarSolicitante = (v: PersonaData) => setSolicitud(prev => ({ ...prev, solicitante: v }))
  const actualizarRepresentante = (v: RepresentanteData) => setSolicitud(prev => ({ ...prev, representante: v }))

  const actualizarPesquisa = (similitud: number, realizada: boolean) => {
    setSolicitud(prev => ({
      ...prev,
      pesquisaSimilitud: similitud,
      pesquisaRealizada: realizada,
    }))
  }

  const completarSeccion = (completarId: string, activarId: string) => {
    setSolicitud(prev => ({
      ...prev,
      secciones: avanzarSecciones(prev.secciones, completarId, activarId)
    }))
  }

  const completarTodo = () => {
    setSolicitud(prev => ({
      ...prev,
      secciones: prev.secciones.map(s => ({ ...s, estado: 'completada' as const }))
    }))
  }

  const agregarClase = (cobertura: Cobertura) => {
    setSolicitud(prev => {
      const yaExiste = prev.clases.some(c => c.id === cobertura.id)
      if (yaExiste) return prev
      return { ...prev, clases: [...prev.clases, cobertura] }
    })
  }

  const eliminarClase = (coberturaId: string) => {
    setSolicitud(prev => ({
      ...prev,
      clases: prev.clases.filter(c => c.id !== coberturaId)
    }))
  }

  const guardarEnFirestore = useCallback(async () => {
    setGuardando(true)
    try {
      const data = sanitizeForFirestore(solicitud)
      if (!docId) {
        const ref = await addDoc(collection(db, 'solicitudes'), {
          ...data,
          estado: 'borrador',
          creadoEn: serverTimestamp(),
          actualizadoEn: serverTimestamp(),
        })
        setDocId(ref.id)
      } else {
        await updateDoc(doc(db, 'solicitudes', docId), {
          ...data,
          actualizadoEn: serverTimestamp(),
        })
      }
    } catch (error) {
      console.error('Error guardando en Firestore:', error)
    } finally {
      setGuardando(false)
    }
  }, [solicitud, docId])

  useEffect(() => {
    if (primeraVez.current) {
      primeraVez.current = false
      return
    }
    const timer = setTimeout(() => {
      guardarEnFirestore()
    }, 2000)
    return () => clearTimeout(timer)
  }, [solicitud.denominacion, solicitud.clases, solicitud.preguntasPerfil, solicitud.pesquisaRealizada, guardarEnFirestore])

  return {
    solicitud,
    guardando,
    actualizarDenominacion,
    actualizarDescripcionMarca,
    actualizarPreguntasPerfil,
    actualizarTraduccion,
    actualizarTransliteracion,
    actualizarPrioridad,
    actualizarSolicitante,
    actualizarRepresentante,
    actualizarPesquisa,
    agregarClase,
    eliminarClase,
    guardarEnFirestore,
    completarSeccion,
    completarTodo,
  }
}