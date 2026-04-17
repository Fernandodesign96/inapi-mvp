export interface Cobertura {
  id: string
  clase: number
  descripcion: string
  tipo: 'ICPA' | 'personalizada'
  palabrasClave?: string[]
}

export interface SeccionEstado {
  id: string
  nombre: string
  estado: 'pendiente' | 'activa' | 'completada' | 'error'
}

export interface PersonaData {
  tipo: 'natural' | 'juridica'
  pais: string
  rut: string
  nombre: string
  apellido: string
  razonSocial?: string
  genero?: string
  correo: string
  residenciaPais: string
  ciudad: string
  direccion: string
  zip: string
  telefono: string
}

export interface RepresentanteData extends PersonaData {
  poderDoc?: string
  poderNumero?: string
}

export interface SolicitudBorrador {
  id?: string
  tipo: 'marca' | 'patente'
  denominacion: string
  traduccion?: string
  idiomaTraduccion?: string
  transliteracion?: string
  preguntasPerfil: {
    p1: string // ¿Qué reciben los clientes?
    p2: string // Palabras clave / Frase corta
    p3: string // Industria / Contexto
  }
  clases: Cobertura[]
  prioridad: boolean
  solicitante?: PersonaData
  representante?: RepresentanteData
  tasas?: {
    utm: number
    valorCLP: number
    pagador: {
      rut: string
      nombre: string
      correo: string
    }
  }
  secciones: SeccionEstado[]
  creadoEn?: Date
  actualizadoEn?: Date
}