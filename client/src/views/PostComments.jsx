
import { useEffect, useState } from "react"
import { useParams , Link, useNavigate} from "react-router-dom"
import { findAllCommmentsForPost, findPostById } from "../services/PostService"
import { getProfile } from "../services/AuthService"
import { useAuth } from "../config/AuthContext"
import { createComment } from "../services/CommentService"
import Cookies from 'js-cookie';


export const PostComments = () =>{
    const navigate = useNavigate()
    const { authState, setAuthState } = useAuth();
    const [post, setPost] = useState({})
    const {postId} = useParams()
    const [retrivedComments, setRetrivedComments] = useState([])
    const [user, setUser] = useState({});
    const [postComments, setPostComments] = useState({
        Comment : '',
        postid : null,
        userid : null
    })
    const [commentErrors, setCommentErrors] = useState({
        Comment : ''
    })
    // const {postid} = useParams()

    useEffect(() =>{
        findAllCommmentsForPost(postId)
            .then((res) =>{
                setRetrivedComments(res.comments)
                console.log(res)

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
            Comment : value => value.length >+ 3 && value.length <= 255? true : 'Comment must be more than 3 Characters and less than 255'
        }
        setCommentErrors ((prev ) => ({...prev, [name]: validations[name](value), }))
    }
    const ChangeHandler = (e) =>{
        const {name, value} = e.target
        validateComment(name, value)
        setPostComments((prev) => ({...prev, 
                        [name] : value,
                        postid : postId,
                        userid: user.id
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

    const submitComment =  async e =>{
        e.preventDefault()
        if (!readyToSubmit()){
            alert('Please Fill out form correctly')
            return false
        }
        try{
            await createComment(postComments)
            console.log("Comment submitted successfully!");
            setPostComments({
                Comment : '',
                postid : null,
                userid : null
            })
            navigate(`/AllPosts/post/${postId}/comments`)
    
        }
            catch(error){
                console.log(error)
            }


    }
    return(
        <>
        <h1>Hii</h1>
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
                    <td> {post?.user?.lastName}</td>
                </tr>
            </tbody>
        </table>
        <table>
            <thead>
                <tr>
                    <th>Post Comment</th>
                </tr>
                    </thead>
                <tbody>
                    {retrivedComments && retrivedComments.length > 0 ? (

                    retrivedComments.map((comment =>(
                    
                        <tr key={comment.id}>
                            <td>{comment.Comment}</td>

                        </tr>



                    )))



                        ):(
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
                        value={postComments.Comment || ""}
                        onChange={ChangeHandler}
                        />
                    {commentErrors?.Comment && <p>{commentErrors.Comment}</p>}
                    </label>
                    <button onClick={submitComment}>Submit</button>
                </form>

        </>
    )
}