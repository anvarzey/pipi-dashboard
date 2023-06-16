import { model, models, Schema } from 'mongoose'

export interface IUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  avatar: string
  reviews: [string]
  favourites: [string]
  purchases: [string]
  role: string
}

export const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 12
  },
  passwordHash: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  favourites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  purchases: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sale'
    }
  ],
  role: {
    type: String,
    required: true,
    enum: ['client', 'admin', 'superadmin']
  }
}, {
  timestamps: true
})

export let User: typeof models.User

if (models.User !== undefined && models.User !== null) {
  User = models.User
} else {
  User = model('User', userSchema)
}
