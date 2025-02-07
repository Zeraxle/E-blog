import { useState } from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import './App.css'
import { NavBar } from './components/NavBar'
import { WelcomePage } from './views/WelcomePage'
import { RegistrationPage } from './views/RegistrationPage'
import { LoginPage } from './views/LoginPage'
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
import { EditUserPage } from './views/EditUserPage.jsx'
import { PostComments } from './views/PostComments.jsx'
import { EditComment } from './views/EditComment.jsx'
import { useLikes} from './views/LikeContext.jsx'
import { EditPost } from './views/EditPost.jsx'
function App() {
  const [user, setUser] = useState({})
  const [loggedInUser, setLoggedInUser] = useState([])
  const location = useLocation()
  const [filteredPosts, setFilteredPosts] = useState([]); 
  const showNavBar = !['/', '/register', '/login'].includes(location.pathname)
  const {authState, setAuthState} = useAuth()
  const [updateUserInfo, setUpdateUserInfo] = useState({})
  const [followRelationship, setFollowRelationship] = useState(false)
  const [post, setPost] = useState({})
  const { postLiked, setPostLiked } = useLikes() || { postLiked: [], setPostLiked: () => {} };
  const [followNotification, setFollowNotification] = useState([])
  const [urlPath, setUrlPath] = useState({
    path : ''
  })
    return (
      <>
          {showNavBar && <NavBar  user = {user} setFilteredPosts={setFilteredPosts}/>}
          <Routes>
            <Route path={'/'} element={<WelcomePage/>}/>
            <Route path={'/register'} element={<RegistrationPage setLoggedInUser={setLoggedInUser}/>}/>
            <Route path={'/login'} element={<LoginPage setLoggedInUser={setLoggedInUser}/>}/>
            <Route path={'/search'} element={<ProtectedRoute><SearchPage loggedInUser={loggedInUser} filteredPosts={filteredPosts} /></ProtectedRoute>}/>
            <Route path={'/user/profile'} element={<ProtectedRoute><ProfilePage loggedInUser={loggedInUser} updateUserInfo = {updateUserInfo} setUpdateUserInfo = {setUpdateUserInfo} user = {user} setUser = {setUser} /></ProtectedRoute>}/>
            <Route path={'/post/create'} element={<ProtectedRoute><CreatePost loggedInUser={loggedInUser}/></ProtectedRoute>}/>
            <Route path={'/user/favorites'} element={<ProtectedRoute><FavoritesPage loggedInUser={loggedInUser}/></ProtectedRoute>}/>
            <Route path={'/user/notifications'} element={<ProtectedRoute><NotificationPage followNotification = {followNotification} loggedInUser={loggedInUser}/></ProtectedRoute>}/>
            <Route path={'/AllPosts'} element = {<ProtectedRoute><AllPosts loggedInUser = {loggedInUser} postLiked = {postLiked} setPostLiked = {setPostLiked}  setUrlPath = {setUrlPath}/></ProtectedRoute>}/>
            <Route  path={'/Movies'} element = {<ProtectedRoute> <MoviePosts loggedInUser = {loggedInUser} postLiked = {postLiked} setPostLiked = {setPostLiked} setUrlPath = {setUrlPath} /></ProtectedRoute>}/>
            <Route path={'/TvShows'} element = {<ProtectedRoute> <TvShowPosts loggedInUser = {loggedInUser} postLiked = {postLiked} setPostLiked = {setPostLiked} setUrlPath = {setUrlPath}  /></ProtectedRoute>}/>
            <Route path={'/Anime'} element= {<ProtectedRoute><AnimePosts loggedInUser = {loggedInUser}  postLiked = {postLiked} setPostLiked = {setPostLiked} setUrlPath = {setUrlPath}   ></AnimePosts></ProtectedRoute>}/>
            <Route path={'/:id/FollowersPosts'} element ={<ProtectedRoute><FollowersPosts loggedInUser = {loggedInUser} user = {user} setUser = {setUser} authState = {authState} setAuthState = {setAuthState} postLiked = {postLiked} setPostLiked = {setPostLiked} setUrlPath = {setUrlPath}  /></ProtectedRoute>}/>
            <Route path={'/display/user/:id'} element = {<ProtectedRoute> <DisplayOneUser setFollowNotification = {setFollowNotification} followRelationship = {followRelationship} setFollowRelationship = {setFollowRelationship} loggedInUser = {loggedInUser} user = {user} setUser = {setUser} /></ProtectedRoute>}/>
            <Route path = {'/display/post/:id'} element = {<ProtectedRoute> <DisplayOnePost/></ProtectedRoute>}/>
            <Route path= {'/edit/user/:id'} element = {<ProtectedRoute> <EditUserPage user = {user} setUser = {setUser}/> </ProtectedRoute>}/>
            <Route path={'/:category/post/:postId/comments'} element = {<ProtectedRoute> <PostComments post = {post} setPost = {setPost} urlPath = {urlPath}/></ProtectedRoute>}/>
            <Route path={'/edit/comment/:id'} element ={<ProtectedRoute><EditComment post = {post} /></ProtectedRoute>}/>
            <Route path={`/edit/post/:id`} element = {<ProtectedRoute><EditPost></EditPost></ProtectedRoute>}></Route>
            
          </Routes> 
    </>
  )
}

export default App
