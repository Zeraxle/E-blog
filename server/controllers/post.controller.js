import Post, {setupUserPostRealationship} from "../models/post.model.js"
import User from "../models/user.model.js"
import Like,{LikestoUserandPostRelationship} from "../models/like.model.js"
import Comments, {setupPostToCommentRelationship}from "../models/comment.model.js"
import { Model, model } from "mongoose"
export const findPostById = async (req, res, next) => {
    try {
        const {id} = req.params
        const foundPost = await Post.findByPk(id)
        res.status(200).json(foundPost)
    } catch(error) {res.status(400).json(error)}
}

export const findAllPosts = async (req, res, next) => {
    try{
        const allPosts = await Post.findAll()
        res.status(200).json(allPosts)
    } catch(error) {res.status(400).json(error)}
}

export const createPost = async (req, res, next) => {
    try {
        const newPost = await Post.create(req.body)
        res.status(200).json(newPost)
    } catch(error) {res.status(400).json(error)}
}

export const updatePost = async (req, res, next) => {
    try {
        const {id} = req.params
        const updatedPost = req.body
        const foundPost = await Post.findByPk(id)
        if(!foundPost) {
            return (res.status(404).json({message : 'Post not found'}))
        }
        foundPost.category = updatedPost.category
        foundPost.rating = updatedPost.rating
        foundPost.description = updatedPost.description

        await foundPost.save()
        res.status(200).json(foundPost)
    } catch(error) {res.status(400).json(error)}
}

export const destroyPost = async (req, res, next) => {
    try {
        const {userid, postid} = req.params
        const destroyedPost = await Post.destroy({
            where : {
                userid : userid,
                id : postid
            }
        })
        res.status(200).json(destroyedPost)
    } catch(error) {res.status(400).json(error)}
}

export const findPostUser = async(req,res,next) =>{
    try{
        const {postId} = req.params
        const findUserofPost = await Post.findAll({
            where: {id : postId},
            include :[
                {
                    model : User
                }
            ]
        })
        res.status(200).json(findUserofPost)
    }catch (error){res.status(400).json(error)}
}

export const findAllCommmentsForPost = async(req,res,next) =>{
    try{
        const {postId} = req.params
        const allPostCommments =  await Post.findAll({
            where:{
                id : postId
            },
            include:[
                {
                    model:Comments,
                    include:[{model: User}]
                }
            ],
        })
        res.status(200).json(allPostCommments)

    }
    catch(error){res.status(400).json(error)}
}

export const findAllUserWholikedPost = async (req,res,next) =>{
    try{
        const {postId} = req.params
        const findPostInfo = await Like.findAll({
    

            where :{
                postid : postId
            }
        }
        )   
        const userIds = findPostInfo.map(Like => Like.userid)
        const UserWhoLikedPost = await User.findAll({
            where: {
                id : userIds
            }
        })

        console.log(userIds)
        res.status(200).json(UserWhoLikedPost)
    }
    catch(error){ res.status(400).json(error)
    }
}

// export const findAllUserWholikedPost = async (req,res,next) =>{
//     try{
//         const {postId} = req.params
//         const findLikersOfPost = await Post.findAll({
//             where:{id : postId},
//                 include :[{

//                     Model : User
//                 }
//                 ]

//         }
//         )   
//         res.status(200).json(findLikersOfPost)
//     }
//     catch(error){ res.status(400).json(error)
//     }
// }



setupPostToCommentRelationship()

LikestoUserandPostRelationship()