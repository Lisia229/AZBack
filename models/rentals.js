import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    // -場地名稱
    name: {
      type: String,
      required: [true, '缺少名稱']
    },
    price: {
      // -場地價格/日
      type: Number,
      min: [0, '免費入場'],
      required: [true, '缺少價格']
    },
    description: {
      // -場地敘述
      type: String,
      required: [true, '缺少說明']
    },
    image: {
      // -場地主照片
      type: String,
      required: [true, '缺少圖片']
    },
    images: {
      // -場地照片
      type: [String],
      default: []
    },
    // -場地使用建議
    suggest: {
      type: String,
      required: [true, '缺少使用建議']
    },
    // -場地尺寸有多大
    size: {
      type: String,
      required: [true, '缺少場地尺寸']
    },
    // -場地有的設備
    equipment: {
      type: String,
      required: [true, '缺少設備']
    },
    number: {
      // -場地預估可容納人數
      type: String,
      min: [0, '無法容納'],
      required: [true, '缺少容納人數']
    },
    // -場地注意事項
    attention: {
      type: String,
      required: [true, '缺少設備']
    }
  },
  { versionKey: false }
)

export default model('rentals', schema)
