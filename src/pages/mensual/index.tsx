import { ReactElement, useState } from 'react'
import MonthlyChart from '@/components/MonthlyChart'
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography
} from '@mui/material'
import Header from '@/components/Header'
import Head from 'next/head'

export default function MonthlyStats (): ReactElement {
  const [period, setPeriod] = useState(2023)

  const handleChange = (e: SelectChangeEvent<number>): void => {
    setPeriod(Number(e.target.value))
  }

  return (
    <>
      <Head>
        <title>Estadísticas Mensuales | Pipi Bakery</title>
      </Head>
      <Box p='0.5rem 2rem'>
        <Header title='Estadísticas Mensuales' />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingRight: '1rem' }}>
          <Typography fontStyle='italic'>Ventas totales por mes</Typography>
          <Box sx={{ maxWidth: 120, marginTop: '1rem', color: 'primary.contrastText' }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label' sx={{ color: 'primary.contrastText' }}>Año</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                sx={{ color: 'primary.contrastText' }}
                value={period}
                label='Año'
                onChange={handleChange}
              >
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box height='70vh'>
          <MonthlyChart period={period} />
        </Box>
      </Box>
    </>
  )
}
