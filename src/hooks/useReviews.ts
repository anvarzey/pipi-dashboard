import useSWR from 'swr'

interface IReviewPopulated {
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
  valoration: number
}

interface IReturnTypes {
  data: IReviewPopulated[]
  isLoading: boolean
  error: Error | undefined
}

export default function useReviews (): IReturnTypes {
  const { data, isLoading, error } = useSWR('/api/review')

  return {
    data,
    isLoading,
    error
  }
}
