import useSWR from 'swr'
import { IUser } from '@/models/User'

interface IReturnTypes {
  data: IUser[]
  isLoading: boolean
  error: Error | undefined
}

export default function useUsers (): IReturnTypes {
  const { data, isLoading, error } = useSWR('/api/user')

  return {
    data,
    isLoading,
    error
  }
}
