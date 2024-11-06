import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom'
import {logout, getProfile} from '../services/AuthService.js'
import { findAllTvshowPosts } from '../services/PostService.js';
import Cookies from 'js-cookie'

export const TvShowPosts = (props) =>{
    const [allTvShows, setAllTvShows] = useState([])
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
    
        useEffect(()=>{
            findAllTvshowPosts()
                .then(res=>{
                    setAllTvShows(res)
                })
                .catch(error => console.log(error))

            }, [])

        useEffect(() => {
            console.log(allTvShows)
        }, [])


    return(
        <>
        <h1>Tv Show Posts</h1>
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
                    {allTvShows.map((show =>{
                        return(
                            <tr key={show.id}>
                                <td><Link to={`/display/post/${show.id}`}>{show.name}</Link></td>
                                <td>{show.description}</td>
                                <td>{show.category}</td>
                                <td>{show.rating}</td>
                                <td><Link to = {`/display/user/${show.user.id}`}>{show.user.username}</Link></td>
                            </tr>
                        )
                    }))}
                </tbody>
            </table>
        <button onClick={logoutUser}>Logout</button>
        </>
    )
}