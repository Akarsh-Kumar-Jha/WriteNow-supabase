import { createContext, useEffect, useState } from "react"
import supabase from "../supabaseConnection"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", event)

        if (event === "INITIAL_SESSION") {
          setUser(session?.user ?? null)
          setLoading(false)
        }

        if (event === "SIGNED_IN") {
          setUser(session.user)
          setLoading(false)
        }

        if (event === "SIGNED_OUT") {
          setUser(null)
          setLoading(false)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}