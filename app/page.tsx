import Link from 'next/link'
import {
  BadgeCheck,
  ShieldCheck,
  Clock,
  Lightbulb,
  Search,
  Tags,
  Send,
  CheckCircle,
  Info,
  ArrowRight,
  MessageCircle,
} from 'lucide-react'
import { HeaderINAPI } from '@/components/layout/HeaderINAPI'
import { FooterINAPI } from '@/components/layout/FooterINAPI'
import { ChatFAB } from '@/components/layout/ChatFAB'

const cards = [
  {
    icon: BadgeCheck,
    titulo: '¿Qué es una marca?',
    texto:
      'Una marca es el signo que distingue tus productos o servicios de los de otros. Puede ser una palabra, un logo, una combinación de ambos o incluso un sonido.',
  },
  {
    icon: ShieldCheck,
    titulo: '¿Cómo se protege?',
    texto:
      'Al registrar tu marca en INAPI, obtienes derechos exclusivos de uso en Chile por 10 años renovables. Sin registro, no tienes protección legal frente a terceros que usen un signo similar.',
  },
  {
    icon: Clock,
    titulo: '¿Cuánto tiempo toma?',
    texto:
      'El proceso completo toma entre 6 y 8 meses desde que presentas tu solicitud. Durante ese tiempo, INAPI examina tu marca, la publica y —si no hay oposiciones— la registra.',
  },
]

const pasos = [
  {
    num: 1,
    icon: Lightbulb,
    titulo: '¿Puedo registrar mi marca?',
    desc: 'No todas las denominaciones son registrables. Antes de invertir tiempo y dinero, verifica que tu marca sea distintiva, no descriptiva y no esté prohibida por la ley.',
  },
  {
    num: 2,
    icon: Search,
    titulo: 'Busca si tu marca ya existe',
    desc: 'Nuestro sistema compara tu marca con todas las ya registradas en INAPI. Si hay similitudes importantes, te avisamos antes de que pagues — para que puedas ajustar tu propuesta.',
  },
  {
    num: 3,
    icon: Tags,
    titulo: 'Elige qué protege tu marca (Clases de Niza)',
    desc: 'Tu marca protege productos o servicios específicos, organizados en categorías llamadas \'Clases de Niza\'. Nosotros te ayudamos a encontrar la correcta según lo que vendes o haces.',
  },
  {
    num: 4,
    icon: Send,
    titulo: 'Presenta tu solicitud y paga',
    desc: 'Una vez completado el formulario, presentas tu solicitud pagando la tasa de registro. El costo base es de ~$70.000 CLP por clase (varía según UTM vigente).',
  },
  {
    num: 5,
    icon: CheckCircle,
    titulo: 'Seguimiento y registro final',
    desc: 'INAPI publica tu solicitud en el Diario Oficial. Si no hay oposiciones en 30 días hábiles, se emite el certificado de registro. El proceso total toma entre 6 y 8 meses.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <HeaderINAPI />

      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1A56DB] to-[#1E3A8A] text-white">
          {/* Patrón geométrico */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative max-w-4xl mx-auto px-4 py-20 sm:py-28 text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/80">
              Portal Oficial · INAPI Chile
            </div>
            <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tighter">
              Registra tu marca con seguridad<br className="hidden sm:block" /> y sin complicaciones
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
              El portal oficial de INAPI te guía paso a paso para proteger el nombre, logo o símbolo
              que identifica tu negocio en Chile.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/auth"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-white text-[#1A56DB] font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all text-base"
              >
                Comenzar mi registro
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#proceso"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-base"
              >
                Ver cómo funciona
              </a>
            </div>
            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center pt-4 text-center">
              {[
                { valor: '+50.000', label: 'marcas registradas al año' },
                { valor: '6–8 meses', label: 'tiempo promedio del proceso' },
                { valor: '10 años', label: 'de protección renovable' },
              ].map(s => (
                <div key={s.label} className="space-y-0.5">
                  <p className="text-2xl font-black text-white">{s.valor}</p>
                  <p className="text-xs text-white/60 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOVE THE FOLD — 3 cards ── */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tighter">
              ¿Qué necesitas saber antes de empezar?
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {cards.map(({ icon: Icon, titulo, texto }) => (
              <div
                key={titulo}
                className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-4 hover:shadow-lg hover:border-[#1A56DB]/20 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1A56DB]/10 flex items-center justify-center group-hover:bg-[#1A56DB]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#1A56DB]" />
                </div>
                <h3 className="font-black text-[#111827] text-base">{titulo}</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed">{texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROCESO PASO A PASO ── */}
        <section id="proceso" className="bg-white border-y border-[#E5E7EB]">
          <div className="max-w-3xl mx-auto px-4 py-16 space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tighter">
                El proceso de registro, paso a paso
              </h2>
              <p className="text-[#4B5563]">
                Antes de empezar, conoce exactamente qué vas a hacer y cuánto te va a costar.
              </p>
            </div>

            {/* Pasos verticales */}
            <div className="space-y-0">
              {pasos.map(({ num, icon: Icon, titulo, desc }, i) => (
                <div key={num} className="flex gap-5 group">
                  {/* Línea + círculo */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-[#1A56DB] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#1A56DB]/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    {i < pasos.length - 1 && (
                      <div className="w-px flex-1 bg-[#E5E7EB] my-2" />
                    )}
                  </div>
                  {/* Contenido */}
                  <div className={`pb-8 space-y-1.5 ${i === pasos.length - 1 ? '' : ''}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">
                        Paso {num}
                      </span>
                    </div>
                    <h3 className="font-black text-[#111827] text-base leading-snug">{titulo}</h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Box de costos */}
            <div className="bg-[#F3F4F6] border border-[#E5E7EB] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-[#1A56DB] shrink-0" />
                <h3 className="font-black text-[#111827]">¿Cuánto voy a pagar en total?</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#4B5563]">
                <li className="flex items-start gap-2">
                  <span className="text-[#1A56DB] font-black mt-0.5">•</span>
                  <span><strong className="text-[#111827]">Tasa de solicitud:</strong> ~$70.000 CLP por clase de Niza</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1A56DB] font-black mt-0.5">•</span>
                  <span><strong className="text-[#111827]">Publicación en Diario Oficial:</strong> costo adicional cobrado por INAPI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#1A56DB] font-black mt-0.5">•</span>
                  <span><strong className="text-[#111827]">Arancel de registro:</strong> costo final al emitirse el certificado</span>
                </li>
              </ul>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Los montos exactos se calculan en UTM y pueden variar. Te mostraremos el total
                actualizado antes de que confirmes el pago.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-[#1A56DB]">
          <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
              ¿Listo para proteger tu marca?
            </h2>
            <p className="text-white/80 text-base">
              Completa el formulario guiado en menos de 15 minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/auth"
                className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-white text-[#1A56DB] font-black rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all text-base"
              >
                Comenzar mi registro
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 h-14 px-8 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-base">
                <MessageCircle className="w-5 h-5" />
                Tengo dudas — hablar con un ejecutivo
              </button>
            </div>
          </div>
        </section>
      </main>

      <FooterINAPI />
      <ChatFAB />
    </div>
  )
}