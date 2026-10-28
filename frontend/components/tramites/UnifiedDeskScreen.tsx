'use client'

import { useMemo, useState, type FormEvent } from 'react'
import { CalendarDays, ChevronDown, CircleDot, FileText, Landmark } from 'lucide-react'
import { CompactProcessTimeline, type JourneyStep } from '@/components/story/JourneyRail'
import { FactList, HelperCard } from '@/components/tramites/TramitesExperience'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { Field, FilterPanel } from '@/components/tramites/FilterPanel'
import { AlertBanner, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { FilterActionBar, useTramitesChrome } from '@/components/tramites/TramitesScreenChrome'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { DEMO_NUMEROS } from '@/lib/tramites/catalogs'
import { cn } from '@/lib/utils'

export type DeskKind = 'marca' | 'patente' | 'diseño' | 'modelo'
export type DeskField = { id: string; label: string; placeholder: string; tooltip?: string }

export type DeskResult = {
  id: string
  title: string
  procedure: string
  kind: DeskKind
  updated: string
  status: string
  stage: string
  summary: string
  details: { label: string; value: string }[]
}

type DeskConfig = {
  domain: 'marcas' | 'patentes'
  title: string
  description: string
  types: string[]
  fields: DeskField[]
  results: DeskResult[]
  presentation?: 'search' | 'tabs'
  typeHelp?: Record<string, { title: string; hint?: string; sections: { title: string; body: string }[] }>
}

const KIND_LABEL: Record<DeskKind, string> = {
  marca: 'Marca',
  patente: 'Patente',
  diseño: 'Diseño',
  modelo: 'Modelo de utilidad',
}

export const MARCAS_TRAMITES_DESK: DeskConfig = {
  domain: 'marcas',
  title: 'Realiza otras solicitudes y presentaciones de marcas',
  description:
    'Es el envío de un escrito o una solicitud a un expediente ya abierto: renovación, anotación, oposición, Sistema de Madrid o custodia de poderes. Completa un dato identificador y revisa los expedientes relacionados.',
  typeHelp: {
    'Solicitar marca Sistema de Madrid': {
      title: 'Sistema de Madrid',
      hint: 'Registro internacional desde Chile',
      sections: [
        {
          title: 'Qué cubre este trámite',
          body: 'Extiende tu marca chilena a otros países del Sistema de Madrid con una sola gestión ante INAPI, que actúa como oficina de origen.',
        },
        {
          title: 'Qué necesitas',
          body: 'Una solicitud o registro de marca en Chile, el listado de países designados y el signo igual al de la marca de origen.',
        },
        {
          title: 'Plazo y tasas',
          body: 'Las tasas se pagan a la OMPI en francos suizos. INAPI cobra además la tarifa de oficina de origen. Revisa el calculador de tasas Madrid antes de presentar.',
        },
      ],
    },
    'Solicitar renovaciones': {
      title: 'Renovación',
      hint: 'Vigencia por un nuevo decenio',
      sections: [
        {
          title: 'Cuándo renovar',
          body: 'Puedes renovar desde 6 meses antes del vencimiento y hasta 6 meses después, con recargo si ya venció.',
        },
        {
          title: 'Qué se paga',
          body: 'La tasa cubre 10 años más. Si el registro tiene varias clases, el monto se calcula por cada clase que mantengas.',
        },
        {
          title: 'Después del pago',
          body: 'INAPI actualiza la vigencia en el expediente. Conserva el comprobante TGR o el Formulario 10 si pagaste en banco.',
        },
      ],
    },
    'Solicitar anotación de marcas': {
      title: 'Anotación',
      hint: 'Cambio de titular, nombre u otro acto',
      sections: [
        {
          title: 'Qué puedes anotar',
          body: 'Transferencia, cambio de nombre o domicilio, embargo, licencia, prenda y otros actos que deben constar en el registro.',
        },
        {
          title: 'Documentos',
          body: 'Adjunta el instrumento que acredita el acto (escritura, contrato o resolución) y el poder si actúa un representante.',
        },
        {
          title: 'Efecto',
          body: 'La anotación queda visible en el expediente y en el libro de registro una vez aceptada y pagada, si corresponde tasa.',
        },
      ],
    },
    'Presentar escritos de marcas': {
      title: 'Escritos',
      hint: 'Respuesta a un oficio o presentación',
      sections: [
        {
          title: 'Cuándo usarlo',
          body: 'Para contestar un oficio de forma o de fondo, acompañar documentos o hacer una presentación en un expediente ya iniciado.',
        },
        {
          title: 'Plazo',
          body: 'El oficio indica el plazo. Si vence, el trámite puede abandonarse. Revisa la notificación en Mis solicitudes.',
        },
        {
          title: 'Formato',
          body: 'Puedes descargar ejemplos de escritos en Formularios de marcas. El archivo debe ser PDF y estar firmado cuando se exija.',
        },
      ],
    },
    'Presentar demanda de oposición': {
      title: 'Oposición',
      hint: 'Impugnar una marca publicada',
      sections: [
        {
          title: 'Plazo',
          body: 'Tienes 30 días hábiles desde la publicación en el Diario Oficial para oponerte a una solicitud de marca.',
        },
        {
          title: 'Fundamento',
          body: 'Indica el número de la marca publicada y las causales (similitud, anterioridad u otras). Adjunta pruebas y poder si aplica.',
        },
        {
          title: 'Qué sigue',
          body: 'INAPI notifica al solicitante. El expediente queda en oposición hasta la resolución. Puedes seguir el estado aquí.',
        },
      ],
    },
    'Custodia de poderes y personerías': {
      title: 'Custodia de poderes',
      hint: 'Un poder para varios trámites',
      sections: [
        {
          title: 'Para qué sirve',
          body: 'Dejas el poder o la personería en INAPI y lo citas en los trámites siguientes, sin volver a adjuntar el mismo documento.',
        },
        {
          title: 'Vigencia',
          body: 'El poder rige mientras no lo revoques o venza. Conserva el código de custodia que se asigna al ingresarlo.',
        },
        {
          title: 'Quién puede usarlo',
          body: 'El representante individualizado en el poder. Si cambia el representante, presenta un poder nuevo.',
        },
      ],
    },
  },
  types: [
    'Solicitar marca Sistema de Madrid',
    'Solicitar renovaciones',
    'Solicitar anotación de marcas',
    'Presentar escritos de marcas',
    'Presentar demanda de oposición',
    'Custodia de poderes y personerías',
  ],
  fields: [
    {
      id: 'solicitud',
      label: 'Número de solicitud',
      placeholder: `Ejemplo: ${DEMO_NUMEROS.solicitudMarca}`,
      tooltip: `Prueba con ${DEMO_NUMEROS.solicitudMarca}.`,
    },
    {
      id: 'registro',
      label: 'Número de registro',
      placeholder: `Ejemplo: ${DEMO_NUMEROS.registroMarca}`,
      tooltip: `Prueba con ${DEMO_NUMEROS.registroMarca}.`,
    },
    {
      id: 'signo',
      label: 'Nombre o signo de la marca',
      placeholder: 'Ejemplo: Andes Café',
    },
  ],
  results: [
    {
      id: 'm-ren',
      title: 'Renovación — Andes Café',
      procedure: 'Solicitar renovaciones',
      kind: 'marca',
      updated: '2026-10-08',
      status: 'Vigente',
      stage: 'Pago de renovación',
      summary: 'El registro vence el 12-03-2027. Puedes renovar ahora y pagar la tasa del nuevo decenio.',
      details: [
        { label: 'Número de registro', value: DEMO_NUMEROS.registroMarca },
        { label: 'Clases', value: '30, 43' },
        { label: 'Titular', value: 'Andes Café SpA' },
      ],
    },
    {
      id: 'm-anot',
      title: 'Anotación de transferencia',
      procedure: 'Solicitar anotación de marcas',
      kind: 'marca',
      updated: '2026-09-22',
      status: 'En trámite',
      stage: 'Examen de forma',
      summary: 'Cambio de titular pendiente de documentos de respaldo.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudMarca },
        { label: 'Tipo de anotación', value: 'Transferencia' },
      ],
    },
    {
      id: 'm-esc',
      title: 'Escrito de respuesta a oficio',
      procedure: 'Presentar escritos de marcas',
      kind: 'marca',
      updated: '2026-08-14',
      status: 'Notificado',
      stage: 'Plazo de 30 días',
      summary: 'Hay un oficio de forma. Adjunta el escrito y los anexos en este expediente.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudMarca },
        { label: 'Oficio', value: 'OF-2026-4412' },
      ],
    },
    {
      id: 'm-opo',
      title: 'Oposición a solicitud publicada',
      procedure: 'Presentar demanda de oposición',
      kind: 'marca',
      updated: '2026-07-30',
      status: 'Publicada',
      stage: 'Plazo de oposición',
      summary: 'La solicitud 1388221 “Andes Koffee” está en publicación. Puedes oponerte con tu marca anterior.',
      details: [
        { label: 'Solicitud impugnada', value: '1388221' },
        { label: 'Diario Oficial', value: '04-07-2026' },
      ],
    },
    {
      id: 'm-mad',
      title: 'Extensión Sistema de Madrid',
      procedure: 'Solicitar marca Sistema de Madrid',
      kind: 'marca',
      updated: '2026-06-18',
      status: 'Registrada',
      stage: 'Oficina de origen',
      summary: 'Marca base chilena lista para designar países en Madrid e-filing.',
      details: [
        { label: 'Número de registro', value: DEMO_NUMEROS.registroMarca },
        { label: 'Países sugeridos', value: 'Perú, Colombia' },
      ],
    },
    {
      id: 'm-pod',
      title: 'Poder en custodia',
      procedure: 'Custodia de poderes y personerías',
      kind: 'marca',
      updated: '2026-05-02',
      status: 'Custodiado',
      stage: 'Vigente',
      summary: 'El poder de Andes Café SpA ya está ingresado. Cítalo en los trámites siguientes sin volver a adjuntarlo.',
      details: [
        { label: 'Código de custodia', value: 'POD-2026-771' },
        { label: 'Representante', value: 'Marina Soto' },
      ],
    },
  ],
}

