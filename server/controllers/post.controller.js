import Post, {setupAssociations} from "../models/post.model.js"
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
        const {id} = req.params
        const destroyedPost = await Post.destroy({
            where : {
                id : id
            }
        })
        res.status(200).json(destroyedPost)
    } catch(error) {res.status(400).json(error)}
}

setupAssociations(); 