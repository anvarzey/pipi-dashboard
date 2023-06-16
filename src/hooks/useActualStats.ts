import useSWR from 'swr'
import { IOverallStat } from '@/models/OverallStat'

interface IProps {
  isLoading: boolean
  data: IOverallStat
  error: Error | undefined
}

export default function useActualStats (): IProps {
  const { data, isLoading, error } = useSWR('/api/stat/general/actual')

  return {
    data,
    isLoading,
    error
  }
}