export const MARCAS_PAGOS_DESK: DeskConfig = {
  domain: 'marcas',
  title: 'Realiza todos tus pagos de marcas aquí',
  presentation: 'tabs',
  description:
    'Son las vías para pagar tasas de INAPI: Tesorería, Formulario 10 en banco y otros pagos del expediente. El pago de la publicación en el Diario Oficial se hace en el sitio de esa publicación.',
  typeHelp: {
    'Pagar tasa de concesión final marcas': {
      title: 'Concesión final',
      hint: 'Pago para emitir el título',
      sections: [
        {
          title: 'Cuándo se paga',
          body: 'Cuando INAPI acepta el registro. El plazo es de 60 días desde esa aceptación. Si no pagas a tiempo, el registro no se concede.',
        },
        {
          title: 'Monto',
          body: '2 UTM por cada clase aceptada. El valor UTM se actualiza cada mes: el sistema calcula el monto en pesos al momento del pago en TGR.',
        },
        {
          title: 'Cómo pagar',
          body: 'Busca el expediente, confirma el detalle y continúa a Tesorería. Si prefieres banco, genera el Formulario 10 en la pestaña de comprobantes.',
        },
      ],
    },
    'Otros pagos en línea marcas': {
      title: 'Otros pagos',
      hint: 'Saldos u observaciones de tesorería',
      sections: [
        {
          title: 'Qué cubre',
          body: 'Clases adicionales, complementos de tasa, observaciones de TGR o diferencias que quedaron pendientes en un pago anterior.',
        },
        {
          title: 'Cómo identificarlo',
          body: 'Usa el número de solicitud, de registro o de anotación. El listado muestra el concepto y el estado (observado o pendiente).',
        },
        {
          title: 'Después del pago',
          body: 'TGR confirma en unos minutos. Si el estado sigue en espera, vuelve a Tesorería o espera la conciliación del mismo día hábil.',
        },
      ],
    },
    'Comprobantes para pago marcas': {
      title: 'Formulario 10',
      hint: 'Pago en banco con el mismo detalle',
      sections: [
        {
          title: 'Para qué sirve',
          body: 'Es el mismo cobro del pago en línea, impreso para pagarlo en un banco autorizado. El código de barras identifica el expediente.',
        },
        {
          title: 'Vigencia del comprobante',
          body: 'Úsalo dentro del plazo del trámite. Si cambia la UTM o vence el plazo, genera un comprobante nuevo.',
        },
        {
          title: 'Qué hacer después',
          body: 'Paga en el banco y conserva el voucher. INAPI actualiza el expediente cuando TGR informa el pago.',
        },
      ],
    },
  },
  types: [
    'Pagar tasa de concesión final marcas',
    'Otros pagos en línea marcas',
    'Comprobantes para pago marcas',
  ],
  fields: [
    {
      id: 'solicitud',
      label: 'Número de solicitud',
      placeholder: `Ejemplo: ${DEMO_NUMEROS.solicitudMarca}`,
      tooltip: `Prueba con ${DEMO_NUMEROS.solicitudMarca}.`,
    },
    {
      id: 'registro',
      label: 'Número de registro',
      placeholder: `Ejemplo: ${DEMO_NUMEROS.registroMarca}`,
    },
    {
      id: 'anotacion',
      label: 'Número de anotación',
      placeholder: 'Ejemplo: A-2026-445',
    },
  ],
  results: [
    {
      id: 'mp-conc',
      title: 'Tasa de concesión final',
      procedure: 'Pagar tasa de concesión final marcas',
      kind: 'marca',
      updated: '2026-10-06',
      status: 'Pendiente de pago',
      stage: 'Concesión',
      summary: '2 UTM por clase. Plazo de 60 días desde la aceptación a registro.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudMarca },
        { label: 'Monto', value: '2 UTM × 2 clases' },
        { label: 'Medio', value: 'Tesorería (TGR)' },
      ],
    },
    {
      id: 'mp-otro',
      title: 'Pago complementario de solicitud',
      procedure: 'Otros pagos en línea marcas',
      kind: 'marca',
      updated: '2026-09-12',
      status: 'Observado',
      stage: 'Pago complementario',
      summary: 'Hay un saldo por clases adicionales. Completa el pago para que el trámite siga.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudMarca },
        { label: 'Concepto', value: 'Clase adicional' },
      ],
    },
    {
      id: 'mp-f10',
      title: 'Comprobante Formulario 10',
      procedure: 'Comprobantes para pago marcas',
      kind: 'marca',
      updated: '2026-09-12',
      status: 'Generado',
      stage: 'Pago en banco',
      summary: 'Usa este comprobante si pagas en banco. La información es la misma del pago en línea.',
      details: [
        { label: 'Formulario', value: 'F10 — Tesorería' },
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudMarca },
        { label: 'Código de barra', value: 'F10-2026-1000000' },
        { label: 'Monto CLP', value: '$136.450' },
      ],
    },
  ],
}

