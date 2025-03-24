import React, { Suspense } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './Components/Navigation'
import { AuthProvider } from './Hooks/AuthContext'
import { AttendanceProvider } from './Hooks/AttendanceContext'

function App() {
  const LazyLoadingComponent = React.lazy(() => import('./Components/Footer'))

  return (
    <>
      <AuthProvider>
        <AttendanceProvider>
          <BrowserRouter>
            <Navigation />
          </BrowserRouter>
        </AttendanceProvider>
      </AuthProvider>
      
      <Suspense fallback={<>Footer Loading...</>}>
        <LazyLoadingComponent />
      </Suspense>
    </>
  )
}
export default App