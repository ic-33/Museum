import React from 'react';

const ArtCard = ({ art, onClick }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer" onClick={onClick}>
    <img src={art.image} alt={art.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold">{art.title}</h3>
      <p className="text-gray-600">By {art.artist}</p>
    </div>
  </div>
);

export default ArtCard;
