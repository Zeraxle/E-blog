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
import { NotificationPage } from './views/NotificationPage'

function App() {

    const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path={'/'} element={<WelcomePage/>}/>
        <Route path={'/register'} element={<RegistrationPage/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/home'} element={<HomePage/>}/>
        <Route path={'/search'} element={<SearchPage/>}/>
        <Route path={'/user/profile'} element={<ProfilePage/>}/>
        <Route path={'/post/create'} element={<CreatePost/>}/>
        <Route path={'/user/favorites'} element={<FavoritesPage/>}/>
        <Route path={'/user/notifications'} element={<NotificationPage/>}/>
      </Routes>
        
    </>
  )
}

export default App