export const PATENTES_PAGOS_DESK: DeskConfig = {
  domain: 'patentes',
  title: 'Realiza todos tus pagos de patentes aquí',
  presentation: 'tabs',
  description:
    'Son las vías para pagar tasas de INAPI: Tesorería, Formulario 10 en banco y otros pagos del expediente. Completa un identificador y revisa el detalle a la derecha.',
  typeHelp: {
    'Pagar tasa de presentación patentes': {
      title: 'Presentación',
      hint: 'Tasa de ingreso de la solicitud',
      sections: [
        {
          title: 'Qué cubre',
          body: 'Es la tasa para ingresar una patente, modelo de utilidad o diseño. Si la postergaste al presentar, puedes pagarla ahora con el número de solicitud.',
        },
        {
          title: 'Monto y plazo',
          body: 'El monto depende del tipo de derecho. Si no se paga dentro del plazo legal, la solicitud se tiene por no presentada.',
        },
        {
          title: 'Cómo continuar',
          body: 'Confirma el expediente, revisa el detalle y paga en TGR. El Formulario 10 sirve si pagas en banco con los mismos datos.',
        },
      ],
    },
    'Pagar arancel pericial': {
      title: 'Arancel pericial',
      hint: 'Cuando hay examen de fondo con perito',
      sections: [
        {
          title: 'Cuándo se cobra',
          body: 'INAPI designa perito para el examen de fondo. El arancel cubre ese informe. Sin el pago, el examen no avanza.',
        },
        {
          title: 'Plazo',
          body: 'El oficio de designación indica el plazo. Págalo con el número de solicitud antes de que venza.',
        },
        {
          title: 'Después del pago',
          body: 'El perito continúa el examen. Sigue el estado en Mis solicitudes; te notificaremos el informe o el siguiente oficio.',
        },
      ],
    },
    'Pagar derechos finales': {
      title: 'Derechos finales',
      hint: 'Para emitir el título',
      sections: [
        {
          title: 'Cuándo se pagan',
          body: 'Cuando la patente, el modelo o el diseño se concede. Sin este pago no se emite el título ni se inscribe en el registro.',
        },
        {
          title: 'Monto',
          body: 'Depende del tipo de derecho y de las anualidades o periodos que correspondan. El detalle aparece en el expediente.',
        },
        {
          title: 'Título y CVE',
          body: 'Tras la confirmación de TGR, INAPI emite el título electrónico. El CVE llega al correo de tu cuenta.',
        },
      ],
    },
    'Pagar tasas PCT fase internacional': {
      title: 'PCT',
      hint: 'Fase internacional o entrada nacional',
      sections: [
        {
          title: 'Qué tasas incluye',
          body: 'Tasas de presentación internacional, búsqueda o entrada en fase nacional, según el estado de tu PCT.',
        },
        {
          title: 'Identificador',
          body: 'Usa el número PCT (por ejemplo PCT/CL2023/123456) o el número de solicitud nacional asociado.',
        },
        {
          title: 'Dónde se paga',
          body: 'Algunas tasas se pagan a la OMPI y otras a INAPI vía TGR. El detalle de esta pantalla indica el destino de cada cobro.',
        },
      ],
    },
    'Otros pagos en línea patentes': {
      title: 'Otros pagos',
      hint: 'Saldos u observaciones de tesorería',
      sections: [
        {
          title: 'Qué cubre',
          body: 'Diferencias de tasa, observaciones de TGR o complementos que quedaron pendientes en un pago anterior.',
        },
        {
          title: 'Cómo ubicarlos',
          body: 'Filtra por número de solicitud o de registro. El estado “Observado” indica que tesorería pidió un ajuste.',
        },
        {
          title: 'Confirmación',
          body: 'Cuando TGR informa el pago, el expediente se actualiza. Si sigue en espera, reintenta el mismo día hábil.',
        },
      ],
    },
    'Comprobantes para pago patentes': {
      title: 'Formulario 10',
      hint: 'Mismo cobro, pago en banco',
      sections: [
        {
          title: 'Para qué sirve',
          body: 'Imprime el Formulario 10 con código de barras para pagar en un banco autorizado el mismo cobro del pago en línea.',
        },
        {
          title: 'Vigencia',
          body: 'Genera uno nuevo si cambió el monto o venció el plazo. No uses un comprobante de un trámite distinto.',
        },
        {
          title: 'Tras el pago',
          body: 'Guarda el voucher del banco. INAPI refleja el pago cuando TGR lo informa en el expediente.',
        },
      ],
    },
  },
  types: [
    'Pagar tasa de presentación patentes',
    'Pagar arancel pericial',
    'Pagar derechos finales',
    'Pagar tasas PCT fase internacional',
    'Otros pagos en línea patentes',
    'Comprobantes para pago patentes',
  ],
  fields: [
    {
      id: 'solicitud',
      label: 'Número de solicitud',
      placeholder: `Ejemplo: ${DEMO_NUMEROS.solicitudPatente}`,
      tooltip: `Prueba con ${DEMO_NUMEROS.solicitudPatente}.`,
    },
    {
      id: 'pct',
      label: 'Número de solicitud internacional PCT',
      placeholder: `Ejemplo: ${DEMO_NUMEROS.pct}`,
      tooltip: `Prueba con ${DEMO_NUMEROS.pct}.`,
    },
    {
      id: 'registro',
      label: 'Número de registro',
      placeholder: 'Ejemplo: 61234',
    },
  ],
  results: [
    {
      id: 'pp-pres',
      title: 'Tasa de presentación',
      procedure: 'Pagar tasa de presentación patentes',
      kind: 'patente',
      updated: '2026-10-01',
      status: 'Pendiente de pago',
      stage: 'Presentación',
      summary: 'Puedes pagar ahora la tasa que postergaste al ingresar la solicitud.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudPatente },
        { label: 'Monto', value: '1 UTM' },
      ],
    },
    {
      id: 'pp-per',
      title: 'Arancel pericial',
      procedure: 'Pagar arancel pericial',
      kind: 'patente',
      updated: '2026-08-21',
      status: 'Requerido',
      stage: 'Peritaje',
      summary: 'INAPI requirió el arancel pericial para continuar el examen de fondo.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudPatente },
        { label: 'Perito', value: 'Designado' },
      ],
    },
    {
      id: 'pp-fin',
      title: 'Derechos finales / decenio',
      procedure: 'Pagar derechos finales',
      kind: 'patente',
      updated: '2026-07-09',
      status: 'Por vencer',
      stage: 'Mantenimiento',
      summary: 'Pago de derechos de vigencia del primer decenio.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudPatente },
        { label: 'Periodo', value: 'Años 1 a 10' },
      ],
    },
    {
      id: 'pp-dis',
      title: 'Derechos de diseño industrial',
      procedure: 'Pagar derechos finales',
      kind: 'diseño',
      updated: '2026-06-02',
      status: 'Pendiente de pago',
      stage: 'Concesión',
      summary: 'Diseño industrial con quinquenio pendiente.',
      details: [
        { label: 'Número de solicitud', value: '201408901' },
        { label: 'Tipo', value: 'Diseño industrial' },
      ],
    },
    {
      id: 'pp-pct',
      title: 'Tasas PCT fase internacional',
      procedure: 'Pagar tasas PCT fase internacional',
      kind: 'patente',
      updated: '2026-05-19',
      status: 'En plazo',
      stage: 'Fase internacional',
      summary: 'Pago de tasas internacionales. También puedes usar PayPal, TEF o convenio BECB.',
      details: [
        { label: 'PCT', value: DEMO_NUMEROS.pct },
        { label: 'Oficina receptora', value: 'INAPI' },
      ],
    },
    {
      id: 'pp-otro',
      title: 'Otro pago en línea',
      procedure: 'Otros pagos en línea patentes',
      kind: 'modelo',
      updated: '2026-04-11',
      status: 'Observado',
      stage: 'Pago complementario',
      summary: 'Saldo asociado a un modelo de utilidad.',
      details: [
        { label: 'Número de solicitud', value: '201399001' },
        { label: 'Tipo', value: 'Modelo de utilidad' },
      ],
    },
    {
      id: 'pp-f10',
      title: 'Comprobante Formulario 10',
      procedure: 'Comprobantes para pago patentes',
      kind: 'patente',
      updated: '2026-10-01',
      status: 'Generado',
      stage: 'Pago en banco',
      summary: 'Misma información del pago en Tesorería, para pagar en banco con Formulario 10.',
      details: [
        { label: 'Formulario', value: 'F10 — Tesorería' },
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudPatente },
        { label: 'Código de barra', value: 'F10-2026-201401234' },
        { label: 'Monto CLP', value: '$68.225' },
      ],
    },
  ],
}

