import axios from 'axios'

const AUTH_INSTANCE = axios.create(
    {baseURL : 'http://localhost:8000/auth', withCredentials: true})

export const registerUser = async (userData) => {
    try {
        const response = await AUTH_INSTANCE.post('/register', userData)
        // const profileResponse = await AUTH_INSTANCE.get('/profile', {
        //     headers : {
        //         Authorization: `Bearer ${token}`,
        //     }
        // })
        // console.log('Profile data:', profileResponse)
        return response.data
    } catch (error) {console.log('Error:', error)}
}

export const loginUser = async (userData) => {
    try {
        const response = await AUTH_INSTANCE.post('/login', userData)
        
        // const profileResponse = await AUTH_INSTANCE.get('/profile', {
        //     headers : {
        //         Authorization: `Bearer ${token}`,
        //     }
        // })
        // console.log('Profile data:', profileResponse)
        return response.data
    } catch (error) {console.log('Error:', error)}
}

export const getProfile = async () => {
    try {
        const response = await AUTH_INSTANCE.get('/profile'); 
        return response.data; 
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }
};