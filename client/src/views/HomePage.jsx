import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../config/AuthContext.jsx"
import { logout, getProfile } from "../services/AuthService.js"
import Cookies from 'js-cookie'
import axios from "axios"

export const HomePage = (props) => {

    const {loggedInUser, setUser,user } = props
    const {authState, setAuthState } = useAuth()
    // const [user, setUser] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        getProfile()
            .then(res => {
                setUser(res)
                setAuthState({user: res.id, token: sessionId })})
            .catch(error => console.log(error))
        }, []);
        
        const logoutUser = () => {
            logout()
                .then(navigate('/'))
                .catch(error => console.log(error))
        } 

    return(<>
        

                <h1>Homepage</h1>
                {user? <p>{user.username}</p> : null}
                <button onClick={logoutUser}>Logout</button>
                <Link to={'/user/profile'}>User Profile</Link>

    </>)
}