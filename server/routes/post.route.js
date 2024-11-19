import {Router} from 'express'
import { findPostById, findAllPosts, createPost, updatePost, destroyPost, findPostUser, findAllCommmentsForPost, findAllUserWholikedPost, findAllTvshowPosts, findAllMoviePosts, findAllAnimePosts, findAllFollowersPosts} from '../controllers/post.controller.js'

export const postRouter = Router()

postRouter.route('/')
    .get(findAllPosts)
    .post(createPost)

postRouter.route('/allTvShowPosts')
    .get(findAllTvshowPosts)

postRouter.route('/allMoviePosts')
    .get(findAllMoviePosts)

postRouter.route('/allAnimePosts')
    .get(findAllAnimePosts)

postRouter.route('/:id/followersPosts')
        .get(findAllFollowersPosts)
        
postRouter.route('/:id')
    .get(findPostById)
    .put(updatePost)

postRouter.route('/:userid/:postid')
    .delete(destroyPost)

postRouter.route('/postuser/:postId')
    .get(findPostUser)

postRouter.route('/postcomments/:postid')
    .get(findAllCommmentsForPost)

postRouter.route('/postLikers/:postid')
    .get(findAllUserWholikedPost)
