import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from 'axios';

import '../Styles/Login.css';
import { useUserName } from '../Hooks/UserContext';
import { useAuth } from '../Components/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const { setUserName } = useUserName();
    const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm();
    const navigate = useNavigate();

    const userData = import.meta.env.VITE_User
    const UserNamePattern = new RegExp(import.meta.env.React_App_Username_Pattern)
    const PasswordPattern = new RegExp(import.meta.env.React_App_Password_Pattern)

    // Submit the Login
    const onSubmit = async (data) => {
        try {
            const response = await axios.get(`${userData}?username=${data.username}`)
            if (response.data.length === 0) {
                setError('username', { type: 'manual', message: 'No User Found' });
            }
            else {
                const user = response.data[0];
                if (user.password === data.password) {
                    setUserName(user.username)
                    console.log("Name : ", user.username);
                    console.log("Password : ", user.password);
                    alert('Login Successful');
                    login()
                    reset()
                    clearErrors();
                    navigate('/home');
                }
                else {
                    setError('password', { type: 'manual', message: 'Invalid Credentials' });
                }
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data.');
        }
    }

    return (
        <div className="home-container">
            <div className="card">
                <div className="login-header text-center p-1">
                    Login
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
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
        </div>
    );
}

export default Login;