import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../supabase/auth'

export default function Home() {
  const [artworks, setArtworks] = useState([])
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/artworks.json')
      .then(res => res.json())
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random())
        setArtworks(shuffled.slice(0, 20))
      })
      .catch(err => console.error('Failed to load artworks:', err))

    getUser().then(setUser)
  }, [])

  return (
    <div className="w-full text-center">
      <h2 className="text-3xl font-semibold mb-4">
        Welcome to the Digital Art Museum!
      </h2>
      <p className="text-gray-600 mb-2">
        Explore student artwork and submit your own creations.
      </p>
      {user ? (
        <p className="text-sm text-gray-500 mb-6">You're signed in as <strong>{user.email}</strong>.</p>
      ) : (
        <p
          className="text-sm text-blue-600 underline cursor-pointer mb-6"
          onClick={() => navigate('/login')}
        >
          Sign in to submit your own art →
        </p>
      )}

      {/* Mosaic grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0">
        {artworks.map((art, index) => (
          <div
            key={index}
            className="relative cursor-pointer overflow-hidden group"
            onClick={() => navigate(`/artwork/${index}`)}
          >
            <img
              src={art.image}
              alt={art.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
              <h4 className="text-lg font-bold">{art.title}</h4>
              <p className="text-sm">By {art.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
