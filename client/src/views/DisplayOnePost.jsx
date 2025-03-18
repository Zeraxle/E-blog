
import { useEffect, useState } from "react"
import { findPostById } from "../services/PostService.js"
import { Link, useParams } from "react-router-dom"
import { findCommentsByPost } from "../services/CommentService.js"
import { Comments } from "./Comments"
import { getProfile} from "../services/AuthService.js"
import { destroyLike, createLike } from "../services/LikeService.js"
import { useAuth } from "../config/AuthContext.jsx"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"
import "../views/DisplayOnePost.css"
export const DisplayOnePost = (props) => {

    const navigate = useNavigate()
    const {postLiked, setPostLiked, urlPath,setUrlPath } = props
    const {id} = useParams()
    const {authState, setAuthState} = useAuth()
    const [displayedPost, setDisplayedPost] = useState({})
    const [comments, setComments] = useState()
    const [showComments, setShowComments] = useState(false)
    const [user, setUser] = useState({});

    useEffect(() => {
            const sessionId = Cookies.get('sessionId');
            getProfile()
                .then(res => {
                    setUser(res);
                    setAuthState({ user: res.id, token: sessionId });
                })
                .catch(error => console.log(error));
        }, [postLiked]);

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

    
    
    const toggleComments = () => {
        setShowComments(prev => !prev)
    }
    const goToComments = async(e,postId) =>{
        const category = 'AllPosts'
        console.log(category)
        setUrlPath((prev) => ({...prev, path : category}))
        navigate(`/${category}/post/${postId}/comments`)


    }

    
        const createPostLike = async(e, postId) =>{
            e.preventDefault()

            const userId = user.id
    
            try{
                console.log(userId)
                await createLike({userId, postId})
                
                setPostLiked((prev) => ({ ...prev,[postId]: true}))

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

            }catch(error){
                console.log(error)
            }
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
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="post-title">{displayedPost.name}</td>
                        <td className="post-content">{displayedPost.description}</td>
                        <td className="post-content">{displayedPost.rating}</td>
                        <td className="post-category">{displayedPost.category}</td>
                        <td><Link to={`/display/user/${displayedPost.user?.id}`}>{displayedPost.user?.username}</Link></td> 
                        <td>  
                            <div className="post-actions">
                                <button onClick = {(e) => goToComments(e,displayedPost.id)}className="icon">💬</button>
                                {postLiked [displayedPost.id]? (
                                    <button onClick={(e) => createPostDislike(e, displayedPost.id)} className="icon">💔</button>
                                ): (
                                    <button onClick = {(e) => createPostLike(e,displayedPost.id)}className="icon">❤️</button>
                                )}
                            </div></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}