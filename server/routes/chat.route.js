import {Router} from 'express'
import { sendMessage } from '../controllers/chat.controller.js'

export const chatRouter = Router()

chatRouter.route('/send')
    .post(sendMessage)