import React, { useState, useEffect } from 'react'
import ArtCard from '../components/ArtCard'
import { useNavigate } from 'react-router-dom'

export default function Gallery() {
  const [artworks, setArtworks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/artworks.json')
      .then(res => res.json())
      .then(data => setArtworks(data))
      .catch(err => console.error('Error loading artworks:', err))
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {artworks.map((art, index) => (
        <ArtCard
          key={art.title}
          art={art}
          onClick={() => navigate(`/artwork/${index}`)} // 👈 Pass index as id
        />
      ))}
    </div>
  )
}
