import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    // -展覽名稱
    name: {
      type: String,
      required: [true, '缺少名稱']
    },
    place: {
      type: String,
      required: [true, '缺少地點'],
      enum: {
        values: ['玻璃貨櫃屋(2層樓)', 'AZ劇場', '展覽會館', '其他'],
        message: '地點錯誤'
      }
    },
    price: {
      // -門票價格
      type: Number,
      min: [0, '免費入場'],
      required: [true, '缺少價格']
    },
    description: {
      // -活動敘述
      type: String,
      required: [true, '缺少說明']
    },
    image: {
      // -展覽照片
      type: String,
      required: [true, '缺少圖片']
    },
    dateStart: {
      // -展覽時間
      type: Date,
      required: [true, '缺少日期']
    },
    dateEnd: {
      // -展覽時間
      type: Date,
      required: [true, '缺少日期']
    },
    time: {
      // -展覽時間
      type: String,
      required: [true, '缺少日期']
    },
    sell: {
      // -展覽是否還有效
      type: Boolean,
      required: [true, '缺少狀態']
    },
    category: {
      type: String,
      required: [true, '缺少分類'],
      enum: {
        values: ['期間限定店', '市集活動', '論壇演講', '展演活動', '其他'],
        message: '分類錯誤'
      }
    }
  },
  { versionKey: false }
)

export default model('exhibitions', schema)
