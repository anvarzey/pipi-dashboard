import { NextApiRequest, NextApiResponse } from 'next'
import { ProductStat } from '@/models/ProductStat'
import '@/services/connectToMongo'

export default async function productStatsHandler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const allProductStats = await ProductStat.find({})

    res.status(200).json(allProductStats)
  } catch (e: any) {
    if (typeof e === 'string') {
      res.status(400).send(e)
    } else {
      res.status(400).send(e.message)
    }
  }
}
