'use client'

import { useState } from 'react'
import Link from 'next/link'
import PRDGeneratorModal from './PRDGeneratorModal'

export default function DocsHeader() {
  const [showPRDModal, setShowPRDModal] = useState(false)

  return (
    <>
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">PRDs</h1>
          <p className="text-[var(--text-muted)]">
            PRDs, specs, and markdown notes
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPRDModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white font-medium rounded-lg hover:bg-[var(--accent-dim)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate PRD
          </button>
          <Link
            href="/docs/new"
            className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] font-medium rounded-lg hover:bg-[var(--surface)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New
          </Link>
        </div>
      </header>
      {showPRDModal && (
        <PRDGeneratorModal onClose={() => setShowPRDModal(false)} />
      )}
    </>
  )
}


