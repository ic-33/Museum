import React, { useState } from 'react'
import supabase from '../supabase/client'
import { getUser } from '../supabase/auth'  // Make sure you have this helper

export default function UploadArt() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return alert('Please select a file')

    setLoading(true)

    try {
      const user = await getUser()
      if (!user) {
        alert('You must be logged in to upload artwork.')
        setLoading(false)
        return
      }

      // Unique file path in storage
      const filePath = `${user.id}/${Date.now()}-${file.name}`

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('artworks')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        alert('Failed to upload image.')
        setLoading(false)
        return
      }

      // Get public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('artworks')
        .getPublicUrl(filePath)

      // Insert artwork metadata including artist (user id)
      const { error: dbError } = await supabase
        .from('artworks')
        .insert([
          {
            title,
            description,
            image_url: publicUrl,
            artist: user.id, // <-- Link artwork to logged-in user!
          },
        ])

      if (dbError) {
        console.error('Database insert error:', dbError)
        alert('Failed to save artwork info.')
      } else {
        alert('Artwork uploaded successfully!')
        setTitle('')
        setDescription('')
        setFile(null)
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      alert('An unexpected error occurred.')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleUpload} className="p-4 border rounded max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Your Artwork</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="block mb-2"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  )
}
