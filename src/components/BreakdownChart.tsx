// import { IOverallStat } from '@/models/OverallStat'
// import useActualStats from '@/hooks/useActualStats'
import {
  CircularProgress,
  Box,
  PaletteColor,
  useMediaQuery,
  useTheme,
  Typography
} from '@mui/material'
import { ResponsivePie } from '@nivo/pie'
import { ReactElement, useMemo } from 'react'
import useSWR from 'swr'

export default function BreakdownChart ({ dashboardMode = false }: { dashboardMode?: boolean }): ReactElement {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const theme = useTheme()
  // const { data, isLoading } = useActualStats()
  const { data, isLoading, error } = useSWR('/api/stat/general/actual')

  const formattedData = useMemo(() => {
    if (data === undefined || data === null) return []
    if (data.salesByCategory === undefined) return []

    const pieData = Object.entries(data.salesByCategory).map(([key, value], i) => (
      {
        id: key,
        label: key,
        value,
        color: theme.palette.secondary[`${5 - i}00` as keyof PaletteColor]
      }))
    return pieData
  }, [data, theme.palette.secondary])

  const pieTheme = {
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

  if (error) {
    return (
      <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center'>
        <Typography>An error has been occurred</Typography>
      </Box>
    )
  }

  return (
    <ResponsivePie
      data={formattedData}
      margin={
        dashboardMode
          ? isMobile
            ? { top: 0, right: 150, bottom: 30, left: 10 }
            : { top: 0, right: 150, bottom: 50, left: 10 }
          : { top: 40, right: 80, bottom: 100, left: 80 }
      }
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={dashboardMode ? 0 : 4}
      activeOuterRadiusOffset={dashboardMode ? 0 : 8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            0.2
          ]
        ]
      }}
      colors={{ datum: 'data.color' }}
      theme={pieTheme}
      enableArcLinkLabels={!dashboardMode && !isMobile}
      arcLinkLabelsSkipAngle={6}
      arcLinkLabelsTextColor='#FAFAFA'
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={
        {
          from: 'color',
          modifiers: [
            [
              'darker',
              3
            ]
          ]
        }
      }
      legends={
        dashboardMode
          ? [
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 140,
              translateY: -10,
              itemsSpacing: 20,
              itemWidth: 120,
              itemHeight: 18,
              itemTextColor: '#CCC',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [{
                on: 'hover',
                style: {
                  itemTextColor: theme.palette.secondary['100' as keyof PaletteColor]
                }
              }]
            }
          ]
          : isMobile
            ? [
              {
                anchor: 'bottom-left',
                direction: 'column',
                justify: false,
                translateX: -30,
                translateY: 100,
                itemsSpacing: 20,
                itemWidth: 50,
                itemHeight: 18,
                itemTextColor: '#CCC',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [{
                  on: 'hover',
                  style: {
                    itemTextColor: theme.palette.secondary['100' as keyof PaletteColor]
                  }
                }]
              }
            ]
            : [
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 20,
                itemWidth: 120,
                itemHeight: 18,
                itemTextColor: '#CCC',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [{
                  on: 'hover',
                  style: {
                    itemTextColor: theme.palette.secondary['100' as keyof PaletteColor]
                  }
                }]
              }
            ]
      }
    />
  )
}
