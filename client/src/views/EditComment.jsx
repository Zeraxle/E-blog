import { useState, useEffect,  } from "react"
import { useParams, Link, Navigate, useNavigate } from "react-router-dom"
import { findOneComment, updateComment } from "../services/CommentService"
export const EditComment = (props) =>{
    const {post} = props
    const {id} = useParams()
    const navigate  = useNavigate()
    const [comment, setComment] = useState({
    })
    const [error, setErrors] = useState({
        Comment : ''
    })
    const [updatedComment, setUpdatedComment] = useState({
        Comment : ""
    })
    
    console.log(id)
    useEffect(()=>{
        findOneComment(id)
        .then(res =>{
            setComment(res)
            
        })
        .catch(error => console.log(error))
    }, [id])

    useEffect(() =>{
        if (comment.Comment){
            setUpdatedComment({Comment : comment.Comment})
        }
    }, [comment])
    
    
    const validateComment = (name, value) =>{
        const validation = {
            Comment : (value )=> value.length >= 3 && value.length <= 255? true : 'Comment must be more than 3 characters and less than 255'
        }
        setErrors((prev) => ({...prev, [name] : validation[name] (value)}))
    }
    
    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setUpdatedComment((prev) => ({...prev, [name] : value}))
        validateComment(name, value)
}

    const readyToSubmit = () =>{
        for (let key in error){
            if (error [key] !== true){
                return false 
            }
        }
        return true
    }

    const submitComment =  async e=>{
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
                    name="Comment"
                    type="text"
                    value={updatedComment.Comment || ''}
                    onChange={handleInputChange}>
                </input>
            </label>
            <button onClick={submitComment}>Submit </button>
        </form>

        <p>{comment.Comment}</p>
        </>
    )
}