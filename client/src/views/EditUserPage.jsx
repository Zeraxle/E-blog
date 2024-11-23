import { useEffect, useState } from "react";
import { useAuth } from '../config/AuthContext.jsx';
import Cookies from 'js-cookie'
import { getProfile } from "../services/AuthService";
import { updateUser } from "../services/UserService";
import { Navigate, useNavigate, useParams } from "react-router-dom";
export const EditUserPage = (props) =>{

    const {authState, setAuthState } = useAuth()
    const {user, setUser} = props
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        getProfile()
            .then(res => {
                setUser(res)
                setUpdatedUserInfo({
                    id : res.id,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    username : res.username,
                    email : res.email
                })
                setAuthState({user: res.id, token: sessionId })})
            .catch(error => console.log(error))
        }, []);

        const [updatedUserInfo, setUpdatedUserInfo] = useState({
            id : '',
            firstName : '',
            lastName :  '',
            username : '',
            email :  ''
        })

        const [errors, setErrors] = useState({
            firstName : true,
            lastName : true,
            username : true,
            email : true

        })

        const validateUser = (name, value ) =>{

            const validations = {
                firstName : value => value.length >= 2 && value.length <= 30 ? true : 'First Name must be between 2 and 30 characters',
                lastName : value => value.length >= 2 && value.length <= 30 ? true : 'Last Name must be between 2 and 30 characters',
                username : value => value.length >= 5 && value.length <= 30 ? true : 'Username must be between 2 and 30 characters ',
                email : value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)? true : 'Email must be valid',
            }
            setErrors(prev => ({...prev, [name] : validations [name] (value)}))
        }

        const updateUserData = (e) =>{
            const {name, value} = e.target 
            setUpdatedUserInfo({...updatedUserInfo, [name]: value})
            validateUser(name, value)
        }

        const readyToSubmit = () =>{
            for (let key in errors) {
                if (errors[key] !== true ){
                    return false 
                }
            }
            return true
        }

        const submitHandler = async e =>{
            e.preventDefault()
            if (!readyToSubmit()){
                alert("Please fill out form ")
                return
            }
            try{
                await updateUser(updatedUserInfo)
                navigate('/user/profile')
            } catch (error) {
                console.log(error)
            }



        }

    return(
        <>
        <h1>Update Profile</h1>
        <form onSubmit={submitHandler}> 
            <label>
                First Name
                <input
                type="text"
                name="firstName"
                value={updatedUserInfo.firstName}
                onChange={updateUserData}
                />
                {errors?.firstName && <p>{errors.firstName}</p>}
            </label>

            <label>
                Last Name 
                <input
                type="text"
                name="lastName"
                value={updatedUserInfo.lastName}
                onChange={updateUserData}
                />
                {errors?.lastName && <p>{errors.lastName}</p>}
            </label>

            <label>
                Username
                <input
                type="text"
                name="username"
                value={updatedUserInfo.username}
                onChange={updateUserData}
                />
                {errors?.username && <p>{errors.username}</p>}
            </label>

            <label>
                Email
                <input 
                type="text"
                name="email"
                value={updatedUserInfo.email}
                onChange={updateUserData}
                />
                {errors?.email && <p>{errors.email}</p>}
            </label>

        <button type="submit">Update User</button>
        </form>
        </>
    )
}