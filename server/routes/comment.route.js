import { Router } from "express";
import { createComment, updateComment, deleteComment, findOneComment} from "../controllers/comment.controller.js";


export const commentRouter = Router()

commentRouter.route('/create/:postId')
    .post(createComment)

    commentRouter.route('/:id')
    .put(updateComment)
    .get(findOneComment)


commentRouter.route('/delete/:id')
    .delete(deleteComment)