// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../config/AuthContext.jsx';
// import { Link, useNavigate } from 'react-router-dom';
// import { logout, getProfile } from '../services/AuthService.js';
// import { findUser, findWhoUserFollows, findWhoFollowsUser } from '../services/UserService.js';
// import { destroyPost } from '../services/PostService.js';
// import Cookies from 'js-cookie';

// // Import CSS module
// import '../assets/css/ProfilePage.css';

// export const ProfilePage = (props) => {
//     const { user, setUser } = props;
//     const { authState, setAuthState } = useAuth();
//     const [displayPost, setDisplayPost] = useState(false);
//     const [userPostInfo, setUserPostInfo] = useState([]);
//     const [viewLikedPost, setViewLikedPosts] = useState(false);
//     const [likedPosts, setLikedPosts] = useState([]);
//     const [showFollowers, setShowFollowers] = useState(false);
//     const [userFollowers, setUserFollowers] = useState([]);
//     const [userFollowing, setUserFollowing] = useState([]);
//     const [showFollowing, setShowFollowing] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const sessionId = Cookies.get('sessionId');
//         getProfile()
//             .then(res => {
//                 setUser(res);
//                 setAuthState({ user: res.id, token: sessionId });
//             })
//             .catch(error => console.log(error));
//     }, []);

//     useEffect(() => {
//         if (user?.id) {
//             findUser(user.id)
//                 .then(res => setUserPostInfo(res.posts))
//                 .catch(error => console.log(error));
//         }
//     }, [user?.id]);

//     useEffect(() => {
//         if (user?.id) {
//             findUser(user.id)
//                 .then(res => setLikedPosts(res.likedPosts))
//                 .catch(error => console.log(error));
//         }
//     }, [user?.id]);

//     useEffect(() => {
//         if (user?.id) {
//             findWhoUserFollows(user.id)
//                 .then(res => setUserFollowers(res))
//                 .catch(error => console.log(error));
//         }
//     }, [user?.id]);

//     useEffect(() => {
//         if (user?.id) {
//             findWhoFollowsUser(user.id)
//                 .then(res => setUserFollowing(res))
//                 .catch(error => console.log(error));
//         }
//     }, [user?.id]);

//     const editProfilePage = () => navigate(`/edit/user/${user.id}`);

//     const logoutUser = () => {
//         logout()
//             .then(() => navigate('/'))
//             .catch(error => console.log(error));
//     };

//     const showUserInfo = () => {
//         setShowFollowers(false)
//         setShowFollowing(false)
//         setViewLikedPosts(false)
//         setDisplayPost(false)
//     }

//     const deletePost = (e, postId) => {
//         e.preventDefault();
//         destroyPost(user.id, postId)
//             .then(() => setUserPostInfo(prevPosts => prevPosts.filter(post => post.id !== postId)))
//             .catch(error => console.log(error));
//     };

//     return (
//         <div className="profile-container">
//             <h1 className="profile-title">{user.username ? user.username : "Profile"}</h1>
            
//             <div className="button-group">
//                 <button className="profile-btn" onClick={logoutUser}>Logout</button>
//                 <button className="profile-btn" onClick={editProfilePage}>Edit Profile</button>
//                 <button className="profile-btn" onClick={showUserInfo}>User Info</button>
//                 <button className="profile-btn" onClick={() => setViewLikedPosts(true)}>Liked Posts</button>
//                 <button className="profile-btn" onClick={() => setDisplayPost(true)}>Posts</button>
//                 <button className="profile-btn" onClick={() => setShowFollowing(true)}>Followers</button>
//                 <button className="profile-btn" onClick={() => setShowFollowers(true)}>Following</button>
//             </div>
//         { !viewLikedPost && !displayPost && !showFollowers && !showFollowing && (
//             <div className="profile-info">
//                 <p><strong>First Name:</strong> {user.firstName}</p>
//                 <p><strong>Last Name:</strong> {user.lastName}</p>
//                 <p><strong>Email:</strong> {user.email}</p>
//             </div>
//         )}

//             {displayPost && userPostInfo.length > 0 ? (
//                 <table className="profile-table">
//                     <tbody>
//                         {userPostInfo.map(post => (
//                             <tr key={post.id}>
//                                 <td>Post Name: {post.name}</td>
//                                 <td>Category: {post.category}</td>
//                                 <td>Rating: {post.rating}</td>
//                                 <td>
//                                     <Link to={`/edit/post/${post.id}`}><button className="edit-btn">Edit</button></Link>
//                                     <button className="delete-btn" onClick={(e) => deletePost(e, post.id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : <p className="no-posts">No Posts Available</p>}

