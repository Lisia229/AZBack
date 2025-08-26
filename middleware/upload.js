// -雲端設定 https://cloudinary.com/console/c-a6da0d97d962835c7382427660402b
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({ cloudinary })

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image')) {
      const err = new multer.MulterError('LIMIT_FILE_FORMAT')
      cb(err, false)
    } else {
      cb(null, true)
    }
  },
  limits: { fileSize: 1024 * 1024 } // 1MB
})

export default (req, res, next) => {
  upload.fields([{ name: 'image' }, { name: 'images', maxCount: 10 }])(req, res, err => {
    if (err instanceof multer.MulterError) {
      console.error('MulterError:', err) // 🌟 debug：印出完整 Multer 錯誤
      let message = '上傳錯誤'
      if (err.code === 'LIMIT_FILE_SIZE') message = '檔案太大'
      else if (err.code === 'LIMIT_FILE_FORMAT') message = '檔案格式錯誤'
      return res.status(400).json({ success: false, message })
    } else if (err) {
      console.error('未知錯誤:', err) // 🌟 debug：印出完整未知錯誤
      return res.status(500).json({ success: false, message: '未知錯誤' })
    }

    // debug: 印出上傳後的檔案資訊
    if (req.files) console.log('上傳成功檔案資訊:', req.files)

    next()
  })
}
