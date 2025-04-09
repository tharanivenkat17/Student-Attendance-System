import React from 'react';
import axios from 'axios';
import '../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/AuthContext';
import { useForm } from 'react-hook-form'

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate();
    const userData = import.meta.env.VITE_User
    const UserNamePattern = new RegExp(import.meta.env.React_App_Username_Pattern)
    const PasswordPattern = new RegExp(import.meta.env.React_App_Password_Pattern)

    const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm();

    // Submit the Login
    const onSubmit = async (data) => {
        try {
            const response = await axios.get(`${userData}?username=${data.username}`)
            if (response.data.length === 0) {
                setError('username', { type: 'manual', message: 'No user with this Username' });
            } 
            else {
                const user = response.data[0];
                if (user.password === data.password) {
                    alert('Login Successful');
                    login()
                    reset()
                    clearErrors();
                    navigate('/home');
                }
                else {
                    setError('password', { type: 'manual', message: 'Password does not match' });
                }
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data.');
        }
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Enter Username"
                        {...register('username', {
                            required: 'Username is required',
                            pattern: {
                                value: UserNamePattern,
                                message: 'Enter Valid Username'
                            }
                        })}
                    />
                    {errors.username && <span>{errors.username.message}</span>}
                </div>
                <div className="flex">
                    <input
                        type="password"
                        placeholder="Enter Password"
                        {...register('password', {
                            required: 'Password is required',
                            pattern: {
                                value: PasswordPattern,
                                message: 'Enter Valid Password'
                            }
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <div className="button">
                    <button type="Submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;