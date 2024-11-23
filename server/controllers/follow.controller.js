import Follow   from "../models/follow.model.js";

export const createFollow = async (req, res, next) => {
    try {
        const newFollow = await Follow.create(req.body)
        res.status(200).json(newFollow)
    } catch(error) {res.status(400).json(error)}
}

export const destroyFollow = async (req, res, next) => {
    try {
        const {id : followerId, followedId : followedUserId} = req.params
        const destroyedFollow = await Follow.destroy({
            where : {
                followerId,
                followedUserId
                
            }
        })
        res.status(200).json(destroyedFollow)
    } catch(error) {res.status(400).json(error)}
}

