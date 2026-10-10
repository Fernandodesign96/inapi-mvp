'use client'

import { useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TabId =
  | 'pirateria'
  | 'riesgos'
  | 'delitos'
  | 'derechos'
  | 'estadisticas'
  | 'denuncia'
  | 'prevenga'

const TABS: { id: TabId; label: string }[] = [
  { id: 'pirateria', label: 'Piratería y falsificación' },
  { id: 'riesgos', label: 'Riesgos' },
  { id: 'delitos', label: 'Delitos' },
  { id: 'derechos', label: 'Tus derechos' },
  { id: 'estadisticas', label: 'Estadísticas' },
  { id: 'denuncia', label: 'Denuncia' },
  { id: 'prevenga', label: 'Prevenga la infracción' },
]

type CrimeRow = { conducta: string; articulo: string; sancion: string }

function CrimeTable({
  caption,
  rows,
}: {
  caption: string
  rows: CrimeRow[]
}) {
  return (
    <div className="overflow-x-auto rounded-gob-md border border-gob-border">
      <table className="w-full min-w-[40rem] text-left text-gri-body-sm border-collapse">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-inapi-portal-hero text-gob-text-inverse">
            <th className="p-gob-3 font-medium">Conducta</th>
            <th className="p-gob-3 font-medium w-[8rem]">Artículo</th>
            <th className="p-gob-3 font-medium w-[14rem]">Sanción</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row.articulo}-${i}`} className={i % 2 ? 'bg-gob-surface-elevated' : 'bg-card'}>
              <td className="p-gob-3 align-top leading-[1.5] text-gob-text">{row.conducta}</td>
              <td className="p-gob-3 align-top text-gob-text">{row.articulo}</td>
              <td className="p-gob-3 align-top text-gob-text">{row.sancion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Accordion({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group rounded-gob-md border border-gob-border bg-card open:shadow-elevation-01">
      <summary className="cursor-pointer list-none px-gob-4 py-gob-3 font-medium text-gob-text bg-inapi-portal-hero text-gob-text-inverse rounded-t-gob-md [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-gob-3">
          {title}
          <span className="text-gri-h2 leading-none group-open:hidden" aria-hidden>
            +
          </span>
          <span className="text-gri-h2 leading-none hidden group-open:inline" aria-hidden>
            −
          </span>
        </span>
      </summary>
      <div className="space-y-gob-4 p-gob-4 text-gri-body leading-[1.5] text-gob-text">{children}</div>
    </details>
  )
}

function Source({ href, label }: { href: string; label: string }) {
  return (
    <p className="text-gri-body-sm text-muted-foreground">
      Fuente:{' '}
      <a href={href} className="text-gob-link hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </p>
  )
}

export function ObservanciaHub() {
  const [active, setActive] = useState<TabId>('pirateria')

  return (
    <div className="space-y-gob-6">
      <div role="tablist" aria-label="Temas de observancia" className="flex flex-wrap gap-gob-2">
        {TABS.map(tab => {
          const selected = tab.id === active
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={cn(
                'inline-flex min-h-11 items-center rounded-full border px-gob-4 py-gob-2 text-gri-body-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                selected
                  ? 'border-gob-primary bg-gob-info-bg text-gob-primary'
                  : 'border-gob-border bg-card text-gob-text hover:border-gob-primary',
              )}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {active === 'pirateria' ? <PirateriaPanel /> : null}
      {active === 'riesgos' ? <RiesgosPanel /> : null}
      {active === 'delitos' ? <DelitosPanel /> : null}
      {active === 'derechos' ? <DerechosPanel /> : null}
      {active === 'estadisticas' ? <EstadisticasPanel /> : null}
      {active === 'denuncia' ? <DenunciaPanel /> : null}
      {active === 'prevenga' ? <PrevengaPanel /> : null}
    </div>
  )
}

function PirateriaPanel() {
  return (
    <div className="space-y-gob-4">
      <Accordion title="¿Qué es la piratería?">
        <p>
          De conformidad al Acuerdo sobre los aspectos de los Derechos de Propiedad Intelectual asociados al
          comercio, ADPIC, se entiende por &quot;mercancías pirata que lesionan el derecho de autor&quot; cualesquiera
          copias hechas sin el consentimiento del titular del derecho o de una persona debidamente autorizada por él
          en el país de producción y que se realicen directa o indirectamente a partir de un artículo cuando la
          realización de esa copia habría constituido infracción del derecho de autor o de un derecho conexo en virtud
          de la legislación del país de importación.
        </p>
        <Source href="https://www.wto.org/spanish/docs_s/legal_s/27-trips.pdf" label="ADPIC, Nota al pie 14 b (PDF)" />
      </Accordion>
      <Accordion title="¿Qué es la falsificación?">
        <p>
          De conformidad al Acuerdo sobre los aspectos de los Derechos de Propiedad Intelectual asociados al
          comercio, ADPIC, se entiende por &quot;mercancías de marca de fábrica o de comercio falsificadas&quot;
          cualesquiera mercancías, incluido su embalaje, que lleven apuesta sin autorización una marca de fábrica o de
          comercio idéntica a la marca válidamente registrada para tales mercancías, o que no pueda distinguirse en sus
          aspectos esenciales de esa marca, y que de ese modo lesione los derechos que al titular de la marca de que se
          trate otorga la legislación del país de importación.
        </p>
        <Source href="https://www.wto.org/spanish/docs_s/legal_s/27-trips.pdf" label="ADPIC, Nota al pie 14 b (PDF)" />
      </Accordion>
      <Accordion title="Infracciones a otros derechos de propiedad intelectual">
        <p>
          Las marcas, los derechos de autor y los derechos conexos no son los únicos derechos que pueden ser objeto de
          estos delitos. Las patentes, modelos de utilidad, esquemas de trazado o topografías de circuitos integrados,
          diseños y dibujos industriales, las indicaciones geográficas y denominaciones de origen también pueden ser
          infringidos. Ante una infracción a estos derechos, el titular puede ejercitar las acciones penales y/o civiles
          previstas en la ley.
        </p>
        <p>
          En el caso de infracción a derechos de propiedad industrial (marcas, patentes, modelos de utilidad, esquemas
          de trazado o topografías de circuitos integrados, diseños y dibujos industriales, las indicaciones geográficas
          y denominaciones de origen), el delito se castigará con penas de multa.
        </p>
        <p>
          En el caso de infracción a derechos de autor y derechos conexos, el delito se castigará con penas de multa,
          pudiendo aplicarse penas de prisión o reclusión en determinados casos.
        </p>
      </Accordion>
    </div>
  )
}

function RiesgosPanel() {
  return (
    <div className="space-y-gob-5">
      <h3 className="font-heading text-gri-h2 font-medium text-gob-text">Consecuencias de comprar productos falsificados</h3>
      <p className="text-gri-body leading-[1.5] text-gob-text">
        Las marcas permiten que quien compre un producto se asegure de su origen y calidad. Además, en caso que existan
        problemas con el producto, la marca ayuda a saber contra quién dirigirse para exigir responsabilidades.
      </p>
      <p className="text-gri-body leading-[1.5] text-gob-text">
        En cambio, al comprar un producto falsificado, no es posible saber por quién fue confeccionado el producto, cuál
        es su calidad o de qué ingredientes o materiales está hecho, por lo que en ciertos casos se puede poner en
        riesgo la salud y seguridad de las personas, tratándose de productos como medicamentos, artículos eléctricos,
        piezas para vehículos motorizados, cosméticos, etc.
      </p>
      <p className="text-gri-body leading-[1.5] text-gob-text">
        Por otra parte, en caso de que el producto tenga fallas o provoque algún daño, no existirá claridad respecto a
        quién exigir responsabilidades o garantía.
      </p>
      <p className="text-gri-body leading-[1.5] text-gob-text">
        Al comprar un producto falsificado, se apoya a quienes cometen delitos contra los derechos de propiedad
        industrial.
      </p>
      <p className="text-gri-body leading-[1.5] text-gob-text">
        Los productores e importadores de productos falsificados al actuar al margen de la ley, son empresas que no
        pagan impuestos al Estado y podrían estar incumpliendo la legislación laboral. De este modo, al comprar un
        producto falsificado se daña no sólo a los legítimos dueños, sino también a la economía del país y a terceros.
      </p>
      <h3 className="font-heading text-gri-h2 font-medium text-gob-text">Cómo distinguir si un producto es falsificado</h3>
      <p className="text-gri-body leading-[1.5] text-gob-text">
        Puede encontrarse productos falsificados en muchos lugares, incluso en el mercado formal, pero especialmente se
        encuentran en:
      </p>
      <ul className="list-disc space-y-gob-2 pl-gob-5 text-gri-body text-gob-text">
        <li>Mercados</li>
        <li>Puestos callejeros</li>
        <li>Internet</li>
      </ul>
    </div>
  )
}

function DelitosPanel() {
  return (
    <div className="space-y-gob-4">
      <p className="text-gri-body leading-[1.5] text-gob-text">
        Los delitos más comunes en contra la propiedad intelectual corresponden, principalmente, a la falsificación de
        marcas y piratería de obras protegidas por derecho de autor.
      </p>
      <Accordion title="Ley 19.039 — marcas, IG y DO">
        <h4 className="font-medium">1.1 Marcas comerciales</h4>
        <CrimeTable
          caption="Tipos penales en relación a marcas comerciales"
          rows={[
            { conducta: 'Los que maliciosamente usen, con fines comerciales, una marca igual o semejante a otra ya inscrita para los mismos productos, servicios o establecimientos o respecto de productos, servicios o establecimientos relacionados con aquellos que comprende la marca registrada. Lo anterior se entenderá sin perjuicio de lo dispuesto en el artículo 19 bis E1.', articulo: '28 letra a)', sancion: 'multa 25 - 1.000 UTM' },
            { conducta: 'Los que usen, con fines comerciales, una marca no inscrita, caducada o anulada, con las indicaciones correspondientes a una marca registrada o simulando aquéllas.', articulo: '28 letra b)', sancion: 'multa 25 - 1.000 UTM' },
            { conducta: 'Los que, con fines comerciales, hagan uso de envases o embalajes que lleven una marca registrada, sin tener derecho a usarla y sin que ésta haya sido previamente borrada, salvo que el embalaje marcado se destine a envasar productos diferentes y no relacionados con los que protege la marca.', articulo: '28 letra c)', sancion: 'multa 25 - 1.000 UTM' },
            { conducta: 'El que falsifique una marca ya registrada para los mismos productos o servicios.', articulo: '28 bis a)', sancion: 'reclusión menor en su grado mínimo a medio.' },
            { conducta: 'El que fabrique, introduzca en el país, tenga para comercializar o comercialice objetos que ostenten falsificaciones de marcas ya registradas para los mismos productos o servicios, con fines de lucro y para su distribución comercial.', articulo: '28 bis a)', sancion: 'reclusión menor en su grado mínimo a medio.' },
            { conducta: 'El que tenga para comercializar o comercialice directamente al público productos o servicios que ostenten falsificaciones de marcas ya registradas para los mismos productos o servicios.', articulo: '28 bis inciso final', sancion: 'reclusión menor en su grado mínimo.' },
          ]}
        />
        <h4 className="font-medium">1.2 Indicaciones geográficas y denominaciones de origen</h4>
        <CrimeTable
          caption="Conductas sancionadas en relación a IG y DO"
          rows={[
            { conducta: 'Los que maliciosamente designen un producto del mismo tipo de los protegidos por una indicación geográfica o denominación de origen registrada, sin tener derecho a hacerlo.', articulo: 'art. 105 letra a)', sancion: 'multa 25-1.000 UTM' },
            { conducta: 'Los que, con fines comerciales, usen las indicaciones correspondientes a una indicación geográfica o denominación de origen no inscrita, caducada o anulada, o las simulen.', articulo: '105 letra b)', sancion: 'multa 25-1.000 UTM' },
            { conducta: 'Los que, con fines comerciales, hagan uso de envases o embalajes que lleven una indicación geográfica o denominación de origen registrada, sin tener derecho a usarla y sin que ésta haya sido previamente borrada, salvo que el embalaje marcado se destine a envasar productos diferentes y no relacionados con los que protege la indicación geográfica o denominación de origen.', articulo: '105 letra c)', sancion: 'multa 25-1.000 UTM' },
          ]}
        />
        <h4 className="font-medium">1.3 Ley 18.455 — productos alcohólicos y DO</h4>
        <CrimeTable
          caption="Falsificación de productos alcohólicos y denominaciones de origen"
          rows={[
            { conducta: 'A los que elaboraren o vendieren productos falsificados que no sean tóxicos o dañinos para la salud.', articulo: '45 1)', sancion: 'multa 1 - 150 UTM' },
            { conducta: 'A los que utilizaren denominaciones de origen en contravención a lo dispuesto en los artículos 27, inciso final, 28 y 30.', articulo: '45 3)', sancion: 'multa 1 - 150 UTM' },
          ]}
        />
        <h4 className="font-medium">1.4 Determinación de las penas (artículo 56 del Código Penal)</h4>
        <div className="overflow-x-auto rounded-gob-md border border-gob-border">
          <table className="w-full min-w-[48rem] text-left text-gri-body-sm">
            <thead>
              <tr className="bg-inapi-portal-hero text-gob-text-inverse">
                <th className="p-gob-3 font-medium">Penas</th>
                <th className="p-gob-3 font-medium">Toda la pena</th>
                <th className="p-gob-3 font-medium">Grado mínimo</th>
                <th className="p-gob-3 font-medium">Grado medio</th>
                <th className="p-gob-3 font-medium">Grado máximo</th>
              </tr>
            </thead>
            <tbody className="text-gob-text">
              <tr>
                <td className="p-gob-3">Presidio, reclusión, confinamiento, extrañamiento y relegación mayores.</td>
                <td className="p-gob-3">De cinco años y un día a veinte años.</td>
                <td className="p-gob-3">De cinco años y un día a diez años.</td>
                <td className="p-gob-3">De diez años y un día a quince años.</td>
                <td className="p-gob-3">De quince años y un día a veinte años.</td>
              </tr>
              <tr className="bg-gob-surface-elevated">
                <td className="p-gob-3">Inhabilitación absoluta y especial temporales.</td>
                <td className="p-gob-3">De tres años y un día a diez años</td>
                <td className="p-gob-3">De tres años y un día a cinco años.</td>
                <td className="p-gob-3">De cinco años y un día a siete años.</td>
                <td className="p-gob-3">De siete años y un día a diez años.</td>
              </tr>
              <tr>
                <td className="p-gob-3">Presidio, reclusión, confinamiento, extrañamiento y relegación menores y destierro.</td>
                <td className="p-gob-3">De sesenta y un días a cinco años.</td>
                <td className="p-gob-3">De sesenta y uno a quinientos cuarenta días.</td>
                <td className="p-gob-3">De quinientos cuarenta y un días a tres años.</td>
                <td className="p-gob-3">De tres años y un día a cinco años.</td>
              </tr>
              <tr className="bg-gob-surface-elevated">
                <td className="p-gob-3">Suspensión de cargo y oficio público y profesión titular.</td>
                <td className="p-gob-3">De sesenta y un días a tres años.</td>
                <td className="p-gob-3">De sesenta y un días a un año.</td>
                <td className="p-gob-3">De un año y un día a dos años.</td>
                <td className="p-gob-3">De dos años y un día a tres años.</td>
              </tr>
              <tr>
                <td className="p-gob-3">Prisión</td>
                <td className="p-gob-3">De uno a sesenta días.</td>
                <td className="p-gob-3">De uno a veinte días.</td>
                <td className="p-gob-3">De veintiuno a cuarenta días.</td>
                <td className="p-gob-3">De cuarenta y uno a sesenta días.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Accordion>
      <Accordion title="Ley 19.039 — patentes, modelos, diseños y esquemas de trazado">
        <h4 className="font-medium">Patentes de invención</h4>
        <CrimeTable
          caption="Conductas sancionadas en relación a patentes"
          rows={[
            { conducta: 'Los que maliciosamente fabriquen, utilicen, ofrezcan o introduzcan en el comercio un invento patentado, o lo importen o estén en posesión del mismo, con fines comerciales. Lo anterior se entenderá sin perjuicio de lo dispuesto en el inciso quinto del artículo 49.', articulo: '52 letra a)', sancion: 'multa 25-1.000 UTM' },
            { conducta: 'Los que, con fines comerciales, usen un objeto no patentado, o cuya patente haya caducado o haya sido anulada, empleando en dicho objeto las indicaciones correspondientes a una patente de invención o simulándolas.', articulo: '52 letra b)', sancion: 'multa 25-1.000 UTM' },
            { conducta: 'Los que maliciosamente, con fines comerciales, hagan uso de un procedimiento patentado.', articulo: '52 letra c)', sancion: 'multa 25-1.000 UTM' },
            { conducta: 'Los que maliciosamente imiten o hagan uso de un invento con solicitud de patente en trámite, a menos de que, en definitiva, la patente no sea concedida.', articulo: '52 letra d)', sancion: 'multa 25-1.000 UTM' },
          ]}
        />
        <h4 className="font-medium">Modelos de utilidad</h4>
        <CrimeTable
          caption="Conductas sancionadas en relación a modelos de utilidad"
          rows={[
            { conducta: 'Los que maliciosamente fabriquen, comercialicen, importen o utilicen, con fines comerciales, un modelo de utilidad registrado. Lo anterior se entenderá sin perjuicio de lo establecido en el inciso quinto del artículo 49.', articulo: '61 letra a)', sancion: 'multa 25-1.000 UTM' },
            { conducta: 'Los que, con fines comerciales, usen las indicaciones correspondientes a un modelo de utilidad cuyo registro haya sido caducado o anulado, y los que, con los mismos fines, las simulen, cuando no exista registro.', articulo: '61 letra b)', sancion: 'multa 25-1.000 UTM' },
          ]}
        />
        <h4 className="font-medium">Dibujos y diseños industriales</h4>
        <CrimeTable
          caption="Conductas sancionadas en relación a dibujos y diseños"
          rows={[
            { conducta: 'Los que maliciosamente fabriquen, comercialicen, importen o utilicen, con fines comerciales, un dibujo o diseño industrial registrado.', articulo: '67 letra a)', sancion: 'multa 25-1.000 UTM' },
            { conducta: 'Los que, con fines comerciales, usen las indicaciones correspondientes a un dibujo o diseño industrial registrado, o las simulen cuando no exista dicho registro o esté caducado o anulado.', articulo: '67 letra b)', sancion: 'multa 25-1.000 UTM' },
          ]}
        />
        <h4 className="font-medium">Esquemas de trazado o topografías de circuitos integrados</h4>
        <CrimeTable
          caption="Conductas sancionadas en relación a esquemas de trazado"
          rows={[
            { conducta: 'Los que maliciosamente fabriquen, comercialicen, importen o utilicen, con fines comerciales, un esquema de trazado o topografía de circuitos integrados registrado.', articulo: '85 letra a)', sancion: 'multa 25-1.000 UTM' },
            { conducta: 'Los que, con fines comerciales y sin tener derecho a hacerlo, usen las indicaciones correspondientes a un esquema de trazado o topografía de circuitos integrados registrado, o las simulen cuando no exista dicho registro o esté caducado o anulado.', articulo: '85 letra b)', sancion: 'multa 25-1.000 UTM' },
          ]}
        />
      </Accordion>
      <Accordion title="Secretos industriales e información confidencial">
        <h4 className="font-medium">6.1 Código Penal — secretos industriales</h4>
        <CrimeTable
          caption="Delitos en contra de los secretos industriales"
          rows={[
            { conducta: 'El que fraudulentamente hubiere comunicado secretos de la fábrica en que ha estado o está empleado.', articulo: '284', sancion: 'Reclusión menor en sus grados mínimo a medio o multa de once a veinte UTM' },
          ]}
        />
        <h4 className="font-medium">6.2 Código Penal — funcionario público</h4>
        <CrimeTable
          caption="Delitos de funcionario público"
          rows={[
            { conducta: 'Privar a otro de la propiedad exclusiva de su descubrimiento o producción, o divulgar los secretos del invento, que hubiere conocido por razón de su empleo.', articulo: '158 Nº 5)', sancion: 'Pena de suspensión de sus grados mínimo a medio, si gozare de renta, y la de reclusión menor en su grado mínimo o multa de once a veinte unidades tributarias mensuales, cuando prestare servicios gratuito' },
            { conducta: 'Sabiendo por razón de su cargo los secretos de un particular, los descubriere con perjuicio de éste.', articulo: '247', sancion: 'Reclusión menor en sus grados mínimo a medio y multa de seis a diez UTM' },
            { conducta: 'Haciendo uso de un secreto o información concreta reservada, de que tenga conocimiento en razón de su cargo, obtuviere un beneficio económico para sí o para un tercero.', articulo: '247 bis)', sancion: 'Reclusión menor en sus grados mínimo a medio y multa del tanto al triplo del beneficio obtenido' },
          ]}
        />
        <h4 className="font-medium">6.3 Código Penal — profesionales</h4>
        <CrimeTable
          caption="Delitos de profesionales"
          rows={[
            { conducta: 'El que hiciere poner sobre objetos fabricados el nombre de un fabricante que no sea autor de tales objetos, o la razón comercial de una fábrica que no sea la de la verdadera fabricación. Mercader, comisionista o vendedor que a sabiendas hubiere puesto en venta o circulación objetos marcados con nombres supuestos o alterados.', articulo: '190', sancion: 'Presidio menor en sus grados mínimo a medio y multa de seis a diez UTM' },
            { conducta: 'Ejerciendo alguna de las profesiones que requieren título, revelen los secretos que por razón de ella se les hubieren confiado.', articulo: '247 inc 2', sancion: 'Reclusión menor en sus grados mínimo a medio y multa de seis a diez UTM' },
          ]}
        />
      </Accordion>
      <Accordion title="Derecho de autor y derechos conexos">
        <h4 className="font-medium">5.1 Ley 17.336 sobre Propiedad Intelectual</h4>
        <CrimeTable
          caption="Conductas sancionadas por la ley 17.336"
          rows={[
            { conducta: 'El que, sin estar expresamente facultado para ello, utilice obras de dominio ajeno protegidas por esta ley, inéditas o publicadas, en cualquiera de las formas o por cualquiera de los medios establecidos en el artículo 18.', articulo: '79 letra a)', sancion: 'Prisión en cualquiera de sus grados a reclusión menor en grado mínimo y multas entre 5 a 1000 UTM, según el perjuicio.' },
            { conducta: 'El que, sin estar expresamente facultado para ello, utilice las interpretaciones, producciones y emisiones protegidas de los titulares de los derechos conexos, con cualquiera de los fines o por cualquiera de los medios establecidos en el Título II.', articulo: '79 letra b)', sancion: 'Prisión en cualquiera de sus grados a reclusión menor en grado mínimo y multas entre 5 a 1000 UTM, según el perjuicio.' },
            { conducta: 'El que falsificare o adulterare una planilla de ejecución.', articulo: '79 letra c)', sancion: 'Prisión en cualquiera de sus grados a reclusión menor en grado mínimo y multas entre 5 a 1000 UTM, según el perjuicio.' },
            { conducta: 'El que falseare datos en las rendiciones de cuentas a que se refiere el artículo 50.', articulo: '79 letra d)', sancion: 'Prisión en cualquiera de sus grados a reclusión menor en grado mínimo y multas entre 5 a 1000 UTM, según el perjuicio.' },
            { conducta: 'El que, careciendo de autorización del titular de los derechos o de la ley, cobrare derechos u otorgase licencias respecto de obras o de interpretaciones o ejecuciones o fonogramas que se encontraren protegidos.', articulo: '79 letra e)', sancion: 'Prisión en cualquiera de sus grados a reclusión menor en grado mínimo y multas entre 5 a 1000 UTM, según el perjuicio.' },
            { conducta: 'El que falsifique obra protegida por esta ley, o el que la edite, reproduzca o distribuya ostentando falsamente el nombre del editor autorizado, suprimiendo o cambiando el nombre del autor o el título de la obra, o alterando maliciosamente su texto.', articulo: '79 bis', sancion: 'Reclusión menor en su grado mínimo y multa entre 10 a 1000 UTM' },
            { conducta: 'El que, a sabiendas, reproduzca, distribuya, ponga a disposición o comunique al público una obra perteneciente al dominio público o al patrimonio cultural común bajo un nombre que no sea el del verdadero autor.', articulo: '80 letra a)', sancion: 'Multa entre 25 a 500 UTM' },
            { conducta: 'El que se atribuyere o reclamare derechos patrimoniales sobre obras de dominio público o del patrimonio cultural común.', articulo: '80 letra b)', sancion: 'Multa entre 25 a 500 UTM' },
            { conducta: 'El que obligado al pago en retribución por la ejecución o comunicación al público de obras protegidas, omitiere la confección de las planillas de ejecución correspondientes.', articulo: '80 letra c)', sancion: 'Multa entre 25 a 500 UTM' },
            { conducta: 'El que tenga para comercializar, comercialice o alquile directamente al público copias de obras, de interpretaciones o de fonogramas, cualquiera sea su soporte, reproducidos en contravención a las disposiciones de esta ley.', articulo: '81 inciso 1', sancion: 'Reclusión menor en su grado mínimo y multa de 50 a 800 UTM' },
            { conducta: 'El que con ánimo de lucro fabrique, importe, interne al país, tenga o adquiera para su distribución comercial las copias a que se refiere el inciso anterior.', articulo: '81 inciso 2', sancion: 'Reclusión menor en su grado medio a máximo y multa de 100 a 1.000 UTM' },
            { conducta: 'Suprima o altere cualquier información sobre la gestión de derechos.', articulo: '84 letra a)', sancion: 'Multa de 25 a 150 UTM' },
            { conducta: 'Distribuya, importe para su distribución, emita, comunique o ponga a disposición del público copias de obras o fonogramas, sabiendo que la información sobre la gestión de derechos ha sido suprimida o alterada sin autorización.', articulo: '84 letra b)', sancion: 'Multa de 25 a 150 UTM' },
            { conducta: 'Distribuya o importe para su distribución, información sobre la gestión de derechos, sabiendo que la información sobre la gestión de derechos ha sido alterada sin autorización.', articulo: '84 letra c)', sancion: 'Multa de 25 a 150 UTM' },
          ]}
        />
        <h4 className="font-medium">5.2 Ley 19.227 de fomento del libro</h4>
        <CrimeTable
          caption="Conductas sancionadas por la ley 19.227"
          rows={[
            { conducta: 'Al que, a sabiendas, comercializare libros de edición o impresión fraudulenta o reproducidos sin autorización del titular de los derechos de autor.', articulo: '11 letra a)', sancion: 'Se remite al artículo 79 de la Ley 17.336' },
            { conducta: 'Al que utilice procedimientos engañosos o fraudulentos para acceder indebidamente a los beneficios que otorga esta ley.', articulo: '11 b)', sancion: 'Se remite al artículo 79 de la Ley 17.336' },
          ]}
        />
      </Accordion>
    </div>
  )
}

function DerechosPanel() {
  return (
    <div className="space-y-gob-5 text-gri-body leading-[1.5] text-gob-text">
      <h3 className="font-heading text-gri-h2 font-medium">Defienda sus derechos</h3>
      <p>
        Los derechos de propiedad intelectual se pueden defender a través de acciones civiles y penales ante los
        tribunales competentes. Por otra parte, la ley establece medios específicos para impedir que los productos que
        infrinjan la legislación de propiedad intelectual entren al mercado o para sacarlos de él.
      </p>
      <div className="overflow-x-auto rounded-gob-md border border-gob-border">
        <table className="w-full min-w-[40rem] text-left text-gri-body-sm">
          <thead>
            <tr className="bg-inapi-portal-hero text-gob-text-inverse">
              <th className="p-gob-3 font-medium">Acciones legales</th>
              <th className="p-gob-3 font-medium">Efecto buscado</th>
              <th className="p-gob-3 font-medium">Fuente legal</th>
              <th className="p-gob-3 font-medium">Organismo encargado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-gob-3">Civiles</td>
              <td className="p-gob-3">Obtener indemnización por los perjuicios causados a titulares de derechos de propiedad intelectual</td>
              <td className="p-gob-3">Código Civil, Ley N° 19.039, Ley 17.336</td>
              <td className="p-gob-3">Tribunales ordinarios de justicia</td>
            </tr>
            <tr className="bg-gob-surface-elevated">
              <td className="p-gob-3">Penales</td>
              <td className="p-gob-3">Aplicar las sanciones establecidas por la ley</td>
              <td className="p-gob-3">Código Penal, Ley 19.039, Ley 17.336, Ley 18.455</td>
              <td className="p-gob-3">Ministerio Público — Tribunales con competencia penal</td>
            </tr>
            <tr>
              <td className="p-gob-3">Medidas en frontera</td>
              <td className="p-gob-3">Impedir la entrada o salida del país de productos que infringen los derechos de propiedad intelectual</td>
              <td className="p-gob-3">Ley 19.912</td>
              <td className="p-gob-3">Servicio Nacional de Aduanas</td>
            </tr>
            <tr className="bg-gob-surface-elevated">
              <td className="p-gob-3">Incautaciones</td>
              <td className="p-gob-3">Sacar del mercado los productos que infringen los derechos de propiedad intelectual</td>
              <td className="p-gob-3">Código Procesal Penal</td>
              <td className="p-gob-3">Carabineros y Policía de Investigaciones</td>
            </tr>
            <tr>
              <td className="p-gob-3">Retención de productos</td>
              <td className="p-gob-3">Sacar del mercado los productos que infringen los derechos de propiedad intelectual</td>
              <td className="p-gob-3">Ley 18.455</td>
              <td className="p-gob-3">Servicio Agrícola Ganadero</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 className="font-heading text-gri-h2 font-medium">Acciones legales (civiles y penales)</h3>
      <p>
        Los titulares de derechos de propiedad intelectual o industrial pueden solicitar el respeto de sus derechos a
        través de acciones civiles que detengan la violación de los derechos y que busquen el resarcimiento de los
        perjuicios. Para esto es necesario asesorarse siempre por un abogado.
      </p>
      <p>
        Asimismo, las infracciones en contra de la propiedad industrial e intelectual se encuentran sancionadas por penas
        de carácter criminal establecidas en la ley 19.039 y la ley 17.336.
      </p>
      <h3 className="font-heading text-gri-h2 font-medium">Acción penal en materia de propiedad industrial</h3>
      <p>
        Los productos o bienes que son objeto de ciertos derechos de propiedad industrial deben llevar en forma clara y
        visible una identificación indicando que se encuentran protegidos. La omisión no afecta la validez del registro
        ni las acciones civiles, pero impide ejercer las acciones penales de la ley 19.039.
      </p>
      <ul className="list-disc space-y-gob-2 pl-gob-5">
        <li>Marcas: “Marca Registrada”, “M.R.” o la letra “R” dentro de un círculo (art. 25).</li>
        <li>Patentes: “Patente de Invención” o “P.I.” y el número de registro (art. 53).</li>
        <li>Diseños y dibujos: “Dibujo Industrial” o “Diseño Industrial” o “D.I.” y el número (art. 66).</li>
        <li>Modelos de utilidad: “Modelo de Utilidad” o “M.U.” y el número (art. 59).</li>
      </ul>
      <h3 className="font-heading text-gri-h2 font-medium">Acción civil</h3>
      <p>
        El artículo 2314 del Código Civil obliga a indemnizar el daño causado por un delito o cuasidelito. El artículo
        106 de la Ley 19.039 permite demandar la cesación de los actos, la indemnización, medidas para evitar que
        prosiga la infracción y la publicación de la sentencia. El artículo 108 permite calcular perjuicios por utilidades
        dejadas de percibir, utilidades del infractor o el precio de una licencia. En falsificación de marca, el tribunal
        puede fijar una suma única compensatoria de hasta 2.000 UTM.
      </p>
      <h3 className="font-heading text-gri-h2 font-medium">Otros medios de protección</h3>
      <p>
        Medidas precautorias (art. 112): cesación inmediata, secuestro del producto, interventores, prohibición de
        publicitar y retención de bienes. Medidas de frontera (Ley 19.912): Aduanas puede actuar de oficio ante mercancía
        falsificada o que infringe el derecho de autor.
      </p>
      <h3 className="font-heading text-gri-h2 font-medium">¿Cómo evitar la compra de productos falsificados?</h3>
      <ul className="list-disc space-y-gob-2 pl-gob-5">
        <li>Comprar a distribuidores autorizados.</li>
        <li>En compras por internet o televisión, poner especial atención en el origen de los productos.</li>
        <li>Evaluar el precio: si es muy diferente al de mercado, es probable que su origen no sea legal.</li>
        <li>Revisar la etiqueta del producto antes de adquirirlo.</li>
      </ul>
    </div>
  )
}

function EstadisticasPanel() {
  return (
    <div className="space-y-gob-5 text-gri-body leading-[1.5] text-gob-text">
      <p>
        Los derechos de propiedad intelectual se pueden defender a través de acciones civiles y penales. La ley también
        establece medios para impedir que productos infractores entren al mercado o para sacarlos de él.
      </p>
      <p className="text-gri-body-sm text-muted-foreground">Fuente: Información entregada por el Servicio Nacional de Aduanas.</p>
      <h3 className="font-heading text-gri-h2 font-medium">Cantidad de suspensiones por aduana, 2009-2016</h3>
      <p>
        La mayor cantidad de suspensiones en 2010 se explica por las efectuadas en la Aduana Metropolitana en el área
        postal y courier, en envíos pequeños.
      </p>
      <h3 className="font-heading text-gri-h2 font-medium">Mercancía retenida, 2009-2016 (unidades)</h3>
      <p>
        El peak de 2012 se explica por suspensiones de la Aduana de Valparaíso y Los Andes: 6.340.000 unidades de pilas
        falsificadas y 9.050.000 unidades de cigarrillos falsificados de las marcas Philip Morris, Marlboro, Viceroy y
        Hilton.
      </p>
      <h3 className="font-heading text-gri-h2 font-medium">Valor de la mercancía retenida, 2009-2016 (US$)</h3>
      <p>
        El valor informado corresponde al de la mercancía si fuera original. Las mercancías falsificadas suelen declararse
        hasta por un valor diez veces menor. El mayor monto de 2009 se debe a un contenedor de unos 28.000 lentes marca
        Chanel retenido en Valparaíso.
      </p>
      <h3 className="font-heading text-gri-h2 font-medium">Marcas y tipos de mercancía más vulnerados</h3>
      <p>
        El ranking considera marcas con más de 100 suspensiones y, por unidades, aquellas con 250 mil o más. Se distingue
        SPIDERMAN de MARVEL CHARACTERS INC. y se agrupan las marcas Disney (Cars, Princess, Mickey, Pluto y otras).
      </p>
    </div>
  )
}

function DenunciaPanel() {
  return (
    <div className="space-y-gob-5 text-gri-body leading-[1.5] text-gob-text">
      <p>Las infracciones de carácter criminal en contra de la propiedad intelectual e industrial se deben denunciar:</p>
      <ul className="list-disc space-y-gob-2 pl-gob-5">
        <li>En la unidad policial más cercana</li>
        <li>En la oficina del Ministerio Público competente</li>
        <li>En cualquier tribunal con competencia criminal</li>
      </ul>
      <p>
        La Policía de Investigaciones (PDI) tiene la Brigada Investigadora de Delitos de Propiedad Intelectual (BRIDEPI).
        Carabineros cuenta con peritos del Laboratorio de Criminalística (LABOCAR).
      </p>
      <ul className="list-disc space-y-gob-2 pl-gob-5">
        <li>BRIDEPI: +56 2 2708 2383</li>
        <li>
          Correo:{' '}
          <a className="text-gob-link hover:underline" href="mailto:bridepi@investigaciones.cl">
            bridepi@investigaciones.cl
          </a>
        </li>
        <li>Investigaciones de Chile (PDI): 134</li>
        <li>Carabineros de Chile: 133</li>
        <li>Ministerio Público: 600 333 0000</li>
      </ul>
    </div>
  )
}

function PrevengaPanel() {
  return (
    <div className="space-y-gob-5 text-gri-body leading-[1.5] text-gob-text">
      <p>Hay ciertas medidas básicas que pueden ayudar a determinar si existe o no infracción a un derecho de propiedad intelectual.</p>
      <p>En primer lugar, identifique los derechos que se están utilizando o se pretenden utilizar, por ejemplo:</p>
      <ul className="list-disc space-y-gob-2 pl-gob-5">
        <li>Una marca o signo distintivo</li>
        <li>Una invención</li>
        <li>Una obra protegida por derecho de autor</li>
      </ul>
      <p>
        Luego determine si alguno pertenece a terceros o es muy similar a signos, obras o invenciones de otros. Si no
        pertenece a terceros o es de propia creación, se puede utilizar libremente.
      </p>
      <p>
        Si pertenece a terceros o es muy similar, revise si los derechos están vigentes. Si no lo están, la creación
        pertenece al dominio público. Si están vigentes y se usan sin autorización, puede configurarse una infracción.
      </p>
      <p>Para evitarlo puede:</p>
      <ul className="list-disc space-y-gob-2 pl-gob-5">
        <li>Desistir de usar el material que pueda infringir los derechos de terceros.</li>
        <li>Obtener un permiso o licencia sobre el material protegido.</li>
        <li>Adquirir el material original.</li>
      </ul>
    </div>
  )
}
