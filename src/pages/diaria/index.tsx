import {
  ReactElement,
  useState
} from 'react'
import Header from '@/components/Header'
import {
  Box,
  Typography,
  useMediaQuery
} from '@mui/material'
import DailyChart from '@/components/DailyChart'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import Head from 'next/head'

export default function DailyStats (): ReactElement {
  const [startDate, setStartDate] = useState<Date | Dayjs | null>(dayjs('2023-03-01'))
  const [endDate, setEndDate] = useState<Date | Dayjs | null>(dayjs('2023-03-31'))
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <>
      <Head>
        <title>Estadísticas Diarias | Pipi Bakery</title>
      </Head>
      <Box p='0.5rem 2rem'>
        <Header title='Estadísticas Diarias' />
        <Box sx={
          isMobile
            ? { display: 'flex', flexDirection: 'column', gap: '1rem' }
            : { display: 'flex', justifyContent: 'space-between' }
        }
        >
          <Typography fontStyle='italic'>Ventas totales por día</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <DatePicker defaultValue={startDate} format='DD-MM-YYYY' onChange={setStartDate} />
            <Typography fontSize={32}> - </Typography>
            <DatePicker defaultValue={endDate} format='DD-MM-YYYY' minDate={startDate === null ? undefined : startDate} onChange={setEndDate} />
          </Box>
        </Box>
        <Box height='70vh'>
          <DailyChart startDate={startDate} endDate={endDate} />
        </Box>
      </Box>
    </>
  )
}
