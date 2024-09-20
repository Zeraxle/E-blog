import { Like } from "../models/like.model.js";

export const createLike = async (req, res, next) => {
    try {
        const newLike = await Like.create(req.body)
        res.status(200).json(newLike)
    } catch(error) {res.status(400).json(error)}
}

export const destroyLike = async (req, res, next) => {
    try {
        const {id} = req.params
        const destroyedLike = await Like.destroy({
            where : {
                id : id
            }
        })
        res.status(200).json(destroyedLike)
    } catch(error) {res.status(400).json(error)}
}