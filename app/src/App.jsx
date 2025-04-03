import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './Components/Navigation'
import { AuthProvider } from './Hooks/AuthContext'
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}
export default App