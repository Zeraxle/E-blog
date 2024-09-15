import {Router} from 'express'
import {findUserById, findAllUsers, createUser, updateUser, destroyUser, logUserIn, findAllPostsByUser} from '../controllers/user.controller.js'

export const userRouter = Router()

userRouter.route('/')
    .get(findAllUsers)
    .post(createUser)

userRouter.route('/:id')
    .get(findUserById)
    .put(updateUser)
    .delete(destroyUser)

userRouter.route('/login')
    .post(logUserIn)

userRouter.route('/UserPost/:userid')
    .get(findAllPostsByUser)