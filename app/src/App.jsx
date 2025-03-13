import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './Components/Navigation'
import { AuthProvider } from './Hooks/AuthContext'
import Footer from './Components/Footer'
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthProvider>
      <Footer />
    </>
  )
}
export default App