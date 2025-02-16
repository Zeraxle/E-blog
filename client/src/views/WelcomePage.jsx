import { Link } from 'react-router-dom'
import './WelcomePage.css'

export const WelcomePage = () => {
    return (
        <div className="welcome-container">
            <h1>Welcome to E-Blog</h1>
            <p>Find your next favorite flick</p>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Sign Up</Link>
        </div>
    );
}
