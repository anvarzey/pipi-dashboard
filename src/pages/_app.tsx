import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement } from 'react'
import Layout from '@/components/Layout'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/utils/theme'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SWRConfig } from 'swr'

export default function App ({ Component, pageProps }: AppProps): ReactElement {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher: async (resource, init) => await fetch(resource, init).then(async (res) => await res.json())
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </LocalizationProvider>
    </SWRConfig>
  )
}
