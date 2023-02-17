import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, '缺少名稱']
    },
    price: {
      type: Number,
      min: [0, '價格錯誤'],
      required: [true, '缺少價格']
    },
    description: {
      type: String,
      required: [true, '缺少說明']
    },
    colors: {
      type: String,
      required: [true, '缺少商品選項']
    },
    image: {
      type: String,
      required: [true, '缺少圖片']
    },
    images: {
      // -照片
      type: [String],
      default: []
    },
    sell: {
      type: Boolean,
      required: [true, '缺少狀態']
    },
    category: {
      type: String,
      required: [true, '缺少分類'],
      enum: {
        values: ['衣服', '褲子', '文創', '文具', '包包', '飾品', '其他'],
        message: '分類錯誤'
      }
    }
  },
  { versionKey: false }
)

export default model('products', schema)
