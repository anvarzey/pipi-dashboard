import { ReactElement } from 'react'
import ClientsTable from '@/components/ClientsTable'
import { Box, Typography } from '@mui/material'
import Header from '@/components/Header'
import Head from 'next/head'

export default function Products (): ReactElement {
  return (
    <>
      <Head>
        <title>Clientes | Pipi Bakery</title>
      </Head>
      <Box p='0.5rem 2rem'>
        <Header title='CLIENTES' />
        <Typography fontStyle='italic'>Nuestros clientes registrados</Typography>
        <Box height='70vh'>
          <ClientsTable />
        </Box>
      </Box>
    </>
  )
}
