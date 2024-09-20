import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {createUser} from '../services/user.service.js'

export const RegistrationPage = () => {

    const [user, setUser] = useState({
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

    const validateUser = (name, value) => {
        const validations = {
            firstName : value => value.length >= 2 && value.length <= 30? true : 'First Name must be 2-30 characters',
            lastName : value => value.length >= 2 && value.length <= 30? true : 'Last Name must be 2-30 characters',
            username : value => value.length >= 2 && value.length <= 30? true : 'Username must be 2-3 characters',
            email : value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)? true : 'Email must be valid',
            password : value => value.length >= 8 && value.length <= 30? true : 'Password must be 8-30 characters',
            confirmPassword : (value) => {
                if(name == "confirmPassword"){return user.password === value? true : 'Passwords must match'}
                if(name == "password"){return user.confirmPassword === value? true : 'Passwords must match'}
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
        setUser({...user, [name] : value})
        validateUser(name, value)
    }

    const submitHandler = e => {
        e.preventDefault()
        if(!readyToSubmit){
            alert('Please fill out the form correctly')
            return
        }
        createUser(user)
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }

    return(<>
        <h1>E-Blog</h1>
        <form onSubmit={submitHandler}>
            <label>
                First Name:
                <input 
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={changeHandler} 
                />
                {errors?.firstName && <p>{errors.firstName}</p>}
            </label>
            <label>
                Last Name:
                <input 
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={changeHandler} 
                />
                {errors?.lastName && <p>{errors.lastName}</p>}
            </label>
            <label>
                Username:
                <input 
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={changeHandler} 
                />
                {errors?.username && <p>{errors.username}</p>}
            </label>
            <label>
                Email:
                <input 
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={changeHandler} 
                />
                {errors?.email && <p>{errors.email}</p>}
            </label>
            <label>
                Password:
                <input 
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={changeHandler} 
                />
                {errors?.password && <p>{errors.password}</p>}
            </label>
            <label>
                Confirm Password:
                <input 
                    type="text"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={changeHandler} 
                />
                {errors?.confirmPassword && <p>{errors.confirmPassword}</p>}
            </label>
            <input type="submit" value="Register" />
        </form>

    </>)
}