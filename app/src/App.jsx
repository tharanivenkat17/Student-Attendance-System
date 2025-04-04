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

// import React from 'react';

// const App = () => {
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const secretKey = import.meta.env.VITE_SECRET_KEY;

//   return (
//     <div>
//       <h5>API URL: {apiUrl}</h5>
//       <p>Secret Key: {secretKey}</p>
//     </div>
//   );
// };

// export default App;