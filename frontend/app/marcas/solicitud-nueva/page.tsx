import type { Metadata } from 'next'
import Link from 'next/link'
import { FileEdit, CreditCard, LogIn, Newspaper, Save } from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import {
  PortalBulletList,
  PortalMain,
  PortalSectionTitle,
  PortalSidebarLayout,
} from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Solicitud nueva de marca — INAPI',
  description: 'Inicia tu solicitud de registro de marca en línea. Requiere ClaveÚnica y pago electrónico.',
}

const sidebar = [
  { href: '/marcas/solicitud-nueva', label: 'Solicitud nueva', active: true },
  { href: '#', label: 'Renovación' },
  { href: '#', label: 'Anotación' },
  { href: '#', label: 'Títulos y certificados' },
  { href: '#', label: 'Recursos para usuarios' },
  { href: '#', label: 'Formularios descargables' },
]

const steps = [
  {
    num: 1,
    title: 'Datos del titular',
    body: 'Registras quién solicita la marca y, si aplica, un representante o derecho de prioridad.',
  },
  {
    num: 2,
    title: 'Chequeo de marcas',
    body: 'Revisas si existe una marca parecida para reducir el riesgo de rechazo.',
  },
  {
    num: 3,
    title: 'Descripción de la marca',
    body: 'Describes tu marca y el asistente sugiere las clases que le corresponden.',
  },
  {
    num: 4,
    title: 'Revisión y pago',
    body: 'Revisas el resumen y pagas la tasa por cada clase seleccionada.',
  },
]

const otrosAccesos = [
  { href: '#', label: 'Revisar y pagar solicitudes guardadas', icon: Save },
  { href: '#', label: 'Pagar la publicación en el Diario Oficial', icon: Newspaper },
  { href: '#', label: 'Pagar la tasa de concesión final (pizarra de pagos)', icon: CreditCard },
  { href: '#', label: 'Presentar un escrito en una solicitud existente', icon: FileEdit },
]

export default function SolicitudNuevaMarcaPage() {
  return (
    <PortalShell {...portalShellProps('/marcas/solicitud-nueva')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalSidebarLayout sidebar={sidebar}>
            <section className="bg-inapi-cta text-gob-text-inverse rounded-gob-md p-gob-6 flex flex-wrap items-center justify-between gap-gob-5 mb-gob-8">
              <div className="max-w-lg">
                <h2 className="font-heading text-xl font-medium mb-gob-2">Inicia tu solicitud de marca</h2>
                <p className="text-gri-body-sm text-gob-text-inverse/90 leading-relaxed">
                  Necesitas iniciar sesión con ClaveÚnica. El pago se realiza en línea al final del trámite.
                </p>
              </div>
              <Link
                href="/solicitud"
                className="inline-flex items-center gap-gob-2 bg-background text-inapi-cta px-gob-6 py-gob-3 font-bold text-gri-body-sm hover:bg-gob-surface-elevated transition-colors shrink-0"
              >
                <LogIn className="w-5 h-5" aria-hidden />
                Iniciar solicitud de marca
              </Link>
            </section>

            <section className="mb-gob-8">
              <PortalSectionTitle>Qué necesitas antes de empezar</PortalSectionTitle>
              <p className="text-gri-body text-muted-foreground leading-relaxed mb-gob-4 max-w-3xl">
                Ten a mano estos datos para completar el trámite sin interrupciones:
              </p>
              <PortalBulletList
                items={[
                  <>Tus datos como titular (persona natural o empresa).</>,
                  <>La marca que quieres registrar: nombre, logo o frase.</>,
                  <>Los productos o servicios que ofreces, para elegir las clases.</>,
                  <>Un medio de pago para la tasa inicial.</>,
                ]}
              />
            </section>

            <section className="mb-gob-8">
              <PortalSectionTitle>El asistente tiene cuatro pasos</PortalSectionTitle>
              <ol className="grid min-[600px]:grid-cols-2 gap-gob-4 max-w-4xl list-none">
                {steps.map(step => (
                  <li key={step.num} className="bg-gob-surface-elevated rounded-gob-md p-gob-5">
                    <span
                      aria-hidden
                      className="inline-flex w-8 h-8 rounded-full bg-inapi-cta text-gob-text-inverse items-center justify-center font-bold text-gri-body-sm mb-gob-2"
                    >
                      {step.num}
                    </span>
                    <h3 className="font-bold text-gob-text mb-1">{step.title}</h3>
                    <p className="text-gri-body-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <PortalSectionTitle>Otros accesos</PortalSectionTitle>
              <ul className="list-none space-y-gob-3 max-w-3xl">
                {otrosAccesos.map(item => {
                  const Icon = item.icon
                  return (
                    <li key={item.label} className="flex items-center gap-gob-3">
                      <Icon className="w-5 h-5 text-gob-link shrink-0" aria-hidden />
                      <Link href={item.href} className="text-gri-body text-gob-link hover:text-gob-primary-dark font-medium">
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          </PortalSidebarLayout>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
