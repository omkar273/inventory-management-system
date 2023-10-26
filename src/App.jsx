/* NODE MODULES */
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import ErrorPage from '@/pages/ErrorPage/ErrorPage.jsx'
import HomePage from '@/pages/HomePage/HomePage.jsx'
import AuthPage from './pages/AuthPage/AuthPage'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'
import { auth } from './firebase/config'

const App = () => {
  const [user, setuser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setuser(user))
  }, [])

  return (
    <div className='app'>
      <BrowserRouter>
        <CssBaseline>
          <Routes>
            <Route path='/' element={user == null ? <Navigate to={'/auth'} /> : < HomePage />} />

            <Route path='/auth' element={user == null ? < AuthPage /> : <Navigate to={'/'} />} />

            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </CssBaseline>
      </BrowserRouter>
    </div>
  )
}

export default App