import React from 'react'
import '../Styles/Footer.css'

function Footer() {
  return (
    <div className="about">
      <h2>About Us</h2>
      <p>Our school attendance system helps schools efficiently track student attendance,
        ensuring accuracy and reducing administrative workload. 
      </p>
      <p>
        Location: 17, near Tidel Park, Siruseri, Chennai - 600001.
      </p>
      <p className='i-footer'>
        <i class="fa-brands fa-x-twitter"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-youtube"></i>
        <i class="fa-brands fa-linkedin-in"></i>
        <i class="fa-brands fa-square-facebook"></i>
      </p>
      <hr />
      <p>&copy; 2025 Student Attendance System. All Rights Reserved.</p>
    </div>
  )
}

export default Footer