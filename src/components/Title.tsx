import { FC } from 'react'

interface TitleProps {
  resetFilters: () => void
}
export const Title: FC<TitleProps> = ({ resetFilters }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
      <h1>Near-Earth Object Overview</h1>
      <button onClick={resetFilters} type="button">
        Clear Filters and Sorters
      </button>
    </div>
  )
}
