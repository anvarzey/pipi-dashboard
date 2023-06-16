import {
  CircularProgress,
  Box,
  PaletteColor,
  useTheme,
  useMediaQuery,
  Typography
} from '@mui/material'
import { ResponsiveLine } from '@nivo/line'
import { ReactElement, useMemo } from 'react'
import useGralStats from '@/hooks/useGralStats'
// import useSWR from 'swr'
// import { IOverallStat } from '@/models/OverallStat'

interface IMonthsDict {
  [key: number]: string
}

const monthsDict: IMonthsDict = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre'
}

export default function MonthlyChart ({ period, dashboardMode = false }: { period: number, dashboardMode?: boolean }): ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width: 600px)')
  const { data, isLoading, error } = useGralStats()
  // const { data, isLoading, error }: { data: IOverallStat[] | undefined, isLoading: any, error: Error | undefined } = useSWR('/api/stat/general')

  const chartTheme = {
    axis: {
      domain: {
        line: {
          stroke: theme.palette.secondary['100' as keyof PaletteColor]
        }
      },
      legend: {
        text: {
          fill: theme.palette.secondary['100' as keyof PaletteColor]
        }
      },
      ticks: {
        line: {
          stroke: theme.palette.secondary['600' as keyof PaletteColor],
          strokeWidth: 1
        },
        text: {
          fill: theme.palette.secondary['200' as keyof PaletteColor]
        }
      }
    },
    legends: {
      text: {
        fill: theme.palette.secondary['200' as keyof PaletteColor]
      }
    },
    tooltip: {
      container: {
        color: theme.palette.primary.main
      }
    }
  }

  const formattedData = useMemo(() => {
    if (data === undefined || data === null) return []

    const yearData = data?.find(obj => obj.year === period)

    const monthFtdData = yearData?.monthlyData.sort((a, b) => a.month - b.month).map(monthData => ({
      x: monthsDict[monthData.month],
      y: monthData.totalSold
    }))

    if (monthFtdData === undefined) return []

    return [{
      id: 'Month Sales',
      color: '#1fbace',
      data: monthFtdData
    }]
  }, [data, period])

  if (isLoading) {
    return (
      <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center'>
        <CircularProgress color='secondary' />
      </Box>
    )
  }

  if (error !== undefined) {
    return (
      <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center'>
        <Typography>An error has been occurred</Typography>
      </Box>
    )
  }

  return (
    <ResponsiveLine
      data={formattedData}
      theme={chartTheme}
      margin={
        dashboardMode
          ? isMobile
            ? { top: 10, right: 40, bottom: 80, left: 60 }
            : { top: 10, right: 70, bottom: 80, left: 70 }
          : isMobile
            ? { top: 60, right: 20, bottom: 80, left: 30 }
            : { top: 50, right: 50, bottom: 50, left: 60 }
      }
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
      }}
      yFormat=' >-.2f'
      axisTop={null}
      axisRight={null}
      axisBottom={{
        // orient: 'bottom',
        tickSize: 7,
        tickPadding: 5,
        tickRotation: isMobile ? 45 : 0,
        legend: 'Mes',
        legendOffset:
          dashboardMode
            ? 100
            : isMobile
              ? 60
              : 41,
        legendPosition: 'middle'
      }}
      axisLeft={{
        // orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Ventas',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      colors={{ scheme: 'nivo' }}
      lineWidth={3}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      enableGridX={false}
      useMesh
      legends={[]}
    />
  )
}
