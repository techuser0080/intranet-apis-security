import { check } from "express-validator"
import { validateResult } from "../helpers/validationHelper.js"

export const loginValidation = [
    check('email').exists().not().isEmpty().isEmail(),
    check('password').exists().not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]