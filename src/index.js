import express from 'express'
import userRouter from './api/routes/userRouter.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { Constants } from './config/constants.js'

const port = 4001
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    const token = req.cookies.access_token
    req.session = { user: null }

    try {
        if (token && String(token).length > 0 ) {
            console.log(token)
            const data = jwt.verify(token, Constants.JWT_SECRET_SIGNATURE_NAME)
            console.log(data)
            req.session.user = data
            next()
        } else next()
    } catch(error) {
        console.log(error)
    }
})

app.use('/api/user', userRouter)

const main = () => {
    app.listen(port)
    console.log('Server on port '+port)
}

main()