import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AppWindow,
  Award,
  Bell,
  CreditCard,
  FileText,
  Layers,
  NotebookPen,
  Pencil,
  RefreshCw,
  Search,
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
  PortalStepList,
  PortalTramiteGrid,
} from '@/components/portal/content'

export const metadata: Metadata = {
  title: 'Marcas — INAPI',
  description:
    'Registra una marca para proteger el nombre, el logo o la frase que identifica lo que ofreces.',
}

export default function MarcasPage() {
  return (
    <PortalShell
      variant="page"
      active="marcas"
      pageTitle="Marcas"
      pageSubtitle="Registra una marca para proteger el nombre, el logo o la frase que identifica lo que ofreces. Aquí encuentras qué es una marca, cómo se registra, cuánto cuesta y dónde iniciar tu trámite."
      breadcrumbs={[{ label: 'Marcas' }]}
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalQuickAccessGrid
            items={[
              {
                href: '/marcas/solicitud-nueva',
                title: 'Registrar una marca',
                description: 'Ingresa tu solicitud y paga en línea.',
                icon: AppWindow,
                variant: 'primary',
              },
              {
                href: '/marcas/buscador-similitud',
                title: 'Buscar marcas anteriores',
                description: 'Compara tu marca con las ya inscritas antes de solicitar.',
                icon: Search,
              },
              {
                href: '#tasas',
                title: 'Conocer las tarifas',
                description: 'Revisa cuánto pagas al solicitar y al obtener el registro.',
                icon: CreditCard,
              },
            ]}
          />

          <section>
            <PortalSectionTitle>¿Qué es una marca?</PortalSectionTitle>
            <PortalProse className="mb-gob-3">
              Una marca es un <strong className="text-gob-text">signo que identifica</strong> tus productos, servicios o tu negocio y los diferencia del resto en el mercado.
            </PortalProse>
            <PortalProse>
              Puede ser una palabra, un logo, una frase, un sonido o una combinación de estos elementos. Al registrarla, obtienes el derecho exclusivo a usarla en Chile por diez años, con opción de renovarla.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>¿Qué ganas al registrar tu marca?</PortalSectionTitle>
            <PortalBulletList
              items={[
                <>Usar tu marca en forma <strong className="text-gob-text">exclusiva</strong> en todo el país.</>,
                <>Impedir que otros registren o usen una marca igual o parecida.</>,
                <>Sumar valor a tu negocio: puedes vender, licenciar o heredar tu marca.</>,
                <>Respaldar tu marca ante la justicia si alguien la copia.</>,
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>¿Cómo se registra una marca?</PortalSectionTitle>
            <PortalProse className="mb-gob-5">
              El registro tiene <strong className="text-gob-text">tres etapas</strong>. En total suele tardar entre 5 y 8 meses si no hay observaciones.
            </PortalProse>
            <PortalStepList
              steps={[
                {
                  num: 1,
                  title: 'Ingresas y revisamos tu solicitud',
                  body: 'Presentas la solicitud en línea y pagas la tasa inicial. INAPI revisa que los datos y documentos estén completos.',
                },
                {
                  num: 2,
                  title: 'Publicamos tu solicitud en el Diario Oficial',
                  body: 'Tu marca se publica para que cualquier persona que se sienta afectada pueda presentar una oposición dentro del plazo legal.',
                },
                {
                  num: 3,
                  title: 'Revisamos el fondo y resolvemos',
                  body: 'INAPI examina si tu marca cumple la ley. Si la aprueba, pagas la tasa final y recibes tu registro.',
                },
              ]}
            />
            <p className="text-gri-body-sm mt-gob-5">
              <Link href="/marcas/buscador-similitud" className="font-bold text-gob-link hover:text-gob-primary-dark">
                Buscar marcas anteriores antes de solicitar
              </Link>{' '}
              para reducir el riesgo de rechazo.
            </p>
          </section>

          <section id="tasas">
            <PortalSectionTitle>¿Cuánto cuesta registrar una marca?</PortalSectionTitle>
            <PortalProse className="mb-gob-4">
              Pagas en <strong className="text-gob-text">dos momentos</strong> y por cada clase de productos o servicios que elijas. Los valores se expresan en Unidad Tributaria Mensual (UTM).
            </PortalProse>
            <PortalFeeTable
              caption="Tarifas por clase, vigentes a 2026."
              headers={['Momento del pago', 'Valor por clase']}
              rows={[
                ['Al presentar la solicitud', '0,4 UTM'],
                ['Al aprobarse el registro', '2 UTM'],
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>Tipos de marca</PortalSectionTitle>
            <PortalInfoGrid
              items={[
                { title: 'Marca comercial', body: 'Identifica productos o servicios de una empresa o persona.' },
                { title: 'Marca colectiva', body: 'Distingue a los miembros de una asociación o gremio.' },
                { title: 'Marca de certificación', body: 'Garantiza que un producto cumple ciertas características o normas.' },
                { title: 'Frase de propaganda', body: 'Protege un eslogan asociado a una marca ya registrada.' },
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>Herramientas para tu marca</PortalSectionTitle>
            <PortalLinkList
              links={[
                { href: '/marcas/buscador-similitud', label: 'Buscar marcas anteriores', icon: Search },
                { href: '/notificaciones-diarias', label: 'Revisar las notificaciones diarias de marcas', icon: Bell },
                { href: '/marcas/como-registrar', label: 'Clasificar tus productos y servicios (Clasificación de Niza, NCL)', icon: Layers },
                { href: '#', label: 'Descargar la guía para registrar una marca (PDF, 1,2 MB)', icon: FileText },
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>Trámites de marcas</PortalSectionTitle>
            <PortalTramiteGrid
              items={[
                { href: '/marcas/solicitud-nueva', title: 'Ingresar una solicitud nueva', icon: NotebookPen },
                { href: '#', title: 'Renovar un registro', icon: RefreshCw },
                { href: '#', title: 'Anotar un cambio', icon: Pencil },
                { href: '#', title: 'Pedir títulos y certificados', icon: Award },
              ]}
            />
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
