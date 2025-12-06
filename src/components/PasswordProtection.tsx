'use client'

import { useState, useEffect } from 'react'

// Simple hash function for password comparison (not cryptographically secure, but obfuscates the password)
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString()
}

// Hash of "ZippyPrototypes" - computed once
const CORRECT_PASSWORD_HASH = simpleHash('ZippyPrototypes')
const AUTH_KEY = 'zip_workspace_authenticated'

export default function PasswordProtection({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem(AUTH_KEY)
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!password.trim()) {
      setError('Please enter a password')
      return
    }

    // Compare hashed password
    const inputHash = simpleHash(password)
    if (inputHash === CORRECT_PASSWORD_HASH) {
      localStorage.setItem(AUTH_KEY, 'true')
      setIsAuthenticated(true)
      setPassword('')
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-[var(--text-muted)]">Loading...</div>
      </div>
    )
  }

  // Show password form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
        <div className="w-full max-w-md">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--accent)]/10 mb-4">
                <svg 
                  className="w-8 h-8 text-[var(--accent)]" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                Protected Workspace
              </h1>
              <p className="text-[var(--text-muted)] text-sm">
                Please enter the password to access this site
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-[var(--foreground)] mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition-colors text-[var(--foreground)]"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-[var(--accent)] text-white font-medium rounded-lg hover:bg-[var(--accent-dim)] transition-colors"
              >
                Access Workspace
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Show content if authenticated
  return <>{children}</>
}

