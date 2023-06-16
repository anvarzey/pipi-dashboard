import { Avatar, Box, Card, CardContent, PaletteColor, Rating, Typography, useTheme } from '@mui/material'
import { ReactElement } from 'react'

interface IProps {
  client: {
    _id: string
    firstName: string
    avatar: string
  }
  product: {
    _id: string
    name: string
  }
  review: string
  rating: number
}

export default function ReviewCard ({ client, product, rating, review }: IProps): ReactElement {
  const theme = useTheme()

  return (
    <Card sx={{ backgroundColor: theme.palette.primary['700' as keyof PaletteColor], width: '18rem' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Avatar src={client.avatar} alt={`${client.firstName} avatar`} />
          <Typography>{client.firstName}</Typography>
        </Box>
        <Box pt='0.5rem'>
          <Typography pb='0.5rem' fontStyle='italic'>{product.name}</Typography>
          <Rating name='read-only' value={rating} readOnly />
        </Box>
        <Typography>{review}</Typography>
      </CardContent>
    </Card>
  )
}
