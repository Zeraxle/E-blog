import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../config/AuthContext.jsx"
import { getProfile } from "../services/AuthService.js"
import Cookies from 'js-cookie'
import axios from "axios"

export const HomePage = (props) => {

    const {loggedInUser} = props
    const {logout, authState, setAuthState } = useAuth()
    const [user, setUser] = useState({})

    const navigate = useNavigate()

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
        

                <h1>Homepage</h1>
                {user? <p>{user.username}</p> : null}
                <button onClick={logout}>Logout</button>
                <Link to={'/user/profile'}>User Profile</Link>

    </>)
}