import { check } from "express-validator";
import { validateResult } from "../helpers/validationHelper";

export const createUserValidation = [
    check('name').exists().not().isEmpty(),
    check('lastName').exists().not().isEmpty(),
    check('email').exists().not().isEmpty().isEmail(),
    check('age').exists().not().isEmpty().isNumeric(),
    check('gender').exists().not().isEmpty().length(1),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const updateUserValidation = [
    check('userId').exists().not().isEmpty().isNumeric(),
    check('name').exists().not().isEmpty(),
    check('lastName').exists().not().isEmpty(),
    check('email').exists().not().isEmpty().isEmail(),
    check('age').exists().not().isEmpty().isNumeric(),
    check('gender').exists().not().isEmpty().length(1),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

export const deleteUserValidation = [
    check('userId').exists().not().isEmpty().isNumeric(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]