import jwt from 'jsonwebtoken'

export const requireSingin = (req, res, next) => {

    if(req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
    } else {
        return res.status(400).json({message: 'Необходимо авторизоваться'})
    }
    next()
}

export const userMiddleware = (req, res, next) => {
    if(req.user.role !== 'user') {
        res.status(400).json({message: 'Доступ запрещен'})
    }
    next()
}

export const adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'admin') {
        res.status(400).json({message: 'Доступ запрещен'})
    }
    next()
}