import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../config/AuthContext.jsx';
import { loginUser } from '../services/AuthService.js';

export const LoginPage = () => {
    const { setAuthState } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        global: '' // To handle non-field-specific errors
    });

    const validateUserAttribute = (name, value) => {
        const validations = {
            email: value =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? ''
                    : 'Invalid email format.',
            password: value =>
                value.length >= 8 && value.length <= 50
                    ? ''
                    : 'Password must be between 8 and 50 characters.'
        };
        setErrors(prev => ({ ...prev, [name]: validations[name](value) }));
    };

    const changeHandler = e => {
        const { name, value } = e.target;
        validateUserAttribute(name, value);
        setFormData({ ...formData, [name]: value });
    };

    const readyToSubmit = () => {
        let isValid = true;
    
        // Validate all fields
        Object.keys(formData).forEach((key) => {
            validateUserAttribute(key, formData[key]);
            if (!formData[key].trim()) {
                setErrors((prev) => ({ ...prev, [key]: 'This field is required.' }));
                isValid = false;
            }
        });
    
        // Check for existing errors
        if (Object.values(errors).some((error) => error !== '')) {
            isValid = false;
        }
    
        return isValid;
    };
    

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!readyToSubmit()) {
            alert('Invalid Input');
            return false;
        } 
        setErrors((prev) => ({ ...prev, global: '' })); // Reset global errors
    
        try {
            const res = await loginUser(formData);
            console.log("Response from loginUser:", res); // 🔍 Debugging
    
            if (!res || !res.user || !res.sessionId) {
                console.error("Invalid API response structure:", res);
                throw new Error('Invalid response from server.');
            }
    
            setAuthState({ user: res.user.id, token: res.sessionId });
            navigate('/home');
        } catch (error) {
            console.error('Error during login:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Login failed';
            setErrors((prev) => ({ ...prev, global: errorMessage }));
        }
    };
    
    
    
    return (
        <>
            <h1>E-Blog</h1>
            <form onSubmit={submitHandler}>
                {errors.global && <p className="error">{errors.global}</p>} {/* Global errors */}
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </label>
                <button type="submit">Login</button>
            </form>
        </>
    );
};
// import {useState, useEffect} from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../config/AuthContext.jsx'
// import { loginUser, getProfile } from '../services/AuthService.js'



// export const LoginPage = (props) => {

    
//     const { authState, setAuthState } = useAuth()
    
//     const [formData, setFormData] = useState({
//         email : '',
//         password : ''
//     })

//     const [errors, setErrors] = useState({
//         email : '',
//         password : ''
//     })

//     const navigate = useNavigate()

//     const changeHandler = (e) => {
//         const {name, value} = e.target
//         setFormData({...formData, [name] : value})
//     }

//     const submitHandler = async (e) => {
//         e.preventDefault()
//         try {
//             const res = await loginUser(formData)
//             setAuthState({user: res.user.id, token: res.sessionId})
//             navigate('/home')
//         } catch (error) { console.error('Error during login', error)}
//     }

//     return(<>
//         <h1>E-Blog</h1>
//         <form onSubmit={submitHandler}>
//             <label >
//                 Email: 
//                 <input 
//                     type="text" 
//                     name="email" 
//                     value={formData.email}
//                     onChange={changeHandler} 
//                 />
//             </label>
//             <label>
//                 Password:
//                 <input 
//                     type="text"
//                     name="password"
//                     value={formData.password} 
//                     onChange={changeHandler}
//                 />
//             </label>
//             <button onClick={submitHandler}>Login</button>
//         </form>
//     </>)
// }