import rentals from '../models/rentals.js'

export const createRentals = async (req, res) => {
  try {
    const imagePath = []
    if (req.files.images) {
      req.files.images.forEach(item => {
        imagePath.push(item.path)
      })
    }

    const result = await rentals.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req?.files.image[0].path || '',
      images: [...imagePath],
      suggest: req.body.suggest,
      size: req.body.size,
      equipment: req.body.equipment,
      number: req.body.number,
      attention: req.body.attention
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

export const getSellRentals = async (req, res) => {
  try {
    const result = await rentals.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllRentals = async (req, res) => {
  try {
    const result = await rentals.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getRentals = async (req, res) => {
  try {
    const result = await rentals.findById(req.params.id)
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

export const editRentals = async (req, res) => {
  try {
    const mainImage = req?.files?.image ? req?.files?.image[0].path : req.body.image
    const imagePath = []
    if (req?.files.images) {
      req.files.images.forEach(item => {
        imagePath.push(item.path)
      })
    } else if (req.body.images) {
      if (typeof req.body.images === 'string') {
        imagePath.push(req.body.images)
      } else {
        imagePath.push(...req.body.images)
      }
    }
    const result = await rentals.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: mainImage,
        images: [...imagePath],
        suggest: req.body.suggest,
        size: req.body.size,
        equipment: req.body.equipment,
        number: req.body.number,
        attention: req.body.attention
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
