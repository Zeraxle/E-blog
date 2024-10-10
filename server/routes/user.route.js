import {Router} from 'express'
import {findUserById, findAllUsers, updateUser, destroyUser, findAllPostsByUser, findAllLikedPostByUser, findWhoFollowsUser, findWhoUserFollows} from '../controllers/user.controller.js'

export const userRouter = Router()

userRouter.route('/')
    .get(findAllUsers)
    

userRouter.route('/:id')
    .get(findUserById)
    .put(updateUser)
    .delete(destroyUser)

// userRouter.route('/logout')
//     .delete(logoutUser)

userRouter.route('/UserPost/:userid')
    .get(findAllPostsByUser)

userRouter.route('/UserLikedPosts/:userId')
    .get(findAllLikedPostByUser)

userRouter.route('/followsUser/:userid')
    .get(findWhoFollowsUser)

userRouter.route('/UserFollows/:userid')
    .get(findWhoUserFollows)

