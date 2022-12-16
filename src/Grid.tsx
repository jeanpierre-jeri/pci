import { AgGridReact } from 'ag-grid-react'
import { GridApi } from 'ag-grid-community'
import data from './near-earth-asteroids.json'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useCallback, useEffect, useState } from 'react'
import { handleCopy } from './lib/utils'
import { Title } from './components/Title'
import { columnDefs, defaultColDef } from './initialConfig'

const NeoGrid = (): JSX.Element => {
  const [gridApi, setGridApi] = useState<GridApi>()
  const resetFilters = useCallback(() => {
    gridApi?.setFilterModel(null)
    gridApi?.setDefaultColDef({ sort: null, flex: 1, sortable: true })
  }, [gridApi])

  useEffect(() => {
    const onCopyCommand = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'c') {
        handleCopy(gridApi)
      }
    }
    document.addEventListener('keydown', onCopyCommand)
    return () => document.removeEventListener('keydown', onCopyCommand)
  })
  return (
    <>
      <Title resetFilters={resetFilters} />
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
