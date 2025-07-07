import React, { useState, useEffect } from 'react'
import ArtCard from '../components/ArtCard'
import ArtModal from '../components/ArtModal'

export default function Gallery() {
  const [artworks, setArtworks] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch('/artworks.json')
      .then(res => res.json())
      .then(data => setArtworks(data))
      .catch(err => console.error('Error loading artworks:', err))
  }, [])

  return (
    
    <>
      <div className="text-center pb-3">
        
        <h2 className="text-3xl font-semibold mb-4 pb-5 ">Explore student artwork and submit your own creations.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {artworks.map(art => (
          <ArtCard key={art.title} art={art} onClick={() => setSelected(art)} />
        ))}
      </div>
      {selected && <ArtModal selected={selected} onClose={() => setSelected(null)} />}
    </>
  )
}
