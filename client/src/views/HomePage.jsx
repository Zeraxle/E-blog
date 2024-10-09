import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuth } from "../config/AuthContext.jsx"

export const HomePage = (props) => {

    const {loggedInUser} = props
    const { user, logout } = useAuth()

    const navigate = useNavigate()



    return(<>
        {user? (
            <div>

                <h1>Homepage</h1>
                <p>{user.name}</p>
                <button onClick={logout}>Logout</button>
            </div>
        ) : (
            <p>Please log in.</p>
        )}
    </>)
}