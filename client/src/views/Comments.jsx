

import {useState} from 'react'
import { findCommentsByPost, createComment} from "../services/CommentService";

export const Comments = ({postId}) => {

    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    
    

    const changeHandler = (e) => {
        const  {value} = e.target
        setNewComment(value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        createComment(newComment, postId)
        setNewComment('')
    }
    return (<>

        <form>
            <label>
                Comments:
                <textarea 
                name="content"
                value={newComment}
                onChange={changeHandler}
                required
                />
            </label>
            <button onClick={handleSubmit}>Add</button>
        </form>
    </>)
}