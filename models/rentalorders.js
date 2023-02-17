import { Schema, model } from 'mongoose'
import validator from 'validator'

const schema = new Schema(
  {
    // -申請人名稱
    name: {
      type: String,
      required: [true, '缺少名稱']
    },
    unit: {
      // -申請單位
      type: String,
      required: [true, '缺少名稱']
    },
    // -聯絡信箱
    email: {
      type: String,
      required: [true, '缺少信箱'],
      unique: true,
      validate: {
        validator (email) {
          return validator.isEmail(email)
        },
        message: '信箱格式錯誤'
      }
    },
    date: {
      // -填表日期
      type: String,
      required: [true, '缺少活動時間']
    },
    time: {
      // -填表時間
      type: String,
      required: [true, '缺少活動時間']
    },
    phone: {
      // -聯絡電話
      type: Number,
      required: [true, '缺少電話']
    },
    adresse: {
      // -聯絡地址
      type: String,
      required: [true, '缺少名稱']
    },
    // -單位類別
    category: {
      type: String,
      required: [true, '缺少分類'],
      enum: {
        values: ['一般團體', '藝文團體', '其他'],
        message: '分類錯誤'
      }
    },
    // -申請場地
    rental: {
      type: String,
      required: [true, '缺少分類'],
      enum: {
        values: ['玻璃貨櫃屋(2層樓)', 'AZ劇場', '展覽會館', '其他'],
        message: '分類錯誤'
      }
    },
    // -參觀性質
    visite: {
      type: String,
      required: [true, '缺少分類'],
      enum: {
        values: ['不開放', '自由入場', '索票/邀請函', '售票', '其他'],
        message: '分類錯誤'
      }
    },
    uniform: {
      // -統一編號
      type: Number,
      required: [true, '缺少統一編號']
    },
    // -活動性質
    activity: {
      type: String,
      required: [true, '缺少分類'],
      enum: {
        values: [
          '座談會/研討會/研習/講座/論壇',
          '記者會/發表會',
          '同人/社團活動',
          '藝術/文化展演活動',
          '消費者體驗活動',
          '演唱會/簽名會',
          '個展/畢展',
          '影片/平面拍攝',
          '園遊會/家庭日/市集',
          '其他'
        ],
        message: '分類錯誤'
      }
    },
    dateStart: {
      // -開始日期
      type: String,
      required: [true, '缺少開始日期']
    },
    dateEnd: {
      // -結束日期
      type: String,
      required: [true, '缺少結束日期']
    },
    // -活動名稱
    mainname: {
      type: String,
      required: [true, '缺少名稱']
    },
    description: {
      // -活動敘述
      type: String,
      required: [true, '缺少說明']
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false }
)

export default model('rentalorders', schema)
