import axios from 'axios'
import Cookies from 'js-cookie'


const AUTH_INSTANCE = axios.create(
    {baseURL : 'http://localhost:8000/auth', withCredentials: true})

    export const registerUser = async (userData) => {
        try {
            const response = await AUTH_INSTANCE.post('/register', userData);
            return response.data;
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message || "Something went wrong";
    
                // Handle known error messages without logging
                if (errorMessage.toLowerCase().includes("user already exists")) {
                    return { message: 'User already exists' }; // Return a friendly error message
                }
    
                // Avoid logging specific errors to the console
                if (error.response.status === 400 || error.response.status === 401) {
                    return { message: errorMessage };  // Return message instead of logging
                }
            }
            console.error('Unexpected Error:', error); // Only log unexpected errors
            throw error;  // Re-throw unexpected errors
        }
    };
    

export const loginUser = async (userData) => {
    const originalConsoleError = console.error; // Store original console.error

    try {
        console.error = () => {}; // Disable error logging
        const response = await AUTH_INSTANCE.post('/login', userData);
        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || 'Login failed. Please try again.' };
    } finally {
        console.error = originalConsoleError; // Restore original console.error
    }
};


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
