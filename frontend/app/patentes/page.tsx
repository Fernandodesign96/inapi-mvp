import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AppWindow,
  Award,
  Bell,
  Bolt,
  CreditCard,
  Factory,
  FileText,
  Headphones,
  Lightbulb,
  NotebookPen,
  Search,
  Sparkles,
} from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import {
  PortalBulletList,
  PortalFeeTable,
  PortalInfoGrid,
  PortalLinkList,
  PortalMain,
  PortalProse,
  PortalQuickAccessGrid,
  PortalSectionTitle,
  PortalTramiteGrid,
} from '@/components/portal/content'

export const metadata: Metadata = {
  title: 'Patentes — INAPI',
  description:
    'Registra una patente para proteger un invento y obtener el derecho exclusivo a usarlo y explotarlo.',
}

const requisitos = [
  { icon: Sparkles, title: 'Ser nuevo', body: 'No existe antes en ninguna parte del mundo.' },
  { icon: Lightbulb, title: 'Tener nivel inventivo', body: 'No resulta obvio para alguien del rubro.' },
  { icon: Factory, title: 'Aplicarse en la industria', body: 'Se puede fabricar o usar en alguna actividad.' },
]

export default function PatentesPage() {
  return (
    <PortalShell
      variant="page"
      active="patentes"
      pageTitle="Patentes"
      pageSubtitle="Registra una patente para proteger un invento y obtener el derecho exclusivo a usarlo y explotarlo. Aquí encuentras qué es una patente, qué requisitos cumple, cuánto cuesta y dónde iniciar tu trámite."
      breadcrumbs={[{ label: 'Patentes' }]}
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalQuickAccessGrid
            items={[
              {
                href: '#tramites',
                title: 'Registrar una patente',
                description: 'Ingresa tu solicitud y paga en línea.',
                icon: AppWindow,
                variant: 'primary',
              },
              {
                href: '/buscar',
                title: 'Buscar patentes existentes',
                description: 'Revisa si tu invento ya fue solicitado antes.',
                icon: Search,
              },
              {
                href: '#tasas',
                title: 'Conocer las tarifas',
                description: 'Revisa cuánto pagas en cada etapa del trámite.',
                icon: CreditCard,
              },
            ]}
          />

          <section>
            <PortalSectionTitle>¿Qué es una patente?</PortalSectionTitle>
            <PortalProse className="mb-gob-3">
              Una patente es un <strong className="text-gob-text">derecho exclusivo</strong> que el Estado otorga sobre un invento. Con ella, decides quién puede fabricar, usar o vender tu invención en Chile.
            </PortalProse>
            <PortalProse>
              La protección dura hasta 20 años desde que presentas la solicitud. A cambio, publicas cómo funciona tu invento, para que aporte al conocimiento.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>¿Qué ganas al registrar una patente?</PortalSectionTitle>
            <PortalBulletList
              items={[
                <>Explotar tu invento en forma <strong className="text-gob-text">exclusiva</strong> durante el plazo de protección.</>,
                <>Vender la patente o autorizar su uso mediante una licencia.</>,
                <>Atraer inversión y financiamiento con un activo protegido.</>,
                <>Impedir que otros fabriquen o vendan tu invento sin permiso.</>,
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>¿Qué requisitos cumple un invento?</PortalSectionTitle>
            <PortalProse className="mb-gob-5">
              Para obtener una patente, tu invento cumple <strong className="text-gob-text">tres requisitos</strong>:
            </PortalProse>
            <div className="grid min-[600px]:grid-cols-3 gap-gob-4 max-w-4xl">
              {requisitos.map(r => {
                const Icon = r.icon
                return (
                  <div key={r.title} className="bg-gob-surface-elevated rounded-gob-md p-gob-5">
                    <Icon className="w-8 h-8 text-inapi-cta mb-gob-3" aria-hidden />
                    <h3 className="font-bold text-gob-text mb-1">{r.title}</h3>
                    <p className="text-gri-body-sm text-muted-foreground leading-relaxed">{r.body}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <section id="tasas">
            <PortalSectionTitle>¿Cuánto cuesta registrar una patente?</PortalSectionTitle>
            <PortalProse className="mb-gob-4">
              Pagas en <strong className="text-gob-text">distintas etapas</strong> del trámite. Los valores se expresan en Unidad Tributaria Mensual (UTM) y cambian según el tipo de derecho.
            </PortalProse>
            <PortalFeeTable
              caption="Valores referenciales de patente de invención, vigentes a 2026."
              headers={['Etapa', 'Valor']}
              rows={[
                ['Al presentar la solicitud', '1 UTM'],
                ['Al aprobarse (primer decenio)', '4 UTM'],
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>Tipos de patente</PortalSectionTitle>
            <PortalInfoGrid
              items={[
                { title: 'Invención', body: 'Un producto o procedimiento nuevo que resuelve un problema técnico.' },
                { title: 'Modelo de utilidad', body: 'Una mejora en la forma o disposición de un objeto que aporta una ventaja.' },
                { title: 'Diseño industrial', body: 'La apariencia particular de un producto: su forma, líneas o colores.' },
                { title: 'Esquema de trazado de circuitos', body: 'La disposición de los elementos de un circuito integrado.' },
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>Herramientas y guías</PortalSectionTitle>
            <PortalLinkList
              links={[
                { href: '/buscar', label: 'Buscar patentes en la base de datos', icon: Search },
                { href: '/notificaciones-diarias', label: 'Revisar las notificaciones diarias de patentes', icon: Bell },
                { href: '#', label: 'Conocer el trámite acelerado de patentes verdes (PAPV)', icon: Bolt },
                { href: '#', label: 'Descargar la guía global PPH en español (PDF, 890 KB)', icon: FileText },
              ]}
            />
          </section>

          <section id="tramites">
            <PortalSectionTitle>Trámites de patentes</PortalSectionTitle>
            <PortalTramiteGrid
              items={[
                { href: '/auth', title: 'Tramitar una patente', icon: NotebookPen },
                { href: '#', title: 'Pedir títulos y certificados', icon: Award },
                { href: '/contacto', title: 'Usar los recursos para usuarios', icon: Headphones },
              ]}
            />
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
