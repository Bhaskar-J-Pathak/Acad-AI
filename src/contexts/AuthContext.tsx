import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, phone?: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signInWithPhone: (phone: string, password: string) => Promise<any>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, phone?: string) => {
    const signUpData: any = {
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin
      }
    }
    
    // Add phone to metadata if provided
    if (phone) {
      signUpData.options.data = { phone }
    }
    
    const { data, error } = await supabase.auth.signUp(signUpData)
    return { data, error }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signInWithPhone = async (phone: string, password: string) => {
    // For now, we'll use email-based auth and store phone in profile
    // This is a fallback since phone auth requires additional setup
    return { 
      data: null, 
      error: { message: 'Phone authentication not yet configured. Please use email.' } 
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithPhone,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}