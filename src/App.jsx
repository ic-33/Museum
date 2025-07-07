import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import ArtworkDetail from './pages/ArtworkDetail'
import SubmitArt from './pages/SubmitArt'

const App = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/artwork/:id" element={<ArtworkDetail />} />
        <Route path="/submit" element={<SubmitArt />} />
      </Routes>
    </div>
  )
}

export default App
