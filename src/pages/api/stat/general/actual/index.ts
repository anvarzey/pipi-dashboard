import { NextApiRequest, NextApiResponse } from 'next'
import { OverallStat } from '@/models/OverallStat'
import '@/services/connectToMongo'

export default async function actualStatsHandler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const year = new Date().getFullYear()
  try {
    const yearStats = await OverallStat.findOne({ year })
    if (yearStats === null) throw new Error('Not found')
    res.status(200).json(yearStats)
  } catch (e: any) {
    if (typeof e === 'string') {
      res.status(400).send(e)
    } else {
      res.status(400).send(e.message)
    }
  }
}
