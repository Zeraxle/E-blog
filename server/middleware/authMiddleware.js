import  jwt from 'jsonwebtoken'
import { getToken } from '../services/token.service.js'

const authMiddleware = async (req, res, next) => {
    
    const authHeader = req.headers.authorization
    const sessionId = authHeader.split(' ')[1]
    if (!sessionId) return res.status(401).json({message: 'No session Id provided'})

    const token = await getToken(sessionId)    
    if (!token) return res.status(401).json({message : 'Invalid session ID'})
    
    try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded
            next()
        } catch (error) {res.status(401).json({message : 'Invalid token'})}
}

export default authMiddleware