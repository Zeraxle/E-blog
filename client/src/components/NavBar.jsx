
import home from '../assets/home.png';
import './NavBar.css';
import CreateBtn from '../assets/CreateBtn.png'
import NotificationBtn from '../assets/NotificationsBtn.png'
import ProfilePicBtn from "../assets/ProfilePicBtn.png"
import { Link } from 'react-router-dom';
export const NavBar = (props) => {
    const {loggedInUser} = props

    return(<>
    <div className='TopNavBar'>
            <h1>E-Blog</h1>
            <input type="text" placeholder='Search'/>

            <Link to={'/home'}>
                <img src={home} alt='home.png'/>
            </Link>

            <Link to = {'/post/create'}>
                <img src={CreateBtn} alt='CreateBtn'></img>
            </Link> 

            <Link to={'/user/notifications'}>
                <img src={NotificationBtn} alt='Notifications-Icon'></img>
            </Link>

            <Link to = {'/user/profile'}>
                <img src={ProfilePicBtn} alt='ProfileBtn'></img>
            </Link> 
        </div>

    <div className='SideNavBar'>
        <Link to = {'/AllPosts'}> <p>All Posts</p></Link>
        <Link to={'/Movies'}><p>Movies</p> </Link>
        <Link to={'/TvShows'}><p>Tv Shows</p></Link>
        <Link to={'/Anime'}><p>Anime</p></Link>
        <Link to={'FollowersPosts'}><p>Followers</p></Link>
    </div>

    </>)
}