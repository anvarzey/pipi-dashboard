import { Box, PaletteColor, Typography, useTheme } from '@mui/material'
import { ReactElement } from 'react'

export default function Header ({ title }: { title: string }): ReactElement {
  const theme = useTheme()
  return (
    <Box p='0' sx={{ backgroundColor: `${theme.palette.primary['800' as keyof PaletteColor]}`, display: 'flex', alignItems: 'flex-start' }}>
      <Typography component='h2' color={`${theme.palette.secondary['400' as keyof PaletteColor]}`} sx={{ fontWeight: 'bold', fontSize: '1.75rem' }}>{title}</Typography>
    </Box>
  )
}
