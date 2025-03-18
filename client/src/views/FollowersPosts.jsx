import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom'
import {logout, getProfile} from '../services/AuthService.js'
import { findAllFollowersPosts } from '../services/PostService.js';
import { createLike, destroyLike } from '../services/LikeService.js';
import Cookies from 'js-cookie'
import './FollowersPost.css'

export const FollowersPosts = (props) =>{
    const [followerPosts, setFollowersPosts] = useState([])
    const {loggedInUser, user,setUser, setAuthState, authState , postLiked, setPostLiked, setUrlPath} = props


    const navigate = useNavigate()

    useEffect(() => {
        }, [postLiked]);

    useEffect(() =>{
        const fetchUserData = async () =>{

            try{
                const sessionId = Cookies.get('sessionId')
                const userProfile = await getProfile()
                setUser(userProfile)
                setAuthState({user: userProfile.id, token: sessionId })
                const posts = await findAllFollowersPosts(userProfile.id)
                const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setFollowersPosts(sortedPosts)
            } 
            catch(error) {
                console.log(error)
            }
        }
        fetchUserData()
        }, [])

        const logoutUser = () => {
            logout()
                .then(navigate('/'))
                .catch(error => console.log(error))
        }
        
        useEffect(()=>{

            }, [])

        const goToComments = (e, postId) =>{
            e.preventDefault()
            const category = 'FollowersPosts'
            setUrlPath((prev) => ({...prev, path : category}))
            navigate(`/${category}/post/${postId}/comments`)

        }

        const createPostDislike = async(e, postId) =>{
            e.preventDefault()
            const userid = user.id
            const postid = postId
            try{
                destroyLike(userid, postid)
                .then(res =>{
                    console.log('Succesful like creation', res)
                })
                setPostLiked((prev) => ({...prev, [postid] : false}))
            }
                catch(error){
                    console.log(error)
                }

        }

        const createPostLike =  async(e, postId) =>{
            e.preventDefault()
            const userId = user.id

            try{
                createLike({userId, postId})
                .then(res =>{
                    console.log('Successful like creation', res)
                })
                setPostLiked((prev) => ({...prev, [postId] : true}))
            }
            catch(error){
                console.log(error)
            }
        
        }

            return (
                <div id="root">
                    <div>
                        <div className='post-box'>
                                {followerPosts.map((post) => (
                                                <div key={post.id} className="post-container">
                                                    <h2 className='post-title'>{post.name}</h2>
                                                    <p className="post-content">{post.description}</p>
                                                    <p className="post-category">Category: {post.category}</p>
                                                    <p className="post-rating">Rating: {post.rating}/5</p>
                                                    <p className="post-username">Posted by: <Link to={`/display/user/${post.user.id}`}>{post.user.username}</Link></p>
                                                    <div className="post-actions">
                                                        <button onClick = {(e) => goToComments(e,post.id)}className="icon">💬</button>
                        
                        
                                                        
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