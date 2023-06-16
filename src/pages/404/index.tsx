import { Box, PaletteColor, Typography, useTheme } from '@mui/material'
import Head from 'next/head'
import { ReactElement } from 'react'

export default function Custom404 (): ReactElement {
  const theme = useTheme()
  return (
    <>
      <Head>
        <title>Not Found | Pipi Bakery</title>
      </Head>
      <Box p='2.5rem 2rem' sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
        <Typography component='h2' color={`${theme.palette.secondary['400' as keyof PaletteColor]}`} sx={{ fontWeight: 'bold', fontSize: '1.75rem' }}>This page has not been found</Typography>
        <Typography>Error 404</Typography>
      </Box>
    </>
  )
}
