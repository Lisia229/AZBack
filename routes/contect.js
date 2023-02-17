import { Router } from 'express'
import content from '../middleware/content.js'
import { jwt } from '../middleware/auth.js'
import { createContect, getContect, editContect } from '../controllers/contect.js'

const router = Router()

router.post('/', content('application/json'), jwt, createContect)

router.get('/', getContect)
router.patch('/:id', content('application/json'), jwt, editContect)
export default router
