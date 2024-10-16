import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../config/AuthContext.jsx"
import {logout, getProfile} from '../services/AuthService.js'
import Cookies from 'js-cookie'
import axios from "axios"

export const CreatePost = () => {


    const {authState, setAuthState } = useAuth()
    const [user, setUser] = useState({})
    const [postData, setPostData] = useState({
        name : '',
        category : '',
        rating : '',
        description : ''
    })

    const [errors, setErrors] = useState({
        name : '',
        category : '', 
        rating : '',
        description : ''
    })

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
                description : value => value.length >=10 && value.length <=100? true : 'Description must be between 10-100 characters'
            }
            setErrors(prev => ({...prev, [name] : validations[name](value)}))
        }

    return(<>
        
    </>)
}