'use client'

import { useState } from 'react'
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

export function FormPersona({ initialData, onChange, title }: Props) {
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

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {title && <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase border-l-4 border-primary pl-4">{title}</h3>}

      {/* Tipo de Persona Toggle */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => update({ tipo: 'natural' })}
          className={cn(
            "flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all gap-2",
            data.tipo === 'natural' 
              ? "border-primary bg-primary/5 shadow-xl shadow-primary/5 ring-4 ring-primary/5" 
              : "border-slate-100 hover:border-slate-200 bg-white"
          )}
        >
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", data.tipo === 'natural' ? "bg-primary text-white" : "bg-slate-50 text-slate-400")}>
            <User className="w-6 h-6" />
          </div>
          <span className={cn("font-bold text-sm uppercase tracking-tight", data.tipo === 'natural' ? "text-primary" : "text-slate-500")}>Persona Natural</span>
        </button>

        <button
          onClick={() => update({ tipo: 'juridica' })}
          className={cn(
            "flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all gap-2",
            data.tipo === 'juridica' 
              ? "border-primary bg-primary/5 shadow-xl shadow-primary/5 ring-4 ring-primary/5" 
              : "border-slate-100 hover:border-slate-200 bg-white"
          )}
        >
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", data.tipo === 'juridica' ? "bg-primary text-white" : "bg-slate-50 text-slate-400")}>
            <Building2 className="w-6 h-6" />
          </div>
          <span className={cn("font-bold text-sm uppercase tracking-tight", data.tipo === 'juridica' ? "text-primary" : "text-slate-500")}>Persona Jurídica</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Identidad */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
               <Globe className="w-3 h-3" /> País Nacionalidad <span className="text-red-500">*</span>
            </label>
            <select 
              value={data.pais} 
              onChange={(e) => update({ pais: e.target.value })}
              className="w-full h-12 px-3 border border-slate-200 rounded-md bg-white text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
            >
              <option value="Chile">Chile</option>
              <option value="Argentina">Argentina</option>
              <option value="España">España</option>
              <option value="USA">USA</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest">
               {isChile ? 'RUN (con puntos y guión)' : 'ID / Passport'} <span className="text-red-500">*</span>
            </label>
            <Input 
              value={data.rut}
              onChange={(e) => update({ rut: e.target.value })}
              className={cn(
                "h-12 border-slate-200 focus:ring-primary transition-all",
                isChile && data.rut && !validarRUT(data.rut) && "border-red-300 bg-red-50 ring-2 ring-red-100"
              )}
              placeholder={isChile ? "12.345.678-9" : "ID Number"}
            />
            {isChile && data.rut && !validarRUT(data.rut) && (
              <p className="text-[10px] text-red-500 font-bold uppercase animate-pulse">RUT Inválido</p>
            )}
          </div>
        </div>

        {/* Nombres */}
        <div className="space-y-4">
          {data.tipo === 'natural' ? (
            <>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Nombre <span className="text-red-500">*</span></label>
                <Input value={data.nombre} onChange={(e) => update({ nombre: e.target.value })} className="h-12 border-slate-200 focus:ring-primary" placeholder="Juan" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Apellidos <span className="text-red-500">*</span></label>
                <Input value={data.apellido} onChange={(e) => update({ apellido: e.target.value })} className="h-12 border-slate-200 focus:ring-primary" placeholder="Pérez González" />
              </div>
            </>
          ) : (
            <div className="space-y-2 h-full flex flex-col justify-end">
              <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Razón Social <span className="text-red-500">*</span></label>
              <Input value={data.razonSocial} onChange={(e) => update({ razonSocial: e.target.value })} className="h-12 border-slate-200 focus:ring-primary" placeholder="Empresa de Ejemplo SpA" />
              <p className="text-[10px] text-slate-400 mt-1">Nombre formal registrado ante el SII o institución equivalente.</p>
            </div>
          )}
        </div>
      </div>

      {/* Contacto */}
      <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6 shadow-inner">
        <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200 pb-4">
           <Mail className="w-5 h-5 text-primary" />
           <span className="text-sm font-black uppercase tracking-tight">Datos de Contacto Electrónico</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Correo Electrónico <span className="text-red-500">*</span></label>
            <Input type="email" value={data.correo} onChange={(e) => update({ correo: e.target.value })} className="h-12 bg-white border-slate-200 focus:ring-primary" placeholder="ejemplo@correo.cl" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Repetir Correo <span className="text-red-500">*</span></label>
            <Input 
              type="email" 
              value={correoConfirm} 
              onChange={(e) => setCorreoConfirm(e.target.value)} 
              className={cn("h-12 bg-white border-slate-200 focus:ring-primary", correoConfirm && data.correo !== correoConfirm && "border-red-300 bg-red-50 ring-2 ring-red-100")} 
              placeholder="Confirmar correo"
            />
            {correoConfirm && data.correo !== correoConfirm && (
              <p className="text-[10px] text-red-500 font-bold uppercase">Los correos no coinciden</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
           <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                 <Phone className="w-3 h-3" /> Número de Teléfono <span className="text-red-500">*</span>
              </label>
              <Input value={data.telefono} onChange={(e) => update({ telefono: e.target.value })} className="h-12 bg-white border-slate-200 focus:ring-primary" placeholder="+56 9 1234 5678" />
           </div>
           <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Género (Opcional)</label>
              <select 
                value={data.genero} 
                onChange={(e) => update({ genero: e.target.value })}
                className="w-full h-12 px-3 border border-slate-200 rounded-md bg-white text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
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
        <div className="flex items-center gap-2 text-slate-900 border-b border-slate-100 pb-2">
           <MapPin className="w-5 h-5 text-primary" />
           <span className="text-sm font-black uppercase tracking-tight">Dirección de Residencia</span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
           <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Dirección (Calle, número, depto) <span className="text-red-500">*</span></label>
              <Input value={data.direccion} onChange={(e) => update({ direccion: e.target.value })} className="h-12 border-slate-200 focus:ring-primary" placeholder="Av. Las Condes 1234, Of 501" />
           </div>
           <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Código Postal</label>
              <Input value={data.zip} onChange={(e) => update({ zip: e.target.value })} className="h-12 border-slate-200 focus:ring-primary" placeholder="1234567" />
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
           <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-widest">Ciudad <span className="text-red-500">*</span></label>
              <Input value={data.ciudad} onChange={(e) => update({ ciudad: e.target.value })} className="h-12 border-slate-200 focus:ring-primary" placeholder="Santiago" />
           </div>
           <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-widest">País de Residencia <span className="text-red-500">*</span></label>
              <select 
                value={data.residenciaPais} 
                onChange={(e) => update({ residenciaPais: e.target.value })}
                className="w-full h-12 px-3 border border-slate-200 rounded-md bg-white text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
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
