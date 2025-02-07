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
    
        // First, validate the form fields
        if (!readyToSubmit()) {
            alert('Please fill out the form correctly');
            return; // Prevent form submission
        }
    
        // Check if username or email has errors before attempting registration
        if (errors.username || errors.email) {
            alert('Please correct the errors before submitting the form.');
            return; // Prevent form submission
        }
    
        try {
            const payload = { ...formData };
            delete payload.confirmPassword; // Exclude unnecessary fields
    
            const res = await registerUser(payload);
    
            if (!res || !res.user || !res.sessionId) {
                throw new Error('Invalid response from server.');
            }
    
            // Set authState and navigate after successful registration
            setAuthState({ user: res.user.id, token: res.sessionId });
            navigate('/user/profile');
        } catch (error) {
            console.error('Error during registration:', error);
    
            // Check if error contains a message indicating user already exists
            if (error?.data?.message) {
                const message = error.data.message.toLowerCase();
    
                // If the message indicates username or email already exists, show alert and set errors
                if (message.includes('user already exists')) {
                    alert('The username or email is already taken. Please choose another one.');
                    setErrors((prev) => ({
                        ...prev,
                        username: 'Username or email already taken.',
                        email: 'Email already in use.'
                    }));
                } else {
                    alert('Registration failed: ' + message);
                }
            } else {
                alert('Something went wrong. Please try again.');
            }
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
            <disabled>
            <button onClick={submitHandler}>Register</button></disabled>
        </form>
    </>)
}