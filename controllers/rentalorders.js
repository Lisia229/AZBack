import rentalorders from '../models/rentalorders.js'

export const createRentalorders = async (req, res) => {
  try {
    const result = await rentalorders.create({
      name: req.body.name,
      unit: req.body.unit,
      email: req.body.email,
      date: req.body.date,
      time: req.body.date,
      phone: req.body.phone,
      adresse: req.body.adresse,
      category: req.body.category,
      rental: req.body.rental,
      visite: req.body.visite,
      uniform: req.body.uniform,
      activity: req.body.activity,
      dateStart: req.body.dateStart,
      dateEnd: req.body.dateEnd,
      mainname: req.body.mainname,
      description: req.body.description
    })
    res.status(200).json({ success: true, message: '', result })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getRentalorders = async (req, res) => {
  try {
    const result = await rentalorders.find()
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

export const editRentalorders = async (req, res) => {
  try {
    const result = await rentalorders.findByIdAndUpdate(req.params.id, {
      checked: req.body.checked
    }, { new: true })
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
