import { NextApiRequest, NextApiResponse } from 'next'
import { Sale } from '@/models/Sale'
import '@/services/connectToMongo'

export default async function salesHandler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const allSales = await Sale.find({})

    res.status(200).json(allSales)
  } catch (e: any) {
    if (typeof e === 'string') {
      res.status(400).send(e)
    } else {
      res.status(400).send(e.message)
    }
  }
}
