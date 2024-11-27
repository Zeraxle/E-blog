import { useState, useEffect,  } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { findOneComment, updateComment } from "../services/CommentService"
export const EditComment = (props) =>{
    const {post} = props
    const {id} = useParams()
    const navigate  = useNavigate()
    const [comment, setComment] = useState({})
    const [error, setErrors] = useState('')
    const [updatedComment, setUpdatedComment] = useState('')
    
    
    useEffect(()=>{
        findOneComment(id)
        .then(res =>{
            setComment(res)
            
        })
        .catch(error => console.log(error))
    }, [updateComment])

    console.log(post)
    // useEffect(() =>{
    //     if (comment.content){
    //         setUpdatedComment(comment.content)
    //     }
    // }, [comment])
    
    
    const validateComment = (name, value) =>{
        const validation = {
            content : value  => value.length >= 3 && value.length <= 255? true : 'Comment must be more than 3 characters and less than 255'
        }
        setErrors((prev) => ({...prev, [name] : validation[name] (value)}))
    }
    
    const handleInputChange = (e) =>{
        const {name, value} = e.target
        validateComment(name, value)
        setUpdatedComment(value)
        
}

    const readyToSubmit = () =>{
        for (let key in error){
            if (error [key] !== true){
                return false 
            }
        }
        return true
    }

    const submitComment =  async e => {
        e.preventDefault()
        if (!readyToSubmit()){
            alert('Please fill out form correctly ')
            return
        }
        try{
            await updateComment(id, updatedComment)
            navigate(`/AllPosts/post/${post.id}/comments`)
            }
            catch(error){
            console.log(error)
        }
    }
    
    return(
        <>
        <form>
            <label>
                edit Comment 
                <input
                    name="content"
                    type="text"
                    value={updatedComment}
                    onChange={handleInputChange}>
                </input>
            </label>
            <button onClick={submitComment}>Submit </button>
        </form>

        <p>{comment.content}</p>
        </>
    )
}