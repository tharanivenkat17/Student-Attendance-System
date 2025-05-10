import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './Components/Navigation'
import { AuthProvider } from './Hooks/AuthContext'
import Footer from './Components/Footer'
import { AttendanceProvider } from './Hooks/AttendanceContext'
function App() {
  return (
    <div>
      <AuthProvider>
        <AttendanceProvider>
          <BrowserRouter>
            <Navigation />
          </BrowserRouter>
        </AttendanceProvider>
      </AuthProvider>
      <Footer />
    </div>
  )
}
export default App