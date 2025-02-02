import { useEffect, useState } from 'react';
import { useAuth } from '../config/AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom'
import {logout, getProfile} from '../services/AuthService.js'


import { findUser, updateUser, findWhoUserFollows, findWhoFollowsUser} from '../services/UserService.js';
import { destroyPost } from '../services/PostService.js';
import Cookies from 'js-cookie'

export const ProfilePage = (props) => {
    const {updateUserInfo, setUpdateUserInfo, user, setUser} = props
    const { authState, setAuthState } = useAuth();
    const [displayPost, setDisplayPost] = useState(false)
    const [userPostInfo, setUserPostInfo] = useState([])
    const [viewLikedPost, setViewLikedPosts] = useState(false)
    const [likedPosts, setLikedPosts] = useState([])
    const [showFollowers, setShowFollowers] = useState(false)
    const [userFollowers, setUserFollowers] = useState([])
    const [userFollowing, setUserFollowing] = useState([])
    const [showFollowing, setShowFollowing] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        getProfile()
            .then(res => {
                setUser(res)
                setAuthState({user: res.id, token: sessionId })})
            .catch(error => console.log(error))
        }, []);


    useEffect(() =>{
        findUser(user.id)
        .then(res =>{
            setUserPostInfo(res.posts)
            // setUserPostInfo(res)
        })
        .catch(error => console.log(error))
    }, [user.id])

    useEffect(() =>{
        findUser(user.id)
        .then(res =>{
            setLikedPosts(res.likedPosts)
        })
        .catch(error => console.log(error))
    },[user.id])

    useEffect (() =>{
        console.log(likedPosts)
    },[likedPosts])
        
    const editProfilePage = () =>{
        navigate(`/edit/user/${user.id}`)
    }

    useEffect(() =>{
    findWhoUserFollows(user.id)
    .then(res =>{
        setUserFollowers(res)
    })
    .catch(error => console.log(error))

    },[user.id])


    useEffect(() =>{
        findWhoFollowsUser(user.id)
        .then(res =>{
            setUserFollowing(res)
        })
        .catch(error => console.log(error))
    
        },[user.id])

        const logoutUser = () => {
            logout()
            .then(navigate('/'))
            .catch(error => console.log(error))
        }
        
    const usersLikedPosts = () =>{
            setViewLikedPosts(true)
            setDisplayPost(false)
            setShowFollowers(false)
            setShowFollowing(false)
    }

    const displayPosts = () =>{
        setDisplayPost(true)
        setViewLikedPosts(false)
        setShowFollowers(false)
        setShowFollowing(false)
    }

    const displayFollowers = () =>{
        setShowFollowers(true)
        setViewLikedPosts(false)
        setDisplayPost(false)
        setShowFollowing(false)

    }
    const displayFollowing = () =>{
        setShowFollowing(true)
        setShowFollowers(false)
        setViewLikedPosts(false)
        setDisplayPost(false)
    }

    const deletePost = (e, postId) =>{
        e.preventDefault()
        const postid = postId
        const userid = user.id
        destroyPost(userid,postid)
        const newPosts = userPostInfo.filter(post => post.id !== postid)
        setUserPostInfo(newPosts)
    }

    return (
    <>
        {user.username? <p>{user.username}</p> : null}
        <Link to={'/home'}>Home Page</Link>
        <button onClick={logoutUser}>Logout</button>
        <button onClick={editProfilePage}>Edit Profile</button>
        <button onClick={usersLikedPosts}>Liked Posts</button>
        <button onClick={displayPosts}>Posts</button>
        <button onClick={displayFollowing}>Followers</button>
        <button onClick={displayFollowers}>Following</button>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>

        {displayPost && userPostInfo?.length > 0 ?
        <table>
            <tbody>
            
            {userPostInfo.map((post) => (
                <tr key={post.id}>
                    <td> Post Name :{post.name}</td>
                    <td>Category : {post.category}</td>
                    <td>Rating : {post.rating}</td>
                    <td>Actions : <Link to={`/edit/post/${post.id}`}><button>Edit</button> </Link>
                    <button onClick={(e) => deletePost(e,post.id)}> Delete</button></td>
                </tr>
            ))}
                </tbody>
                </table>
            :
            <p> </p>

        }


        {viewLikedPost && likedPosts?.length> 0 ?
        <table>
            <tbody>
                {likedPosts.map((post) =>(
                    <tr key={post.id}>
                        {/* <td>Name : {post.name}</td> */}
                        <td> Name : <Link to={`/display/post/${post.id}`}>{post.name}</Link></td>
                        <td>Category : {post.category}</td>
                        <td> Rating : {post.rating }</td>
                        {/* <td> Posted By : {post.user.username }</td> */}
                        <td> Posted By : <Link to={`/display/user/${post.user.id}`}>{post.user.username}</Link> </td>
                    </tr>
                ))}
            </tbody>

        </table>
        : <p>  </p>}


        {showFollowers && userFollowers?.length > 0 ?
        <table>
            <tbody>
                {userFollowers.map((user =>(
                    <tr key={user.id}>
                        <td> First Name: {user.firstName}</td>
                        <td>Last Name: {user.lastName}</td>
                        <td> Username <Link to={`/display/user/${user.id}`}>{user.username}</Link> </td>
                    </tr>
                )))}
            </tbody>

        </table>
        : <p></p>}

        {showFollowing && userFollowing?.length > 0 ?
        
        <table>
            <tbody>
                {userFollowing.map((user =>(
                    <tr key={user.id}>
                        <td> First Name : {user.firstName}</td>
                        <td> Last Name : {user.lastName}</td>
                        <td> Username <Link to={`/display/user/${user.id}`}>{user.username}</Link> </td>
                    </tr>
                )))}
            </tbody>
        </table>
        :<p></p>}
</>
    )    
};




