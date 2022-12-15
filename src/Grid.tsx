import { AgGridReact } from 'ag-grid-react'
import { ColDef } from 'ag-grid-community'
import data from './near-earth-asteroids.json'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const defaultColDef = {
  sortable: true
}

const dateFormatter = ({ value }: { value: string }) => {
  return new Intl.DateTimeFormat('en-US').format(new Date(value))
}

const columnDefs: ColDef[] = [
  { field: 'designation', headerName: 'Designation', filter: 'agTextColumnFilter' },
  {
    field: 'discovery_date',
    headerName: 'Discovery Date',
    filter: 'agDateColumnFilter',
    valueFormatter: dateFormatter
  },
  { field: 'h_mag', headerName: 'H (mag)', filter: 'agNumberColumnFilter' },
  { field: 'moid_au', headerName: 'MOID (au)', filter: 'agNumberColumnFilter' },
  { field: 'q_au_1', headerName: 'q (au)', filter: 'agNumberColumnFilter' },
  { field: 'q_au_2', headerName: 'Q (au)', filter: 'agNumberColumnFilter' },
  { field: 'period_yr', headerName: 'Period (yr)', filter: 'agNumberColumnFilter' },
  { field: 'i_deg', headerName: 'Inclination (deg)', filter: 'agNumberColumnFilter' },
  { field: 'pha', headerName: 'Potentially Hazardous', filter: 'agTextColumnFilter' },
  { field: 'orbit_class', headerName: 'Orbit Class', enableRowGroup: true, filter: 'agTextColumnFilter' }
]

const NeoGrid = (): JSX.Element => {
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <AgGridReact defaultColDef={defaultColDef} rowData={data} columnDefs={columnDefs} rowGroupPanelShow={'always'} />
    </div>
  )
}

export default NeoGrid
