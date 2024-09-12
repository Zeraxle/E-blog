import User from '../models/user.model.js'

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

export const createUser = async (req, res, next) => {
    try {
        const createdUser = await User.create(req.body)
        res.status(200).json(createdUser)
    } catch(error){res.status(400).json(error)}
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
        foundUser.email = updatedUser.email,
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
//         const user = await User.findOne({
//             where : {email : email}
//         })
//         if(!user){
//             return res.status(404).json({message : 'User not found'})
//         }
//         if(!user.authenticate(password)){
//             return res.status(404).json({message : 'User not found'})
//         }
//     }
// }


export const logUserIn = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const isCorrectemail= await User.findOne({
            where : {email : email}
        })
        if(!isCorrectemail){
            return res.status(404).json({message : 'User not found'})
        }
        const isCorrectPassword = isCorrectemail.authenticate(password)
        if(!isCorrectPassword){
            return res.status(404).json({message : 'User not found'})
        }
        res.status(200).json(isCorrectemail)
    } 
    catch(error){res.status(400).json(error)}
}