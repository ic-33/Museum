import React, { useEffect, useState } from 'react'
import supabase from '../supabase/client'

export default function AdminPanel() {
  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    fetchArtworks()
  }, [])

  const fetchArtworks = async () => {
    const { data, error } = await supabase.from('artworks').select('*')
    if (error) console.error('Fetch error:', error)
    else setArtworks(data)
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('artworks').delete().eq('id', id)
    if (error) console.error('Delete error:', error)
    else fetchArtworks()
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul>
        {artworks.map((art) => (
          <li key={art.id} className="mb-2 flex justify-between">
            <span>{art.title}</span>
            <button
              onClick={() => handleDelete(art.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
