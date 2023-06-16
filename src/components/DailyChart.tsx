import {
  Box,
  CircularProgress,
  PaletteColor,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { ResponsiveLine } from '@nivo/line'
import { ReactElement, useMemo } from 'react'
import { Dayjs } from 'dayjs'
import useActualStats from '@/hooks/useActualStats'

interface InRange {
  date: Date
  totalSold: number
}

export default function DailyChart ({ startDate, endDate }: { startDate: Date | Dayjs | null, endDate: Date | Dayjs | null }): ReactElement {
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width: 600px)')
  const { data, isLoading, error } = useActualStats()

  const formattedData = useMemo(() => {
    if (data === null || data === undefined) return []
    if (startDate === null || endDate === null) return []

    const { dailyData } = data

    const inRangeData: InRange[] = []
    dailyData.forEach(dailyObj => {
      const fullDate = new Date(data.year, dailyObj.month - 1, dailyObj.date)
      if (fullDate >= startDate && fullDate <= endDate) {
        inRangeData.push({ date: fullDate, totalSold: dailyObj.totalSold })
      }
    })
    if (inRangeData.length < 1) return []
    /* @ts-expect-error */
    const sortedData = inRangeData.sort((a, b) => a.date - b.date).map(singleData => ({ x: `${singleData.date.getDate()}/${singleData.date.getMonth() + 1}`, y: singleData.totalSold }))
    return [{
      id: 'Total Sales',
      color: '#1fbace',
      data: sortedData
    }]
  }, [startDate, endDate, data])

  const chartTheme = {
    axis: {
      domain: {
        line: {
          stroke: theme.palette.secondary['200' as keyof PaletteColor]
        }
      },
      legend: {
        text: {
          fill: theme.palette.secondary['200' as keyof PaletteColor]
        }
      },
      ticks: {
        line: {
          stroke: theme.palette.secondary['200' as keyof PaletteColor],
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
        isMobile
          ? { top: 80, right: 20, bottom: 60, left: 50 }
          : { top: 50, right: 50, bottom: 50, left: 50 }
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
      curve='monotoneX'
      axisTop={null}
      axisRight={null}
      axisBottom={{
        // orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: isMobile ? 45 : 0,
        legend: 'Día',
        legendOffset: 36,
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
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      enableGridX={false}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh
      legends={[]}
    />
  )
}
