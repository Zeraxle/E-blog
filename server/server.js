import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dbConnect } from './config/sequelize.config.js'
import { userRouter } from './routes/user.route.js'
import { postRouter } from './routes/post.route.js'
import { likeRouter } from './routes/like.route.js'
import { followRouter } from './routes/follow.route.js'

const app = express()
app.use(express.json(), cors())
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/like', likeRouter)
app.use('/follow', followRouter)

dotenv.config()
const PORT = process.env.PORT

dbConnect()
app.listen(PORT, () => console.log(`Listening on Port : ${PORT}`))
