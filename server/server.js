import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { dbConnect } from './config/sequelize.config.js'
import { userRouter } from './routes/user.route.js'
import { postRouter } from './routes/post.route.js'
import { likeRouter } from './routes/like.route.js'
import { followRouter } from './routes/follow.route.js'
import { commentRouter } from './routes/comment.route.js'
import { authRouter } from './routes/auth.route.js'

const app = express()
const corsOptions = {
    origin : 'http://localhost:5173',
    credentials : true
}
app.use(express.json(), cors(corsOptions), cookieParser())
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/like', likeRouter)
app.use('/follow', followRouter)
app.use('/comment', commentRouter)
app.use('/auth', authRouter)


dotenv.config()
const PORT = process.env.PORT

dbConnect()
app.listen(PORT, () => console.log(`Listening on Port : ${PORT}`))
