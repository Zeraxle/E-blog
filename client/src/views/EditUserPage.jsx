import { useEffect } from "react";
import { useAuth } from '../config/AuthContext.jsx';
import Cookies from 'js-cookie'
import { getProfile } from "../services/AuthService";
export const EditUserPage = (props) =>{

    const {user, setUser} = props

    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        getProfile()
            .then(res => {
                setUser(res)
                setAuthState({user: res.id, token: sessionId })})
            .catch(error => console.log(error))
        }, []);



    return(
        <>
        <p>Edit User Page {user.username}</p>

        </>
    )
}