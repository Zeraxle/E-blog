import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { logUserIn } from '../../../server/controllers/user.controller.js'


export const LoginPage = () => {
    
    const [user, setUser] = useState({
        username : '',
        password : ''
    })

    const [errors, setErrors] = useState({
        username : '',
        password : ''
    })

    const changeHandler = (e) => {
        const {name, value} = e.target
        setUser({...user, [name] : value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        logUserIn(user)
    }

    return(<>
        <h1>E-Blog</h1>
        <form onSubmit={submitHandler}>
            <label >
                Username: 
                <input 
                    type="text" 
                    name="username" 
                    value={user.username}
                    onChange={changeHandler} 
                />
            </label>
            <label>
                Password:
                <input 
                    type="text"
                    name="password"
                    value={user.password} 
                    onChange={changeHandler}
                />
            </label>
            <input type="submit" value="Login" />
        </form>
    </>)
}