import Link from 'next/link'

// Add your prototypes here - each entry creates a link on this page
const prototypes = [
  {
    slug: 'cash-advance',
    title: '💵 Cash Advance',
    description: 'Cash advance flow with eligibility, amount selection, and repayment confirmation',
  },
  {
    slug: 'button-demo',
    title: 'Button Demo',
    description: 'A simple button component showcase',
  },
  {
    slug: 'counter',
    title: 'Counter App',
    description: 'Interactive counter with state',
  },
]

export default function PrototypesPage() {
  return (
    <div className="p-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Prototypes</h1>
        <p className="text-[var(--text-muted)]">
          Interactive demos and components
        </p>
      </header>

      {prototypes.length === 0 ? (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-8 text-center">
          <p className="text-[var(--text-muted)] mb-4">No prototypes yet.</p>
          <p className="text-sm text-[var(--text-muted)]">
            Create folders in{' '}
            <code className="text-[var(--accent)]">src/app/prototypes/</code>{' '}
            with a <code className="text-[var(--accent)]">page.tsx</code> to add prototypes.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {prototypes.map((proto) => (
            <Link 
              key={proto.slug}
              href={`/prototypes/${proto.slug}`}
              className="block bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 hover:border-[var(--accent-dim)] transition-colors"
            >
              <h2 className="font-medium mb-1">{proto.title}</h2>
              {proto.description && (
                <p className="text-sm text-[var(--text-muted)]">{proto.description}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
