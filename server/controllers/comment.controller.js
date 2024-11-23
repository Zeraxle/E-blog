import Comments,{ setupPostToCommentRelationship } from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getToken } from "../services/token.service.js";
import jwt from 'jsonwebtoken'


export const CreateComment = async(req,res,next) =>{
    
    const postId = req.params.postId
    const {content} = req.body
    const sessionId = req.headers.authorization.split(' ')[1]
    const token = await getToken(sessionId)
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.userId
        const newComment =  await Comments.create({content, userId, postId, parentId})
        res.status(200).json(newComment)

    }
    catch(error){res.status(400).json({message: `Comment Controller, ${error}`})}
}

export const DeleteComment = async(req,res,next) =>{
    try{
        const {userid, postid} = req.params 
        const destroyComment =  await Comments.destroy({
            where :{
                userid : userid,
                postid : postid
            }
        }
        )
        res.status(200).json(destroyComment)

    }
    catch(error){res.status(400).json(error)}
}

export const UpdateComment = async(req,res,next) =>{
    try{
        const {id} = req.params
        const updatedComment = req.body
        const foundComment = await Comments.findByPk(id)
        

        if(!foundComment){
            return(res.status(404).json({message : "Comment not found"}))
        }

        foundComment.Comment = updatedComment.Comment

        await foundComment.save()
        res.status(200).json(foundComment)

    }
    catch(error){res.status(400).json(error)}
}

export const findOneComment = async(req,res,next) =>{
    try{
        const {id} = req.params
        const foundComment =  await Comments.findByPk(id)
        res.status(200).json(foundComment)

    }
    catch(error){res.status(400).json(error)}
}