function deskPipeline(item: DeskResult): JourneyStep[] {
  const titles = ['Ingreso', 'Revisión', 'Pago', 'Cierre']
  const hay = `${item.stage} ${item.status}`.toLowerCase()
  let current = 1
  if (hay.includes('pago') || hay.includes('tasa') || hay.includes('tgr')) current = 2
  else if (hay.includes('cierre') || hay.includes('conced') || hay.includes('emit') || hay.includes('pagad')) current = 3
  else if (hay.includes('ingres')) current = 0
  return titles.map((title, index) => ({
    title,
    status: index < current ? 'done' : index === current ? 'current' : 'pending',
  }))
}

function ResultCard({ item }: { item: DeskResult }) {
  const { tx } = useI18n()
  const [open, setOpen] = useState(false)
  return (
    <article className="overflow-hidden rounded-gob-lg border-2 border-gob-border bg-card">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="flex w-full min-h-14 items-start gap-gob-3 px-gob-4 py-gob-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
      >
        <span className="flex-1 space-y-gob-2">
          <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-gob-primary-dark">
            {tx(item.procedure)} · {tx(KIND_LABEL[item.kind])}
          </span>
          <span className="block font-heading text-xl font-medium leading-tight text-gob-text">{tx(item.title)}</span>
          <span className="block text-gri-body-sm leading-[1.55] text-gob-text/80">{tx(item.summary)}</span>
        </span>
        <ChevronDown className={cn('mt-1 size-5 shrink-0 text-gob-text/70 transition-transform', open && 'rotate-180')} />
      </button>
      {open ? (
        <div className="space-y-gob-4 border-t border-gob-border px-gob-4 py-gob-4">
          <CompactProcessTimeline steps={deskPipeline(item)} label={tx('Etapas')} />
          <FactList
            items={[
              { icon: <CircleDot />, label: tx('Estado'), value: tx(item.status) },
              { icon: <Landmark />, label: tx('Etapa'), value: tx(item.stage) },
              { icon: <CalendarDays />, label: tx('Actualizado'), value: item.updated },
              ...item.details.map(row => ({
                icon: <FileText />,
                label: tx(row.label),
                value: row.value,
              })),
            ]}
          />
        </div>
      ) : null}
    </article>
  )
}

