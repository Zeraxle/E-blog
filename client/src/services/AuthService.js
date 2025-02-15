import axios from 'axios'
import Cookies from 'js-cookie'


const AUTH_INSTANCE = axios.create(
    {baseURL : 'http://localhost:8000/auth', withCredentials: true})

export const registerUser = async (userData) => {
    try {
        const response = await AUTH_INSTANCE.post('/register', userData)
        return response.data
    } catch (error) {
        if(error.response){
            if (error.response.status === 400 || error.response.status === 401){
                return null
            }
            console.error('Unexpected Error', error)
        }
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await AUTH_INSTANCE.post('/login', userData)
        return response.data
    } catch (error) { 
        if(error.response){
            if (error.response.status === "400" || error.response.status === "401"){
                return
            }
            console.error('Unexpected error', error)
        }
    }
}

export const getProfile = async () => {
    try {
        
        const response = await AUTH_INSTANCE.get('/profile', {
            headers : { Authorization: `Bearer ${Cookies.get('sessionId')}`}
        });
        return response.data; 
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};

export const logout = async () => {
    
    try {
        const response = await AUTH_INSTANCE.post('/logout')
        Cookies.remove('sessionId')

        return response.data
    } catch (error) { 
        console.log('Logout Error', error) 
        throw error}
}