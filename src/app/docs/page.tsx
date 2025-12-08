import Link from 'next/link'
import { getDocs } from '@/lib/docs'
import DocsHeader from '@/components/DocsHeader'

export default async function DocsPage() {
  const docs = await getDocs()

  return (
    <div className="p-8 max-w-4xl">
      <DocsHeader />

      {docs.length === 0 ? (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 text-center">
          <p className="text-[var(--text-muted)] mb-4">No documents yet.</p>
          <Link 
            href="/docs/new"
            className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create your first document
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {docs.map((doc) => (
            <Link 
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="block bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent-dim)] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-medium mb-1">{doc.title}</h2>
                  {doc.description && (
                    <p className="text-sm text-[var(--text-muted)]">{doc.description}</p>
                  )}
                </div>
                {doc.date && (
                  <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                    {new Date(doc.date).toLocaleDateString()}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

