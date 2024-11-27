import Comments,{ setupPostToCommentRelationship } from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getToken } from "../services/token.service.js";
import jwt from 'jsonwebtoken'


export const createComment = async(req,res,next) =>{
    
    const postId = req.params.postId
    console.log(postId)
    const {content} = req.body.content
    console.log(content)
    const sessionId = req.headers.authorization.split(' ')[1]
    const token = await getToken(sessionId)
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.userId
        const newComment =  await Comments.create({content, userId, postId})
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

    const {content} = req.body
    const request = req.body
    console.log(content)
    console.log('111111111', request)
    
    try{
        const {id} = req.params
        const foundComment = await Comments.findByPk(id)
        
        if(!foundComment){
            return(res.status(404).json({message : `Comment not found`}))
        }
        foundComment.content = content
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




