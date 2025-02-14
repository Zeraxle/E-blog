
import { useEffect, useState } from "react"
import { findPostById } from "../services/PostService.js"
import { Link, useParams } from "react-router-dom"
import { findCommentsByPost } from "../services/CommentService.js"
import { Comments } from "./Comments"
import { getProfile} from "../services/AuthService.js"
import { destroyLike, createLike } from "../services/LikeService.js"
import { useAuth } from "../config/AuthContext.jsx"
import Cookies from 'js-cookie'

export const DisplayOnePost = (props) => {

    
    const {postLiked, setPostLiked} = props
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

    

    
    // useEffect(() => {
    //     findCommentsByPost()
    //     .then(res => setComments(res))
    //     .catch(err => console.log('Comment useEffect error', err))
    // }, []);
    
    
    const toggleComments = () => {
        setShowComments(prev => !prev)
    }
    const goToComments = async(e,postId) =>{
        const category = 'AllPosts'
        console.log(category)
        setUrlPath((prev) => ({...prev, path : category}))
        navigate(`/${category}/post/${postId}/comments`)

    // const goToComments = async(e, postId) =>{
    //     navigate(`post/${postId}/comments`)
    }

    
        const createPostLike = async(e, postId) =>{
            e.preventDefault()
            console.log(postId)
            console.log(user.id)
            const userId = user.id
    
            try{
                console.log(userId)
                await createLike({userId, postId})
                // console.log(postLiked)
                
                setPostLiked((prev) => ({ ...prev,[postId]: true}))
                
                
                // console.log(postLiked)
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
                
                // console.log(postLiked)
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
                        <td>Comment</td>
                        <td>Like Post</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="post-title">{displayedPost.name}</td>
                        <td className="post-content">{displayedPost.description}</td>
                        <td className="post-content">{displayedPost.rating}</td>
                        <td className="post-category">{displayedPost.category}</td>
                        <td><Link to={`/display/user/${displayedPost.user?.id}`}>{displayedPost.user?.username}</Link></td> 
                        <td><Link to ={`/${displayedPost.category}/post/${displayedPost.id}/comments`}>Comment </Link></td>
                        <td>  
                            <div className="post-actions">
                                <button onClick = {(e) => goToComments(e,displayedPost.id)}className="icon">💬</button>
                                    {/* <button onClick = {(e) => createPostLike(e,post.id)}className="icon">❤️</button> */}
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