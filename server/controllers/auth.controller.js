import { registerUser, loginUser } from "../services/auth.service.js";
import User from "../models/user.model.js";

import bcrypt from 'bcrypt';
export const register = async (req, res) => {
    try {
        const { user, sessionId } = await registerUser(req.body);
        res.cookie('sessionId', sessionId);
        res.status(201).json({ user, sessionId });
    } catch (error) {
        console.error('Registration error:', error.message);  // Log the error in the backend to track it
        if (error.message && error.message.toLowerCase().includes('user already exists')) {
            res.status(400).json({ message: 'User already exists' });
        } else {
            res.status(500).json({ message: 'Server error. Please try again later.' });
        }
    }
};



export const login = async (req, res) => {
    try {
        const { user, sessionId} = await loginUser(req.body.email, req.body.password)
        res.cookie('sessionId', sessionId)
        res.status(200).json({user, sessionId})
    } catch (error) {res.status(400).json({message : error.message})}
}
// export const login = async (req, res) => {
//     try {
//         const { email, password, sessionId } = req.body;

//         // Find user by email
//         const foundUser = await User.findOne({ where: { email } });

//         if (!foundUser) {
//             throw new Error("Invalid email or password");
//         }

//         // Validate password against hashed version
//         const isPasswordValid = await foundUser.authenticate(password); 
//         if (!isPasswordValid) {
//             throw new Error("Invalid email or password");
//         }



//         // Set session cookie
//         res.cookie('sessionId', sessionId)

//         // Send response with found user (no need to call loginUser again)
//         res.status(200).json({ user: foundUser, sessionId });

//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };



export const getProfile = async (req, res) => {
    try {

        
        const userId = req.user.userId
        const user = await User.findByPk(userId)
        
        if (!user) {
            return res.status(404).json({message : 'User not found'})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('sessionId')
        res.status(200).json({message: 'Logged out successfully'})
    } catch (error) {res.status(500).json({error})}
}

export const findCorrectLoginPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({
            where: { email: email }
        });

        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await foundUser.authenticate(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ user: foundUser });
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: "An unexpected error occurred", error: error.message });
    }
};



export const validateLoginPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const foundUser = await User.findOne({
            where: { email: email },
            attributes: ['id', 'email', 'password'] // Ensure password is included
        });

        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Password matches", userId: foundUser.id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An unexpected error occurred", error: error.message });
    }
};
