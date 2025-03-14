import React from 'react'
import '../Styles/Navigation.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Launch from '../Pages/Launch'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Attendance from '../Pages/Attendance'
import { useAuth } from '../Hooks/AuthContext'
import MonthlyReport from '../Pages/MonthlyReport'
import AttendanceReport from '../Pages/AttendanceReport'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

function Navigation() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth()
    // To Check the Login
    function handleNavigation(path){
        if (isLoggedIn) {
           navigate(path)
        }
        else {
            alert('Please Login, After Login only Attendance is accessable ')
        }
    }

    return (
        <div>
            <div className='Header'>
                <div>
                    <Link to={isLoggedIn ? "/home" : "/"} onClick={() => handleNavigation('/home')}>
                        <i class="fa-solid fa-house"></i>  Home
                    </Link> &nbsp;&nbsp;
                    <Link to={isLoggedIn ? "/attendance" : "/"} onClick={() => handleNavigation('/attendance')}>
                        <i class="fa-solid fa-list-check"></i>  Attendance
                    </Link> &nbsp;&nbsp;
                    <Link to={isLoggedIn ? "/monthlyreport" : "/"} onClick={() => handleNavigation('/monthlyreport')}>
                        <i class="fa-regular fa-calendar-days"></i>  Monthly Report
                    </Link> &nbsp;&nbsp;
                    <Link to={isLoggedIn ? "/attendancereport" : "/"} onClick={() => handleNavigation('/attendancereport')}> 
                        <i class="fa-regular fa-rectangle-list"></i>  AttendanceReport
                    </Link>
                </div>

                <div style={{marginRight: '12px'}}>
                    <Link to="/login" onClick={isLoggedIn ? logout : null}>
                        {isLoggedIn ? <i class="fa-solid fa-right-from-bracket"></i> : <i class="fa-solid fa-right-to-bracket"></i>} &nbsp; 
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </Link>
                </div>
            </div>
            <Routes>
                <Route path='/' element={<Launch />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/attendance' element={<Attendance />} />
                <Route path='/monthlyreport' element={<MonthlyReport />} />
                <Route path='/attendancereport' element={<AttendanceReport />} />
            </Routes>
        </div>
    )
}

export default Navigation