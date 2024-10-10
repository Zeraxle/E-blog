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
import { AuthProvider } from './config/AuthContext.jsx'
import { ProtectedRoute } from './components/ProtectedRoute.jsx'

function App() {

    const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <>
      <NavBar/>
      <AuthProvider>
        <Routes>
          <Route path={'/'} element={<WelcomePage/>}/>
          <Route path={'/register'} element={<RegistrationPage setLoggedInUser={setLoggedInUser}/>}/>
          <Route path={'/login'} element={<LoginPage setLoggedInUser={setLoggedInUser}/>}/>
          <Route path={'/home'} element={<ProtectedRoute> <HomePage/> </ProtectedRoute> }/>
          <Route path={'/search'} element={<SearchPage loggedInUser={loggedInUser}/>}/>
          <Route path={'/user/profile'} element={<ProtectedRoute><ProfilePage loggedInUser={loggedInUser}/></ProtectedRoute>}/>
          <Route path={'/post/create'} element={<CreatePost loggedInUser={loggedInUser}/>}/>
          <Route path={'/user/favorites'} element={<FavoritesPage loggedInUser={loggedInUser}/>}/>
          <Route path={'/user/notifications'} element={<NotificationPage loggedInUser={loggedInUser}/>}/>
        </Routes>
      </AuthProvider>  
    </>
  )
}

export default App
