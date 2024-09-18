import {useState} from 'react'
import { useNavigate } from 'react-router-dom'


export const LoginPage = () => {
    
    const [user, setUser] = useState({
        username : '',
        password : ''
    })

    const [errors, setErrors] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return(<>
        <h1>E-Blog</h1>
        <form onSubmit={submitHandler}>
            <label ></label>
        </form>
    </>)
}