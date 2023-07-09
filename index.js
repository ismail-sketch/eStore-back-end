
import express from 'express'
import env from 'dotenv'
import mongoose from 'mongoose'
env.config()
const app = express()
import morgan from 'morgan'

import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin/auth.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'
import cartRoutes from './routes/cart.js'

app.use(express.json())
app.use(express.static(__dirname))
app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', cartRoutes)

app.use(morgan('tiny'))



mongoose.connect(process.env.CONNECT_DB)
.then(() => {
    console.log('Соединение с базой данных установлено...');
})
.catch((e) => {console.log(e)})

const start = () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Сервер запущен на порту ${process.env.PORT}`);
        })
    } catch (err) {
        console.log(`Ошибка запуска сервера: ${err}`);
    }
}
start()

