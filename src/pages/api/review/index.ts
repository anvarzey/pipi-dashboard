import { NextApiRequest, NextApiResponse } from 'next'
import { Review } from '@/models/Review'
import '@/services/connectToMongo'
import { User } from '@/models/User'
import { Product } from '@/models/Product'

export default async function reviewsHandler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    try {
      const allReviews = await Review
        .find({})
        .populate({
          path: 'client',
          model: User,
          select: 'firstName avatar'
        })
        .populate({
          path: 'product',
          model: Product,
          select: 'name'
        })

      res.status(200).json(allReviews)
    } catch (e: any) {
      if (typeof e === 'string') {
        res.status(400).send(e)
      } else {
        res.status(400).send(e.message)
      }
    }
  } else {
    res.status(405)
  }
}
