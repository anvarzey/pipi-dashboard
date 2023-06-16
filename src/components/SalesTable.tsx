import {
  Box,
  CircularProgress,
  PaletteColor,
  Typography,
  useTheme
} from '@mui/material'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import { ReactElement } from 'react'
import formatPrice from '../utils/formatPrice'
import useSales from '@/hooks/useSales'

const columns: GridColDef[] = [
  { field: 'col1', headerName: '', flex: 0.5 },
  { field: 'col2', headerName: 'ID Cliente', flex: 1, headerAlign: 'center' },
  { field: 'col3', headerName: 'Cant Productos', flex: 1, headerAlign: 'center' },
  { field: 'col4', headerName: 'Total Gastado', flex: 1, headerAlign: 'center' },
  { field: 'col5', headerName: 'Fecha', flex: 1, headerAlign: 'center' }
]

let rows: GridRowsProp

const initialState = {
  columns: {
    columnVisibilityModel: {
      id: false
    }
  }
}

export default function SalesTable ({ dashboardMode = false }: { dashboardMode?: boolean }): ReactElement {
  const theme = useTheme()
  const { data, isLoading, error } = useSales()

  if (isLoading) {
    return (
      <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center'>
        <CircularProgress color='secondary' />
      </Box>
    )
  }

  if (data !== undefined) {
    rows = data?.map((sale, i: number) => {
      const totalUnits = sale.products?.length > 1 ? sale.products.reduce((a, b) => a + b.quantity, 0) : sale.products[0].quantity
      const formattedDate = new Date(sale.date).toLocaleDateString()
      const formattedPrice = formatPrice(sale.totalPrice)
      return {
        id: i,
        col1: i + 1,
        col2: sale.client,
        col3: totalUnits,
        col4: formattedPrice,
        col5: formattedDate
      }
    })
  }

  if (error !== undefined) {
    return (
      <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center'>
        <Typography>An error has been occurred</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: !dashboardMode ? '1rem 0' : '0',
        '& .MuiDataGrid-root': {
          border: 'none'
        },
        '& .MuiDataGrid-cell': {
          borderBottom: `1px solid ${theme.palette.primary['80' as keyof PaletteColor]}`,
          color: theme.palette.primary.contrastText
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: theme.palette.primary['80' as keyof PaletteColor],
          color: theme.palette.primary.contrastText,
          borderBottom: 'none',
          borderRadius: '0.5rem 0.5rem 0 0',
          display: 'flex',
          justifyContent: 'center'
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: theme.palette.primary['60' as keyof PaletteColor]
        },
        '& .MuiDataGrid-footerContainer': {
          backgroundColor: theme.palette.primary['80' as keyof PaletteColor],
          color: theme.palette.primary.contrastText,
          borderTop: 'none',
          borderRadius: '0 0 0.5rem 0.5rem'
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          color: `${theme.palette.secondary['600' as keyof PaletteColor]} !important`
        },
        '& .MuiTablePagination-toolbar': {
          color: theme.palette.primary.contrastText
        },
        '& .MuiTablePagination-select': {
          color: theme.palette.primary.contrastText
        }
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          ...initialState,
          pagination: { paginationModel: { pageSize: 10 } }
        }}
        pageSizeOptions={[10, 20, 50]}
        sx={{
          '& .MuiDataGrid-cell--textLeft': {
            justifyContent: 'center'
          }
        }}
      />
    </Box>
  )
}
