import { Like } from "../models/like.model.js";

export const createLike = async (req, res, next) => {
    try {
        const {userid, postid} = req.body
        const newLike = await Like.create({
            userid: userid, 
            postid : postid})
        res.status(200).json(newLike)
    } catch(error) {res.status(400).json(error)}
}

export const destroyLike = async (req, res, next) => {
    try {
        const {userid,postid} = req.params
        const destroyedLike = await Like.destroy({
            where : {
                userid : userid,
                postid : postid
            }
        })
        res.status(200).json(destroyedLike)
    } catch(error) {res.status(400).json(error)}
}