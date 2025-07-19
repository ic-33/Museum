import React, { useEffect, useState } from 'react'
import { signInWithGoogle, signOut, getUser } from '../supabase/auth'
import supabase from '../supabase/client'

export default function AuthButton() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser().then(setUser)

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      subscription?.subscription?.unsubscribe?.()
    }
  }, [])

  return (
    <div className="mb-4">
      {user ? (
        <button
          onClick={signOut}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Sign Out ({user.email})
        </button>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Sign In with Google
        </button>
      )}
    </div>
  )
}
