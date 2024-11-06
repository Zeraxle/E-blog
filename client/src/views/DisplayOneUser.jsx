import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { findUser, findWhoUserFollows } from "../services/UserService"
import { Navigate } from "react-router-dom"
import { getProfile } from "../services/AuthService"
import Cookies from 'js-cookie'
import { createFollow } from "../services/FollowService"
import { destroyFollow } from "../services/FollowService"
import { updateUser } from "../services/UserService"

export const DisplayOneUser = (props) =>{
    const { user, setAuthState, setUser, setUpdateUserInfo} = props
    const {id} = useParams ()
    const [displayedUserId, setDisplayedUserID] = useState({})
    const [usersPosts, setUsersPosts] = useState ([])
    const [userFollowing, setUserFollowing] = useState([])
    const [userFollowers, setUserFollowers] = useState([])
    const [loggedInUserPage, setLoggedInUserPage] = useState(false)
    const [followRelationship, setFollowRelationship] = useState(false)
    const navigate = useNavigate()

    // console.log(loggedInUser)

    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        getProfile()
            .then(res => {
                setUser(res)
                const loggedUser = res.id === parseInt(id)
                setLoggedInUserPage(loggedUser)
                setAuthState({user: res.id, token: sessionId })
            
            })
            .catch(error => console.log(error))
        }, [id]);

    useEffect(() =>{

        findUser(id)
            .then(user =>{
                setDisplayedUserID(user)
                
            })
        .catch(error => console.log(error))

        },[id])

    
    const goToProfilepage = () =>{

                navigate(`/user/profile`)
    }

        useEffect(() =>{

            findUser(id)
            .then(user =>{
                setUsersPosts(user.posts)
            })
        .catch(error => console.log(error))

        },[id])
        
            useEffect(() => {
                    findWhoUserFollows(user?.id)
                        .then(following => {
                            const ifFollowing = following.some(following => following.id === parseInt(id));
                            
                            setFollowRelationship(ifFollowing)
                        })
                        .catch(error => console.log(error));
            }, [id, displayedUserId.id]);
            

            useEffect(() => {
                findWhoUserFollows(id)
                    .then(following => {
                        setUserFollowing(following)
                    })
                    .catch(error => console.log(error));
        }, [id, displayedUserId.id]);
        
        
        const followUser = () =>{
            const followerId = user.id
            const followedUserId = id
            createFollow({followerId,followedUserId })
            .then (res =>{
                    setFollowRelationship(true)
                    console.log("Successful follower creation ", res)
                })
                .catch(error => console.log(error))
        }

        const unfollowUser = () =>{
            const followerId = user.id
            const followedUserId = id

            destroyFollow(followerId, followedUserId)
                .then(res =>{
                    console.log("successful unfollow", res)
                    setFollowRelationship(false)
                })
                .catch(error => console.log(error))
        }
    
    return(
        <>
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>UserName</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{displayedUserId.firstName} {displayedUserId.lastName}</td>
                    <td>{displayedUserId.username}</td>
                </tr>
            </tbody>
        </table>


        <table>
            <thead>
                <tr>
                    <td>Post Name</td>
                    <td>Description </td>
                    <td>Rating</td>
                    <td>Category</td>
                </tr>
            </thead>
            <tbody>
                {usersPosts.map((post =>{
                    return(
                <tr key={post.id}>

                    <td> <Link to={`/display/post/${post.id}`}>{post.name}</Link></td>
                    <td>{post.description}</td>
                    <td>{post.rating}</td>
                    <td>{post.category}</td>
                </tr>
                    )
                }))}
            </tbody>
        </table>
        <table>
            <thead>
                <tr>
                    <td>User is following </td>
                </tr>
            </thead>
            <tbody>
                { userFollowing.length > 0 ? (
                    userFollowing.map(following => (
                        <tr key={following.id}>
                            <td> <Link to={`/display/user/${following.id}`}>{following.username}</Link></td>
                        </tr>
                    ))) :(
                        <tr>
                            <td>No Followers found</td>
                        </tr>
                    )}
            </tbody>
        </table>
        {loggedInUserPage ? (
        <button onClick={goToProfilepage}>Profile Page</button>
        ) : (
        <>
        <button onClick={followRelationship ? unfollowUser : followUser}>
            {followRelationship ? 'Unfollow' : 'Follow'}
        </button>
    </>
    )}

        </>
    )
}