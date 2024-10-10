import User from '../models/user.model.js'
import Post, {setupUserPostRealationship} from '../models/post.model.js'
import Like from '../models/like.model.js'
import Follow, {userAndFollowerRelationship} from '../models/follow.model.js'


export const findUserById = async (req, res, next) => {
    try {
        const {id} = req.params
        const foundUser = await User.findByPk(id)
        res.status(200).json(foundUser)
    } catch(error) {res.status(400).json(error)}
}

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

// export const logUserIn = async (req, res, next) => {
    //     try {
        //         const {email, password} = req.body
        //         const isCorrectEmail = await User.findOne({
            //             where : {email : email}
            //         })
            //         if(!isCorrectEmail){
                //             return res.status(404).json({message : 'User not found'})
                //         }
                //         const isCorrectPassword = isCorrectEmail.authenticate(password)
                //         if(!isCorrectPassword){
                    //             return res.status(404).json({message : 'User not found'})
                    //         }
                    //         res.status(200).json(isCorrectEmail)
                    //     } catch (error){res.status(400).json(error)}
                    // }
                    
                    

// export const logoutUser = (req, res, next) => {
//     try{
//         const 
//     }
// }

export const findAllPostsByUser = async(req,res,next) =>{
    try{
        const {userid} = req.params
        const findAllUsersPosts = await Post.findAll({
            where: {userid : userid},
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
                userid : userId
            }
        })
        const postInfo = findUser.map(Like => Like.postid)
        
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
        const {userid} = req.params
        const usersFollowersId = await Follow.findAll({
            where:{
                followedUserId : userid
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
        const {userid} = req.params
        const foundUser = await  Follow.findAll({
            where: {
                followerId : userid
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

userAndFollowerRelationship()
setupUserPostRealationship(); 