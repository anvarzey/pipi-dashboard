import useSWR from 'swr'
import { IOverallStat } from '@/models/OverallStat'

interface IReturnTypes {
  data: IOverallStat[]
  isLoading: boolean
  error: Error | undefined
}

export default function useGralStats (): IReturnTypes {
  const { data, isLoading, error } = useSWR('/api/stat/general')

  return {
    data,
    isLoading,
    error
  }
}
