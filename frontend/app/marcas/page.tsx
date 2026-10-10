import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AppWindow,
  Award,
  Bell,
  Clock,
  CreditCard,
  Layers,
  NotebookPen,
  Pencil,
  RefreshCw,
  Search,
} from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { GlosarioTerm } from '@/components/GlosarioTerm'
import { PortalStat } from '@/components/portal/PortalStat'
import { PortalPdfLink } from '@/components/portal/PortalPdfLink'
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
      pageSubtitle="Una marca identifica lo que ofreces. En esta página ves qué es, quién puede pedirla, qué necesitas, cuánto cuesta, cuánto demora y cómo seguir el trámite."
      breadcrumbs={[{ label: 'Marcas' }]}
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <div className="grid min-[600px]:grid-cols-3 gap-gob-4 mb-gob-6">
            <PortalStat icon={CreditCard} value="1 UTM" label="Tasa de presentación por cada clase." />
            <PortalStat icon={Clock} value="6 a 8 meses" label="Plazo habitual si no hay oposiciones." />
            <PortalStat icon={Layers} value="3 etapas" label="Presentación, publicación y examen." />
          </div>
          <PortalQuickAccessGrid
            items={[
              {
                href: '/marcas/solicitud-nueva',
                title: 'Ingresar una solicitud de marca',
                description: 'Completa el formulario en línea y paga las tasas.',
                icon: AppWindow,
                variant: 'primary',
              },
              {
                href: '/marcas/buscador-similitud',
                title: 'Buscador de marcas',
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
            <PortalSectionTitle>¿Quién puede pedir el registro?</PortalSectionTitle>
            <PortalProse>
              Puede pedir el registro una persona o una empresa, con o sin{' '}
              <GlosarioTerm termino="Representante">representante</GlosarioTerm>. Debes identificar al titular y, si aplica, a quien tramita en su nombre.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>¿Qué necesitas?</PortalSectionTitle>
            <PortalBulletList
              items={[
                <>El signo que quieres proteger (palabra, logo o ambos).</>,
                <>
                  Las clases de <GlosarioTerm termino="Niza">Niza</GlosarioTerm> de tus productos o servicios.
                </>,
                <>ClaveÚnica o clave INAPI para ingresar la solicitud.</>,
                <>Pagar la tasa de presentación en <GlosarioTerm termino="UTM">UTM</GlosarioTerm>.</>,
              ]}
            />
          </section>

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
              <Link href="/marcas/buscador-similitud" className="font-bold text-gob-link hover:text-gob-link-hover">
                Buscador de marcas antes de solicitar
              </Link>{' '}
              para reducir el riesgo de rechazo.
            </p>
          </section>

          <section id="tasas">
            <PortalSectionTitle>¿Cuánto cuesta registrar una marca?</PortalSectionTitle>
            <PortalProse className="mb-gob-4">
              Pagas en <strong className="text-gob-text">dos momentos</strong> y por cada clase de productos o servicios que elijas. Los valores se expresan en <GlosarioTerm termino="UTM">UTM</GlosarioTerm>.
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
                { href: '/marcas/buscadores', label: 'Buscador de marcas', icon: Search },
                { href: '/notificaciones-diarias', label: 'Notificaciones INAPI de marcas', icon: Bell },
                { href: '/marcas/como-registrar', label: 'Leer cómo registrar una marca, paso a paso', icon: Layers },
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>Trámites de marcas</PortalSectionTitle>
            <PortalTramiteGrid
              items={[
                { href: '/marcas/solicitud-nueva', title: 'Ingresar una solicitud nueva', icon: NotebookPen },
                { href: '/tramites', title: 'Renovar un registro', icon: RefreshCw },
                { href: '/tramites', title: 'Anotar un cambio', icon: Pencil },
                { href: '/tramites', title: 'Pedir títulos y certificados', icon: Award },
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>¿Qué pasa después?</PortalSectionTitle>
            <PortalProse>
              Tras presentar, INAPI revisa la forma, publica la solicitud y abre el plazo de{' '}
              <GlosarioTerm termino="Oposición">oposición</GlosarioTerm>. Si no hay oposiciones y el examen de fondo es favorable, pagas la tasa de registro y recibes el certificado.
            </PortalProse>
            <PortalPdfLink
              className="mt-gob-4"
              href="/marcas/como-registrar"
              title="Guía para registrar una marca 2026"
              size="1,2 MB"
              description="Resume etapas, tasas y documentos. Es una guía de lectura, no reemplaza el formulario en línea."
            />
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
