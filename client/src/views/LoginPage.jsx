import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../config/AuthContext.jsx'
import { loginUser, getProfile } from '../services/AuthService.js'



export const LoginPage = (props) => {

    const {setLoggedInUser} = props
    const { authState, setAuthState } = useAuth()
    
    const [formData, setFormData] = useState({
        username : '',
        password : ''
    })

    const [errors, setErrors] = useState({
        username : '',
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
                Username: 
                <input 
                    type="text" 
                    name="username" 
                    value={formData.username}
                    onChange={changeHandler} 
                />
                {authState.user? <p>{authState.user}</p> : null}
            </label>
            <label>
                Password:
                <input 
                    type="text"
                    name="password"
                    value={formData.password} 
                    onChange={changeHandler}
                />
                {authState.token? <p>{authState.token}</p> : null}
            </label>
            <input type="submit" value="Login" />
        </form>
    </>)
}