import { useState } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import './App.css'
import { NavBar } from './components/NavBar'
import { WelcomePage } from './views/WelcomePage'
import { RegistrationPage } from './views/RegistrationPage'
import { LoginPage } from './views/LoginPage'
import { HomePage } from './views/HomePage'
import { SearchPage } from './views/SearchPage'
import { ProfilePage } from './views/ProfilePage'
import { CreatePost } from './views/CreatePost'
import { FavoritesPage } from './views/FavoritesPage'
import { AllPosts } from './views/AllPosts.jsx'
import { MoviePosts } from './views/MoviePosts.jsx'
import { TvShowPosts } from './views/TvShowPosts.jsx'
import { AnimePosts } from './views/AnimePosts.jsx'
import { FollowersPosts } from './views/FollowersPosts.jsx'
import { NotificationPage } from './views/NotificationPage'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'
import { DisplayOneUser } from './views/DisplayOneUser.jsx'
import { DisplayOnePost } from './views/DisplayOnePost.jsx'
import { useAuth } from './config/AuthContext.jsx'
function App() {
    const [user, setUser] = useState({})
    const [loggedInUser, setLoggedInUser] = useState([])
    const location = useLocation()
    const [filteredPosts, setFilteredPosts] = useState([]); 
    const showNavBar = !['/', '/register', '/login'].includes(location.pathname)
    const {authState, setAuthState} = useAuth()
    const [followRelationship, setFollowRelationship] = useState(false)
    
  
    return (
      <>
        {showNavBar && <NavBar  user = {user} setFilteredPosts={setFilteredPosts}/>}
        <Routes>
          <Route path={'/'} element={<WelcomePage/>}/>
          <Route path={'/register'} element={<RegistrationPage setLoggedInUser={setLoggedInUser}/>}/>
          <Route path={'/login'} element={<LoginPage setLoggedInUser={setLoggedInUser}/>}/>
          <Route path={'/home'} element={<ProtectedRoute> <HomePage user = {user} setUser = {setUser}/> </ProtectedRoute> }/>
          <Route path={'/search'} element={<ProtectedRoute><SearchPage loggedInUser={loggedInUser} filteredPosts={filteredPosts} /></ProtectedRoute>}/>
          <Route path={'/user/profile'} element={<ProtectedRoute><ProfilePage loggedInUser={loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/post/create'} element={<ProtectedRoute><CreatePost loggedInUser={loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/user/favorites'} element={<ProtectedRoute><FavoritesPage loggedInUser={loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/user/notifications'} element={<ProtectedRoute><NotificationPage loggedInUser={loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/AllPosts'} element = {<ProtectedRoute> <AllPosts loggedInUser = {loggedInUser}/></ProtectedRoute>}/>
          <Route  path={'/Movies'} element = {<ProtectedRoute> <MoviePosts loggedInUser = {loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/TvShows'} element = {<ProtectedRoute> <TvShowPosts loggedInUser = {loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/Anime'} element= {<ProtectedRoute><AnimePosts loggedInUser = {loggedInUser}></AnimePosts></ProtectedRoute>}/>
          <Route path={'/:id/FollowersPosts'} element ={<ProtectedRoute><FollowersPosts loggedInUser = {loggedInUser} user = {user} setUser = {setUser} authState = {authState} setAuthState = {setAuthState}/></ProtectedRoute>}/>
          <Route path={'/display/user/:id'} element = {<ProtectedRoute> <DisplayOneUser  followRelationship = {followRelationship} setFollowRelationship = {setFollowRelationship} loggedInUser = {loggedInUser} user = {user} setUser = {setUser}/></ProtectedRoute>}/>
          <Route path = {'/display/post/:id'} element = {<ProtectedRoute> <DisplayOnePost/></ProtectedRoute>}/>
        </Routes> 
    </>
  )
}

export default App