//             {viewLikedPost && likedPosts.length > 0 ? (
//                 <table className="profile-table">
//                     <tbody>
//                         {likedPosts.map(post => (
//                             <tr key={post.id}>
//                                 <td>Name: <Link to={`/display/post/${post.id}`}>{post.name}</Link></td>
//                                 <td>Category: {post.category}</td>
//                                 <td>Rating: {post.rating}</td>
//                                 <td>Posted By: <Link to={`/display/user/${post.user.id}`}>{post.user.username}</Link></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : <p className="no-posts">No Liked Posts</p>}
            
//             {showFollowers && userFollowers.length > 0 ? (
//                 <table className="profile-table">
//                     <tbody>
//                         {userFollowers.map(post => (
//                             <tr key={post.id}>
//                                 <td>{post.username} is following you.</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : <p className="no-posts">No Followers</p>}

//             {showFollowing && userFollowing.length > 0 ? (
//                 <table className="profile-table">
//                     <tbody>
//                         {userFollowing.map(post => (
//                             <tr key={post.id}>
//                                 <td>You are following {post.username}.</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             ) : <p className="no-posts">Not Following Anyone</p>}
//         </div>

//     );
// };
import React, { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getProfile } from '../services/AuthService.js';
import { findUser, findWhoUserFollows, findWhoFollowsUser } from '../services/UserService.js';
import { destroyPost } from '../services/PostService.js';
import Cookies from 'js-cookie';

import '../assets/css/ProfilePage.css';

export const ProfilePage = (props) => {
    const { user, setUser } = props;
    const { authState, setAuthState } = useAuth();
    const [activeSection, setActiveSection] = useState(null);
    const [userPostInfo, setUserPostInfo] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [userFollowers, setUserFollowers] = useState([]);
    const [userFollowing, setUserFollowing] = useState([]);

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
        <div className="profile-container">
            <h1 className="profile-title">{user.username ? user.username : "Profile"}</h1>
            
            <div className="button-group">
                <button className="profile-btn" onClick={logoutUser}>Logout</button>
                <button className="profile-btn" onClick={editProfilePage}>Edit Profile</button>
                <button className="profile-btn" onClick={() => setActiveSection(null)}>User Info</button>
                <button className="profile-btn" onClick={() => setActiveSection('likedPosts')}>Liked Posts</button>
                <button className="profile-btn" onClick={() => setActiveSection('posts')}>Posts</button>
                <button className="profile-btn" onClick={() => setActiveSection('followers')}>Followers</button>
                <button className="profile-btn" onClick={() => setActiveSection('following')}>Following</button>
            </div>

            {activeSection === null && (
                <div className="profile-info">
                    <p><strong>First Name:</strong> {user.firstName}</p>
                    <p><strong>Last Name:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            )}

            {activeSection === 'posts' && userPostInfo.length > 0 ? (
                <table className="profile-table">
                    <tbody>
                        {userPostInfo.map(post => (
                            <tr key={post.id}>
                                <td>Post Name: {post.name}</td>
                                <td>Category: {post.category}</td>
                                <td>Rating: {post.rating}</td>
                                <td>
                                    <Link to={`/edit/post/${post.id}`}><button className="edit-btn">Edit</button></Link>
                                    <button className="delete-btn" onClick={(e) => deletePost(e, post.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : activeSection === 'posts' && <p className="no-posts">No Posts Available</p>}

            {activeSection === 'likedPosts' && likedPosts.length > 0 ? (
                <table className="profile-table">
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
            ) : activeSection === 'likedPosts' && <p className="no-posts">No Liked Posts</p>}
            
            {activeSection === 'followers' && userFollowers.length > 0 ? (
                <table className="profile-table">
                    <tbody>
                        {userFollowers.map(post => (
                            <tr key={post.id}>
                                <td>{post.username} is following you.</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : activeSection === 'followers' && <p className="no-posts">No Followers</p>}

            {activeSection === 'following' && userFollowing.length > 0 ? (
                <table className="profile-table">
                    <tbody>
                        {userFollowing.map(post => (
                            <tr key={post.id}>
                                <td>You are following {post.username}.</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : activeSection === 'following' && <p className="no-posts">Not Following Anyone</p>}
        </div>
    );
};