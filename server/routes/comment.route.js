import { Router } from "express";
import { CreateComment, UpdateComment, DeleteComment, findOneComment} from "../controllers/comment.controller.js";


export const commentRouter = Router()

commentRouter.route('/create/:postId')
    .post(CreateComment)

    commentRouter.route('/:id')
    .put(UpdateComment)
    .get(findOneComment)


commentRouter.route('/delete/:id')
    .delete(DeleteComment)