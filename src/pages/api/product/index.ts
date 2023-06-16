import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '@/models/Product'
import '@/services/connectToMongo'

export default async function productsHandler (
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  try {
    const allProducts = await Product.find({})

    res.status(200).json(allProducts)
  } catch (e: any) {
    if (typeof e === 'string') {
      res.status(400).send(e)
    } else {
      res.status(400).send(e.message)
    }
  }
}
