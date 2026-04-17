'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { SolicitudBorrador, Cobertura, SeccionEstado, PersonaData, RepresentanteData } from '@/lib/types'

const SECCIONES_INICIALES: SeccionEstado[] = [
  { id: 'datos', nombre: 'Datos', estado: 'activa' },
  { id: 'clases', nombre: 'Clases', estado: 'pendiente' },
  { id: 'prioridad', nombre: 'Prioridad', estado: 'pendiente' },
  { id: 'solicitante', nombre: 'Solicitante', estado: 'pendiente' },
  { id: 'representante', nombre: 'Representante', estado: 'pendiente' },
  { id: 'tasas', nombre: 'Tasas', estado: 'pendiente' },
  { id: 'revision', nombre: 'Revisión', estado: 'pendiente' },
]

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
    preguntasPerfil: { p1: '', p2: '', p3: '' },
    clases: [],
    prioridad: false,
    secciones: SECCIONES_INICIALES,
  })
  const [docId, setDocId] = useState<string | null>(null)
  const [guardando, setGuardando] = useState(false)
  const primeraVez = useRef(true)

  const actualizarDenominacion = (denominacion: string) => {
    setSolicitud(prev => ({ ...prev, denominacion }))
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
      if (!docId) {
        const ref = await addDoc(collection(db, 'solicitudes'), {
          ...solicitud,
          estado: 'borrador',
          creadoEn: serverTimestamp(),
          actualizadoEn: serverTimestamp(),
        })
        setDocId(ref.id)
      } else {
        await updateDoc(doc(db, 'solicitudes', docId), {
          ...solicitud,
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
    // Autoguardado optimizado
    const timer = setTimeout(() => {
      guardarEnFirestore()
    }, 2000)
    return () => clearTimeout(timer)
  }, [solicitud.denominacion, solicitud.clases, solicitud.preguntasPerfil, guardarEnFirestore])

  return {
    solicitud,
    guardando,
    actualizarDenominacion,
    actualizarPreguntasPerfil,
    actualizarTraduccion,
    actualizarTransliteracion,
    actualizarPrioridad,
    actualizarSolicitante,
    actualizarRepresentante,
    agregarClase,
    eliminarClase,
    guardarEnFirestore,
    completarSeccion,
    completarTodo,
  }
}