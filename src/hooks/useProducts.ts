import useSWR from 'swr'
import { IProduct } from '@/models/Product'

interface IReturnTypes {
  data: IProduct[]
  isLoading: boolean
  error: Error | undefined
}

export default function useProducts (): IReturnTypes {
  const { data, isLoading, error } = useSWR('/api/product')

  return {
    data,
    isLoading,
    error
  }
}
