import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createStories, getAllStories, getStories, getSellStories, editStories } from '../controllers/stories.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createStories)
router.get('/', getSellStories)
router.get('/all', jwt, admin, getAllStories)
router.get('/:id', getStories)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, editStories)

export default router
