import Comments,{ setupPostToCommentRelationship } from "../models/comment.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";


export const CreateComment = async(req,res,next) =>{
    try{
        const newComment =  await Comments.create(req.body)
        res.status(200).json(newComment)

    }
    catch(error){res.status(400).json(error)}
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


