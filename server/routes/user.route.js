import {Router} from 'express'
import {findUserById, findAllUsers, updateUser, destroyUser, findAllPostsByUser, findAllLikedPostByUser, findWhoFollowsUser, findWhoUserFollows} from '../controllers/user.controller.js'

export const userRouter = Router()

userRouter.route('/')
    .get(findAllUsers)
    

userRouter.route('/:id')
    .get(findUserById)
    .delete(destroyUser)

userRouter.route('/edit/user/:id')
    .put(updateUser)

// userRouter.route('/logout')
//     .delete(logoutUser)

userRouter.route('/UserPost/:userId')
    .get(findAllPostsByUser)

userRouter.route('/UserLikedPosts/:userId')
    .get(findAllLikedPostByUser)

userRouter.route('/followsUser/:userId')
    .get(findWhoFollowsUser)

userRouter.route('/UserFollows/:userId')
    .get(findWhoUserFollows)

