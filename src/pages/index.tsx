import { Box, Button, CircularProgress, PaletteColor, Typography, useMediaQuery, useTheme } from '@mui/material'
import { ReactElement, useMemo } from 'react'
import Header from '@/components/Header'
import StatsCard from '@/components/StatsCard'
import {
  Assessment as YearIcon,
  CalendarMonth as MonthIcon,
  FileDownload as DownloadIcon,
  GroupAdd as CustomersIcon,
  Today as TodayIcon
} from '@mui/icons-material'
import MonthlyChart from '@/components/MonthlyChart'
import SalesTable from '@/components/SalesTable'
import BreakdownChart from '@/components/BreakdownChart'
import useSwr from 'swr'
import Head from 'next/head'

export default function Home (): ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width: 600px)')
  const { data, isLoading, error } = useSwr('/api/stat/dashboard')

  const formattedData = useMemo(() => {
    if (data === null || data === undefined) return []

    return [
      {
        difference: '+10',
        icon: <CustomersIcon />,
        parameter: 'Clientes',
        value: data.totalCustomers,
        comparisonRef: 'el último mes'
      },
      {
        difference: '+2%',
        icon: <TodayIcon />,
        parameter: 'Ventas Hoy',
        value: data.currentDayUnits,
        comparisonRef: 'ayer'
      },
      {
        difference: '+8%',
        icon: <MonthIcon />,
        parameter: 'Ventas este Mes',
        value: data.currentMonthUnits,
        comparisonRef: 'el último mes'
      },
      {
        difference: '+12%',
        icon: <YearIcon />,
        parameter: 'Ventas del Año',
        value: data.currentYearUnits,
        comparisonRef: 'el año pasado'
      }
    ]
  }, [data])

  if (error !== undefined) {
    return <h2>An error has been occurred: {error.message}</h2>
  }

  return (
    <>
      <Head>
        <title>Dashboard | Pipi Bakery</title>
      </Head>
      <Box
        p={
          isMobile
            ? '0.5rem 2rem 2.75rem'
            : '0.5rem 2rem 0'
        }
      >
        <Box display='flex' justifyContent='space-between'>
          <Header title='DASHBOARD' />
          {
            !isMobile &&
            (
              <Button variant='contained' color='secondary' sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DownloadIcon />
                <Typography sx={{ color: theme.palette.primary['700' as keyof PaletteColor], fontWeight: 'bold', fontSize: '12px' }}>DESCARGAR REPORTE</Typography>
              </Button>
            )
          }
        </Box>
        <Typography fontStyle='italic'>Información mas relevante</Typography>
        <Box
          sx={
            isMobile
              ? { gridAutoRows: '16rem', display: 'flex', flexDirection: 'column', minHeight: '80vh', gap: '1rem', padding: '1rem 0' }
              : { display: 'grid', maxHeight: '80vh', gap: '1rem', gridTemplateRows: 'repeat(2, 16rem)', gridTemplateColumns: 'repeat(12, 1fr)', paddingTop: '1rem' }
          }
        >
          <Box
            gridRow={1}
            sx={
              isMobile
                ? ({ display: 'flex', flexDirection: 'column', gap: '1rem' })
                : ({ display: 'grid', placeContent: 'center', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gridColumnStart: 1, gridColumnEnd: 6, gap: '1rem' })
            }
          >
            {
              isLoading
                ? (
                  <Box width='100%' height='100%' display='flex' alignItems='center' justifyContent='center'>
                    <CircularProgress color='secondary' />
                  </Box>)
                : formattedData !== undefined
                  ? (formattedData.map((card, i) => (
                    <StatsCard key={i} difference={card.difference} icon={card.icon} parameter={card.parameter} value={card.value} comparisonRef={card.comparisonRef} />)))
                  : <div>Error</div>
            }
          </Box>
          <Box
            gridRow={1}
            sx={
              isMobile
                ? { backgroundColor: theme.palette.primary['80' as keyof PaletteColor], borderRadius: '1rem', height: '16rem', padding: '0 0 1rem' }
                : { backgroundColor: theme.palette.primary['80' as keyof PaletteColor], borderRadius: '1rem', gridColumnStart: 6, gridColumnEnd: 13 }
            }
          >
            <Typography color={theme.palette.secondary['500' as keyof PaletteColor]} p='0.5rem 1rem' fontWeight='bold'>Ventas Mensuales</Typography>
            <MonthlyChart period={2023} dashboardMode />
          </Box>
          <Box
            gridRow={2}
            sx={
              isMobile
                ? { height: '16rem' }
                : { height: '100%', gridColumnStart: 1, gridColumnEnd: 8 }
            }
          >
            <SalesTable dashboardMode />
          </Box>
          <Box
            sx={
              isMobile
                ? ({ backgroundColor: theme.palette.primary['80' as keyof PaletteColor], borderRadius: '1rem', color: theme.palette.primary['900' as keyof PaletteColor], height: '16rem' })
                : ({ backgroundColor: theme.palette.primary['80' as keyof PaletteColor], borderRadius: '1rem', color: theme.palette.primary['900' as keyof PaletteColor], gridColumnStart: 8, gridColumnEnd: 13, overflow: 'hidden' })
            }
          >
            <Typography color={theme.palette.secondary['500' as keyof PaletteColor]} p='0.5rem 1rem' fontWeight='bold'>Ventas por Categoría</Typography>
            <BreakdownChart dashboardMode />
          </Box>
        </Box>
      </Box>
    </>
  )
}
