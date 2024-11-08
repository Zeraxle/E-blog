import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getProfile } from '../services/AuthService.js';
import { findAllPosts } from '../services/PostService.js';
import { createLike, destroyLike } from '../services/LikeService.js';
import Cookies from 'js-cookie';
import './AllPosts.css'; // Import the CSS file

export const AllPosts = (props) => {
    const { loggedInUser } = props;
    const { authState, setAuthState } = useAuth();
    const [user, setUser] = useState({});
    const [allPosts, setAllPosts] = useState([]);
    const [postLiked, setPostLiked] = useState({
        postid : '',
        isPostLiked: false
    })
    const navigate = useNavigate();

    useEffect(() => {
        const sessionId = Cookies.get('sessionId');
        getProfile()
            .then(res => {
                setUser(res);
                setAuthState({ user: res.id, token: sessionId });
            })
            .catch(error => console.log(error));
    }, []);

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
    }, []);

    const createPostLike = async(e, postid) =>{
        e.preventDefault()
        console.log(postid)
        console.log(user.id)
        const userid = user.id

        try{
            createLike({userid, postid})
            // console.log(postLiked)
            .then(
                setPostLiked(...prev => ({ prev, postid : postid, isPostLiked : true}))
                
            )
            console.log(postLiked)
        }catch (error){
            console.log(error)
        }
    }

    const createPostDislike = async(e, postid) =>{
        e.preventDefault()

        const userid = user.id
        try{
            destroyLike(userid,postid)
            .then(
                setPostLiked(false)
            )
            console.log(postLiked)
        }catch(error){
            console.log(error)
        }


    }
    
    return (
        <div id="root">

            <div>

                <div>
                    {allPosts.map((post) => (
                        <div key={post.id} className="post-container">
                            <h2>{post.name}</h2>
                            <p className="post-content">{post.description}</p>
                            <p className="post-category">Category: {post.category}</p>
                            <p className="post-rating">Rating: {post.rating}/5</p>
                            <p className="post-username">Posted by: <Link to={`/display/user/${post.user.id}`}>{post.user.username}</Link></p>
                            <div className="post-actions">
                                <button className="icon">💬</button>
                                    {/* <button onClick = {(e) => createPostLike(e,post.id)}className="icon">❤️</button> */}


                                
                                {postLiked.isPostLiked? (
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
