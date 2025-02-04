import {Link} from 'react-router-dom'


export const WelcomePage = () => {

    return(<>
        <h1>Welcome to E-Blog</h1>
        <p>Find your next favorite flick</p>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Sign Up</Link>
    </>)
}