import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dbConnect } from './config/sequelize.config.js'
import { userRouter } from './routes/user.route.js'

const app = express()
app.use(express.json(), cors())
app.use('/user', userRouter)

dotenv.config()
const PORT = process.env.PORT

dbConnect()
app.listen(PORT, () => console.log(`Listening on Port : ${PORT}`))
