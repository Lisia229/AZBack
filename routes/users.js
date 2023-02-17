import { Router } from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { register, login, logout, extend, getUser, editUser, getAllUser, adminEditUser, editCart, getCart, editLove, getLove } from '../controllers/users.js'

const router = Router()

// !content('application/json') 單純的資料
router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.patch('/extend', auth.jwt, extend)

// !multipart/form-data 有圖片的資料
router.patch('/edit', content('multipart/form-data'), auth.jwt, upload, editUser)
router.patch('/edituser', content('multipart/form-data'), auth.jwt, admin, upload, adminEditUser)
router.get('/me', auth.jwt, getUser)
router.get('/all', auth.jwt, getAllUser)
router.post('/cart', content('application/json'), auth.jwt, editCart)
router.get('/cart', auth.jwt, getCart)
router.post('/love', content('application/json'), auth.jwt, editLove)
router.get('/love', auth.jwt, getLove)
export default router
