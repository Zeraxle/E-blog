import {Router} from 'express'
import { findPostById, findAllPosts, createPost, updatePost, destroyPost } from '../controllers/post.controller.js'

export const postRouter = Router()

postRouter.route('/')
    .get(findAllPosts)
    .post(createPost)

postRouter.route('/:id')
    .get(findPostById)
    .put(updatePost)
    .delete(destroyPost)