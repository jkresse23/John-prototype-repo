import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDoc, getDocs } from '@/lib/docs'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const docs = await getDocs()
  return docs.map((doc) => ({ slug: doc.slug }))
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params
  const doc = await getDoc(slug)

  if (!doc) {
    notFound()
  }

  return (
    <div className="p-8 max-w-4xl">
      <nav className="mb-6">
        <Link 
          href="/docs" 
          className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
        >
          ← Back to PRDs
        </Link>
      </nav>
      
      <article className="markdown-body">
        <MarkdownRenderer content={doc.content} />
      </article>
    </div>
  )
}

