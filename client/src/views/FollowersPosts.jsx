import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom'
import {logout, getProfile} from '../services/AuthService.js'
import { findAllFollowersPosts } from '../services/PostService.js';
import Cookies from 'js-cookie'

export const FollowersPosts = (props) =>{
    const [followerPosts, setFollowersPosts] = useState([])
    const {loggedInUser} = props
    const {authState, setAuthState} = useAuth()
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

    useEffect(() =>{
        findAllFollowersPosts(res =>{
            
        })

        }, [])

        const logoutUser = () => {
            logout()
                .then(navigate('/'))
                .catch(error => console.log(error))
        }


    return(
        <>
            <h1>Followers Posts</h1>
            <button onClick={logoutUser}>Logout</button>
        </>
    )
}


// <Route path = "/:id/details" element = {<DisplayOne deleteById = {deleteById}
// const {id} = useParams()

//     const Navigate = useNavigate()
//     useEffect(() =>{
//         findPatientById(id)
//         .then((res) => setPatientInfo(res))
//         // console.log(res)
//         .catch(error => console.log(error))

        
//     },[])