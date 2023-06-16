import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '@/models/Product'
import '@/services/connectToMongo'
import { Types } from 'mongoose'

export default async function productHandler (
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  const { id } = req.query
  
  if (id === undefined) throw new Error('Invalid id')
  
  let queryId
  if (typeof id === 'string') {
    queryId = id
  } else {
    queryId = id[0]
    }
    
    if (!Types.ObjectId.isValid(queryId)) throw new Error('Not valid id')

    try {
    const productFound = await Product.findById(queryId).catch(() => res.status(404).send('Product not found'))

    if (productFound === null) throw new Error('Product not found')
    res.status(200).json(productFound)
  } catch (e: any) {
    if (typeof e === 'string') {
      res.status(400).send(e)
    } else {
      res.status(400).send(e.message)
    }
  }
}
