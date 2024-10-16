import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";
import { storeToken, getToken } from "./token.service.js";


export const registerUser = async ({firstName, lastName, username, email, password}) => {
    const existingUser = await User.findOne({where : {email}})
    if (existingUser) throw new Error('User already exists')
    
    const user = await User.create({firstName, lastName, username, email, password})
    const token = generateToken(user)
    const sessionId = await storeToken(token)
    return {user, sessionId}
}

export const loginUser = async (email, password) => {
    const user = await User.findOne({where : {email}})
    if (!user) throw new Error('Invalid credentials')
    
    const isMatch = await user.authenticate(password)
    if (!isMatch) throw new Error('Invalid credentials')
    
    const token = generateToken(user)
    if (!token) throw new Error('No token was created')
    const sessionId = await storeToken(token)

    return {user, sessionId}
}