import express from 'express'
const router = express.Router()
import { addItemToCart } from '../controllers/cart.js'
import { requireSingin, userMiddleware } from '../middleware/index.js'


router.post('/user/cart/addtocart', requireSingin, userMiddleware, addItemToCart)


export default router