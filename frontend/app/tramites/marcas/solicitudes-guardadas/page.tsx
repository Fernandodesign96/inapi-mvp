'use client'

import { RequireAuth } from '@/components/tramites/RequireAuth'
import { SavedListScreen } from '@/components/tramites/part2-forms'
import { TramitesMain } from '@/components/tramites/ui-helpers'
import { BORRADORES_MARCA_DETALLE } from '@/lib/tramites/catalogs'

export default function Page() {
  return (
    <RequireAuth>
      <TramitesMain>
        <SavedListScreen
          domain="marcas"
          panelTitle="Solicitudes guardadas de marcas"
          createHref="/tramites/marcas/solicitar"
          createLabel="Crear nueva solicitud de marca"
          emptyText="No hay solicitudes guardadas aún."
          rows={BORRADORES_MARCA_DETALLE}
          headers={['N° Atención', 'N° Solicitud', 'Titular/Solicitante', 'Tipo', 'Última actualización', 'Estado']}
          showFilters="solicitud"
        />
      </TramitesMain>
    </RequireAuth>
  )
}
