import React, { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getProfile } from '../services/AuthService.js';
import { findUser, findWhoUserFollows, findWhoFollowsUser } from '../services/UserService.js';
import { destroyPost } from '../services/PostService.js';
import Cookies from 'js-cookie';

// Import CSS module
import './ProfilePage.css';

export const ProfilePage = (props) => {
    const { user, setUser } = props;
    const { authState, setAuthState } = useAuth();
    const [displayPost, setDisplayPost] = useState(false);
    const [userPostInfo, setUserPostInfo] = useState([]);
    const [viewLikedPost, setViewLikedPosts] = useState(false);
    const [likedPosts, setLikedPosts] = useState([]);
    const [showFollowers, setShowFollowers] = useState(false);
    const [userFollowers, setUserFollowers] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);
    const [showFollowing, setShowFollowing] = useState(false);

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

    useEffect(() => {
        if (user?.id) {
            findUser(user.id)
                .then(res => setUserPostInfo(res.posts))
                .catch(error => console.log(error));
        }
    }, [user?.id]);

    useEffect(() => {
        if (user?.id) {
            findUser(user.id)
                .then(res => setLikedPosts(res.likedPosts))
                .catch(error => console.log(error));
        }
    }, [user?.id]);

    useEffect(() => {
        if (user?.id) {
            findWhoUserFollows(user.id)
                .then(res => setUserFollowers(res))
                .catch(error => console.log(error));
        }
    }, [user?.id]);

    useEffect(() => {
        if (user?.id) {
            findWhoFollowsUser(user.id)
                .then(res => setUserFollowing(res))
                .catch(error => console.log(error));
        }
    }, [user?.id]);

    const editProfilePage = () => navigate(`/edit/user/${user.id}`);

    const logoutUser = () => {
        logout()
            .then(() => navigate('/'))
            .catch(error => console.log(error));
    };

    const deletePost = (e, postId) => {
        e.preventDefault();
        destroyPost(user.id, postId)
            .then(() => setUserPostInfo(prevPosts => prevPosts.filter(post => post.id !== postId)))
            .catch(error => console.log(error));
    };

    return (
        <div className={container}>
            <h1 className={header}>{user.username ? user.username : "Profile"}</h1>
            <Link to={'/home'}>Home Page</Link>

            <div className={btn-group}>
                <button onClick={logoutUser}>Logout</button>
                <button onClick={editProfilePage}>Edit Profile</button>
                <button onClick={() => setViewLikedPosts(true)}>Liked Posts</button>
                <button onClick={() => setDisplayPost(true)}>Posts</button>
                <button onClick={() => setShowFollowing(true)}>Followers</button>
                <button onClick={() => setShowFollowers(true)}>Following</button>
            </div>

            <div className={userInfo}>
                <p>First Name: {user.firstName}</p>
                <p>Last Name: {user.lastName}</p>
                <p>Email: {user.email}</p>
            </div>

            {displayPost && userPostInfo.length > 0 ? (
                <table>
                    <tbody>
                        {userPostInfo.map(post => (
                            <tr key={post.id}>
                                <td>Post Name: {post.name}</td>
                                <td>Category: {post.category}</td>
                                <td>Rating: {post.rating}</td>
                                <td>
                                    <Link to={`/edit/post/${post.id}`}><button>Edit</button></Link>
                                    <button onClick={(e) => deletePost(e, post.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <p className={noData}>No Posts Available</p>}

            {viewLikedPost && likedPosts.length > 0 ? (
                <table>
                    <tbody>
                        {likedPosts.map(post => (
                            <tr key={post.id}>
                                <td>Name: <Link to={`/display/post/${post.id}`}>{post.name}</Link></td>
                                <td>Category: {post.category}</td>
                                <td>Rating: {post.rating}</td>
                                <td>Posted By: <Link to={`/display/user/${post.user.id}`}>{post.user.username}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <p className={noData}>No Liked Posts</p>}
        </div>
    );
};