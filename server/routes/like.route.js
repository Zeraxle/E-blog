import {Router} from 'express'
import { createLike, destroyLike } from '../controllers/like.controller.js'

export const likeRouter = Router()

likeRouter.route('/')
    .post(createLike)

likeRouter.route('/:id')
    .delete(destroyLike)

