import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom' // ⬅️ no BrowserRouter here
import supabase from './supabase/client'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import ArtworkDetail from './pages/ArtworkDetail'
import SubmitArt from './pages/SubmitArt'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AdminPanel from './components/AdminPanel'

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>
  }

  return (
     <div className="container mx-auto px-4 py-8">
      <Navbar user={user} />
      <div className="px-4 py-8">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/gallery" element={user ? <Gallery /> : <Navigate to="/login" replace />} />
          <Route path="/artwork/:id" element={user ? <ArtworkDetail /> : <Navigate to="/login" replace />} />
          <Route path="/submit" element={user ? <SubmitArt /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={user && user.email === 'charbanou.ilias@gmail.com' ? <AdminPanel /> : <Navigate to="/" replace />}/>          
        </Routes>
      </div>
    </div>
  )
}

export default App
