import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import {Link, useNavigate, useParams} from 'react-router-dom'
import {logout, getProfile} from '../services/AuthService.js'
import { findAllMoviePosts } from '../services/PostService.js';
import { createLike, destroyLike } from '../services/LikeService.js';
import Cookies from 'js-cookie'
import './MoviesPost.css'
import './AllPosts.css';
export const MoviePosts = (props) =>{
    const {loggedInUser, postLiked, setPostLiked, setUrlPath  } = props
    const {authState, setAuthState} = useAuth()
    const [allMovies, setAllMovies] = useState([])
    const [user, setUser] = useState({})
    const {category} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        getProfile()
            .then(res => {
                setUser(res)
                setAuthState({user: res.id, token: sessionId })})
            .catch(error => console.log(error))
        }, [postLiked]);

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


        const goToComments = (e, postId) =>{
            const category  = 'Movies'
            setUrlPath((prev) => ({...prev, path : category}))
            navigate(`/${category}/post/${postId}/comments`)
        }

        const createPostDislike = async(e, postId) =>{
            e.preventDefault()
            const userid = user.id
            const postid = postId
            console.log(userid)

            try{
                destroyLike(userid,postid)
                setPostLiked((prev) => ({...prev,[postid]: false}))
            }
            catch(error){
                console.log(error)
            }
        }

        const createPostLike = async (e, postId) =>{
            e.preventDefault()
            console.log(user.id)
            const userId = user.id
        

            try {
                createLike({userId,postId})
                .then(res =>{
                    console.log('Successful like creation ', res)
                })
                setPostLiked((prev) => ({...prev, [postId] : true }))
    
            }
            catch(error){
                console.log(error)
            }

            }

        return (
            <div id="root">
                <div>
                    <div>
                        {allMovies.map((post) => (
                            <div key={post.id} className="post-container">
                                <h2 className="post-title">{post.name}</h2>
                                <p className="post-content">{post.description}</p>
                                <p className="post-category">Category: {post.category}</p>
                                <p className="post-rating">Rating: {post.rating}/5</p>
                                <p className="post-username">Posted by: <Link to={`/display/user/${post.user.id}`}>{post.user.username}</Link></p>
                                <div className="post-actions">
                                    <button onClick = {(e) => goToComments(e,post.id)}className="icon">💬</button>
                                        {/* <button onClick = {(e) => createPostLike(e,post.id)}className="icon">❤️</button> */}
    
    
                                    
                                    {postLiked [post.id]? (
                                        <button onClick={(e) => createPostDislike(e, post.id)} className="icon">💔</button>
                                        
                                    ): (
                                        <button onClick = {(e) => createPostLike(e,post.id)}className="icon">❤️</button>
                                        
                                            
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button onClick={logoutUser} className="logout-button">Logout</button>
                </div>
            </div>
        );
    };
    