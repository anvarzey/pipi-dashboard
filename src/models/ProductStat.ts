import { model, models, Schema } from 'mongoose'

const productStatSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  variant: String,
  year: Number,
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
  ]
},
{
  timestamps: true
})

export let ProductStat: typeof models.ProductStat

if (models.ProductStat !== undefined && models.ProductStat !== null) {
  ProductStat = models.ProductStat
} else {
  ProductStat = model('ProductStat', productStatSchema)
}
