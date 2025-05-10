import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Launch from '../Pages/Launch'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Attendance from '../Pages/Attendance'
import MonthlyReport from '../Pages/MonthlyReport'
import AttendanceReport from '../Pages/AttendanceReport'
import { useAuth } from '../Hooks/AuthContext'
import '../Styles/Navigation.css'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

function Navigation() {
    const { isLoggedIn, logout } = useAuth()

    // To Check Login
    function handleNavigation(){
        if (!isLoggedIn) {
            alert('Please Login, After Login only Attendance System will be accessible ')
        }
    }

    return (
        <div>
            <div className='Header'>
                <div>
                    <Link to={isLoggedIn ? "/home" : "/"} onClick={() => handleNavigation()}>
                        <i className="fa-solid fa-house"></i>  Home
                    </Link> &nbsp;&nbsp;
                    <Link to={isLoggedIn ? "/attendance" : "/"} onClick={() => handleNavigation()}>
                        <i className="fa-solid fa-list-check"></i>  Attendance
                    </Link> &nbsp;&nbsp;
                    <Link to={isLoggedIn ? "/monthlyreport" : "/"} onClick={() => handleNavigation()}>
                        <i className="fa-regular fa-calendar-days"></i>  Monthly Report
                    </Link> &nbsp;&nbsp;
                    <Link to={isLoggedIn ? "/attendancereport" : "/"} onClick={() => handleNavigation()}> 
                        <i className="fa-regular fa-rectangle-list"></i>  AttendanceReport
                    </Link>
                </div>

                <div style={{marginRight: '12px'}}>
                    <Link to="/login" onClick={isLoggedIn ? logout : null}>
                        {isLoggedIn ? <i className="fa-solid fa-right-from-bracket"></i> : <i className="fa-solid fa-right-to-bracket"></i>} &nbsp; 
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