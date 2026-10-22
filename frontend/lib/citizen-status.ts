export const CITIZEN_STATUS: Record<string, string> = {
  INGRESADA: 'Tu solicitud fue recibida por INAPI',
  EN_EXAMEN_FORMAL: 'INAPI está revisando que tu solicitud esté completa',
  OBSERVADA_FORMAL: 'INAPI necesita que corrijas algo — revisa las instrucciones',
  EN_PUBLICACION: 'Tu marca está siendo publicada para que otros puedan objetarla',
  EN_OPOSICION: 'Alguien objetó tu solicitud — tienes plazo para responder',
  EN_EXAMEN_FONDO: 'INAPI está analizando si tu marca puede registrarse',
  CONCEDIDA: 'Tu marca fue registrada. Ya tienes protección oficial',
  DENEGADA: 'Tu solicitud fue rechazada — puedes apelar si no estás de acuerdo',
  ABANDONADA: 'Tu solicitud fue cerrada por inactividad',
  Publicación: 'Tu marca está siendo publicada para que otros puedan objetarla',
  Requerimiento: 'INAPI necesita que corrijas algo — revisa las instrucciones',
  'Examen de fondo': 'INAPI está analizando si tu solicitud puede registrarse',
}

export function citizenStatusLabel(code: string) {
  return CITIZEN_STATUS[code] ?? code
}

export const PLATFORM_BANNER_KEY = 'inapi-platform-banner-seen'
export const FROM_INFORMATIVO_KEY = 'inapi-from-informativo'
export const FROM_TRAMITES_KEY = 'inapi-from-tramites'
export const CROSS_CRUMB_KEY = 'inapi-cross-crumb'
