'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewDocPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const generateMarkdown = () => {
    const frontmatter = `---
title: "${title}"
${description ? `description: "${description}"` : ''}
date: "${new Date().toISOString().split('T')[0]}"
---

`
    return frontmatter + content
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    
    if (!content.trim()) {
      setError('Content is required')
      return
    }

    setSaving(true)
    
    try {
      const response = await fetch('/api/docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: title,
          content: generateMarkdown(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to save document')
        return
      }

      router.push(`/docs/${data.slug}`)
    } catch {
      setError('Failed to save document')
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')

    if (!file.name.endsWith('.md')) {
      setError('Please upload a markdown (.md) file')
      return
    }

    try {
      const text = await file.text()
      
      // Try to extract frontmatter
      const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1]
        const body = frontmatterMatch[2]
        
        // Extract title from frontmatter
        const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/)
        if (titleMatch) setTitle(titleMatch[1])
        
        // Extract description from frontmatter
        const descMatch = frontmatter.match(/description:\s*["']?([^"'\n]+)["']?/)
        if (descMatch) setDescription(descMatch[1])
        
        setContent(body.trim())
      } else {
        // No frontmatter, use filename as title
        setTitle(file.name.replace('.md', ''))
        setContent(text)
      }
    } catch {
      setError('Failed to read file')
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <nav className="mb-6">
        <Link 
          href="/docs" 
          className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        >
          ← Back to Documents
        </Link>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">New Document</h1>
        <p className="text-[var(--text-muted)]">
          Create a new markdown document or upload an existing one
        </p>
      </header>

      {/* Upload Section */}
      <div className="mb-8">
        <input
          ref={fileInputRef}
          type="file"
          accept=".md"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-[var(--border)] rounded-xl cursor-pointer hover:border-[var(--accent-dim)] transition-colors"
        >
          <svg className="w-6 h-6 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-[var(--text-muted)]">
            Click to upload a <code className="text-[var(--accent)]">.md</code> file
          </span>
        </label>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 border-t border-[var(--border)]"></div>
        <span className="text-sm text-[var(--text-muted)]">or write directly</span>
        <div className="flex-1 border-t border-[var(--border)]"></div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Document"
            className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description <span className="text-[var(--text-muted)]">(optional)</span>
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief description of this document"
            className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content <span className="text-red-400">*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your markdown content here..."
            rows={16}
            className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg focus:outline-none focus:border-[var(--accent)] transition-colors font-mono text-sm resize-y"
          />
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            Supports full markdown: headings, lists, code blocks, tables, and more.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[var(--accent)] text-black font-medium rounded-lg hover:bg-[var(--accent-dim)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Document'}
          </button>
          <Link
            href="/docs"
            className="px-6 py-3 border border-[var(--border)] rounded-lg hover:bg-[var(--surface)] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

