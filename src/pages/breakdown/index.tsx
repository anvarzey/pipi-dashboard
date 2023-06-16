import { Box, Typography } from '@mui/material'
import { ReactElement } from 'react'
import Header from '@/components/Header'
import BreakdownChart from '@/components/BreakdownChart'
import Head from 'next/head'

export default function Breakdown (): ReactElement {
  return (
    <>
      <Head>
        <title>Breakdown | Pipi Bakery</title>
      </Head>
      <Box p='0.5rem 2rem'>
        <Header title='BREAKDOWN' />
        <Typography fontStyle='italic'>Comparativa de ventas por categoría</Typography>
        <Box height='70vh' color='#000'>
          <BreakdownChart />
        </Box>
      </Box>
    </>
  )
}
