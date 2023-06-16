import { NextApiRequest, NextApiResponse } from 'next'
import { OverallStat } from '@/models/OverallStat'
import '@/services/connectToMongo'

export default async function gralStatsHandler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const allOverallStats = await OverallStat.find({})
    res.status(200).json(allOverallStats)
  } catch (e: any) {
    if (typeof e === 'string') {
      res.status(400).send(e)
    } else {
      res.status(400).send(e.message)
    }
  }
}
