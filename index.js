
import express from 'express'
import env from 'dotenv'
import mongoose from 'mongoose'
env.config()
const app = express()

import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin/auth.js'
import categoryRoutes from './routes/category.js'

app.use(express.json())
app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)





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

