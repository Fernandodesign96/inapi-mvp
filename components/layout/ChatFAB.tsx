'use client'

import { useState } from 'react'
import { MessageCircle, X, ArrowLeft, User, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type ChatState = 'idle' | 'welcome' | 'form' | 'chatting'

export function ChatFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatState, setChatState] = useState<ChatState>('welcome')
  const [formData, setFormData] = useState({ nombre: '', apellido: '', email: 'fernandodesign96@gmail.com' })

  const toggleChat = () => setIsOpen(!isOpen)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[380px] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="bg-[#0033A0] p-6 text-white relative">
            {chatState === 'form' && (
              <button 
                onClick={() => setChatState('welcome')}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            
            <div className="flex flex-col items-center gap-3 mt-2">
              <div className="bg-white p-1 rounded-full w-12 h-12 flex items-center justify-center overflow-hidden">
                <Image src="/inapi-mvp/inapi-logo.png" alt="INAPI" width={40} height={20} className="object-contain" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter">Chat INAPI</h3>
              {chatState === 'welcome' && (
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest text-center">
                  Por favor, realice su consulta
                </p>
              )}
              {chatState === 'form' && (
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest text-center">
                  Chatee con nosotros ahora
                </p>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
            {chatState === 'welcome' && (
              <div className="space-y-4">
                <button 
                  onClick={() => setChatState('form')}
                  className="w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:border-primary/50 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                       <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase">Chat INAPI</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Bienvenido al Chat de...</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </button>
                <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest">Atención de Lunes a Viernes 09:00 - 14:00</p>
              </div>
            )}

            {chatState === 'form' && (
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-xl border border-slate-100 text-[11px] leading-relaxed text-slate-600 font-medium">
                   Bienvenido al Chat de INAPI, por favor realice su consulta y una ejecutiva lo atenderá.
                   <div className="text-[9px] text-slate-400 mt-2 text-right">04:48 PM</div>
                </div>

                <div className="space-y-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm transition-all focus-within:shadow-md">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">Nombre</label>
                     <Input 
                       placeholder="Escriba su nombre" 
                       className="h-11 rounded-xl bg-slate-50 border-slate-200"
                       value={formData.nombre}
                       onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">Apellido *</label>
                     <Input 
                       placeholder="Escriba su apellido" 
                       className="h-11 rounded-xl bg-slate-50 border-slate-200"
                       value={formData.apellido}
                       onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-slate-400">Dirección de correo electrónico *</label>
                     <Input 
                       placeholder="email@example.com" 
                       className="h-11 rounded-xl bg-slate-50 border-slate-200"
                       value={formData.email}
                       onChange={(e) => setFormData({...formData, email: e.target.value})}
                     />
                   </div>
                   <Button 
                     onClick={() => setChatState('welcome')}
                     className="w-full h-12 bg-primary hover:bg-primary-dark text-white rounded-xl font-black uppercase tracking-widest mt-4 shadow-lg shadow-primary/20"
                   >
                     Listo
                   </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer (Navigation) */}
          <div className="border-t border-slate-100 p-4 bg-white flex justify-around">
            <button className="flex flex-col items-center gap-1 group">
               <div className="p-2 rounded-full group-hover:bg-slate-50 transition-colors">
                 <User className="w-5 h-5 text-slate-400" />
               </div>
               <span className="text-[10px] font-black uppercase text-slate-400">Inicio</span>
            </button>
            <button className="flex flex-col items-center gap-1 group">
               <div className="p-2 rounded-full group-hover:bg-slate-50 transition-colors">
                 <MessageCircle className="w-5 h-5 text-primary" />
               </div>
               <span className="text-[10px] font-black uppercase text-primary">Conversación</span>
               <div className="w-4 h-0.5 bg-primary rounded-full mt-1" />
            </button>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button 
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all transform active:scale-95 ${isOpen ? 'bg-[#EE3124] rotate-90' : 'bg-[#0033A0] hover:scale-110'}`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white" />
        )}
      </button>
    </div>
  )
}
