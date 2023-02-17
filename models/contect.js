import { Schema, model } from 'mongoose'
import validator from 'validator'

const schema = new Schema(
  {
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
    subject: {
      type: String,
      required: [true, '缺少主題']
    },
    message: {
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

export default model('contect', schema)
