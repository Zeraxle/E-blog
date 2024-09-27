import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { WelcomePage } from "./WelcomePage"

export const HomePage = (props) => {

    const {loggedInUser} = props

    const navigate = useNavigate()

  

    return(<>
        <h1>Homepage</h1>
        <p>{loggedInUser}</p>
        <Link to={'/user/notifications'}>Notifications</Link>
    </>)
}