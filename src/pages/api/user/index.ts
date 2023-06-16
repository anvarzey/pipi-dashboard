import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/models/User'
import '@/services/connectToMongo'

export default async function usersHandler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === 'GET') {
    try {
      const allUsers = await User.find({}).select('-passwordHash')

      res.status(200).json(allUsers)
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
