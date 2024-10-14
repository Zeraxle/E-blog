import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
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
import { AuthProvider } from './config/AuthContext.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

function App() {

    const [loggedInUser, setLoggedInUser] = useState({})
    // const showNavBar = location.pathname !== '/' '/register' '/'
  return (
    <>
      <Routes>
          <Route path={'/'} element={<WelcomePage/>}/>
          <Route path={'/register'} element={<RegistrationPage setLoggedInUser={setLoggedInUser}/>}/>
          <Route path={'/login'} element={<LoginPage setLoggedInUser={setLoggedInUser}/>}/>
      </Routes>

      <AuthProvider>

      <NavBar/>
        <Routes>
          <Route path={'/home'} element={<ProtectedRoute> <HomePage/> </ProtectedRoute> }/>
          <Route path={'/search'} element={<ProtectedRoute><SearchPage loggedInUser={loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/user/profile'} element={<ProtectedRoute><ProfilePage loggedInUser={loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/post/create'} element={<ProtectedRoute><CreatePost loggedInUser={loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/user/favorites'} element={<ProtectedRoute><FavoritesPage loggedInUser={loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/user/notifications'} element={<ProtectedRoute><NotificationPage loggedInUser={loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/AllPosts'} element = {<ProtectedRoute> <AllPosts loggedInUser = {loggedInUser}/></ProtectedRoute>}/>
          <Route  path={'/Movies'} element = {<ProtectedRoute> <MoviePosts loggedInUser = {loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/TvShows'} element = {<ProtectedRoute> <TvShowPosts loggedInUser = {loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/Anime'} element= {<ProtectedRoute><AnimePosts loggedInUser = {loggedInUser}></AnimePosts></ProtectedRoute>}/>
          <Route path={'/FollowersPosts'} element ={<ProtectedRoute><FollowersPosts loggedInUser = {loggedInUser}/></ProtectedRoute>}/>
          </Routes>
      </AuthProvider>  
    </>
  )
}

export default App
