import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie'

export const ProfilePage = () => {
    const { authState, setAuthState } = useAuth();
    const [user, setUser] = useState({});

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

    return (
    <div>
        {user.username? <p>{user.username}</p> : null}
        <Link to={'/home'}>Home Page</Link>
    </div>
    )    
};




