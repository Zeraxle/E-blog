import Comments,{ setupPostToCommentRelationship } from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getToken } from "../services/token.service.js";
import jwt from 'jsonwebtoken'


export const createComment = async(req,res,next) =>{
    const {Comment, userId, postId} = req.body
    try{
        const newComment =  await Comments.create({Comment,userId,postId })
        res.status(200).json(newComment)

    }
    catch(error){res.status(400).json({message: `Comment Controller, ${error}`})}
}

export const deleteComment = async(req,res,next) =>{
    try{
        const {id} = req.params 
        const destroyComment =  await Comments.destroy({
            where:{
                id: id
            }
        }
        )
        res.status(200).json(destroyComment)

    }
    catch(error){res.status(400).json(error)}
}

export const updateComment = async(req,res,next) =>{

    const {Comment} = req.body
    
    
    try{
        const {id} = req.params
        const foundComment = await Comments.findByPk(id)
        
        if(!foundComment){
            return(res.status(404).json({message : `Comment not found`}))
        }
        foundComment.Comment = Comment
        console.log(foundComment.content)

        await foundComment.save()
        res.status(200).json(foundComment)

    }
    catch(error){res.status(400).json({message: `Comment controller, ${error}`})}
}

export const findOneComment = async(req,res,next) =>{
    try{
        const {id} = req.params
        const foundComment =  await Comments.findByPk(id)
        res.status(200).json(foundComment)

    }
    catch(error){res.status(400).json(error)}
}




