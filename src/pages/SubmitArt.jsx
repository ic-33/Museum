import React from 'react'
import SubmitArt from '../components/UploadArt' // adjust path if needed

export default function UploadArt() {
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Submit Your Artwork</h2>
      <p className="mb-6 text-center text-gray-600">
        Use the form below to upload your artwork. Only images are accepted.
      </p>
      <SubmitArt />
    </div>
  )
}
