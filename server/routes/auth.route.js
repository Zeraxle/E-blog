import { Router } from 'express'
import { login, register, getProfile, logout, findCorrectLoginPassword, validateLoginPassword } from '../controllers/auth.controller.js'
import authMiddleware from '../middleware/authMiddleware.js'

export const authRouter = Router()

authRouter.route('/login')
    .post(login)

authRouter.route('/register')
    .post(register)
    
authRouter.route('/profile')
    .get(authMiddleware, getProfile)

authRouter.route('/logout')
    .post(logout)
authRouter.route('/loginCheck')
    .post(findCorrectLoginPassword)
authRouter.route('/loginPassValidate')
    .post(validateLoginPassword)