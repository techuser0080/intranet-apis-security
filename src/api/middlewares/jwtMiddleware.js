import jwt from 'jsonwebtoken'
import { Constants } from '../../config/constants'

export const jwtSign = (data) => {
    const token = jwt.sign(data, Constants.JWT_SECRET_SIGNATURE_NAME, {
        expiresIn: '1h'
    })
    return token
}