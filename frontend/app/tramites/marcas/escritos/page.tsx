'use client'

import { RequireAuth } from '@/components/tramites/RequireAuth'
import { SavedListScreen } from '@/components/tramites/part2-forms'
import { TramitesMain } from '@/components/tramites/ui-helpers'

export default function Page() {
  return (
    <RequireAuth>
      <TramitesMain>
        <SavedListScreen
          domain="marcas"
          panelTitle="Escritos guardados de marcas"
          createHref="/tramites/marcas/presentar-escritos"
          createLabel="Presentar nuevo escrito de marca"
          emptyText="No hay registros para mostrar"
          rows={[]}
          headers={['N° Atención', 'N° Solicitud', 'Tipo', 'Última actualización', 'Estado']}
          showFilters="escrito"
        />
      </TramitesMain>
    </RequireAuth>
  )
}
