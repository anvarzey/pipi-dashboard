import { ReactElement } from 'react'
import { Box, PaletteColor, Typography, useMediaQuery, useTheme } from '@mui/material'

export default function StatsCard ({ difference, icon, parameter, value, comparisonRef }: { difference: string, icon: ReactElement, parameter: string, value: number, comparisonRef: string }): ReactElement {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const theme = useTheme()
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      flexDirection='column'
      p={isMobile ? '1rem' : '0.5rem'}
      sx={{
        backgroundColor: theme.palette.primary['80' as keyof PaletteColor],
        borderRadius: '1rem',
        color: theme.palette.primary.contrastText
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', color: theme.palette.secondary['400' as keyof PaletteColor], fontSize: '1em' }}>
        <Typography
          color={`${theme.palette.secondary['100' as keyof PaletteColor]}`}
        >
          {parameter}
        </Typography>
        {icon}
      </Box>
      <Box>
        <Typography fontSize={28} fontWeight='bold' textAlign='center'>{value}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontStyle='italic' color={`${theme.palette.secondary['300' as keyof PaletteColor]}`}>{difference}</Typography>
        <Typography fontSize={14}>Desde {comparisonRef}</Typography>
      </Box>
    </Box>
  )
}
