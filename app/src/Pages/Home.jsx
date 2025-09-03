import React from 'react';
import { useNavigate } from 'react-router-dom';

import '../Styles/Home.css';
import { useUserName } from '../Hooks/UserContext';

function Home() {
  const navigate = useNavigate();
  const { userName } = useUserName();
  const onClickStart = () => {
    navigate('/attendance');
  }
  const onClickEdit = () => {
    navigate('/monthlyreport');
  }
  return (
    <div className="home-container">
      <div className="content-box">
        <h1 className="home-title">Welcome to the Student Attendance System</h1>
        <p className="home-subtitle">Effortlessly track and manage student attendance with ease.</p>
        {userName == 'Principal@123' ?
          <button className="cta-button" onClick={onClickEdit}>Edit Monthly Attendance</button> :
          <button className="cta-button" onClick={onClickStart}>Start Marking Attendance</button>
        }
      </div>
    </div>
  )
}

export default Home;
