import express from 'express'
const router = express.Router()
import { addCategory, getCategories } from '../controllers/category.js'
import { requireSingin, adminMiddleware } from '../middleware/index.js'


router.post('/category/create', requireSingin, adminMiddleware, addCategory)
// router.post('/category/create', addCategory)
router.get('/category/getcategory', getCategories)

export default router