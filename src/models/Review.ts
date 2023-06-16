import { model, models, Schema } from 'mongoose'
import { Product, IProduct } from './Product'
import { IUser } from './User'

export interface IReview {
  client: IUser
  product: IProduct
  review: string
  valoration: number
}

const reviewSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  review: String,
  valoration: {
    type: Number,
    min: 1,
    max: 5
  }
})

export let Review: typeof models.Review

if (models.Review !== undefined && models.Review !== null) {
  Review = models.Review
} else {
  Review = model('Review', reviewSchema)
}
