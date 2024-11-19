import express from 'express'
import morgan from 'morgan'

const app = express()
app.set("PORT", 4000)
app.use(morgan("dev"))