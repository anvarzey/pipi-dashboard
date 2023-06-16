import { createTheme } from '@mui/material/styles'
import { blueGrey } from '@mui/material/colors'

const Blue = {
  20: '#C3E0E5',
  40: '#5885AF',
  60: '#41729F',
  80: '#274472',
  100: '#d2dded',
  200: '#a5bbdc',
  300: '#7798ca',
  400: '#4a76b9',
  500: '#1d54a7',
  600: '#174386',
  700: '#113264',
  800: '#0c2243',
  900: '#061121'
}

const Yellow = {
  100: '#fdf2db',
  200: '#fce6b7',
  300: '#fad992',
  400: '#f9cd6e',
  500: '#f7c04a',
  600: '#c69a3b',
  700: '#94732c',
  800: '#634d1e',
  900: '#31260f'
}

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      // contrastText: '#C3E0E5',
      // light: '#5885AF',
      // main: '#41729F',
      // dark: '#274472'
      ...Blue,
      main: Blue[600],
      contrastText: blueGrey[50]
    },
    secondary: {
      ...Yellow,
      main: Yellow[600],
      contrastText: blueGrey[900]
    }
  }
})
