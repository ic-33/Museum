import React from 'react';

const ArtModal = ({ selected, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6" onClick={e => e.stopPropagation()}>
      <img src={selected.image} alt={selected.title} className="w-full h-64 object-cover mb-4" />
      <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
      <p className="text-gray-700 mb-1"><strong>By:</strong> {selected.artist}</p>
      <p className="text-gray-600 mb-4">{selected.description}</p>
      <button onClick={onClose} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700">Close</button>
    </div>
  </div>
);

export default ArtModal;
