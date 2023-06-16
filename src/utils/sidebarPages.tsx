import {
  People as PeopleIcon,
  PieChart as PieChartIcon,
  Timeline as MonthlyIcon,
  PlaylistAddCheck as PlaylistAddCheckIcon,
  PointOfSale as PointOfSaleIcon,
  QueryStats as DailyIcon,
  RateReview as RateReviewIcon
} from '@mui/icons-material'

export const pages = [
  {
    name: 'Productos',
    icon: <PlaylistAddCheckIcon />,
    url: 'productos'
  },
  {
    name: 'Ventas',
    icon: <PointOfSaleIcon />,
    url: 'ventas'
  },
  {
    name: 'Reviews',
    icon: <RateReviewIcon />,
    url: 'reviews'
  },
  {
    name: 'Clientes',
    icon: <PeopleIcon />,
    url: 'clientes'
  }
]

export const salesPages = [
  {
    name: 'Est Mensuales',
    icon: <MonthlyIcon />,
    url: 'mensual'
  },
  {
    name: 'Est Diarias',
    icon: <DailyIcon />,
    url: 'diaria'
  },
  {
    name: 'Breakdown',
    icon: <PieChartIcon />,
    url: 'breakdown'
  }
]
