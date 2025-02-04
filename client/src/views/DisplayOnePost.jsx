
import { useEffect, useState } from "react"
import { findPostById } from "../services/PostService.js"
import { Link, useParams } from "react-router-dom"
import { findCommentsByPost } from "../services/CommentService.js"
import { Comments } from "./Comments"
import { getProfile} from "../services/AuthService.js"
import { useAuth } from "../config/AuthContext.jsx"
import Cookies from 'js-cookie'

export const DisplayOnePost = () => {

    
    
    const {id} = useParams()
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
        findPostById(id)
            
            .then(post => setDisplayedPost(post))
            .catch(error => console.log(`Post useEffect Error, ${error}`))

    }, [id])

    

    
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
                        <td className="post-title">{displayedPost.name}</td>
                        <td className="post-content">{displayedPost.description}</td>
                        <td className="post-content">{displayedPost.rating}</td>
                        <td className="post-category">{displayedPost.category}</td>
                        <td><Link to={`/display/user/${displayedPost.user?.id}`}>{displayedPost.user?.username}</Link></td> 
                    </tr>
                </tbody>
            </table>
            <div className="post-actions">
                <button className="icon" onClick={toggleComments}>
                    {showComments? 'Hide Comments': 'Show Comments'}💬
                </button>
                {showComments && <Comments postId={id}/>}
                <button className="icon">❤️</button>
            </div>
        </>
    )
}