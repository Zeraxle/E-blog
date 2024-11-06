import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getProfile } from '../services/AuthService.js';
import { findAllPosts } from '../services/PostService.js';
import Cookies from 'js-cookie';
import './AllPosts.css'; // Import the CSS file

export const AllPosts = (props) => {
    const { loggedInUser } = props;
    const { authState, setAuthState } = useAuth();
    const [user, setUser] = useState({});
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
                                <button className="icon">❤️</button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <button onClick={logoutUser} className="logout-button">Logout</button>
            </div>
        </div>
    );
};
