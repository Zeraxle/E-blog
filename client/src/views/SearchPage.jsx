import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../config/AuthContext.jsx"
import Cookies from 'js-cookie'
import axios from "axios"

export const SearchPage = () => {

    const {logout, authState, setAuthState } = useAuth()
    const [user, setUser] = useState({})

    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        axios.get('http://localhost:8000/auth/profile', {
            headers : {Authorization : `Bearer ${sessionId}`}
        })
        .then(response => {
            const user = response.data
            setUser(user)
            setAuthState({user: user.id, token: sessionId})
        })
        .catch(error => console.log(error))
        }, []);

    return(<>
    
    </>)
}