import express from 'express'
const router = express.Router()
import { addCategory, getCategories } from '../controllers/category.js'
import { requireSingin, adminMiddleware } from '../middleware/index.js'
import multer from 'multer'
import shortid from 'shortid'


import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage })


router.post('/category/create', requireSingin, adminMiddleware, upload.single('categoryImage'), addCategory)
// router.post('/category/create', addCategory)
router.get('/category/getcategory', getCategories)

export default router