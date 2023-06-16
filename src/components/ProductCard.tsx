import { Box, Card, CardMedia, Grid, PaletteColor, Rating, Typography, useTheme } from '@mui/material'
import { ReactElement } from 'react'

interface IProps {
  category: string
  name: string
  rating: number
  images: [string]
  variants: [{
    option: string
  }] | null
}

export default function ProductCard ({ category, images, name, rating, variants }: IProps): ReactElement {
  const theme = useTheme()

  if (images === undefined) return <div>Que coño ha pasado ?</div>
  return (
    <Card elevation={2} sx={{ backgroundColor: `${theme.palette.primary['80' as keyof PaletteColor]}`, color: `${theme.palette.primary.contrastText}` }}>
      <CardMedia
        component='img'
        height='194'
        image={images[0]}
        alt={`Imagen de ${name}`}
      />
      <Typography p='0.25rem 0.5rem' color={`${theme.palette.secondary['200' as keyof PaletteColor]}`} fontWeight='bold' fontSize='1.25rem'>{name}</Typography>
      <Grid p='0.5rem' container spacing={1} columns={1}>
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>
            Valoración:
          </Typography>
          <Rating name='read-only' value={rating} readOnly />
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>Categoría:</Typography>
          <Typography>{category}</Typography>
        </Grid>
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>
            Variantes:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {
              variants !== null
                ? (variants.map(variant => (
                  <Typography key={variant.option}>
                    {variant.option}
                  </Typography>)))
                : (
                  <Typography>
                    No tiene
                  </Typography>)
            }
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}
