import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/models/User'
import '@/services/connectToMongo'
import { Types } from 'mongoose'

export default async function userHandler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { id } = req.query

  if (id === undefined) throw new Error('Not found')

  let queryId
  if (typeof id === 'string') {
    queryId = id
  } else {
    queryId = id[0]
  }

  try {
    if (!Types.ObjectId.isValid(queryId)) throw new Error('Not valid id')
    const userFound = await User.findById(queryId).catch(() => res.status(404).send('User not found'))
    if (userFound === null) res.status(404).send('User not found')
    res.status(200).send(userFound)
  } catch (e: any) {
    if (typeof e === 'string') {
      res.status(400).send(e)
    } else {
      res.status(400).send(e.message)
    }
  }
}
