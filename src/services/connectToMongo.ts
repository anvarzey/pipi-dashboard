import mongoose from 'mongoose'

const { MONGO_URI } = process.env

if (MONGO_URI !== undefined) {
  mongoose.set('strictQuery', false)

  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('Database connected')
    })
    .catch(err => console.error(err))
}
