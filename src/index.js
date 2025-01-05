import express from 'express'
import userRouter from './api/routes/userRouter.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { Constants } from './config/constants.js'
import { responseBody } from './config/responseEntity.js'

const port = 4001
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    if (req.path == '/api/user/login') return next()
    const tokenHeaderAuthorization = req.header('Authorization') ? String(req.header('Authorization').substring(7, req.header('Authorization').length)) : ''
    const token = req.cookies.access_token || tokenHeaderAuthorization
    req.session = { user: null }

    try {
        if (token && String(token).length > 0 ) {
            const data = jwt.verify(token, Constants.JWT_SECRET_SIGNATURE_NAME)
            req.session.user = data
            next()
        } else return res.status(401).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    } catch(error) {
        return res.status(401).send(responseBody(2, Constants.MESSAGE_STATUS_ERROR, null))
    }
})

app.use('/api/user', userRouter)

const main = () => {
    app.listen(port)
    console.log('Server on port '+port)
}

main()