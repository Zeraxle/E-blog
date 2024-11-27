import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom'
import {logout, getProfile} from '../services/AuthService.js'
import { findAllFollowersPosts } from '../services/PostService.js';
import Cookies from 'js-cookie'

export const FollowersPosts = (props) =>{
    const [followerPosts, setFollowersPosts] = useState([])
    const {loggedInUser, user,setUser, setAuthState, authState , postLiked, setPostLiked, setUrlPath} = props
    // const {authState, setAuthState} = useAuth()
    // const [user, setUser] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        getProfile()
            .then(res => {
                setUser(res)
                setAuthState({user: res.id, token: sessionId })})
            .catch(error => console.log(error))
        }, [postLiked]);

    useEffect(() =>{
        findAllFollowersPosts(user.id)
            .then(res =>{
                setFollowersPosts(res)
            })
            .catch(error => console.log(error))
        }, [])

        const logoutUser = () => {
            logout()
                .then(navigate('/'))
                .catch(error => console.log(error))
        }
        
        useEffect(()=>{

            console.log(followerPosts)
            }, [])

        const goToComments = () =>{

        }

        const createPostDislike = () =>{

        }

        const createPostLike = () =>{
        
        }

            return (
                <div id="root">
                    <div>
                        <div>
                                {followerPosts.map((post) => (
                                                <div key={post.id} className="post-container">
                                                    <h2>{post.name}</h2>
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