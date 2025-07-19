import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function ArtworkDetail() {
  const { id } = useParams()
  const [art, setArt] = useState(null)

  useEffect(() => {
    fetch('/artworks.json') // 👈 Make sure this is correct path
      .then(res => res.json())
      .then(data => {
        const artwork = data.find((item, index) => String(index) === id) // using index as ID
        setArt(artwork)
      })
      .catch(err => console.error('Error loading artwork:', err))
  }, [id])

  if (!art) {
    return <p className="text-center">Loading artwork...</p>
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img
        src={art.image}
        alt={art.title}
        className="w-full rounded shadow mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{art.title}</h2>
      <p className="text-gray-700 mb-2">
        <strong>By:</strong> {art.artist}
      </p>
      <p className="text-gray-600">{art.description}</p>
      <Link
        to="/gallery"
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        ← Back to Gallery
      </Link>
    </div>
  )
}
