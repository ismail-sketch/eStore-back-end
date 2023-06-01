import express from 'express'
const router = express.Router()

import { createUser } from '../controllers/user.js'



// Регистрация
router.post('/signup', createUser)

// Авторизация
router.post('/signin', (req, res) => {

})


export default router