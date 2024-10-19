import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../config/AuthContext.jsx"
import {logout, getProfile} from '../services/AuthService.js'
import Cookies from 'js-cookie'


export const SearchPage = ({filteredPosts}) => {

    const {authState, setAuthState } = useAuth()
    const [user, setUser] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        const sessionId = Cookies.get('sessionId')
        getProfile()
            .then(res => {
                setUser(res)
                setAuthState({user: res.id, token: sessionId })})
            .catch(error => console.log(error))
        }, []);

        const logoutUser = () => {
            logout()
                .then(navigate('/'))
                .catch(error => console.log(error))
        }

        // NEED TO ADD LOGIC FOR WHEN UNKNOWN POST IS SEARCHED FOR 
    return(<>
        <button onClick={logoutUser}>Logout</button>
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Category</td>
                    <td>Rating</td>
                    <td>Posted By</td>
                </tr>
            </thead>
            <tbody>
            {filteredPosts && filteredPosts.map((post) =>(
                <tr key={post.id}>
                <td>{post.name}</td>
                <td>{post.category}</td>
                <td>{post.rating}</td>
                <td> <Link>{post.user.username}</Link></td>
                </tr>
                
            ))}

        </tbody>
   
        </table>
        
      
    </>)
}