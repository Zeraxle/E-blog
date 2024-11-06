import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import http from 'http'
import { Server } from 'socket.io'
import { dbConnect } from './config/sequelize.config.js'
import { userRouter } from './routes/user.route.js'
import { postRouter } from './routes/post.route.js'
import { likeRouter } from './routes/like.route.js'
import { followRouter } from './routes/follow.route.js'
import { commentRouter } from './routes/comment.route.js'
import { authRouter } from './routes/auth.route.js'
import { chatRouter } from './routes/chat.route.js'
import { notificationRouter } from './routes/notification.route.js'
import { socketService } from './services/socket.service.js'

const app = express()
const server = http.createServer(app)
const corsOptions = {
    origin : 'http://localhost:5173',
    credentials : true
}
const io = new Server(server, {
    cors: {origin: 'http://localhost:5173'}
} )

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)
    socketService(io, socket)
})

app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(express.json(), cors(corsOptions), cookieParser())
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/like', likeRouter)
app.use('/follow', followRouter)
app.use('/comment', commentRouter)
app.use('/auth', authRouter)
app.use('/notification', notificationRouter)
app.use('/chat', chatRouter)


dotenv.config()
const PORT = process.env.PORT

dbConnect()
app.listen(PORT, () => console.log(`Listening on Port : ${PORT}`))
