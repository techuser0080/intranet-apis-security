import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch(e) {
        res.sendStatus(403).json({ errors: e.array })
    }
}