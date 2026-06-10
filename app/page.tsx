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
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { SkipLink } from '@/components/layout/SkipLink'

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
    <div className="min-h-screen bg-background flex flex-col">
      <SkipLink />
      <HeaderINAPI />

      <main id="contenido-principal" tabIndex={-1} className="flex-1 outline-none">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-gob-text-inverse">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <ContainerGRI size="desktop" className="relative py-gob-7 min-[600px]:py-gob-8 text-center space-y-gob-5">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-gob-4 py-1.5 text-gri-label font-semibold uppercase tracking-widest text-gob-text-inverse/80">
              Portal Oficial · INAPI Chile
            </div>
            <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tighter">
              Registra tu marca con seguridad<br className="hidden sm:block" /> y sin complicaciones
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gob-text-inverse/80 leading-relaxed">
              El portal oficial de INAPI te guía paso a paso para proteger el nombre, logo o símbolo
              que identifica tu negocio en Chile.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/auth"
                className="inline-flex items-center justify-center gap-2 h-14 px-gob-6 bg-gob-surface text-primary font-black rounded-gob-lg shadow-elevation-04 hover:shadow-elevation-04 hover:scale-[1.02] transition-all text-gri-body"
              >
                Comenzar mi registro
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#proceso"
                className="inline-flex items-center justify-center gap-2 h-14 px-gob-6 border-2 border-white/30 text-gob-text-inverse font-bold rounded-gob-lg hover:bg-white/10 transition-all text-gri-body"
              >
                Ver cómo funciona
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-8 justify-center pt-gob-4 text-center">
              {[
                { valor: '+50.000', label: 'marcas registradas al año' },
                { valor: '6–8 meses', label: 'tiempo promedio del proceso' },
                { valor: '10 años', label: 'de protección renovable' },
              ].map(s => (
                <div key={s.label} className="space-y-0.5">
                  <p className="text-2xl font-black text-gob-text-inverse">{s.valor}</p>
                  <p className="text-gri-label text-gob-text-inverse/60 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </ContainerGRI>
        </section>

        {/* ── ABOVE THE FOLD — 3 cards ── */}
        <section className="py-gob-7">
          <ContainerGRI size="desktop" className="space-y-gob-5">
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl sm:text-3xl font-medium text-gob-text tracking-tight">
                ¿Qué necesitas saber antes de empezar?
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-gob-4">
              {cards.map(({ icon: Icon, titulo, texto }) => (
                <div
                  key={titulo}
                  className="bg-card text-card-foreground rounded-gob-lg border border-gob-border p-gob-5 space-y-gob-4 hover:shadow-elevation-03 hover:border-primary/20 transition-all group"
                >
                  <div className="w-11 h-11 rounded-gob-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gob-text text-gri-body">{titulo}</h3>
                  <p className="text-gri-body-sm text-muted-foreground leading-relaxed">{texto}</p>
                </div>
              ))}
            </div>
          </ContainerGRI>
        </section>

        {/* ── PROCESO PASO A PASO ── */}
        <section id="proceso" className="bg-card border-y border-border">
          <ContainerGRI size="desktop" className="py-gob-7 space-y-gob-6">
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl sm:text-3xl font-medium text-gob-text tracking-tight">
                El proceso de registro, paso a paso
              </h2>
              <p className="text-muted-foreground">
                Antes de empezar, conoce exactamente qué vas a hacer y cuánto te va a costar.
              </p>
            </div>

            <div className="space-y-0">
              {pasos.map(({ num, icon: Icon, titulo, desc }, i) => (
                <div key={num} className="flex gap-gob-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-gob-md bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-elevation-02 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    {i < pasos.length - 1 && (
                      <div className="w-px flex-1 bg-gob-border my-2" />
                    )}
                  </div>
                  <div className="pb-gob-6 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-gri-label font-semibold text-muted-foreground uppercase tracking-widest">
                        Paso {num}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gob-text text-gri-body leading-snug">{titulo}</h3>
                    <p className="text-gri-body-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card text-card-foreground border border-gob-border rounded-gob-lg p-gob-5 space-y-gob-4">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-primary shrink-0" />
                <h3 className="font-semibold text-gob-text">¿Cuánto voy a pagar en total?</h3>
              </div>
              <ul className="space-y-2 text-gri-body-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold mt-0.5">•</span>
                  <span><strong className="text-gob-text">Tasa de solicitud:</strong> ~$70.000 CLP por clase de Niza</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold mt-0.5">•</span>
                  <span><strong className="text-gob-text">Publicación en Diario Oficial:</strong> costo adicional cobrado por INAPI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-semibold mt-0.5">•</span>
                  <span><strong className="text-gob-text">Arancel de registro:</strong> costo final al emitirse el certificado</span>
                </li>
              </ul>
              <p className="text-gri-body-xs text-muted-foreground leading-relaxed">
                Los montos exactos se calculan en UTM y pueden variar. Te mostraremos el total
                actualizado antes de que confirmes el pago.
              </p>
            </div>
          </ContainerGRI>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-primary">
          <ContainerGRI size="desktop" className="py-gob-7 text-center space-y-gob-5">
            <h2 className="font-heading text-2xl sm:text-3xl font-medium text-gob-text-inverse tracking-tight">
              ¿Listo para proteger tu marca?
            </h2>
            <p className="text-gob-text-inverse/80 text-gri-body">
              Completa el formulario guiado en menos de 15 minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/auth"
                className="inline-flex items-center justify-center gap-2 h-14 px-gob-6 bg-gob-surface text-primary font-black rounded-gob-lg shadow-elevation-04 hover:shadow-elevation-04 hover:scale-[1.02] transition-all text-gri-body"
              >
                Comenzar mi registro
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-2 h-14 px-gob-6 border-2 border-white/30 text-gob-text-inverse font-bold rounded-gob-lg hover:bg-white/10 transition-all text-gri-body">
                <MessageCircle className="w-5 h-5" />
                Tengo dudas — hablar con un ejecutivo
              </button>
            </div>
          </ContainerGRI>
        </section>
      </main>

      <FooterINAPI />
      <ChatFAB />
    </div>
  )
}
