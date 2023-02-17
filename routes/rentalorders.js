import { Router } from 'express'
import content from '../middleware/content.js'
import { jwt } from '../middleware/auth.js'
import { createRentalorders, getRentalorders, editRentalorders } from '../controllers/rentalorders.js'

const router = Router()

router.post('/', content('application/json'), jwt, createRentalorders)

router.get('/', getRentalorders)
router.patch('/:id', content('application/json'), jwt, editRentalorders)
export default router
