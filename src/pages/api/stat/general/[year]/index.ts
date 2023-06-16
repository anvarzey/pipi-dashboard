import { NextApiRequest, NextApiResponse } from 'next'
import { OverallStat } from '@/models/OverallStat'
import '@/services/connectToMongo'

export default async function yearStatsHandler (
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  const { year } = req.query

  try {
    const yearStats = await OverallStat.findOne({ year })
    res.status(200).json(yearStats)
  } catch (e: any) {
    if (typeof e === 'string') {
      res.status(400).send(e)
    } else {
      res.status(400).send(e.message)
    }
  }
}
