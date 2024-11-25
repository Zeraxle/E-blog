import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom'
import {logout, getProfile} from '../services/AuthService.js'
import { findAllMoviePosts } from '../services/PostService.js';
import Cookies from 'js-cookie'

export const MoviePosts = (props) =>{
    const {loggedInUser} = props
    const {authState, setAuthState} = useAuth()
    const [allMovies, setAllMovies] = useState([])
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

    useEffect(()=>{
        findAllMoviePosts()
            .then(res =>{
                setAllMovies(res)
                console.log("hiii")
                
            })
            
            .catch(error => console.log(error))


        },[])

        useEffect(()=>{
            console.log(allMovies)
    
            },[])

        const logoutUser = () => {
            logout()
                .then(navigate('/'))
                .catch(error => console.log(error))
        }


    return(<>
        <h1>Movie Posts</h1>
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
                
                {allMovies.map((movie =>{
                    return(
                    <tr key={movie.id}>
                        <td><Link to={`/display/post/${movie.id}`}>{movie.name}</Link></td>
                        <td>{movie.description}</td>
                        <td>{movie.category}</td>
                        <td>{movie.rating}</td>
                        <td><Link to = {`/display/user/${movie.user.id}`}>{movie.user.username}</Link></td>
                    </tr>
                    )
                }))}
            </tbody>
        </table>
    </>

    )

}

