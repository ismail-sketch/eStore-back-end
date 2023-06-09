import {check, validationResult} from 'express-validator'

export const validateSignUpRequest = [

    check('firstName')
    .notEmpty()
    .withMessage('Имя обязательно'),
    check('lastName')
    .notEmpty()
    .withMessage('Фамилия обязательна'),
    check('email')
    .isEmail()
    .withMessage('Некорректный email'),
    check('password')
    .isLength({min: 4})
    .withMessage('Пароль не должен быть менее 4 символов'),

]

export const validateSignInRequest = [
    check('email')
    .isEmail()
    .withMessage('Некорректный email'),
    check('password')
    .isLength({min: 4})
    .withMessage('Пароль не должен быть менее 4 символов'),

]

export const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req)
    if(errors.array().length > 0) {
        return res.status(400).json({error: errors.array()[0].msg})
    }
    next()
}