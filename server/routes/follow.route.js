import {Router} from 'express'
import { createFollow, destroyFollow } from '../controllers/follow.controller.js'

export const followRouter = Router()

followRouter.route('/')
    .post(createFollow)

followRouter.route('/:id/:followedId')
    .delete(destroyFollow)