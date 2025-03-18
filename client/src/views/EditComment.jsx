import { useState, useEffect,  } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { findOneComment, updateComment } from "../services/CommentService"

import './EditComment.css'
export const EditComment = (props) =>{
    const {post} = props
    const {id} = useParams()
    const navigate  = useNavigate()
    const [comment, setComment] = useState({})
    const [error, setErrors] = useState({
        Comment : true
    })
    
    const [updatedComment, setUpdatedComment] = useState({
        Comment : ''
    })
    
    useEffect(()=>{
        findOneComment(id)
        .then(res =>{
            setComment(res)
            setUpdatedComment({
                Comment : res.Comment
            })
            
        })
        .catch(error => console.log(error))
    }, [id])
    
    
    const validateComment = (name, value) =>{
        const validation = {
            Comment : (value)  => value.length >= 3 && value.length <= 255? true : 'Comment must be more than 3 characters and less than 255'
        }
        setErrors((prev) => ({...prev, [name] : validation[name] (value)}))
    }
    
    const handleInputChange = (e) =>{
        e.preventDefault()
        const {name, value} = e.target
        validateComment(name, value)
        setUpdatedComment({...updatedComment, [name]: value})
        
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
            await updateComment(id, updatedComment.Comment)
            navigate(`/AllPosts/post/${post.id}/comments`)
            }
            catch(error){
            console.log(error)
        }
    }
    
    return(
        <>
        <form className="edit-CommentForm">
            <label className="title">
                Edit Comment
                <input
                    name="Comment"
                    type="text"
                    value={updatedComment.Comment}
                    onChange={handleInputChange}>
                </input>
                {error?.Comment && <p>{error.Comment}</p>}
            </label>
            <button onClick={submitComment}>Submit </button>
        </form>


        </>
    )
}