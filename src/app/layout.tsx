import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import PasswordProtection from '@/components/PasswordProtection'
import './globals.css'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Zip Workspace',
  description: 'Product workspace for PRDs and prototypes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <PasswordProtection>
          <div className="min-h-screen flex">
            {/* Sidebar */}
            <nav className="w-64 border-r border-[var(--border)] p-6 flex flex-col gap-8 fixed h-screen bg-white shadow-sm">
              <Link href="/" className="text-xl font-semibold tracking-tight text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
                Workspace
              </Link>
              
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[var(--text-muted)] mb-3">Content</h3>
                  <div className="flex flex-col gap-1">
                    <Link 
                      href="/docs" 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors text-sm text-[var(--foreground)]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      PRDs
                    </Link>
                    <Link 
                      href="/prototypes" 
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors text-sm text-[var(--foreground)]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Prototypes
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* Main content */}
            <main className="flex-1 ml-64 bg-[var(--background)]">
              {children}
            </main>
          </div>
        </PasswordProtection>
      </body>
    </html>
  )
}

