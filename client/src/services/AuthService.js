import axios from 'axios'
import Cookies from 'js-cookie'

const AUTH_INSTANCE = axios.create(
    {baseURL : 'http://localhost:8000/auth', withCredentials: true})

export const registerUser = async (userData) => {
    try {
        const response = await AUTH_INSTANCE.post('/register', userData)
        const profileResponse = await AUTH_INSTANCE.get('/profile', {
            headers : {
                Authorization: `Bearer ${token}`,
            }
        })
        return response.data
    } catch (error) {console.log('Error:', error)}
}

export const loginUser = async (userData) => {
    try {
        const response = await AUTH_INSTANCE.post('/login', userData)
        
        const profileResponse = await AUTH_INSTANCE.get('/profile', {
            headers : {Authorization: `Bearer ${Cookies.get('sessionId')}`,}
        })
        return {response, profileResponse}
    } catch (error) {console.log('Error:', error)}
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