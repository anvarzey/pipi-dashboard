import {
  Box,
  CircularProgress,
  PaletteColor,
  Typography,
  useTheme
} from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'
// import useUsers from '@/hooks/useUsers'
import useSWR from 'swr'
import { ReactElement } from 'react'
import { IUser } from '@/models/User'

let rows: GridRowsProp

const initialState = {
  columns: {
    columnVisibilityModel: {
      id: false
    }
  }
}

export default function ClientsTable (): ReactElement {
  const theme = useTheme()
  // const { data, isLoading } = useUsers()
  const { data, isLoading, error }: { data: IUser[] | undefined, isLoading: boolean, error: Error | undefined } = useSWR('/api/user')

  if (isLoading) {
    return (
      <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center'>
        <CircularProgress color='secondary' />
      </Box>
    )
  }

  const columns: GridColDef[] = [
    { field: 'col1', headerName: '', flex: 0.5 },
    { field: 'col2', headerName: 'Nombre', flex: 1, headerAlign: 'center' },
    { field: 'col3', headerName: 'Apellido', flex: 1, headerAlign: 'center' },
    { field: 'col4', headerName: 'Email', flex: 1, headerAlign: 'center' },
    { field: 'col5', headerName: 'Compras', flex: 0.5, headerAlign: 'center' },
    { field: 'col6', headerName: 'Reseñas', flex: 0.5, headerAlign: 'center' }]

  if (data !== undefined) {
    rows = data
      .filter((user) => user.role === 'client')
      .map((client, i: number) => ({
        id: i,
        col1: i + 1,
        col2: client.firstName,
        col3: client.lastName,
        col4: client.email,
        col5: client.purchases.length,
        col6: client.reviews.length
      }))
  }

  if (error) {
    return (
      <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center'>
        <Typography>An error has been occurred</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{
      height: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem 0',
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
      {
        rows !== undefined && (
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
        )
      }
    </Box>
  )
}
