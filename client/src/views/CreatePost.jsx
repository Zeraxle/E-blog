import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../config/AuthContext.jsx"
import {logout, getProfile} from '../services/AuthService.js'
import { createPost } from "../services/PostService.js"
import Cookies from 'js-cookie'


export const CreatePost = () => {

    const navigate = useNavigate()
    const {authState, setAuthState } = useAuth()
    const [user, setUser] = useState({})
    const [formData, setFormData] = useState({
        name : '',
        category : '',
        rating : 0,
        description : ''
    })

    const [errors, setErrors] = useState({
        name : '',
        category : '', 
        rating : 0,
        description : ''
    })

    const categories = ['Movies', 'TV Show', 'Anime']
    const ratings = [1, 2, 3, 4, 5]

    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        getProfile()
            .then(res => {
                setUser(res)
                setAuthState({user: res.id, token: sessionId })})
            .catch(error => console.log(error))
        }, []);

        const validatePost = (name, value) => {
            const validations = {
                name : value => value.length >=3 && value.length <=35? true : 'Name must be between 3-35 characters',
                category : value => categories.includes(value)? true : 'Invalid category',
                rating : value => ratings.includes(value)? true : 'Invalid rating',
                description : value => value.length >=10 && value.length <=100? true : 'Description must be between 10-100 characters'
            }
            setErrors(prev => ({...prev, [name] : validations[name](value)}))
        }

        const readyToSubmit = () => {
            for (let key in errors){
                if(errors[key] !== true){
                    return false
                }
            }
            return true
        }

        const changeHandler = (e) => {
            const {name, value} = e.target
            if (name === "rating"){
                const numericValue = Number(value)
                setFormData({...formData, ["rating"] : numericValue})
                validatePost(name, numericValue)
                return
            }
            setFormData({...formData, [name] : value})
            validatePost(name, value)
        }

        const submitHandler = async e => {
            e.preventDefault()
            if(!readyToSubmit){
                alert('Please fill out the form correctly')
                return false
            }
            try {
                await createPost(formData)
                navigate('/user/profile')
            } catch (error) {
                console.error(error)
                console.log('Error during creation')}
        }

    return(<>
        <h1>Create a Post</h1>
        <form>
            <label>
                Name: 
                <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={changeHandler}
                    required
                />
                {errors?.name && <p>{errors.name}</p>}
            </label>
            <label>
                Category: 
                <select 
                    name="category"
                    value={formData.category}
                    onChange={changeHandler}
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
                Rating: 
                <select 
                    name="rating"
                    value={formData.rating}
                    onChange={changeHandler}
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
                Description: 
                <textarea 
                    name="description" 
                    id="description"
                    value={formData.description}
                    onChange={changeHandler}
                    required
                />
                {errors?.description && <p>{errors.description}</p>}
            </label>
            <button onClick={submitHandler}>Create Post!</button>
        </form>
    </>)
}