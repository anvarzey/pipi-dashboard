import { NextApiRequest, NextApiResponse } from 'next'
import { IOverallStat, OverallStat } from '@/models/OverallStat'
import { User } from '@/models/User'
import '@/services/connectToMongo'

export default async function dashboardHandler (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const allStats: IOverallStat[] = await OverallStat.find({})
    // if (allStats === null) throw new Error('')
    const currentDay = 15
    const currentMonth = 2
    const actualYearIndex = allStats.findIndex(stat => stat.year === 2023)

    const currentMonthIndex = allStats[actualYearIndex].monthlyData.findIndex(month => month.month === currentMonth)
    const currentDayIndex = allStats[actualYearIndex].dailyData.findIndex(day => day.date === currentDay && day.month === currentMonth)

    const currentYearUnits = allStats[actualYearIndex].totalUnits
    const currentMonthUnits = allStats[actualYearIndex].monthlyData[currentMonthIndex].totalUnits
    const currentDayUnits = allStats[actualYearIndex].dailyData[currentDayIndex].totalUnits

    const customersList = await User.find({ role: 'client' })

    res.status(200).json({
      currentMonthIndex,
      currentDayIndex,
      currentYearUnits,
      currentMonthUnits,
      currentDayUnits,
      totalCustomers: customersList.length
    })
  } catch (e: any) {
    if (typeof e === 'string') {
      res.status(400).send(e)
    } else {
      res.status(400).send(e.message)
    }
  }
}
