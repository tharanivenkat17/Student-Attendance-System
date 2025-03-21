import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import '../Styles/Home.css';

function Home() {
  return (
    <div className="home d-flex justify-content-center align-items-center" style={{ backgroundImage: 'url(../assets/loginback.avif)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '450px' }}>
        <h1 className="text-center p-5">Welcome to the Student Attendance System</h1>
    </div>
  )
}

export default Home;