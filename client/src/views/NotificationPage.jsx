import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../config/AuthContext.jsx"
import {logout, getProfile} from '../services/AuthService.js'
import Cookies from 'js-cookie'


export const NotificationPage = (props) => {

    const {loggedInUser} = props
    const {logout, authState, setAuthState } = useAuth()
    const [user, setUser] = useState({})

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
        <h1>Notifications</h1>
        <button onClick={logoutUser}>Logout</button>
    </>)
}