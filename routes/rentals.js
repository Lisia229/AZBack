import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createRentals, getAllRentals, getRentals, getSellRentals, editRentals } from '../controllers/rentals.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createRentals)
router.get('/', getSellRentals)
router.get('/all', jwt, admin, getAllRentals)
router.get('/:id', getRentals)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, editRentals)

export default router
