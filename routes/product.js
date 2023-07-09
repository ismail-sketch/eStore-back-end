import express from 'express'
const router = express.Router()
import multer from 'multer'
import shortid from 'shortid'
// import { } from '../controllers/product.js'

import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



import { requireSingin, adminMiddleware } from '../middleware/index.js'
import { createProduct } from '../controllers/product.js'

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

router.post('/product/create', requireSingin, adminMiddleware, upload.array('productPicture'), createProduct)

// router.get('/category/getcategory', getCategories)

export default router