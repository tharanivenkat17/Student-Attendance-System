import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import Attendance from '../Pages/Attendance'
import MonthlyReport from '../Pages/MonthlyReport'
import AttendanceReport from '../Pages/AttendanceReport'
import { useAuth } from '../Hooks/AuthContext'
import '../Styles/Navigation.css'
import PrivateRoute from './PrivateRoute'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

function Navigation() {
    const { isLoggedIn, logout } = useAuth()
    return (
        <>
            <div className='Header'>
                <div>
                    {isLoggedIn && (<Link to="/home">
                        <i className="fa-solid fa-house"></i>  Home
                    </Link>)} &nbsp;&nbsp;
                    {isLoggedIn && (<Link to="/attendance">
                        <i className="fa-solid fa-list-check"></i>  Mark Attendance
                    </Link>)} &nbsp;&nbsp;
                    {isLoggedIn && (<Link to="/monthlyreport">
                        <i className="fa-regular fa-calendar-days"></i>  Monthly Report
                    </Link>)} &nbsp;&nbsp;
                    {isLoggedIn && (<Link to="/attendancereport">
                        <i className="fa-regular fa-rectangle-list"></i>  AttendanceReport
                    </Link>)}
                </div>

                <div style={{ marginRight: '12px' }}>
                    <Link to="/" onClick={isLoggedIn ? logout : null}>
                        {isLoggedIn ? <i className="fa-solid fa-right-from-bracket"></i> : <i className="fa-solid fa-right-to-bracket"></i>} &nbsp;
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </Link>
                </div>
            </div>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route element={<PrivateRoute />}>
                    <Route path='/home' element={<Home />} />
                    <Route path='/attendance' element={<Attendance />} />
                    <Route path='/monthlyreport' element={<MonthlyReport />} />
                    <Route path='/attendancereport' element={<AttendanceReport />} />
                </Route>
            </Routes>
        </>
    )
}
export default Navigation