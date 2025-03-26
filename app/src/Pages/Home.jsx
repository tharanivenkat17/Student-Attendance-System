import React, { useEffect } from 'react';
import { useAuth } from '../Hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate()
  const {isLoggedIn} = useAuth()
  useEffect(() => {
    if(!isLoggedIn){
      navigate('/')
    }
  },[isLoggedIn, navigate])
  return (
    <div style={{ padding:'100px' }}>
        <h1 className="text-center p-5">Welcome to the Student Attendance System</h1>
    </div>
  )
}

export default Home;