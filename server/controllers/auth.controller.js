import { registerUser, loginUser } from "../services/auth.service.js";
import User from "../models/user.model.js";

export const register = async (req, res) => {
    try {
        const {user, sessionId} = await registerUser(req.body)
        res.cookie('sessionId', sessionId)
        res.status(201).json(user)
    } catch(error){res.status(400).json({message : error.message})}
}

export const login = async (req, res) => {
    try {
        const { user, sessionId} = await loginUser(req.body.username, req.body.password)
        res.cookie('sessionId', sessionId)
        res.status(200).json({user, sessionId})
    } catch (error) {res.status(400).json({message : error.message})}
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId
        const user = await User.findByPk(userId)
        
        if (!user) {
            return res.status(404).json({message : 'User not found'})
        }
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({error})
    }
}
