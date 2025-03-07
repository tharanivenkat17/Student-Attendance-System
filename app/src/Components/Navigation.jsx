import React from 'react'
import '../StyleSheets/Navigation.css'
import { Link, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Attendance from '../Pages/Attendance'

function Navigation() {
    return (
        <div>
            <div className='Header'>
            <div className='Home'>
                <Link to="/">Home</Link> &nbsp;&nbsp;
                <Link to="/login">Login</Link>
            </div>
            </div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/attendance' element={<Attendance />} />
            </Routes>
        </div>
    )
}

export default Navigation