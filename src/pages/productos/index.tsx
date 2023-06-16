import { ReactElement } from 'react'
import {
  Box,
  Skeleton,
  Typography
} from '@mui/material'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
// import useProducts from '@/hooks/useProducts'
import useSWR from 'swr'
import { IProduct } from '@/models/Product'
import Head from 'next/head'

export default function Products (): ReactElement {
  // const { data, isLoading } = useProducts()
  const { data, isLoading, error }: { data: IProduct[] | undefined, isLoading: boolean, error: Error | undefined } = useSWR('/api/product')

  return (
    <>
      <Head>
        <title>Productos | Pipi Bakery</title>
      </Head>
      <Box p='0.5rem 2rem'>
        <Header title='PRODUCTOS' />
        <Typography fontStyle='italic'>Nuestra línea de productos</Typography>
        <Box
          display='grid'
          sx={{ gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))', gridAutoRows: '24rem', gap: '1.5rem' }}
          m='0 auto'
          p='1rem 0'
        >
          {
            isLoading
              ? (
                <>
                  <Skeleton variant='rounded' width='18rem' height='24rem' />
                  <Skeleton variant='rounded' width='18rem' height='24rem' />
                  <Skeleton variant='rounded' width='18rem' height='24rem' />
                  <Skeleton variant='rounded' width='18rem' height='24rem' />
                  <Skeleton variant='rounded' width='18rem' height='24rem' />
                  <Skeleton variant='rounded' width='18rem' height='24rem' />
                  <Skeleton variant='rounded' width='18rem' height='24rem' />
                  <Skeleton variant='rounded' width='18rem' height='24rem' />
                </>)
              : error !== undefined
                ? (
                  <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center'>
                    <Typography>An error has been occurred</Typography>
                  </Box>)
                : (data?.map(product => (
                  <ProductCard
                    key={product.name}
                    category={product.category}
                    images={product.images}
                    name={product.name}
                    rating={product.rating}
                    variants={product.variants}
                  />)))
          }
        </Box>
      </Box>
    </>
  )
}
