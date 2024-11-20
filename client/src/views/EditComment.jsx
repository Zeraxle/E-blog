import { useState, useEffect,  } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { findOneComment, updateComment } from "../services/CommentService"
export const EditComment = () =>{

    const {id} = useParams()
    const [updatedComment, setUpdatedComment] = useState({})
    const [comment, setComment] = useState({})
    
    console.log(id)
    useEffect(()=>{
    findOneComment(id)
    .then(res =>{
        console.log(res.id)

    })
    .catch(error => console.log(error))
    }, [])
    return(
        <>
        </>
    )
}