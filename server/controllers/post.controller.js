import Post from "../models/post.model.js"
// import setupRelationships from "./setupRealationships.js"
import User from "../models/user.model.js"
import Follow from "../models/follow.model.js"
import Like,{LikestoUserandPostRelationship} from "../models/like.model.js"
import Comments, {setupPostToCommentRelationship}from "../models/comment.model.js"
import jwt from 'jsonwebtoken'
import { Model, model } from "mongoose"
import { where } from "sequelize"
import { getToken } from "../services/token.service.js"


export const findPostById = async (req, res, next) => {
    try {
        const {id} = req.params
        const foundPost = await Post.findByPk(id)
        res.status(200).json(foundPost)
    } catch(error) {res.status(400).json(error)}
}

export const findAllPosts = async (req, res, next) => {
    try{
        const allPosts = await Post.findAll({
            include :[{
                model:User,
                as : 'user'
            }]
        });

        res.status(200).json(allPosts);
    } catch(error) {res.status(400).json(error)}
}



export const createPost = async (req, res, next) => {
    
    const authHeader = req.headers.authorization
    const sessionId = authHeader.split(' ')[1]
    console.log("----------------hi---------------")
    const token = await getToken(sessionId)
    
    try {
        const {name, category, rating, description} = req.body
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.userId
        const newPost = await Post.create({name, category, rating, description, userId})
        res.status(200).json(newPost)
    } catch(error) {res.status(400).json(`Controller failed ${error}`)}
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
        const {userId, postId} = req.params
        const destroyedPost = await Post.destroy({
            where : {
                userId : userId,
                id : postId
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

export const findAllTvshowPosts = async (req,res,next) =>{
    try{
        console.log("gotttittt")
        const allTvShowPosts = await Post.findAll({
            where : 
            {category : 'Tv-show'},
            include :[
                {
                    model : User,
                    as: 'user'
                }
            ]
        })
        res.status(200).json(allTvShowPosts)

    }
    catch(error){res.status(400).json(error)}
}


export const findAllMoviePosts = async (req,res,next) =>{
    try{
        console.log("gotttittt")
        const allTvMoviePosts = await Post.findAll({
            where : 
            {category : 'Movie'},
            include:[
                {
                    model: User,
                    as: 'user'
                }
            ]
        })
        res.status(200).json(allTvMoviePosts)

    }
    catch(error){res.status(400).json(error)}
}

export const findAllAnimePosts = async (req,res,next) =>{
    try{
        console.log("gotttittt")
        const allAnimePosts = await Post.findAll({
            where : 
            {category : 'Anime'},
            include :[
                {
                    model : User,
                    as: 'user'
                }
            ]
        })
        res.status(200).json(allAnimePosts)

    }
    catch(error){res.status(400).json(error)}
}

export const findAllUserWholikedPost = async (req,res,next) =>{
    try{
        const {postId} = req.params
        const findPostInfo = await Like.findAll({
    

            where :{
                postId : postId
            }
        }
        )   
        const userIds = findPostInfo.map(Like => Like.userId)
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

export const findAllFollowersPosts = async (req, res, next ) =>{
    try{
        const {id} = req.params
        const foundUser = await Follow.findAll({
            where :{
                followerId : id
            }
        })
        const usersFollowersId = foundUser.map(following => following.followedUserId)

        const postsByFollowers = await Post.findAll({
            where:{
                userId : usersFollowersId
            },
            include :[
                {
                    model : User,
                    as : 'user'
                }
            ]
        })
        res.status(200).json(postsByFollowers)
        console.log(postsByFollowers)
    }
    catch (error){
    res.status(400).json(error)
    }
}

LikestoUserandPostRelationship()