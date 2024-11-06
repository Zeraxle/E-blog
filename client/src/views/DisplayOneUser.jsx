import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { findUser } from "../services/UserService"
import { Navigate } from "react-router-dom"
import { getProfile } from "../services/AuthService"
import Cookies from 'js-cookie'
import { createFollow } from "../services/FollowService"

export const DisplayOneUser = (props) =>{
    const {loggedInUser, user, setAuthState, setUser} = props
    const {id} = useParams ()
    const [displayedUserId, setDisplayedUserID] = useState({})
    const [usersPosts, setUsersPosts] = useState ([])
    const navigate = useNavigate()

    // console.log(loggedInUser)

    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        getProfile()
            .then(res => {
                setUser(res)
                setAuthState({user: res.id, token: sessionId })})
            .catch(error => console.log(error))
        }, []);

    useEffect(() =>{

        findUser(id)
            .then(user =>{
                setDisplayedUserID(user)
            })
        .catch(error => console.log(error))

        },[id])


        useEffect(() =>{

            findUser(id)
            .then(user =>{
                setUsersPosts(user.posts)
            })
        .catch(error => console.log(error))

            },[id])
        
        const followUser = () =>{
            // const followerId = user.id
            // const followedId = id
            // createFollow({followerId,followedId })
            //     .then (res =>{
            //         console.log("sucessful follower creation ", res)
            //     })
            //     .catch(error => console.log(error))
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
        <button onClick={followUser}>
            Follow
        </button>
        </>
    )
}