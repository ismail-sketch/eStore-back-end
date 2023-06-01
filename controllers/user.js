import bcrypt from 'bcrypt'
import User from '../models/User.js'

export const createUser = async (req, res) => {
    try {
        const candidate = await User.findOne({email: req.body.email})

        if(candidate) {
            return res.status(400).json({message: 'Пользователь уже зарегистрирован'})
        }

        const {firstName, lastName, email, hash_password} = req.body

        const password = bcrypt.hashSync(hash_password, 7)

        const user = new User({firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()
        })

        user.save()
        return res.json({message: 'Регистрация прошла успешно!'})
    } catch (err) {
        console.log('Ошибка: ' + err);
    }

}

