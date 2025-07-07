import { useParams } from 'react-router-dom'

export default function ArtworkDetail() {
  const { id } = useParams()

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold mb-4">Artwork Detail</h2>
      <p className="text-gray-600">Details for artwork with ID: {id}</p>
    </div>
  )
}
