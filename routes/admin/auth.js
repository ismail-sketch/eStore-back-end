import express from 'express'
const router = express.Router()

import { createUser, loginUser } from '../../controllers/admin/auth.js'
import {requireSingin} from '../../middleware/index.js'
import { validateSignUpRequest, validateSignInRequest, isRequestValidated } from '../../validators/auth.js'




// Регистрация
router.post('/admin/signup', validateSignUpRequest, isRequestValidated, createUser)

// Авторизация
router.post('/admin/signin', validateSignInRequest, isRequestValidated, loginUser)



export default router