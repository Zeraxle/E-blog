import User from '../models/user.model.js'
import Post from '../models/post.model.js'
import Like from '../models/like.model.js'
import Follow, {userAndFollowerRelationship} from '../models/follow.model.js'
import { setupUserPostRealationship } from '../models/post.model.js'


export const findUserById = async (req, res, next) => {
    try {
        const { id } = req.params; // Get the user ID from the request parameters

        const foundUser = await User.findByPk(id, {
            include: [{
                model: Post,
                as: 'posts'
            },
            {
                model:Post,
                as: 'likedPosts'

            }],
            logging: console.log // Enable logging to see the SQL query in the console
        });
        

        // Check if the user was found
        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the found user along with their posts
        res.status(200).json(foundUser);
    } catch (error) {
        // Handle any errors and return a 400 status with the error message
        console.error(error); // Log the error for debugging
        res.status(400).json({ error: 'An error occurred while fetching the user.' });
    }
};


export const findAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.findAll()
        res.status(200).json(allUsers)
    } catch(error) {res.status(400).json(error)}
}


export const updateUser = async (req, res, next) => {
    try {
        const {id} = req.params
        const updatedUser = req.body
        const foundUser = await User.findByPk(id)
        if(!foundUser){
            return(res.status(404).json({message : "User not found"}))
        }
        foundUser.firstName = updatedUser.firstName,
        foundUser.lastName = updatedUser.lastName,
        foundUser.username = updatedUser.username,
        foundUser.email = updatedUser.email
        
        await foundUser.save()
        res.status(200).json(foundUser)
    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }
}

export const destroyUser = (req, res, next) => {
    try{
        const {id} = req.params
        const destroyedUser = User.destroy({
            where : {
                id : id
            }
        }) 
        res.status(200).json(destroyedUser)
    } catch(error){res.status(400).json(error)}
} 

export const findAllPostsByUser = async(req,res,next) =>{
    try{
        const {userId} = req.params
        const findAllUsersPosts = await Post.findAll({
            where: {userId : userId},
            // include :[
            //     {
            //         model : Post
            //     }
            // ]
        })
        res.status(200).json(findAllUsersPosts)
    }catch (error){res.status(400).json(error)}
}

export const findAllLikedPostByUser = async (req,res,next) =>{
    try{
        const {userId} = req.params

        const findUser = await Like.findAll({
            where :{
                userId : userId
            }
        })
        const postInfo = findUser.map(Like => Like.postId)
        const AllUsersLikePost = await Post.findAll({
            where:{
                id : postInfo
            }
        })
        console.log(postInfo)
        res.status(200).json(AllUsersLikePost)
    }catch(error) {res.status(400).json(error)}

}

export const findWhoFollowsUser = async (req,res,next) =>{
    try{
        const {userId} = req.params
        const usersFollowersId = await Follow.findAll({
            where:{
                followedUserId : userId
            }
        })
        const userFollowersInfo = usersFollowersId.map(followers => followers.followerId)

        const AllUsersFollowers = await User.findAll({
            where:{
                id : userFollowersInfo
            }
        })
        // console.log(userFollowersId)
        res.status(200).json(AllUsersFollowers)

    }
    catch(error){res.status(400).json(error)}
}

export const findWhoUserFollows =  async (req, res, next) =>{
    try{
        const {userId} = req.params
        const foundUser = await  Follow.findAll({
            where: {
                followerId : userId
            }
        })
        const userFollowersId = foundUser.map (following => following.followedUserId)
        const userFollowersInfo = await User.findAll({
            where:{
                id : userFollowersId
            }
        })
        res.status(200).json(userFollowersInfo)

    }
    catch(error) {res.status(400).json(error)}
}

setupUserPostRealationship(); 
userAndFollowerRelationship()
