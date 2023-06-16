import {
  Box,
  Skeleton,
  Typography
} from '@mui/material'
import { ReactElement } from 'react'
import Header from '@/components/Header'
import ReviewCard from '@/components/ReviewCard'
// import useReviews from '@/hooks/useReviews'
import useSWR from 'swr'
import { IReview } from '@/models/Review'
import Head from 'next/head'

export default function Reviews (): ReactElement {
  // const { data, isLoading } = useReviews()
  const { data, isLoading, error }: { data: IReview[] | undefined, isLoading: boolean, error: Error | undefined } = useSWR('/api/review')
  return (
    <>
      <Head>
        <title>Reviews | Pipi Bakery</title>
      </Head>
      <Box p='0.5rem 2rem'>
        <Header title='RESEÑAS' />
        <Typography fontStyle='italic'>Las opiniones de nuestros clientes</Typography>
        <Box pt='2rem' display='flex' flexWrap='wrap' gap='1rem' m='0 auto'>
          {
            isLoading
              ? (
                <>
                  <Skeleton variant='rounded' width='18rem' height='14rem' />
                  <Skeleton variant='rounded' width='18rem' height='14rem' />
                  <Skeleton variant='rounded' width='18rem' height='14rem' />
                  <Skeleton variant='rounded' width='18rem' height='14rem' />
                  <Skeleton variant='rounded' width='18rem' height='14rem' />
                  <Skeleton variant='rounded' width='18rem' height='14rem' />
                  <Skeleton variant='rounded' width='18rem' height='14rem' />
                  <Skeleton variant='rounded' width='18rem' height='14rem' />
                </>)
              : error !== undefined
                ? (
                  <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center'>
                    <Typography>An error has been occurred</Typography>
                  </Box>)
                : (data?.map((review, i) => (
                  <ReviewCard
                    key={i}
                    product={review.product}
                    client={review.client}
                    review={review.review}
                    rating={review.valoration}
                  />)))
          }
        </Box>
      </Box>
    </>
  )
}
