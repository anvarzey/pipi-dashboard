import {
  model,
  models,
  Schema,
  Types
} from 'mongoose'

export interface IProduct {
  _id: string
  name: string
  category: string
  images: [string]
  price: number
  variants: [
    {
      option: string
      price: number
    }
  ]
  description: string
  daysInAdvance: number
  allergens: [string]
  rating: number
  reviews: [{
    _id: string
    valoration: number
  }]
  | Types.ObjectId[]
}

const productSchema = new Schema({
  name: String,
  category: {
    type: String,
    required: true
  },
  images: [String],
  price: Number,
  variants: [
    {
      _id: false,
      option: String,
      price: Number
    }
  ],
  description: String,
  daysInAdvance: Number,
  allergens: [String],
  rating: Number,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
})

export let Product: typeof models.Product

if (models.Product !== undefined && models.Product !== null) {
  Product = models.Product
} else {
  Product = model('Product', productSchema)
}