export function UnifiedDeskScreen({ config }: { config: DeskConfig }) {
  const { tx } = useI18n()
  const [values, setValues] = useState<Record<string, string>>({})
  const [searched, setSearched] = useState(false)
  const tabs = config.presentation === 'tabs'
  const [procedure, setProcedure] = useState(config.types[0])
  const [kind, setKind] = useState('todas')
  const [status, setStatus] = useState('todas')
  const [stage, setStage] = useState('todas')
  const [order, setOrder] = useState<'reciente' | 'antigua'>('reciente')
  const [filterOpen, setFilterOpen] = useState(false)

  const kinds = useMemo(() => [...new Set(config.results.map(r => r.kind))], [config.results])
  const statuses = useMemo(() => [...new Set(config.results.map(r => r.status))], [config.results])
  const stages = useMemo(() => [...new Set(config.results.map(r => r.stage))], [config.results])

  const visible = useMemo(() => {
    let rows = [...config.results]
    if (procedure !== 'todas') rows = rows.filter(r => r.procedure === procedure)
    if (kind !== 'todas') rows = rows.filter(r => r.kind === kind)
    if (status !== 'todas') rows = rows.filter(r => r.status === status)
    if (stage !== 'todas') rows = rows.filter(r => r.stage === stage)
    const queries = Object.values(values)
      .map(v => v.trim().toLowerCase())
      .filter(Boolean)
    if (searched && queries.length) {
      rows = rows.filter(r =>
        queries.some(
          q =>
            r.title.toLowerCase().includes(q) ||
            r.summary.toLowerCase().includes(q) ||
            r.details.some(d => d.value.toLowerCase().includes(q)),
        ),
      )
    }
    rows.sort((a, b) =>
      order === 'reciente' ? b.updated.localeCompare(a.updated) : a.updated.localeCompare(b.updated),
    )
    return rows
  }, [config.results, searched, procedure, kind, status, stage, order, values])

  const canSearch = config.fields.some(field => (values[field.id] ?? '').trim())

  useTramitesChrome(
    {
      subtabs: config.types.map(type => ({
        id: type,
        label: type,
        pressed: procedure === type,
        onSelect: () => {
          setProcedure(type)
          setSearched(false)
          setValues({})
        },
      })),
      filterEnabled: true,
      filterInline: true,
      filterOpen,
      onFilterToggle: () => setFilterOpen(v => !v),
    },
    [config.types, procedure, filterOpen],
  )

  const fieldCount = Math.max(config.fields.length, 1)
  const fieldCols = { gridTemplateColumns: `repeat(${fieldCount}, minmax(0,1fr))` }

  const fieldInput = (field: DeskField, id: string) => (
    <Input
      id={id}
      value={values[field.id] ?? ''}
      placeholder={tx(field.placeholder)}
      onChange={e => setValues(prev => ({ ...prev, [field.id]: e.target.value }))}
      className="h-11 bg-card"
    />
  )

  const fieldLabel = (field: DeskField, htmlFor: string) => (
    <label htmlFor={htmlFor} className="inline-flex max-w-full items-start gap-1.5 text-left text-gri-body-sm font-medium text-gob-text">
      <span className="text-left">{tx(field.label)}</span>
      {field.tooltip ? <HelpTooltip text={field.tooltip} /> : null}
    </label>
  )

  const actions = (
    <FilterActionBar>
      <Button type="submit" size="form" disabled={!canSearch}>
        {tx('Buscar')}
      </Button>
      <Button
        type="button"
        size="form"
        variant="secondary"
        onClick={() => {
          setValues({})
          if (!tabs) setSearched(false)
        }}
      >
        {tx('Limpiar')}
      </Button>
    </FilterActionBar>
  )

  const help = config.typeHelp?.[procedure]

  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    if (canSearch) setSearched(true)
  }

  const helpCard = help ? (
    <HelperCard key={procedure} title={tx(help.title)} tone="night" hint={tx(help.hint ?? 'Detalle de este trámite')} sections={help.sections} />
  ) : null

  const resultsBlock =
    visible.length === 0 ? (
      <AlertBanner>{tx('No hay trámites que coincidan con los filtros.')}</AlertBanner>
    ) : (
      <div className="space-y-gob-3">
        <p className="text-gri-body-sm text-muted-foreground">
          {visible.length} {tx(visible.length === 1 ? 'resultado' : 'resultados')}
        </p>
        {visible.map(item => (
          <ResultCard key={item.id} item={item} />
        ))}
      </div>
    )

  return (
    <RequireAuth>
      <TramitesMain>
        <div className="flex items-start gap-gob-5">
          <div className="min-w-0 flex-1 space-y-gob-4">
            <form className="space-y-gob-4" onSubmit={submitForm}>
              {help ? (
                <>
                  <div className="grid gap-x-gob-4 gap-y-gob-2" style={fieldCols}>
                    {config.fields.map(field => (
                      <div key={`${field.id}-label`}>{fieldLabel(field, field.id)}</div>
                    ))}
                    {config.fields.map(field => (
                      <div key={field.id}>{fieldInput(field, field.id)}</div>
                    ))}
                  </div>
                  {actions}
                </>
              ) : (
                <>
                  <div className="grid gap-gob-4 min-[600px]:grid-cols-2 min-[905px]:grid-cols-3">
                    {config.fields.map(field => (
                      <div key={field.id} className="space-y-gob-2">
                        {fieldLabel(field, field.id)}
                        {fieldInput(field, field.id)}
                      </div>
                    ))}
                  </div>
                  {actions}
                </>
              )}
            </form>

        {filterOpen ? (
            <FilterPanel title={tx('Filtros')} bare>
              <Field id="f-proc" label={tx('Tipo de trámite')}>
                <select id="f-proc" className={selectClass()} value={procedure} onChange={e => setProcedure(e.target.value)}>
                  <option value="todas">{tx('Todos')}</option>
                  {config.types.map(type => (
                    <option key={type} value={type}>
                      {tx(type)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="f-kind" label={tx('Derecho')}>
                <select id="f-kind" className={selectClass()} value={kind} onChange={e => setKind(e.target.value)}>
                  <option value="todas">{tx('Todos')}</option>
                  {kinds.map(item => (
                    <option key={item} value={item}>
                      {tx(KIND_LABEL[item])}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="f-status" label={tx('Estado del trámite')}>
                <select id="f-status" className={selectClass()} value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="todas">{tx('Todos')}</option>
                  {statuses.map(item => (
                    <option key={item} value={item}>
                      {tx(item)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="f-stage" label={tx('Etapa del trámite')}>
                <select id="f-stage" className={selectClass()} value={stage} onChange={e => setStage(e.target.value)}>
                  <option value="todas">{tx('Todas')}</option>
                  {stages.map(item => (
                    <option key={item} value={item}>
                      {tx(item)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="f-order" label={tx('Fecha de actualización')}>
                <select
                  id="f-order"
                  className={selectClass()}
                  value={order}
                  onChange={e => setOrder(e.target.value as 'reciente' | 'antigua')}
                >
                  <option value="reciente">{tx('Más reciente')}</option>
                  <option value="antigua">{tx('Más antigua')}</option>
                </select>
              </Field>
            </FilterPanel>
        ) : null}

            {resultsBlock}
          </div>
          {helpCard ? <aside className="hidden w-[18.5rem] shrink-0 min-[1100px]:block">{helpCard}</aside> : null}
        </div>
        {helpCard ? <div className="mt-gob-4 min-[1100px]:hidden">{helpCard}</div> : null}
      </TramitesMain>
    </RequireAuth>
  )
}
