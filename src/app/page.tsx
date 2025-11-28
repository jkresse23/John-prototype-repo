import Link from 'next/link'
import { getDocs } from '@/lib/docs'

export default async function Home() {
  const docs = await getDocs()
  const recentDocs = docs.slice(0, 3)

  return (
    <div className="p-8 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-3">Workspace</h1>
        <p className="text-[var(--text-muted)] text-lg">
          Your personal space for documents and prototypes
        </p>
      </header>

      <div className="grid gap-10">
        {/* Recent Documents */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Documents</h2>
            <Link href="/docs" className="text-sm text-[var(--accent)] hover:underline">
              View all →
            </Link>
          </div>
          
          {recentDocs.length === 0 ? (
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 text-center text-[var(--text-muted)]">
              No documents yet. Add markdown files to the <code className="text-[var(--accent)]">content/docs</code> directory.
            </div>
          ) : (
            <div className="grid gap-3">
              {recentDocs.map((doc) => (
                <Link 
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className="block bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent-dim)] transition-colors"
                >
                  <h3 className="font-medium mb-1">{doc.title}</h3>
                  {doc.description && (
                    <p className="text-sm text-[var(--text-muted)]">{doc.description}</p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Prototypes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Prototypes</h2>
            <Link href="/prototypes" className="text-sm text-[var(--accent)] hover:underline">
              View all →
            </Link>
          </div>
          
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
            <p className="text-[var(--text-muted)] mb-3">Interactive demos and components you can share with colleagues.</p>
            <Link href="/prototypes" className="text-[var(--accent)] hover:underline">
              Browse prototypes →
            </Link>
          </div>
        </section>

        {/* How to Use */}
        <section className="border-t border-[var(--border)] pt-10">
          <h2 className="text-xl font-semibold mb-6">How to Use This Workspace</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Documents Instructions */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="font-semibold">Adding Documents</h3>
              </div>
              <ol className="text-sm text-[var(--text-muted)] space-y-2 list-decimal list-inside">
                <li>Create a <code className="text-[var(--accent)]">.md</code> file in <code className="text-[var(--accent)]">content/docs/</code></li>
                <li>Add frontmatter at the top for metadata:</li>
              </ol>
              <pre className="mt-3 p-3 bg-[#0d0d0d] rounded-lg text-xs overflow-x-auto">
{`---
title: "My Document"
description: "Brief description"
date: "2024-11-28"
---

# Your content here`}
              </pre>
            </div>

            {/* Prototypes Instructions */}
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <h3 className="font-semibold">Adding Prototypes</h3>
              </div>
              <ol className="text-sm text-[var(--text-muted)] space-y-2 list-decimal list-inside">
                <li>Create a folder in <code className="text-[var(--accent)]">src/app/prototypes/</code></li>
                <li>Add a <code className="text-[var(--accent)]">page.tsx</code> with your component</li>
                <li>Register it in <code className="text-[var(--accent)]">src/app/prototypes/page.tsx</code></li>
              </ol>
              <pre className="mt-3 p-3 bg-[#0d0d0d] rounded-lg text-xs overflow-x-auto">
{`// src/app/prototypes/my-demo/page.tsx
export default function MyDemo() {
  return <div>Your prototype</div>
}`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
