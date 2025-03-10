import React, { useState } from 'react';
import axios from 'axios';
import '../StyleSheets/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        userData: { username: '', password: '' },
        errorField: {}
    });

    function handleChange(event) {
        const updatedData = { ...state.userData };
        updatedData[event.target.name] = event.target.value;

        setState({
            ...state,
            userData: updatedData,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (handleValidate()) {
            const { username, password } = state.userData;
            const data = { username, password };
            axios
                .get(`http://localhost:4001/loginDetails?username=${data.username}`)
                .then((response) => {
                    if (response.data.length === 0) {
                        setState((prevState) => ({
                            ...prevState,
                            errorField: { username: 'No user with this Username' }
                        }));
                    } else {
                        const user = response.data[0];
                        if (user.password === data.password) {
                            alert('Login Successful');
                            setState({
                                userData: { username: '', password: '' },
                                errorField: {}
                            });
                            navigate('/attendance');
                            console.log("Login Successful")
                        } 
                        else {
                            setState((prevState) => ({
                                ...prevState,
                                errorField: { password: 'Password does not match' }
                            }));
                        }
                    }
                });
        }
    }

    function handleValidate() {
        let data = state.userData;
        let error = {};
        let validation = true;

        const userNamePattern = /[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!userNamePattern.test(data['username'])) {
            validation = false;
            error['username'] = 'Enter Valid User Name';
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;
        if (!passwordPattern.test(data['password'])) {
            validation = false;
            error['password'] = 'Enter Valid Password';
        }

        setState((prevState) => ({
            ...prevState,
            errorField: error
        }));

        return validation;
    }

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <h1>Login Form</h1>
                <div className="flex">
                    <label htmlFor="username">Enter UserName</label>
                    <input
                        type="text"
                        name="username"
                        value={state.userData.username}
                        placeholder="Enter Username"
                        onChange={handleChange}
                        required
                    />
                    <span>{state.errorField.username}</span>
                </div>
                <div className="flex">
                    <label htmlFor="password">Enter Password</label>
                    <input
                        type="password"
                        name="password"
                        value={state.userData.password}
                        placeholder="Enter Password"
                        onChange={handleChange}
                        required
                    />
                    <span>{state.errorField.password}</span>
                </div>
                <div className="button">
                    <button type="Submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;