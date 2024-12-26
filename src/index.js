import express from 'express'
import userRouter from './api/routes/userRouter.js'

const port = 4001
const app = express()

app.use(express.json())
app.use('/api/user', userRouter)

const main = () => {
    app.listen(port)
    console.log('Server on port '+port)
}

main()