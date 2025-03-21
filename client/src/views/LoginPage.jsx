import { useNavigate } from 'react-router-dom';
import { useAuth } from '../config/AuthContext.jsx';
import { loginUser } from '../services/AuthService.js';
import { useState } from 'react';
import '../App.css'
import "../views/LoginPage.css"
export const LoginPage = () => {
    const { setAuthState } = useAuth();
    const navigate = useNavigate();
``

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        global: '' 
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

        Object.keys(formData).forEach((key) => {
            validateUserAttribute(key, formData[key]);
            if (!formData[key].trim()) {
                setErrors((prev) => ({ ...prev, [key]: 'This field is required.' }));
                isValid = false;
            }
        });

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
    
        setErrors(prev => ({ ...prev, global: '' })); 
        const res = await loginUser(formData);
    
        if (res.error) {
            setErrors(prev => ({ ...prev, global: res.error }));
            return;
        }
    
        if (!res.user || !res.sessionId) {
            setErrors(prev => ({ ...prev, global: 'Invalid response from server.' }));
            return;
        }
    
        setAuthState({ user: res.user.id, token: res.sessionId });
        navigate('/AllPosts');
    };
    
    
    
    
    
    return (
        <>
            <h1>E-Blog</h1>
            <form onSubmit={submitHandler} className='login-form'>
                {errors.global && <p className="error">{errors.global}</p>}
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler }
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler }
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </label>
                <button className = "btnSubmit"type="submit">Login</button>
            </form>
        </>
    );
};
