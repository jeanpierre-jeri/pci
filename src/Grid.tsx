import { AgGridReact } from 'ag-grid-react'
import { ColDef, GridApi } from 'ag-grid-community'
import data from './near-earth-asteroids.json'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useEffect, useState } from 'react'
import { dateComparator, dateFormatter, handleCopy, hazardousFormatter } from './lib/utils'

const defaultColDef = {
  sortable: true,
  flex: 1
}

const columnDefs: ColDef[] = [
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

const NeoGrid = (): JSX.Element => {
  const [gridApi, setGridApi] = useState<GridApi>()

  useEffect(() => {
    const copy = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c') {
        handleCopy(gridApi)
      }
    }
    document.addEventListener('keydown', copy)
    return () => document.removeEventListener('keydown', copy)
  })
  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
        <AgGridReact
          rowSelection="multiple"
          defaultColDef={defaultColDef}
          rowData={data}
          columnDefs={columnDefs}
          rowGroupPanelShow={'always'}
          copyHeadersToClipboard={true}
          onGridReady={(params) => setGridApi(params.api)}
        />
      </div>
    </>
  )
}

export default NeoGrid
