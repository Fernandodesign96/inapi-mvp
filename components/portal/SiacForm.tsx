'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type FormState = {
  tipo: string
  area: string
  nombres: string
  apellidos: string
  rut: string
  fono: string
  correo: string
  correo2: string
  mensaje: string
}

const EMPTY_FORM: FormState = {
  tipo: '',
  area: '',
  nombres: '',
  apellidos: '',
  rut: '',
  fono: '',
  correo: '',
  correo2: '',
  mensaje: '',
}

const fieldClass = 'space-y-1.5'
const labelClass = 'text-gri-body-sm font-medium text-gob-text'
const selectClass =
  'h-11 w-full rounded-md border border-input bg-transparent px-gob-3 text-gri-body outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'

export function SiacForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errorMsg, setErrorMsg] = useState('')
  const [sent, setSent] = useState(false)
  const [ticket, setTicket] = useState('')

  function onChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.tipo || !form.area || !form.nombres || !form.apellidos || !form.correo || !form.mensaje) {
      setErrorMsg('Completa todos los campos obligatorios antes de enviar.')
      return
    }
    if (form.correo !== form.correo2) {
      setErrorMsg('Los correos electrónicos no coinciden.')
      return
    }
    setErrorMsg('')
    setTicket(`SIAC-${Date.now().toString().slice(-8)}`)
    setSent(true)
  }

  function handleClear() {
    setForm(EMPTY_FORM)
    setErrorMsg('')
  }

  function handleReset() {
    setSent(false)
    setTicket('')
    setForm(EMPTY_FORM)
    setErrorMsg('')
  }

  if (sent) {
    return (
      <div
        role="status"
        className="bg-[#E8F5E9] border border-[#43A047] rounded-gob-md p-gob-6 flex gap-gob-4 items-start"
      >
        <CheckCircle2 className="w-8 h-8 text-[#2E7D32] shrink-0" aria-hidden />
        <div>
          <h2 className="text-xl font-bold text-[#1B5E20] mb-gob-2">Recibimos tu solicitud</h2>
          <p className="text-gri-body-sm text-[#2E4230] leading-relaxed mb-1.5">
            Tu número de atención es <strong>{ticket}</strong>. Te enviamos un correo de confirmación a la casilla que
            indicaste.
          </p>
          <p className="text-gri-body-sm text-[#2E4230] leading-relaxed">
            Para hacer seguimiento, inicia sesión con ClaveÚnica.
          </p>
          <Button
            type="button"
            onClick={handleReset}
            className="mt-gob-4 rounded-none bg-inapi-cta hover:bg-[#003B8D] text-gob-text-inverse font-bold"
          >
            Enviar otra solicitud
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid min-[600px]:grid-cols-2 gap-gob-5">
        <div className={fieldClass}>
          <label htmlFor="tipo" className={labelClass}>
            Tipo de atención
          </label>
          <select id="tipo" value={form.tipo} onChange={onChange('tipo')} className={selectClass} required>
            <option value="">Selecciona una opción</option>
            <option>Consulta</option>
            <option>Sugerencia</option>
            <option>Reclamo</option>
            <option>Felicitación</option>
          </select>
        </div>
        <div className={fieldClass}>
          <label htmlFor="area" className={labelClass}>
            Área de atención
          </label>
          <select id="area" value={form.area} onChange={onChange('area')} className={selectClass} required>
            <option value="">Selecciona una opción</option>
            <option>Trámite de marca</option>
            <option>Trámite de patente</option>
            <option>Servicio en línea</option>
            <option>Capacitaciones, talleres o cursos</option>
            <option>General</option>
          </select>
        </div>
        <div className={fieldClass}>
          <label htmlFor="nombres" className={labelClass}>
            Nombres
          </label>
          <Input id="nombres" type="text" value={form.nombres} onChange={onChange('nombres')} required />
        </div>
        <div className={fieldClass}>
          <label htmlFor="apellidos" className={labelClass}>
            Apellidos
          </label>
          <Input id="apellidos" type="text" value={form.apellidos} onChange={onChange('apellidos')} required />
        </div>
        <div className={fieldClass}>
          <label htmlFor="rut" className={labelClass}>
            RUT
          </label>
          <Input id="rut" type="text" placeholder="12.345.678-9" value={form.rut} onChange={onChange('rut')} />
        </div>
        <div className={fieldClass}>
          <label htmlFor="fono" className={labelClass}>
            Teléfono de contacto
          </label>
          <Input id="fono" type="tel" placeholder="+56 9 1234 5678" value={form.fono} onChange={onChange('fono')} />
        </div>
        <div className={fieldClass}>
          <label htmlFor="correo" className={labelClass}>
            Correo electrónico
          </label>
          <Input id="correo" type="email" value={form.correo} onChange={onChange('correo')} required />
        </div>
        <div className={fieldClass}>
          <label htmlFor="correo2" className={labelClass}>
            Repite tu correo electrónico
          </label>
          <Input id="correo2" type="email" value={form.correo2} onChange={onChange('correo2')} required />
        </div>
      </div>

      <div className={`${fieldClass} mt-gob-5`}>
        <label htmlFor="mensaje" className={labelClass}>
          Describe tu solicitud
        </label>
        <Textarea
          id="mensaje"
          rows={6}
          maxLength={7000}
          placeholder="Cuéntanos en qué podemos ayudarte (máximo 7.000 caracteres)"
          value={form.mensaje}
          onChange={onChange('mensaje')}
          required
        />
      </div>

      {errorMsg && (
        <p
          role="alert"
          className="flex items-center gap-gob-2 bg-[#FDECEA] border border-[#D32F2F] rounded-md px-gob-3 py-gob-3 text-[#B71C1C] text-gri-body-sm mt-gob-5"
        >
          <AlertCircle className="w-5 h-5 shrink-0" aria-hidden />
          {errorMsg}
        </p>
      )}

      <div className="flex flex-wrap gap-gob-3 mt-gob-6">
        <Button type="submit" className="rounded-none bg-inapi-cta hover:bg-[#003B8D] text-gob-text-inverse font-bold h-auto py-gob-3 px-gob-7">
          Enviar solicitud
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleClear}
          className="rounded-none border-inapi-cta text-inapi-cta font-bold h-auto py-gob-3 px-gob-7 hover:bg-gob-surface-elevated"
        >
          Limpiar formulario
        </Button>
      </div>

      <p className="text-gri-body-xs text-muted-foreground leading-relaxed mt-gob-5">
        Tratamos tus datos personales solo para responder tu solicitud. Puedes ejercer tus derechos de acceso,
        rectificación, cancelación y oposición (ARCO) según la{' '}
        <a href="#" className="text-gob-link hover:text-gob-primary-dark font-medium">
          política de privacidad de INAPI
        </a>
        .
      </p>
    </form>
  )
}
