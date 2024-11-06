import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom'
import {logout, getProfile} from '../services/AuthService.js'
import { findAllAnimePosts } from '../services/PostService.js';
import Cookies from 'js-cookie'

export const AnimePosts =  (props) =>{
    const [allAnimePosts,setAllAnimePosts] = useState([])
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

        const logoutUser = () => {
            logout()
                .then(navigate('/'))
                .catch(error => console.log(error))
        }

        useEffect(() =>{
            findAllAnimePosts()
                .then(res =>{
                    setAllAnimePosts(res)
                })
                .catch(error => console.log(error))
            }, [])


    return(
        <>
            <h1>Anime Posts </h1>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Category</td>
                        <td>Rating</td>
                        <td>Posted By</td>
                    </tr>
                </thead>
                <tbody>
                    {allAnimePosts.map((post =>{
                        return(
                            <tr key={post.id}>
                                <td><Link to={`/display/post/${post.id}`}>{post.name}</Link></td>
                                <td>{post.description}</td>
                                <td>{post.category}</td>
                                <td>{post.rating}</td>
                                <td><Link to={`/display/user/${post.user.id}`}>{post.user.username}</Link></td>
                            </tr>
                        )
                    }))}
                </tbody>
            </table>
            <button onClick={logoutUser}>Logout</button>
        </>
    )
}