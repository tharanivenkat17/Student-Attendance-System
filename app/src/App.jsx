import React, { Suspense } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './Components/Navigation'
import { AuthProvider } from './Components/AuthContext'
import { AttendanceProvider } from './Hooks/AttendanceContext'
import { UserProvider } from './Hooks/UserContext'

function App() {
  const LazyLoadingComponent = React.lazy(() => import('./Components/Footer'))

  return (
    <>
      <AuthProvider>
        <AttendanceProvider>
          <UserProvider>
            <BrowserRouter>
              <Navigation />
            </BrowserRouter>
          </UserProvider>
        </AttendanceProvider>
      </AuthProvider>

      <Suspense fallback={<>Footer Loading...</>}>
        <LazyLoadingComponent />
      </Suspense>
    </>
  )
}
export default App