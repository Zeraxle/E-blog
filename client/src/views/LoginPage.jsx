import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../config/AuthContext.jsx'
import { loginUser, getProfile } from '../services/AuthService.js'



export const LoginPage = (props) => {

    
    const { authState, setAuthState } = useAuth()
    
    const [formData, setFormData] = useState({
        email : '',
        password : ''
    })

    const [errors, setErrors] = useState({
        email : '',
        password : ''
    })

    const navigate = useNavigate()

    const changeHandler = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name] : value})
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await loginUser(formData)
            setAuthState({user: res.response.data.user.id, token: res.response.data.sessionId})
            navigate('/home')
        } catch (error) { console.error('Error during login', error)}
    }

    return(<>
        <h1>E-Blog</h1>
        <form onSubmit={submitHandler}>
            <label >
                Email: 
                <input 
                    type="text" 
                    name="email" 
                    value={formData.email}
                    onChange={changeHandler} 
                />
            </label>
            <label>
                Password:
                <input 
                    type="text"
                    name="password"
                    value={formData.password} 
                    onChange={changeHandler}
                />
            </label>
            <button onClick={submitHandler}>Login</button>
        </form>
    </>)
}