import React, { useState } from 'react'
import supabase from '../supabase/client'
import { getUser } from '../supabase/auth'

export default function SubmitArt() {
  const [title, setTitle] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!title || !imageFile) {
      setError('Please provide a title and select an image.')
      return
    }

    setUploading(true)

    try {
      const user = await getUser()
      if (!user) {
        setError('You must be logged in to submit artwork.')
        setUploading(false)
        return
      }

      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`
      const filePath = fileName

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('artworks')
        .upload(filePath, imageFile)

      if (uploadError) {
        setError('Upload failed: ' + uploadError.message)
        setUploading(false)
        return
      }

      // Get public URL
      const { data: publicUrlData, error: publicUrlError } = await supabase
        .storage
        .from('artworks')
        .getPublicUrl(filePath)

      if (publicUrlError || !publicUrlData?.publicUrl) {
        setError('Failed to retrieve image URL.')
        setUploading(false)
        return
      }

      // Insert metadata into artworks table with user_id
      const { error: insertError } = await supabase
        .from('artworks')
        .insert({
          title,
          artist: user.email,
          image_url: publicUrlData.publicUrl,
          user_id: user.id, // Linking to the user for RLS
          created_at: new Date().toISOString()
        })

      if (insertError) {
        setError('Failed to save artwork metadata: ' + insertError.message)
      } else {
        setMessage('Artwork submitted successfully!')
        setTitle('')
        setImageFile(null)
      }
    } catch (err) {
      setError('Unexpected error: ' + err.message)
    }

    setUploading(false)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Submit Your Artwork</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Artwork title"
          required
        />

        <label className="block mb-2 font-medium">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button
          type="submit"
          disabled={uploading}
          className={`mt-6 w-full py-2 rounded text-white ${uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {uploading ? 'Uploading...' : 'Submit Artwork'}
        </button>
      </form>
    </div>
  )
}
