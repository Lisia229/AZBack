import { Schema, model, ObjectId } from 'mongoose'

const orderSchema = new Schema({
  data: {
    type: ObjectId,
    refPath: 'products.dataModel',
    required: [true, '缺少 ID']
  },
  dataModel: {
    type: String,
    required: [true, '缺少關聯'],
    enum: {
      values: ['products', 'exhibitions'],
      message: '關聯錯誤'
    }
  },
  quantity: {
    type: Number,
    required: [true, '缺少數量']
  }
})

const schema = new Schema(
  {
    u_id: {
      type: ObjectId,
      ref: 'users',
      required: [true, '缺少使用者']
    },
    products: {
      type: [orderSchema],
      default: []
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
)

export default model('orders', schema)
