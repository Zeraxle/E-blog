import { useNavigate, useParams } from "react-router-dom"
import { findPostById } from "../services/PostService"
import { useEffect, useState } from "react"
import { updatePost } from "../services/PostService"
import '../assets/css/EditPost.css'


export const EditPost  = () =>{
    const [postInfo, setPostInfo] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()
    const [updatedPostInfo, setUpdatedPostInfo] = useState({
        id : id,
        name : '',
        category : '',
        rating : '', 
        description : ''
    })

    const [errors, setErrors] = useState({
        name : true,
        rating : true,
        category : true
    })

    const categories = ['Movie', 'TVShow', 'Anime']
    const ratings = [1, 2, 3, 4, 5]

    // const [currentpostInfo, setCurrentPostInfo] = useState({
    // })
    console.log(id)
    useEffect(() =>{
        
        findPostById(id)
        .then(res =>{
            setPostInfo(res)
            setUpdatedPostInfo({
                id : res.id,
                name : res.name,
                category : res.category,
                rating : res.rating,
                description : res.description
            })
        })
        .catch(error => console.log(error))
    },[id])


    const updatePostInfo = (e) =>{
        e.preventDefault()
        const {name, value} = e.target 
        setUpdatedPostInfo({...updatedPostInfo, [name] : value})
        validatePost(name, value)
    }

    const validatePost = (name, value) =>{
        const validations = {
            name : (value => value.length >= 3  && value.length >= 35 ? true : 'Name must be between 3-35 characters'),
            rating : (value => ratings.includes(value) ? true : 'Invalid Rating'),
            category : (value => categories.includes(value) ? true : 'Invalid Category'),
            description : (value => value.length >= 10 && value.length  <= 100 ? true : 'Description must be between 10-100 characters')
        }

        setErrors(prev => ({...prev, [name] : validations[name] (value)}))

    }

    const readyToSubmit = () =>{
        for (let key in errors){

            if(errors[key] !== true){
                return false
            }

        }
        return true

    }

    const submitHandler = async e =>{
        e.preventDefault()
        if (!readyToSubmit){
            alert('please Fill Out Form ')
            return false
        }

        try{
            const res = await updatePost(updatedPostInfo)
            console.log(res)
            navigate ('/user/profile')
        }
        catch(error){
            console.log('error during creation', error)
        }


    }

    return<>
        <form className="post-form">
            <label className="form-label">
                Name: 
                <input 
                    type="text" 
                    name="name" 
                    value={postInfo.name} 
                    onChange={updatePostInfo} 
                    required 
                    className="form-input"
                />
                {errors?.name && <p className="error-text">{errors.name}</p>}
            </label>

            <label className="form-label">
                Rating: 
                <select 
                    name="rating" 
                    value={postInfo.rating} 
                    onChange={updatePostInfo} 
                    required 
                    className="form-select"
                >
                    <option value="">Select a Rating</option>
                    {ratings.map(rating => (
                        <option key={rating} value={rating}>{rating}</option>
                    ))}
                </select>
                {errors?.rating && <p className="error-text">{errors.rating}</p>}
            </label>

            <label className="form-label">
                Category: 
                <select 
                    name="category" 
                    value={postInfo.category} 
                    onChange={updatePostInfo} 
                    required 
                    className="form-select"
                >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                {errors?.category && <p className="error-text">{errors.category}</p>}
            </label>

            <label className="form-label">
                Description: 
                <input 
                    type="text" 
                    name="description" 
                    value={postInfo.description} 
                    onChange={updatePostInfo} 
                    required 
                    className="form-input"
                />
                {errors?.description && <p className="error-text">{errors.description}</p>}
            </label>

            <button className="submit-btn" onClick={submitHandler}>Submit</button>
        </form>
    </>
}