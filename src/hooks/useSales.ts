import useSWR from 'swr'
import { ISale } from '@/models/Sale'

interface IReturnTypes {
  data: ISale[]
  isLoading: boolean
  error: Error | undefined
}

export default function useSales (): IReturnTypes {
  const { data, isLoading, error } = useSWR('/api/sale')

  return {
    data,
    isLoading,
    error
  }
}
