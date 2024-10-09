import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";
import { storeToken, getToken } from "./token.service.js";

export const registerUser = async ({firstName, lastName, username, email, password}) => {
    let existingUser = await User.findOne({where : {email}})
    if (existingUser) throw new Error('User already exists')
    
    const user = await User.create({firstName, lastName, username, email, password})
    const token = generateToken(user)
    const sessionId = await storeToken(token)
    return {user, sessionId}
}

export const loginUser = async (username, password) => {
    const user = await User.findOne({where : {username}})
    if (!user) throw new Error('Invalid credentials')
    
    const isMatch = await user.authenticate(password)
    if (!isMatch) throw new Error('Invalid credentials')
    
    const token = generateToken(user)
    const sessionId = await storeToken(token)
    return {user, sessionId}
}