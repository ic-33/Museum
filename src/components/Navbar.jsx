import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-3 mb-6">

      {/* <h1 className="text-2xl font-bold text-gray-800">🎨 LAC Digital Museum</h1> */}
      <div class="flex items-center space-x-5">
        <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette-icon lucide-palette"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">LAC Digital Museum</h1>
        </div>
      </div>
      <div className="space-x-6">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/gallery"
          className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200"
        >
          Gallery
        </Link>
        <Link
          to="/submit"
          className="text-gray-700 hover:text-blue-500 font-medium transition-colors duration-200"
        >
          Submit Art
        </Link>
      </div>
    </nav>
  )
}
