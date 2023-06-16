import { Box, Typography } from '@mui/material'
import { ReactElement } from 'react'
import SalesTable from '@/components/SalesTable'
import Header from '@/components/Header'
import Head from 'next/head'

export default function Sales (): ReactElement {
  return (
    <>
      <Head>
        <title>Ventas | Pipi Bakery</title>
      </Head>
      <Box p='0.5rem 2rem'>
        <Header title='VENTAS' />
        <Typography fontStyle='italic'>Todas las ventas realizadas</Typography>
        <Box height='70vh'>
          <SalesTable />
        </Box>
      </Box>
    </>
  )
}
