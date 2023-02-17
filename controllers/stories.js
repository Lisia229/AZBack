import stories from '../models/stories.js'

export const createStories = async (req, res) => {
  try {
    const imagePath = []
    if (req.files.images) {
      req.files.images.forEach(item => {
        imagePath.push(item.path)
      })
    }

    const result = await stories.create({
      name: req.body.name,
      place: req.body.place,
      dateValue: req.body.dateValue,
      special: req.body.special,
      url: req.body.url,
      introduction: req.body.introduction,
      description: req.body.description,
      image: req?.files.image[0].path || '',
      images: [...imagePath]
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getSellStories = async (req, res) => {
  try {
    const result = await stories.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllStories = async (req, res) => {
  try {
    const result = await stories.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getStories = async (req, res) => {
  try {
    const result = await stories.findById(req.params.id)
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const editStories = async (req, res) => {
  try {
    const mainImage = req?.files?.image ? req?.files?.image[0].path : req.body.image
    const imagePath = []
    if (req.files.images) {
      req.files.images.forEach(item => {
        imagePath.push(item.path)
      })
    }
    if (typeof req.body.images === 'string') {
      imagePath.push(req.body.images)
    }
    if (typeof req.body.images === 'object') {
      req.body.images.forEach(item => {
        if (item !== '' && item !== undefined && item !== null) {
          imagePath.push(item)
        }
      })
    }

    const result = await stories.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        place: req.body.place,
        dateValue: req.body.dateValue,
        special: req.body.special,
        url: req.body.url,
        introduction: req.body.introduction,
        description: req.body.description,
        image: mainImage,
        images: [...imagePath]
      },
      { new: true }
    )
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
