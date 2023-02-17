import exhibitions from '../models/exhibitions.js'

export const createExhibitions = async (req, res) => {
  try {
    const result = await exhibitions.create({
      name: req.body.name,
      place: req.body.place,
      time: req.body.time,
      price: req.body.price,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      description: req.body.description,
      image: req.file?.path || '',
      sell: req.body.sell,
      category: req.body.category
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

export const getSellExhibitions = async (req, res) => {
  try {
    const result = await exhibitions.find({ sell: true })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllExhibitions = async (req, res) => {
  try {
    const result = await exhibitions.find()
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getExhibitions = async (req, res) => {
  try {
    const result = await exhibitions.findById(req.params.id)
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

export const editExhibitions = async (req, res) => {
  try {
    const result = await exhibitions.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        place: req.body.place,
        price: req.body.price,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        time: req.body.time,
        description: req.body.description,
        image: req.file?.path,
        sell: req.body.sell,
        category: req.body.category
      },
      { new: true }
    )
    if (!result) {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(200).json({ success: true, message: '', result })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'CastError') {
      res.status(404).json({ success: false, message: '找不到' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}
