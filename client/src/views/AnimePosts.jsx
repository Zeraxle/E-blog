import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import {Link, useNavigate, useParams} from 'react-router-dom'
import {logout, getProfile} from '../services/AuthService.js'
import { findAllAnimePosts } from '../services/PostService.js';
import Cookies from 'js-cookie'
import { createLike, destroyLike } from '../services/LikeService.js';

export const AnimePosts =  (props) =>{
    const [allAnimePosts,setAllAnimePosts] = useState([])
    const {loggedInUser, postLiked, setPostLiked, setUrlPath} = props
    const {authState, setAuthState} = useAuth()
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

        const goToComments = (e, postId)=>{
            e.preventDefault()
            const category = 'Anime'
            setUrlPath((prev) => ({...prev, path : category}))
            navigate(`/${category}/post/${postId}/comments`)
        }

        const createPostDislike = async(e, postId) =>{
            e.preventDefault()
            const userid = user.id
            const postid = postId
            try {
                destroyLike(userid, postid)
                setPostLiked((prev) => ({...prev, [postid] : false}))
            }
            catch(error){
                console.log(error)
            }
        }

        const createPostLike = async(e, postId) =>{
            e.preventDefault()
            const userId = user.id
            // const postId = postId

            try{
                createLike({userId, postId})
                .then(res =>{
                    console.log('Successful like creation ', res)
                })
                setPostLiked((prev) => ({...prev, [postId] : true}))

            }catch(error){
                console.log(error)
            }
        }

    return (
        <div id="root">
            <div>
                <div>
                        {allAnimePosts.map((post) => (
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