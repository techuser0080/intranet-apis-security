import express from 'express'
import userRouter from './api/routes/userRouter.js'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const port = 4001
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
    const token = req.cookies.access_token
    req.session = { user: null }

    try {
        const data = jwt.verify(token, '')
        req.session.user = data
    } catch(error) {
        console.log(error)
    }

    next()
})

app.use('/api/user', userRouter)

const main = () => {
    app.listen(port)
    console.log('Server on port '+port)
}

main()