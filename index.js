import 'dotenv/config'
import express from 'express'
import mongoose, { set } from 'mongoose'
import cors from 'cors'
import https from 'https'
import userRoute from './routes/users.js'
import exhibitionsRoute from './routes/exhibitions.js'
import rentalsRoute from './routes/rentals.js'
import storeRoute from './routes/stories.js'
import contectRoute from './routes/contect.js'
import productsRoute from './routes/products.js'
import orderRoute from './routes/orders.js'
import rentalordersRoute from './routes/rentalorders.js'

import './passport/passport.js'

mongoose.connect(process.env.DB_URL)
mongoose.set('sanitizeFilter', true)

// 若你希望未來 Mongoose 7 的行為（strictQuery=false）
mongoose.set('strictQuery', true)

const app = express()

// - 跨域請求設定
app.use(
  cors({
    // - origin 代表請求來源
    origin(origin, callback) {
      // - 只允許github licalhost 和後端的 postman 請求
      if (origin.includes('github') || origin.includes('localhost') || origin === undefined) {
        // - callback(錯誤, 是否允許)
        callback(null, true)
      } else {
        callback(new Error(), false)
      }
    }
  })
)

// - 處理跨域錯誤
app.use((_, req, res, next) => {
  res.status(400).json({ success: false, message: '請求被拒' })
})

app.use(express.json())

app.use((_, req, res, next) => {
  res.status(400).json({ success: false, message: '格式錯誤' })
})

app.use('/users', userRoute)
app.use('/exhibitions', exhibitionsRoute)
app.use('/stories', storeRoute)
app.use('/rentals', rentalsRoute)
app.use('/contect', contectRoute)
app.use('/products', productsRoute)
app.use('/orders', orderRoute)
app.use('/rentalorders', rentalordersRoute)

// app.get('/', (req, res) => {
//   res.status(200).json({ success: true, message: '' })
// })

app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: '找不到' })
})

app.listen(process.env.PORT || 4000, () => {
  console.log('伺服器啟動')
})

if (process.env.RENDER) {
  setInterval(() => {
    https.get(process.env.RENDER)
  }, 1000 * 60 * 5)
}
