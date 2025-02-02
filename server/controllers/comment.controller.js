import Comments,{ setupPostToCommentRelationship } from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { getToken } from "../services/token.service.js";
import jwt from 'jsonwebtoken'


export const createComment = async(req,res,next) =>{
    
    const postId = req.params.postId
    const {content, parentId} = req.body.content
    const sessionId = req.headers.authorization.split(' ')[1]
    const token = await getToken(sessionId)
    
    try{
        if(parentId){
            const parentComment = await Comments.findByPk(parentId)
            if(!parentComment){
                return res.status(404).json({message: 'Parent comment not found'})
            }
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.userId
        const newComment =  await Comments.create({
            content, 
            userId, 
            postId, 
            parentId: parentId || null})
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




