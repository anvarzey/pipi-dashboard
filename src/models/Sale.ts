import { model, models, Schema } from 'mongoose'

export interface ISale {
  client: {
    type: Schema.Types.ObjectId
    ref: 'User'
  }
  products: [
    {
      product: {
        type: Schema.Types.ObjectId
        ref: 'Product'
      }
      category: string
      variant: string
      quantity: number
      total: number
    }
  ]
  totalPrice: number
  date: Date
}

const saleSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    {
      _id: false,
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      },
      category: String,
      variant: String,
      quantity: Number,
      total: Number
    }
  ],
  totalPrice: Number,
  date: Date
})

export let Sale: typeof models.Sale

if (models.Sale !== undefined && models.Sale !== null) {
  Sale = models.Sale
} else {
  Sale = model('Sale', saleSchema)
}
