import { model, models, Schema } from 'mongoose'

export interface IOverallStat {
  year: number
  totalSold: number
  totalUnits: number
  monthlyData: [
    {
      month: number
      totalSold: number
      totalUnits: number
    }
  ]
  dailyData: [
    {
      date: number
      month: number
      totalSold: number
      totalUnits: number
    }
  ]
  salesByCategory: Map<string, number>
}

const overallStatSchema = new Schema<IOverallStat>({
  year: {
    type: Number,
    required: true
  },
  totalSold: {
    type: Number,
    required: true
  },
  totalUnits: {
    type: Number,
    required: true
  },
  monthlyData: [
    {
      month: {
        type: Number,
        required: true
      },
      totalSold: {
        type: Number,
        required: true
      },
      totalUnits: {
        type: Number,
        required: true
      }
    }
  ],
  dailyData: [
    {
      date: Number,
      month: Number,
      totalSold: {
        type: Number,
        required: true
      },
      totalUnits: {
        type: Number,
        required: true
      }
    }
  ],
  salesByCategory: {
    type: Map,
    of: Number,
    required: true
  }
}, {
  timestamps: true
})

export let OverallStat: typeof models.OverallStat

if (models.OverallStat !== undefined && models.OverallStat !== null) {
  OverallStat = models.OverallStat
} else {
  OverallStat = model<IOverallStat>('OverallStat', overallStatSchema)
}
