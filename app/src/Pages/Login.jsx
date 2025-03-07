import React, { useState } from 'react'
import axios from 'axios';
import '../StyleSheets/Login.css'
import {useNavigate} from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        userData: {username:'', password:''},
        errorField: ''
    })

    function handleChange(event){
        const updatedData = { ...state.userData };
        updatedData[event.target.name] = event.target.value;

        setState({
            ...state,
            userData: updatedData,
        });
    }
    function handleSubmit(event){
        event.preventDefault();
        if(handleValidate()){
            const {username, password} = state.userData;
            const data ={username, password}
            axios.get(`http://localhost:4001/loginDetails?username=${data.username}`)
                .then((response) =>{
                    if(response.data.length === 0){
                        setState((prevState) =>({
                            ...prevState,
                            errorField: {username : 'No user in this User Name'}
                        }))
                    }
                    else{
                        const user = response.data[0]
                        if(user.password === data.password){
                            alert('Login Successful')
                            navigate('/attendance')
                            setState({
                                userData: { username: '', password: '' },
                                errorField: {}
                            })
                        }
                        else{
                            setState((prevState) =>({
                                ...prevState,
                                errorField: {password : 'Password does not match'}
                            }))
                        }
                    }
                })

        }
        else{

        }
    }
    function handleValidate(){
        let data = state.userData;
        let error = {};
        let validation = true;

        const userNamePattern = / ^[a-zA-Z0-9]([_-]?[a-zA-Z0-9]){2,19}$ /;
        if(!userNamePattern.test(data['username'])){
            validation = false;
            error['username'] = 'Enter Valid User Name';
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;
        if(!passwordPattern.test(data['password'])){
            validation = false;
            error['password'] = 'Enter Valid Password';
        }
        
        setState((prevState) => ({
            ...prevState,
            errorField: error
        }))
        return validation;
    }

  return (
    <div className='card'>
        <form onSubmit={handleSubmit}>
            <div className='flex'>
                <label htmlFor="username">Enter UserName</label>
                <br />
                <input 
                    type="text" 
                    name='username'
                    value={state.userData.username}
                    placeholder='Enter Username'
                    onChange={handleChange} 
                    required
                />
                <span>{state.errorField}</span>
            </div>
            <div className='flex'>
                <label htmlFor="password">Enter Password</label>
                <br />
                <input 
                    type="text"
                    name='password'
                    value={state.userData.password} 
                    placeholder='Enter Password'
                    onChange={handleChange}
                    required
                />
                <span>{state.errorField}</span>
            </div>
            <div className='button'>
                <button type='Submit'>Login</button>
            </div>
        </form>
    </div>
  )
}

export default Login