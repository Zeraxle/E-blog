import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { logout, getProfile } from '../services/AuthService.js';
import { findAllPosts } from '../services/PostService.js';
import { createLike, destroyLike } from '../services/LikeService.js';
import Cookies from 'js-cookie';
import { useLikes } from './LikeContext.jsx';

import './AllPosts.css'; // Import the CSS file

export const AllPosts = (props) => {
    const { loggedInUser, postLiked, setPostLiked, setUrlPath} = props;
    const { authState, setAuthState } = useAuth();
    const [user, setUser] = useState({});

    const {category} = useParams()
    // const { postLiked, setPostLiked } = useLikes();
    const [allPosts, setAllPosts] = useState([]);
    

    const navigate = useNavigate();

    useEffect(() => {
        const sessionId = Cookies.get('sessionId');
        getProfile()
            .then(res => {
                setUser(res);
                setAuthState({ user: res.id, token: sessionId });
            })
            .catch(error => console.log(error));
    }, [postLiked]);

    const logoutUser = () => {
        logout()
            .then(() => navigate('/'))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        findAllPosts()
            .then(posts => {
                setAllPosts(posts);
            })
            .catch(error => console.log(error));
    }, [postLiked]);

    const createPostLike = async(e, postId) =>{
        e.preventDefault()
        console.log(postId)
        console.log(user.id)
        const userId = user.id

        try{
            createLike({userId, postId})
            // console.log(postLiked)
            
                setPostLiked((prev) => ({ ...prev,[postId]: true}))
                
            
            // console.log(postLiked)
        }catch (error){
            console.log(error)
        }
    }

    const createPostDislike = async(e, postId) =>{
        e.preventDefault()

        const userId = user.id
        try{
            destroyLike(userId,postId)
            
                setPostLiked((prev) => ({ ...prev, [postId] : false}))
            
            // console.log(postLiked)
        }catch(error){
            console.log(error)
        }
    }

    const goToComments = async(e,postId) =>{
        const category = 'AllPosts'
        console.log(category)
        setUrlPath((prev) => ({...prev, path : category}))
        navigate(`/${category}/post/${postId}/comments`)
    // const goToComments = async(e, postId) =>{
    //     navigate(`post/${postId}/comments`)
    }
    return (
        <div id="root">
            <div>
                <div>
                    {allPosts.map((post) => (
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
