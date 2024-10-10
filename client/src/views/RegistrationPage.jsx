import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {createUser} from '../services/UserService.js'
import {registerUser} from '../services/AuthService.js'

export const RegistrationPage = () => {

    const [formData, setFormData] = useState({
        firstName : '',
        lastName : '',
        username : '',
        email : '',
        password : '',
        confirmPassword : ''
    })

    const [errors, setErrors] = useState({
        firstName : '',
        lastName : '',
        username : '',
        email : '',
        password : '',
        confirmPassword : ''
    })

    const navigate = useNavigate()

    const validateUser = (name, value) => {
        const validations = {
            firstName : value => value.length >= 2 && value.length <= 30? true : 'First Name must be 2-30 characters',
            lastName : value => value.length >= 2 && value.length <= 30? true : 'Last Name must be 2-30 characters',
            username : value => value.length >= 2 && value.length <= 30? true : 'Username must be 2-3 characters',
            email : value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)? true : 'Email must be valid',
            password : value => value.length >= 8 && value.length <= 30? true : 'Password must be 8-30 characters',
            confirmPassword : (value) => {
                if(name == "confirmPassword"){return formData.password === value? true : 'Passwords must match'}
                if(name == "password"){return formData.confirmPassword === value? true : 'Passwords must match'}
            }
        } 
        if (name == "password") {setErrors(prev => ( {...prev, confirmPassword : validations["confirmPassword"](value)} ) )}
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
        setFormData({...formData, [name] : value})
        validateUser(name, value)
    }

    const submitHandler = async e => {
        e.preventDefault()
        if(!readyToSubmit){
            alert('Please fill out the form correctly')
            return
        }
        try {
            const res = await registerUser(formData)
            console.log('User registered:', res)
            navigate('/user/profile')
        } catch (error) {console.log('Error during registration', error)}
    }

    return(<>
        <h1>E-Blog</h1>
        <form onSubmit={submitHandler}>
            <label>
                First Name:
                <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={changeHandler} 
                />
                {errors?.firstName && <p>{errors.firstName}</p>}
            </label>
            <label>
                Last Name:
                <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={changeHandler} 
                />
                {errors?.lastName && <p>{errors.lastName}</p>}
            </label>
            <label>
                Username:
                <input 
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={changeHandler} 
                />
                {errors?.username && <p>{errors.username}</p>}
            </label>
            <label>
                Email:
                <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler} 
                />
                {errors?.email && <p>{errors.email}</p>}
            </label>
            <label>
                Password:
                <input 
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler} 
                />
                {errors?.password && <p>{errors.password}</p>}
            </label>
            <label>
                Confirm Password:
                <input 
                    type="text"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={changeHandler} 
                />
                {errors?.confirmPassword && <p>{errors.confirmPassword}</p>}
            </label>
            <input type="submit" value="Register" />
        </form>

    </>)
}