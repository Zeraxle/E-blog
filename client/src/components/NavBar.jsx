
import home from '../assets/home.png';
import './NavBar.css';
import CreateBtn from '../assets/CreateBtn.png'
import NotificationBtn from '../assets/NotificationsBtn.png'
import ProfilePicBtn from "../assets/ProfilePicBtn.png"

import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { findAllPosts } from '../services/PostService';

export const NavBar = ({setFilteredPosts, user}) => {
    const navigate = useNavigate()
    // const {loggedInUser} = props

    const [searchInfo,setSearchInfo] = useState('')
    // const findPosts = (e) =>{
    // }

    const handleSearchChange = (e) =>{
        setSearchInfo(e.target.value)
    }

    // console.log(user.id)

    const handleSearchSubmit = (e) =>{
        e.preventDefault()
        findAllPosts()
            .then((posts )=>{
                const filtered = posts.filter((post) => post.name.toLowerCase().includes(searchInfo.toLowerCase()))
                console.log(filtered)
                setFilteredPosts(filtered)
                navigate('/search')
            })
            .catch((error) =>{
                console.log('fetching error', error)
            })
        // navigate('/search')

    }



    return(<>
    <div className='TopNavBar'>
            <h1>E-Blog</h1>
            <form onSubmit={handleSearchSubmit}>
            <input type="text" 
            placeholder='Search'
            value={searchInfo}
            onChange={handleSearchChange}/>
            <button type='submit'>Search</button>
            </form>

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
        <Link to={`/${user.id}/FollowersPosts`}><p>Followers</p></Link>
    </div>

    </>)
}