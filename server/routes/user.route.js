import {Router} from 'express'
import {findUserById, findAllUsers, createUser, updateUser, destroyUser, logUserIn, findAllPostsByUser, findAllLikedPostByUser, findWhoFollowsUser, findWhoUserFollows} from '../controllers/user.controller.js'

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

userRouter.route('/UserLikedPosts/:userId')
    .get(findAllLikedPostByUser)

userRouter.route('/followsUser/:userid')
    .get(findWhoFollowsUser)

userRouter.route('/UserFollows/:userid')
    .get(findWhoUserFollows)

