
import { useEffect, useState } from "react"
import { findPostById } from "../services/PostService"
import { Link, useParams } from "react-router-dom"
export const DisplayOnePost = () =>{

    const {id} = useParams()
    const [displayedPost, setDisplayedPost] = useState({})

    useEffect(() =>{
        findPostById(id)
            .then(post =>{
                setDisplayedPost(post)
                // setPostUser(post.user)
            })
            .catch(error => console.log(error))

        },[id])


    return(
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
                        <td>{displayedPost.name}</td>
                        <td>{displayedPost.description}</td>
                        <td>{displayedPost.rating}</td>
                        <td>{displayedPost.category}</td>
                        <td><Link to={`/display/user/${displayedPost.user?.id}`}>{displayedPost.user?.username}</Link></td>
                    </tr>
                </tbody>
        </table>
        </>
    )
}