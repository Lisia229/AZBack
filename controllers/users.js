import users from '../models/users.js'
import products from '../models/products.js'
import exhibitions from '../models/exhibitions.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    console.log(req.body)
    await users.create({
      account: req.body.account,
      password: req.body.password,
      email: req.body.email
    })
    res.status(200).json({ success: true, message: '' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).json({ success: false, message: '帳號重複' })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const login = async (req, res) => {
  try {
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.tokens.push(token)
    await req.user.save()
    const loves = req.user.love.map(item => item.data)
    res.status(200).json({
      success: true,
      message: '',
      result: {
        token,
        account: req.user.account,
        email: req.user.email,
        cart: req.user.cart.reduce((total, current) => total + current.quantity, 0),
        role: req.user.role,
        image: req.user.image,
        love: loves
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token !== req.token)
    await req.user.save()
    res.status(200).json({ success: true, message: '' })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const extend = async (req, res) => {
  try {
    const idx = req.user.tokens.findIndex(token => token === req.token)
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' })
    req.user.tokens[idx] = token
    await req.user.save()
    res.status(200).json({ success: true, message: '', result: token })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getUser = (req, res) => {
  try {
    const loves = req.user.love.map(item => item.data)

    res.status(200).json({
      success: true,
      message: '',
      result: {
        account: req.user.account,
        email: req.user.email,
        cart: req.user.cart.reduce((total, current) => total + current.quantity, 0),
        role: req.user.role,
        image: req.user.image,
        love: loves
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const editCart = async (req, res) => {
  try {
    console.log(req.body)
    // !找購物車有沒有此商品
    if (req.body.p_id) {
      const idx = req.user.cart.findIndex(cart => cart.data.toString() === req.body.p_id)

      if (idx > -1) {
        // !如果有，檢查新數量是多少
        const quantity = req.user.cart[idx].quantity + parseInt(req.body.quantity)
        if (quantity <= 0) {
          // !如果新數量小於 0，從購物車陣列移除
          req.user.cart.splice(idx, 1)
        } else {
          // !如果新數量大於 0，修改購物車陣列數量
          req.user.cart[idx].quantity = quantity
        }
      } else {
        // !如果購物車內沒有此商品，檢查商品是否存在
        const product = await products.findById(req.body.p_id)
        // !如果不存在，回應 404
        if (!product || !product.sell) {
          res.status(404).send({ success: false, message: '找不到' })
          return
        }
        // !如果存在，加入購物車陣列
        req.user.cart.push({
          data: req.body.p_id,
          dataModel: 'products',
          quantity: parseInt(req.body.quantity)
        })
      }
    }
    if (req.body.e_id) {
      const eidx = req.user.cart.findIndex(cart => {
        console.log(cart)
        return cart.data.toString() === req.body.e_id
      })

      if (eidx > -1) {
        // !如果有，檢查新數量是多少
        const quantity = req.user.cart[eidx].quantity + parseInt(req.body.quantity)
        console.log(req.body.quantity)
        if (quantity <= 0) {
          // !如果新數量小於 0，從購物車陣列移除
          req.user.cart.splice(eidx, 1)
        } else {
          // !如果新數量大於 0，修改購物車陣列數量
          req.user.cart[eidx].quantity = quantity
        }
      } else {
        // !如果購物車內沒有此商品，檢查商品是否存在
        const exhibition = await exhibitions.findById(req.body.e_id)
        // !如果不存在，回應 404
        if (!exhibition || !exhibition.sell) {
          res.status(404).send({ success: false, message: '找不到' })
          return
        }
        // !如果存在，加入購物車陣列
        req.user.cart.push({
          data: req.body.e_id,
          dataModel: 'exhibitions',
          quantity: parseInt(req.body.quantity)
        })
      }
    }

    await req.user.save()
    res.status(200).json({ success: true, message: '', result: req.user.cart.reduce((total, current) => total + current.quantity, 0) })
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getCart = async (req, res) => {
  try {
    const result = await users.findById(req.user._id, 'cart').populate('cart.data')

    res.status(200).json({ success: true, message: '', result: result.cart })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const adminEditUser = async (req, res) => {
  try {
    const imageUrl = req.files.image ? req.files.image[0].path : null
    const data = {
      account: req.body.account,
      email: req.body.email,
      role: req.body.role
    }

    if (imageUrl) {
      data.image = imageUrl
    }

    const result = await users.findByIdAndUpdate(req.body._id, data, { new: true }).select('-password')

    res.status(200).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const editUser = async (req, res) => {
  try {
    const imageUrl = req.files.image ? req.files.image[0].path : null
    if (imageUrl) {
      req.user.image = imageUrl
    }

    req.user.account = req.body.account
    req.user.email = req.body.email

    await req.user.save()

    res.status(200).json({
      success: true,
      message: '',
      result: {
        account: req.user.account,
        email: req.user.email,
        image: req.user.image,
        role: req.user.role
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const getAllUser = async (req, res) => {
  try {
    const result = await users.find().select('-password')
    res.status(200).json({
      success: true,
      message: '',
      result
    })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}

export const editLove = async (req, res) => {
  try {
    console.log(req.body)
    if (req.body.e_id) {
      const eIdx = req.user.love.findIndex(love => love.data.toString() === req.body.e_id)
      if (eIdx === -1) {
        req.user.love.push({
          data: req.body.e_id,
          dataModel: 'exhibitions'
        })
      } else {
        req.user.love.splice(eIdx, 1)
      }

      await req.user.save()
      res.status(200).json({ success: true, message: '', result: req.body.e_id })
    }

    if (req.body.p_id) {
      const Idx = req.user.love.findIndex(love => love.data.toString() === req.body.p_id)
      if (Idx === -1) {
        req.user.love.push({
          data: req.body.p_id,
          dataModel: 'products'
        })
      } else {
        req.user.love.splice(Idx, 1)
      }
      await req.user.save()
      res.status(200).json({ success: true, message: '', result: req.body.p_id })
    }
  } catch (error) {
    console.log(error)
    if (error.name === 'ValidationError') {
      res.status(400).json({ success: false, message: error.errors[Object.keys(error.errors)[0]].message })
    } else {
      res.status(500).json({ success: false, message: '未知錯誤' })
    }
  }
}

export const getLove = async (req, res) => {
  try {
    const result = await users.findById(req.user._id, 'love').populate('love.data')
    res.status(200).json({ success: true, message: '', result: result.love })
  } catch (error) {
    res.status(500).json({ success: false, message: '未知錯誤' })
  }
}
