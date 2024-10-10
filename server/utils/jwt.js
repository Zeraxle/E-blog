import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign({userId : user.id}, process.env.JWT_SECRET, { expiresIn : '1h'})
}