import express from 'express'
const router = express.Router()


import { createUser, loginUser } from '../controllers/auth.js'
import { requireSingin } from '../middleware/index.js'
import { validateSignUpRequest, validateSignInRequest, isRequestValidated } from '../validators/auth.js'



// Регистрация
router.post('/signup',validateSignUpRequest, isRequestValidated, createUser)

// Авторизация
router.post('/signin', validateSignInRequest, isRequestValidated, loginUser)

// router.post('/profile', requireSingin, (req, res) => {
//     res.status(200).json({user: 'profile'})
// })


export default router