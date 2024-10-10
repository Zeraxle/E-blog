import { Router } from 'express'
import { login, register, getProfile } from '../controllers/auth.controller.js'
import authMiddleware from '../middleware/authMiddleware.js'

export const authRouter = Router()

authRouter.route('/login')
    .post(login)

authRouter.route('/register')
    .post(register)
    
authRouter.route('/profile')
    .get(authMiddleware, getProfile)