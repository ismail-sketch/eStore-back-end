import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'


export const createUser = async (req, res) => {
    try {
        const candidate = await User.findOne({email: req.body.email})

        if(candidate) {
            return res.status(400).json({message: 'Пользователь уже зарегистрирован'})
        }

        const {firstName, lastName, email, password} = req.body

        const _password = bcrypt.hashSync(password, 7)

        const user = new User({firstName,
            lastName,
            email,
            password: _password,
            username: Math.random().toString()
        })

        user.save()
        return res.json({message: 'Регистрация прошла успешно!'})
    } catch (err) {
        console.log('Ошибка: ' + err);
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})

        if(user) {
            const validPassword = bcrypt.compareSync(req.body.password, user.password)

            if(!validPassword) {
                return res.status(400).json({message: 'Неверный email или пароль'})
            }
            const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '24h'})
            // const {firstName, lastName, email, role, fullName} = user

            res.status(200).json({
                token,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    id: user._id
                    // fullName
                },
                message: 'Вы успешно авторизовались!'
            })

        } else {
            return res.status(400).json({message: 'Неверный email или пароль'})
        }
    } catch (err) {
        console.log('Ошибка: ' + err);
    }

}

