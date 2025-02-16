import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {registerUser} from '../services/AuthService.js'
import '../App.css'

export const RegistrationPage = () => {

    const [authState, setAuthState] = useState({})

    const [formData, setFormData] = useState({
        firstName : '',
        lastName : '',
        username : '',
        email : '',
        password : '',
        confirmPassword : ''
    })

    const [errors, setErrors] = useState({
        firstName : '',
        lastName : '',
        username : '',
        email : '',
        password : '',
        confirmPassword : ''
    })

    const navigate = useNavigate()
    const validateUser = (name, value) => {
        const validations = {
            firstName: (value) => (value.length >= 2 && value.length <= 30 ? true : 'First Name must be 2-30 characters'),
            lastName: (value) => (value.length >= 2 && value.length <= 30 ? true : 'Last Name must be 2-30 characters'),
            username: (value) => (value.length >= 5 && value.length <= 30 ? true : 'Username must be 5-30 characters'),
            email: (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : 'Email must be valid'),
            password: (value) => (value.length >= 8 && value.length <= 30 ? true : 'Password must be 8-30 characters'),
            confirmPassword: (value) => (value === formData.password ? true : 'Passwords must match'),
        };
        return validations[name](value);
    };
    
    const readyToSubmit = () => {
        let isValid = true;
        const newErrors = { ...errors }; // Start with current errors
        
        // Validate all fields
        Object.keys(formData).forEach((key) => {
            const validationResult = validateUser(key, formData[key]);
            if (!formData[key].trim()) {
                newErrors[key] = 'This field is required.';
                isValid = false;
            } else if (validationResult !== true) {
                newErrors[key] = validationResult;
                isValid = false;
            } else {
                newErrors[key] = ''; // Clear any previous errors
            }
        });
        
        setErrors(newErrors); // Update the state with new errors
        return isValid;
    };
    

    const changeHandler = (e) => {
        const { name, value } = e.target;
        const validationResult = validateUser(name, value);
    
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: validationResult === true ? '' : validationResult }));
    };
    
    const submitHandler = async (e) => {
        e.preventDefault();
    
        if (!readyToSubmit()) {
            alert('Please fill out the form correctly.');
            return;
        }
    
        try {
            const payload = { ...formData };
            delete payload.confirmPassword;
    
            const res = await registerUser(payload);
    
            // If response contains an error message, handle the specific error
            if (res?.message) {
                if (res.message.toLowerCase().includes('user already exists')) {
                    alert('This email or username is already in use. Please use a different one.');
                    setErrors((prev) => ({
                        ...prev,
                        email: 'Email already in use.',
                        username: 'Username already taken.',
                    }));
                    return;  // Prevent form submission
                }
    
                alert('Registration failed: ' + res.message);
                return;  // Prevent form submission
            }
    
            // Successful registration
            if (res?.user && res?.sessionId) {
                setAuthState({ user: res.user.id, token: res.sessionId });
                navigate('/user/profile');
            } else {
                throw new Error('Invalid response from server.');
            }
    
        } catch (error) {
            console.error('Unexpected registration error:', error);
            alert('Something went wrong. Please try again.');
        }
    };
    
    

    return(<>
        <h1>E-Blog</h1>
        <form className='registration-form'>
            <label>
                First Name:
                <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={changeHandler} 
                />
                {errors?.firstName && <p>{errors.firstName}</p>}
            </label>
            <label>
                Last Name:
                <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={changeHandler} 
                />
                {errors?.lastName && <p>{errors.lastName}</p>}
            </label>
            <label>
                Username:
                <input 
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={changeHandler} 
                />
                {errors?.username && <p>{errors.username}</p>}
            </label>
            <label>
                Email:
                <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler} 
                />
                {errors?.email && <p>{errors.email}</p>}
            </label>
            <label>
                Password:
                <input 
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={changeHandler} 
                />
                {errors?.password && <p>{errors.password}</p>}
            </label>
            <label>
                Confirm Password:
                <input 
                    type="text"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={changeHandler} 
                />
                {errors?.confirmPassword && <p>{errors.confirmPassword}</p>}
            </label>
            <button onClick={submitHandler}>Register</button>
        </form>
    </>)
}