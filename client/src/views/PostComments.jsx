
import { useEffect, useState } from "react"
import { useParams , Link, useNavigate} from "react-router-dom"
import { findAllCommmentsForPost, findPostById } from "../services/PostService"
import { getProfile } from "../services/AuthService"
import { useAuth } from "../config/AuthContext"
import { createComment, destroyComment, findComment } from "../services/CommentService"
import Cookies from 'js-cookie';
import {formatDistanceToNow} from 'date-fns'
import "../views/PostComments.css"

export const PostComments = (props) =>{
    const navigate = useNavigate()
    const { authState, setAuthState } = useAuth();
    const {setPost, post, urlPath} = props
    
    
    const category = urlPath.path
    const {postId} = useParams()
    const [retrievedComments, setRetrievedComments] = useState([])
    const [showReplies, setShowReplies] = useState(false)
    const [user, setUser] = useState({});
    const [postComments, setPostComments] = useState({
        Comment : '',
        userId : null,
        postId : null

    }
    )
    const [commentErrors, setCommentErrors] = useState({
        Comment : '' })
    

    useEffect(() =>{
        findAllCommmentsForPost(postId)
            .then((res) =>{
                setRetrievedComments(res.comments)
        })
            .catch(error => console.log(error))
    }, [postId])

    useEffect(() => {
        const sessionId = Cookies.get('sessionId');
        getProfile()
            .then(res => {
                setUser(res);
                setAuthState({ user: res.id, token: sessionId });
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() =>{
        findPostById(postId)
        .then(res => {
            setPost(res)
    
        })
        .catch(error => console.log(error))
        }, [postId])

    
    const validateComment = (name, value) =>{
    
        const validations = {
            Comment : value => value.length >= 3 && value.length <= 255? true : 'Comment must be more than 3 Characters and less than 255'
        }
        setCommentErrors ((prev ) => ({...prev, [name]: validations[name](value), }))
    }

    const ChangeHandler = (e) =>{
        const {name, value} = e.target
        validateComment(name, value)
        setPostComments((prev) => 
            ({...prev, [name] : value,
                userId : user.id,
                postId : postId
            }))
    }
    const readyToSubmit = () =>{
        for (let key in commentErrors){
            if(commentErrors[key]!= true){
                return false
            }
        }
        return true
    }

    const deleteComment = (e, commentId) =>{
        e.preventDefault()
        destroyComment(commentId)
        const newComments = retrievedComments.filter(comment => comment.id !== commentId)
        setRetrievedComments(newComments)
        navigate(`/AllPosts/post/${post.id}/comments`)
        

    }
    const submitComment =  async e =>{
        e.preventDefault()
        if (!readyToSubmit()){
            alert('Please Fill out form correctly')
            return false
        }
        try{
            await createComment(postComments)
        
            setPostComments({
                Comment : '',
                postId : null,
                userId : null
            })
            const updatedComments = await findAllCommmentsForPost(postId)
            setRetrievedComments(updatedComments.comments || [])
            navigate(`/${category}/post/${postId}/comments`)
        }
            catch(error){
                console.log(error)
            }
    }
    return(
        <>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Rating</th>
                    <th>Category </th>
                    <th>Posted By</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{post?.name}</td>
                    <td>{post?.description}</td>
                    <td>{post?.rating}</td>
                    <td>{post?.category}</td>
                    <td> <Link to = {`/display/user/${post?.user?.id}`}>{post?.user?.username}</Link></td>
                </tr>
            </tbody>
        </table>
        <table>
            <thead>
                <tr>
                    <th>Post Comment</th>
                    <th>Posted By</th>
                    <th>Posted At</th>
                    <th>Actions</th>
                </tr>
                    </thead>
                <tbody>
                    {retrievedComments && retrievedComments.length > 0 ? (

                    retrievedComments.map((comment) =>(

                        
                        <tr key={comment.id}>
                            <td>{comment.Comment}</td>
                            <td><Link to={`/display/user/${comment.user.id}`}>{comment.user.username}</Link></td>
                            <td>{formatDistanceToNow(new Date(comment.createdAt), {
                                addSuffix : true,
                            })}</td>
            
                            {user.id === comment.userId? (
                            <>
                            <td>
                            <Link to={`/edit/comment/${comment.id}`}>Edit</Link>
                            <Link onClick={(e => deleteComment(e, comment.id))}>  Delete</Link>
                            
                            </td>
                            </>
                            ): 
                            (
                        <td>  </td>

                            )
                            }


                        </tr>


                    ))
                    )
                        :(
                            <tr>
                                <td>No comments Available </td>
                            </tr>
                        )
                    }
                </tbody>
        </table>


        <form >
                    <label>
                        <input
                        name="Comment"
                        type="text"
                        placeholder="Enter A comment"
                        value={postComments.Comment}
                        onChange={ChangeHandler}
                        />
                    {commentErrors?.Comment && <p>{commentErrors.Comment}</p>}
                    </label>
                    <button onClick={submitComment}>Submit</button>
                </form>

        </>
    )
}
