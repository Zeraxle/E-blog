
import { useEffect, useState } from "react"
import { findPostById } from "../services/PostService.js"
import { Link, useParams } from "react-router-dom"
import { findCommentsByPost } from "../services/CommentService.js"
import { Comments } from "./Comments"
import { getProfile} from "../services/AuthService.js"
import { useAuth } from "../config/AuthContext.jsx"
import Cookies from 'js-cookie'

export const DisplayOnePost = () => {

    const { postId } = useParams()
    const {authState, setAuthState} = useAuth()
    const [displayedPost, setDisplayedPost] = useState({})
    const [comments, setComments] = useState()
    const [showComments, setShowComments] = useState(false)
    

    
    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        getProfile()
            .then(res => {
                setAuthState({user: res.id, token: sessionId })})
            .catch(error => console.log(error))
        }, []);

    useEffect(() => {
        findPostById(postId)
            .then(post => setDisplayedPost(post))
            .catch(error => console.log(`Post useEffect Error, ${error}`))

    }, [postId])

    
    // useEffect(() => {
    //     findCommentsByPost()
    //     .then(res => setComments(res))
    //     .catch(err => console.log('Comment useEffect error', err))
    // }, []);
    
    
    const toggleComments = () => {
        setShowComments(prev => !prev)
    }


    return (
        <>

            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Rating</td>
                        <td>Category</td>
                        <td>Posted By</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{displayedPost.name}</td>
                        <td>{displayedPost.description}</td>
                        <td>{displayedPost.rating}</td>
                        <td>{displayedPost.category}</td>
                        <td><Link to={`/display/user/${displayedPost.user?.id}`}>{displayedPost.user?.username}</Link></td>
                        {/* <td>{displayedPost.user.username}</td> */}
                    </tr>
                </tbody>
            </table>
            <div className="post-actions">
                <button className="icon" onClick={toggleComments}>
                    {showComments? 'Hide Comments': 'Show Comments'}💬
                </button>
                {showComments && <Comments postId={postId}/>}
                <button className="icon">❤️</button>
            </div>
        </>
    )
}