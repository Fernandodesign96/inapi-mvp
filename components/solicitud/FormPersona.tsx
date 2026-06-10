'use client'

import { useState, useId } from 'react'
import { Input } from '@/components/ui/input'
import { PersonaData } from '@/lib/types'
import { validarRUT } from '@/lib/utils'
import { User, Building2, Globe, Mail, Phone, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  initialData?: Partial<PersonaData>
  onChange: (data: PersonaData) => void
  title?: string
}

const selectClassName =
  'w-full h-11 px-gob-3 border border-gob-border rounded-md bg-gob-surface text-gri-body-sm focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all'

export function FormPersona({ initialData, onChange, title }: Props) {
  const fieldId = useId()

  const [data, setData] = useState<PersonaData>({
    tipo: initialData?.tipo || 'natural',
    pais: initialData?.pais || 'Chile',
    rut: initialData?.rut || '',
    nombre: initialData?.nombre || '',
    apellido: initialData?.apellido || '',
    razonSocial: initialData?.razonSocial || '',
    genero: initialData?.genero || '',
    correo: initialData?.correo || '',
    residenciaPais: initialData?.residenciaPais || 'Chile',
    ciudad: initialData?.ciudad || '',
    direccion: initialData?.direccion || '',
    zip: initialData?.zip || '',
    telefono: initialData?.telefono || '',
  })

  const [correoConfirm, setCorreoConfirm] = useState(initialData?.correo || '')

  const update = (fields: Partial<PersonaData>) => {
    const newData = { ...data, ...fields }
    setData(newData)
    onChange(newData)
  }

  const isChile = data.pais === 'Chile'
  const rutInvalido = isChile && !!data.rut && !validarRUT(data.rut)
  const correoNoCoincide = !!correoConfirm && data.correo !== correoConfirm

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {title && (
        <h3 className="font-heading text-gri-h2 font-medium text-gob-text tracking-tight uppercase border-l-4 border-primary pl-gob-4">
          {title}
        </h3>
      )}

      {/* Tipo de Persona Toggle */}
      <div className="grid grid-cols-2 gap-4" role="group" aria-label="Tipo de persona">
        <button
          type="button"
          aria-pressed={data.tipo === 'natural'}
          onClick={() => update({ tipo: 'natural' })}
          className={cn(
            'flex flex-col items-center justify-center p-gob-5 rounded-gob-xl border-2 transition-all gap-2 focus-gob',
            data.tipo === 'natural'
              ? 'border-primary bg-primary/5 shadow-elevation-03 ring-4 ring-primary/5'
              : 'border-gob-border hover:border-gob-border-strong bg-gob-surface'
          )}
        >
          <div
            className={cn(
              'w-12 h-12 rounded-gob-lg flex items-center justify-center shadow-inner',
              data.tipo === 'natural'
                ? 'bg-primary text-primary-foreground'
                : 'bg-gob-surface-elevated text-muted-foreground'
            )}
            aria-hidden
          >
            <User className="w-6 h-6" />
          </div>
          <span
            className={cn(
              'font-semibold text-gri-body-sm uppercase tracking-tight',
              data.tipo === 'natural' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Persona Natural
          </span>
        </button>

        <button
          type="button"
          aria-pressed={data.tipo === 'juridica'}
          onClick={() => update({ tipo: 'juridica' })}
          className={cn(
            'flex flex-col items-center justify-center p-gob-5 rounded-gob-xl border-2 transition-all gap-2 focus-gob',
            data.tipo === 'juridica'
              ? 'border-primary bg-primary/5 shadow-elevation-03 ring-4 ring-primary/5'
              : 'border-gob-border hover:border-gob-border-strong bg-gob-surface'
          )}
        >
          <div
            className={cn(
              'w-12 h-12 rounded-gob-lg flex items-center justify-center shadow-inner',
              data.tipo === 'juridica'
                ? 'bg-primary text-primary-foreground'
                : 'bg-gob-surface-elevated text-muted-foreground'
            )}
            aria-hidden
          >
            <Building2 className="w-6 h-6" />
          </div>
          <span
            className={cn(
              'font-semibold text-gri-body-sm uppercase tracking-tight',
              data.tipo === 'juridica' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Persona Jurídica
          </span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Identidad */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor={`${fieldId}-pais`} className="gri-field-label flex items-center gap-2">
              <Globe className="w-3 h-3" aria-hidden /> País Nacionalidad{' '}
              <span className="text-destructive">*</span>
            </label>
            <select
              id={`${fieldId}-pais`}
              value={data.pais}
              onChange={(e) => update({ pais: e.target.value })}
              className={selectClassName}
            >
              <option value="Chile">Chile</option>
              <option value="Argentina">Argentina</option>
              <option value="España">España</option>
              <option value="USA">USA</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor={`${fieldId}-rut`} className="gri-field-label">
              {isChile ? 'RUN (con puntos y guión)' : 'ID / Passport'}{' '}
              <span className="text-destructive">*</span>
            </label>
            <Input
              id={`${fieldId}-rut`}
              value={data.rut}
              onChange={(e) => update({ rut: e.target.value })}
              aria-invalid={rutInvalido}
              aria-describedby={rutInvalido ? `${fieldId}-rut-error` : undefined}
              className={cn(
                'h-11',
                rutInvalido && 'border-destructive bg-gob-danger-bg ring-2 ring-destructive/20'
              )}
              placeholder={isChile ? '12.345.678-9' : 'ID Number'}
            />
            {rutInvalido && (
              <p id={`${fieldId}-rut-error`} role="alert" className="text-gri-label text-destructive font-semibold uppercase animate-pulse">
                RUT Inválido
              </p>
            )}
          </div>
        </div>

        {/* Nombres */}
        <div className="space-y-4">
          {data.tipo === 'natural' ? (
            <>
              <div className="space-y-2">
                <label htmlFor={`${fieldId}-nombre`} className="gri-field-label">
                  Nombre <span className="text-destructive">*</span>
                </label>
                <Input
                  id={`${fieldId}-nombre`}
                  value={data.nombre}
                  onChange={(e) => update({ nombre: e.target.value })}
                  className="h-11"
                  placeholder="Juan"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor={`${fieldId}-apellido`} className="gri-field-label">
                  Apellidos <span className="text-destructive">*</span>
                </label>
                <Input
                  id={`${fieldId}-apellido`}
                  value={data.apellido}
                  onChange={(e) => update({ apellido: e.target.value })}
                  className="h-11"
                  placeholder="Pérez González"
                />
              </div>
            </>
          ) : (
            <div className="space-y-2 h-full flex flex-col justify-end">
              <label htmlFor={`${fieldId}-razon-social`} className="gri-field-label">
                Razón Social <span className="text-destructive">*</span>
              </label>
              <Input
                id={`${fieldId}-razon-social`}
                value={data.razonSocial}
                onChange={(e) => update({ razonSocial: e.target.value })}
                className="h-11"
                placeholder="Empresa de Ejemplo SpA"
              />
              <p className="text-gri-label text-muted-foreground mt-1">
                Nombre formal registrado ante el SII o institución equivalente.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contacto */}
      <div className="p-gob-6 rounded-gob-xl bg-gob-surface-elevated border border-gob-border space-y-gob-5 shadow-inner">
        <div className="flex items-center gap-2 text-gob-text border-b border-gob-border pb-gob-4">
          <Mail className="w-5 h-5 text-primary" aria-hidden />
          <span className="text-gri-body-sm font-semibold uppercase tracking-tight">
            Datos de Contacto Electrónico
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor={`${fieldId}-correo`} className="gri-field-label">
              Correo Electrónico <span className="text-destructive">*</span>
            </label>
            <Input
              id={`${fieldId}-correo`}
              type="email"
              autoComplete="email"
              value={data.correo}
              onChange={(e) => update({ correo: e.target.value })}
              className="h-11 bg-gob-surface"
              placeholder="ejemplo@correo.cl"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={`${fieldId}-correo-confirm`} className="gri-field-label">
              Repetir Correo <span className="text-destructive">*</span>
            </label>
            <Input
              id={`${fieldId}-correo-confirm`}
              type="email"
              autoComplete="email"
              value={correoConfirm}
              onChange={(e) => setCorreoConfirm(e.target.value)}
              aria-invalid={correoNoCoincide}
              aria-describedby={correoNoCoincide ? `${fieldId}-correo-error` : undefined}
              className={cn(
                'h-11 bg-gob-surface',
                correoNoCoincide && 'border-destructive bg-gob-danger-bg ring-2 ring-destructive/20'
              )}
              placeholder="Confirmar correo"
            />
            {correoNoCoincide && (
              <p id={`${fieldId}-correo-error`} role="alert" className="text-gri-label text-destructive font-semibold uppercase">
                Los correos no coinciden
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor={`${fieldId}-telefono`} className="gri-field-label flex items-center gap-2">
              <Phone className="w-3 h-3" aria-hidden /> Número de Teléfono{' '}
              <span className="text-destructive">*</span>
            </label>
            <Input
              id={`${fieldId}-telefono`}
              type="tel"
              autoComplete="tel"
              value={data.telefono}
              onChange={(e) => update({ telefono: e.target.value })}
              className="h-11 bg-gob-surface"
              placeholder="+56 9 1234 5678"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={`${fieldId}-genero`} className="gri-field-label">Género (Opcional)</label>
            <select
              id={`${fieldId}-genero`}
              value={data.genero}
              onChange={(e) => update({ genero: e.target.value })}
              className={selectClassName}
            >
              <option value="">Selecciona</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="no-binario">No Binario</option>
              <option value="otro">Otro / Prefiero no decir</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dirección */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gob-text border-b border-gob-border pb-gob-2">
          <MapPin className="w-5 h-5 text-primary" aria-hidden />
          <span className="text-gri-body-sm font-semibold uppercase tracking-tight">
            Dirección de Residencia
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label htmlFor={`${fieldId}-direccion`} className="gri-field-label">
              Dirección (Calle, número, depto) <span className="text-destructive">*</span>
            </label>
            <Input
              id={`${fieldId}-direccion`}
              autoComplete="street-address"
              value={data.direccion}
              onChange={(e) => update({ direccion: e.target.value })}
              className="h-11"
              placeholder="Av. Las Condes 1234, Of 501"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={`${fieldId}-zip`} className="gri-field-label">Código Postal</label>
            <Input
              id={`${fieldId}-zip`}
              autoComplete="postal-code"
              value={data.zip}
              onChange={(e) => update({ zip: e.target.value })}
              className="h-11"
              placeholder="1234567"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor={`${fieldId}-ciudad`} className="gri-field-label">
              Ciudad <span className="text-destructive">*</span>
            </label>
            <Input
              id={`${fieldId}-ciudad`}
              autoComplete="address-level2"
              value={data.ciudad}
              onChange={(e) => update({ ciudad: e.target.value })}
              className="h-11"
              placeholder="Santiago"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={`${fieldId}-residencia-pais`} className="gri-field-label">
              País de Residencia <span className="text-destructive">*</span>
            </label>
            <select
              id={`${fieldId}-residencia-pais`}
              value={data.residenciaPais}
              onChange={(e) => update({ residenciaPais: e.target.value })}
              className={selectClassName}
            >
              <option value="Chile">Chile</option>
              <option value="Argentina">Argentina</option>
              <option value="España">España</option>
              <option value="USA">USA</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
