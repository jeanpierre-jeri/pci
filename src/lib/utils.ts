import { GridApi } from 'ag-grid-community'

// Returns date in mm/dd/yyyy format
export const dateFormatter = ({ value }: { value: string }) => {
  return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(
    new Date(value)
  )
}

// Comparator for sorting date column
export const dateComparator = (dateFromFilter: Date, cellValue: string) => {
  if (!cellValue) return 0
  const cellDate = new Date(cellValue).getTime()

  return cellDate < dateFromFilter.getTime() ? -1 : 1
}

// Returns Yes/No values or empty string instead of Y/N or n/a
export const hazardousFormatter = ({ value }: { value: string }) => {
  if (value === 'Y') return 'Yes'
  if (value === 'N') return 'No'
  return ''
}

// Takes Array with object from grid table and returns it as a excel format to be able to paste it
export const excelFormat = (entries: any[]) => {
  let text: string = ''
  entries.forEach((entry: any, i: number) => {
    if (!i) {
      Object.keys(entry).forEach((key, i) => {
        if (i !== Object.keys(entry).length - 1) {
          text += key + '\t'
        } else {
          text += key + '\n'
        }
      })
    }
    Object.values(entry).forEach((val, i) => {
      if (i !== Object.values(entry).length - 1) {
        text += val + '\t'
      } else {
        text += val
      }
    })

    if (i !== entries.length - 1) {
      text += '\n'
    }
  })

  return text
}

// Handles the ctrl+c function to copy the rows to the clipboard
// and formats it to be able to paste in in excel
export const handleCopy = (gridApi: GridApi | undefined) => {
  const rowSelected = gridApi?.getSelectedRows() as any[]

  const temp = document.createElement('textarea')
  temp.style.display = 'fixed'
  temp.style.opacity = '0'
  temp.style.top = '0'
  temp.style.left = '0'
  temp.id = 'clipboard'
  temp.value = excelFormat(rowSelected)
  document.querySelector('.ag-theme-alpine')?.insertAdjacentElement('beforeend', temp)
  temp.focus()
  temp.select()
  document.execCommand('copy')
  document.querySelector('#clipboard')?.remove()
}
