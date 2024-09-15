import {Router} from 'express'
import { findPostById, findAllPosts, createPost, updatePost, destroyPost, findPostUser, findAllCommmentsForPost} from '../controllers/post.controller.js'

export const postRouter = Router()

postRouter.route('/')
    .get(findAllPosts)
    .post(createPost)

postRouter.route('/:id')
    .get(findPostById)
    .put(updatePost)
    .delete(destroyPost)

postRouter.route('/postuser/:postId')
    .get(findPostUser)

postRouter.route('/postcomments/:postId')
    .get(findAllCommmentsForPost)
