import { ColDef } from 'ag-grid-community'

import { dateComparator, dateFormatter, hazardousFormatter } from './lib/utils'

export const defaultColDef = {
  sortable: true,
  flex: 1
}

export const columnDefs: ColDef[] = [
  { field: 'designation', headerName: 'Designation', filter: 'agTextColumnFilter' },
  {
    field: 'discovery_date',
    headerName: 'Discovery Date',
    filter: 'agDateColumnFilter',
    valueFormatter: dateFormatter,
    filterParams: {
      comparator: dateComparator
    }
  },
  { field: 'h_mag', headerName: 'H (mag)', filter: 'agNumberColumnFilter' },
  { field: 'moid_au', headerName: 'MOID (au)', filter: 'agNumberColumnFilter' },
  { field: 'q_au_1', headerName: 'q (au)', filter: 'agNumberColumnFilter' },
  { field: 'q_au_2', headerName: 'Q (au)', filter: 'agNumberColumnFilter' },
  { field: 'period_yr', headerName: 'Period (yr)', filter: 'agNumberColumnFilter' },
  { field: 'i_deg', headerName: 'Inclination (deg)', filter: 'agNumberColumnFilter' },
  {
    field: 'pha',
    headerName: 'Potentially Hazardous',
    filter: 'agTextColumnFilter',
    valueFormatter: hazardousFormatter
  },
  { field: 'orbit_class', headerName: 'Orbit Class', filter: 'agTextColumnFilter' }
]
