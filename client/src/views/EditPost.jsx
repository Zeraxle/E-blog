import { useNavigate, useParams } from "react-router-dom"
import { findPostById } from "../services/PostService"
import { useEffect, useState } from "react"
import { updatePost } from "../services/PostService"


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
    <form >
        <label>
            Name: 
            <input
            type="text"
            name="name"
            value={postInfo.name}
            onChange={updatePostInfo}
            required
            />
            {errors?.name && <p>{errors.name}</p>}
        </label>
            <label>
                Rating: 
                <select 
                    name="rating"
                    value={postInfo.rating}
                    onChange={updatePostInfo}
                    required
                >
                    <option value="">Select a Rating</option>
                {ratings.map(rating => (
                    <option key={rating} value={rating}>{rating}</option>
                ))}
                </select>
            {errors?.rating && <p>{errors.rating}</p>}
            </label>
            <label>
                Category: 
                <select 
                    name="category"
                    value={postInfo.category}
                    onChange={updatePostInfo}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                {errors?.category && <p>{errors.category}</p>}
            </label>
        <label>
            Description: 
            <input
            type="text"
            name="description"
            value={postInfo.description}
            onChange={updatePostInfo}
            required
            >
            </input>
            {errors?.description && <p>{errors.description}</p>}
        </label>
        <button onClick={submitHandler}>Submit</button>
    
    </form>
    </>
}