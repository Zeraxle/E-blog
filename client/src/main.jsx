import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './config/AuthContext.jsx'
import { LikeProvider } from './views/LikeContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <LikeProvider>
        <App/>
        </LikeProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
