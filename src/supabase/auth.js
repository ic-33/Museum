import supabase from './client'

// Google Sign In
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
  if (error) console.error('Google Sign-in error:', error)
}

// Email/Password Sign Up
export const signUpWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) console.error('Sign-up error:', error)
  return { data, error }
}

// Email/Password Sign In
export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) console.error('Sign-in error:', error)
  return { data, error }
}

// Sign Out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.error('Sign-out error:', error)
}

// Get Current User
export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}