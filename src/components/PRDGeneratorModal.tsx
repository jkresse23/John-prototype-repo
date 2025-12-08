'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PRDGeneratorModalProps {
  onClose: () => void
}

export default function PRDGeneratorModal({ onClose }: PRDGeneratorModalProps) {
  const router = useRouter()
  const [projectTitle, setProjectTitle] = useState('')
  const [projectNotes, setProjectNotes] = useState('')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!projectTitle.trim()) {
      setError('Project title is required')
      return
    }

    if (!projectNotes.trim()) {
      setError('Project notes are required')
      return
    }

    setGenerating(true)

    try {
      const response = await fetch('/api/generate-prd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectTitle: projectTitle.trim(),
          projectNotes: projectNotes.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        let errorMessage = data.error || 'Failed to generate PRD'
        
        // Provide helpful message if API key is missing
        if (data.requiresApiKey) {
          errorMessage = `${errorMessage}\n\nTo enable AI-powered PRD generation:\n1. Create a .env.local file in the project root\n2. Add: OPENAI_API_KEY=your_api_key_here\n3. Restart the development server`
        }
        
        setError(errorMessage)
        return
      }

      // Navigate to the generated PRD
      router.push(`/docs/${data.slug}`)
      onClose()
    } catch {
      setError('Failed to generate PRD. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Generate PRD</h2>
            <button
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
              disabled={generating}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="projectTitle" className="block text-sm font-medium mb-2">
                Project Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="projectTitle"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="e.g., User Dashboard Redesign"
                className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition-colors"
                disabled={generating}
              />
            </div>

            <div>
              <label htmlFor="projectNotes" className="block text-sm font-medium mb-2">
                Project Notes <span className="text-red-400">*</span>
              </label>
              <textarea
                id="projectNotes"
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                placeholder="Describe your project idea, the problem you're solving, target users, key features, or any other relevant information..."
                rows={8}
                className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition-colors resize-y"
                disabled={generating}
              />
              <p className="mt-2 text-xs text-[var(--text-muted)]">
                Provide as much context as possible. The more details you include, the better the generated PRD will be.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={generating}
                className="px-6 py-3 bg-[var(--accent)] text-white font-medium rounded-lg hover:bg-[var(--accent-dim)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {generating ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating PRD...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate PRD
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={generating}
                className="px-6 py-3 border border-[var(--border)] rounded-lg hover:bg-[var(--surface)] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

