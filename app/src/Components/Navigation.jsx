import React from 'react'
import '../Styles/Navigation.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Attendance from '../Pages/Attendance'
import { useAuth } from '../Hooks/AuthContext'
import MonthlyReport from '../Pages/MonthlyReport'
import Sample from '../Pages/Sample'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

function Navigation() {
    const { isLoggedIn, logout } = useAuth()
    if (isLoggedIn) {
        console.log("Login")
    }
    else {
        console.log("Logout")
    }

    const navigate = useNavigate();
    function handleAttendance(isLoggedIn) {
        if (isLoggedIn) {
            navigate('/attendance')
        }
        else {
            alert('Please Login, After Login only Attendance is accessable ')
            navigate('/login')
        }
    }

    function handleMonthlyReport(isLoggedIn) {
        if (isLoggedIn) {
            navigate('/monthlyreport')
        }
        else {
            alert('Please Login, After Login only Monthly Report is accessable ')
            navigate('/login')
        }
    }

    return (
        <div>
            <div className='Header'>
                <div>
                    <Link to="/">
                        <i class="fa-solid fa-house"></i>  Home
                    </Link> &nbsp;&nbsp;
                    <Link to={isLoggedIn ? "/attendance" : "#"} onClick={() => handleAttendance(isLoggedIn)}>
                        <i class="fa-solid fa-list-check"></i>  Attendance
                    </Link> &nbsp;&nbsp;
                    <Link to={isLoggedIn ? "/monthlyreport" : "#"} onClick={() => handleMonthlyReport(isLoggedIn)}>
                        <i class="fa-regular fa-calendar-days"></i>  Monthly Report
                    </Link>
                </div>

                <div style={{marginRight: '12px'}}>
                    <Link to="/sample"> 
                        Sample
                    </Link> &nbsp;&nbsp;
                    <Link to="/login" onClick={isLoggedIn ? logout : null}>
                        {isLoggedIn ? <i class="fa-solid fa-right-from-bracket"></i> : <i class="fa-solid fa-right-to-bracket"></i>}  {isLoggedIn ? 'Logout' : 'Login'}
                    </Link>
                </div>
            </div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/attendance' element={<Attendance />} />
                <Route path='/monthlyreport' element={<MonthlyReport />} />
                <Route path='/sample' element={<Sample />} />
            </Routes>
        </div>
    )
}

export default Navigation