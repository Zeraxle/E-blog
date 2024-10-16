import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../config/AuthContext.jsx"
import {logout, getProfile} from '../services/AuthService.js'
import Cookies from 'js-cookie'


export const FavoritesPage = () => {

    const {authState, setAuthState } = useAuth()
    const [user, setUser] = useState({})

    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        getProfile()
            .then(res => {
                setUser(res)
                setAuthState({user: res.id, token: sessionId })})
            .catch(error => console.log(error))
        }, []);

    return(<>
    
    </>)
}