import React, { useState, useEffect } from 'react'
import ArtCard from '../components/ArtCard'
import { useNavigate } from 'react-router-dom'

export default function Gallery() {
  const [artworks, setArtworks] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/artworks.json')
      .then(res => res.json())
      .then(data => {
        // Assign a stable id if artworks.json doesn't have one
        const artworksWithId = data.map((art, i) => ({ ...art, id: i }))
        setArtworks(artworksWithId)
      })
      .catch(err => console.error('Error loading artworks:', err))
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {artworks.map((art) => (
        <ArtCard
          key={art.id}
          art={art}
          onClick={() => navigate(`/artwork/${art.id}`)} // ✅ use stable id
        />
      ))}
    </div>
  )
}
