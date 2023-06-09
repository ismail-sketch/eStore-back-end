import jwt from 'jsonwebtoken'

const requireSingin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
}

export default requireSingin