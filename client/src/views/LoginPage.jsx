import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { logUserIn } from '../services/UserService.js' 


export const LoginPage = (props) => {

    const {setLoggedInUser} = props
    
    const [user, setUser] = useState({
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
        setUser({...user, [name] : value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        logUserIn(user.email)
            .then(setLoggedInUser(user.email))
            .then(navigate('/home'))
            .catch(error => console.log(error))
    }

    return(<>
        <h1>E-Blog</h1>
        <form onSubmit={submitHandler}>
            <label >
                Email: 
                <input 
                    type="email" 
                    name="email" 
                    value={user.email}
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