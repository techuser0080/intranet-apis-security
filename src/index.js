import express from 'express'
import userRouter from './api/routes/userRouter'

const port = 4000
const app = express()

app.use(express.json())
app.use(userRouter)

const main = () => {
    app.listen(port)
    console.log('Server on port '+port)
}

main()