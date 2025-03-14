import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './Components/Navigation'
import { AuthProvider } from './Hooks/AuthContext'
import Footer from './Components/Footer'
function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthProvider>
      <Footer />
    </div>
  )
}
export default App