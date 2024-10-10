import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { getProfile } from '../services/AuthService.js'

export const ProtectedRoute = ({ children }) => {

    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const profile = await getProfile()
                if (profile) {
                    setIsAuthenticated(true)
                } else {
                    navigate('/')
                }
            } catch (error) {navigate('/')}
        } 
        checkAuth()
    },[navigate])
    
    return isAuthenticated? children : null
}