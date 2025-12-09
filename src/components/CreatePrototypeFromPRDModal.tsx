'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CreatePrototypeFromPRDModalProps {
  docSlug: string
  docTitle: string
  onClose: () => void
}

export default function CreatePrototypeFromPRDModal({ 
  docSlug, 
  docTitle, 
  onClose 
}: CreatePrototypeFromPRDModalProps) {
  const router = useRouter()
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  const handleCreate = async () => {
    setError('')
    setCreating(true)

    try {
      const response = await fetch('/api/generate-prototype', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docSlug,
          docTitle,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create prototype')
        return
      }

      // Navigate to the new prototype
      router.push(`/prototypes/${data.slug}`)
      onClose()
    } catch {
      setError('Failed to create prototype. Please try again.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Create Prototype?</h2>
          <p className="text-[var(--text-muted)] mb-6">
            Would you like to create an interactive prototype based on your PRD "{docTitle}"? 
            The prototype will use the Zip component library and be saved to your prototypes section.
          </p>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleCreate}
              disabled={creating}
              className="flex-1 px-6 py-3 bg-[var(--accent)] text-white font-medium rounded-lg hover:bg-[var(--accent-dim)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {creating ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Yes, Create Prototype'
              )}
            </button>
            <button
              onClick={onClose}
              disabled={creating}
              className="flex-1 px-6 py-3 border border-[var(--border)] rounded-lg hover:bg-[var(--surface)] transition-colors disabled:opacity-50"
            >
              No, Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

