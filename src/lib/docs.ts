import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'content/docs')

export interface Doc {
  slug: string
  title: string
  description?: string
  content: string
  date?: string
}

export async function getDocs(): Promise<Doc[]> {
  // Create directory if it doesn't exist
  if (!fs.existsSync(docsDirectory)) {
    fs.mkdirSync(docsDirectory, { recursive: true })
    return []
  }

  const files = fs.readdirSync(docsDirectory).filter(file => file.endsWith('.md'))
  
  const docs = files.map(file => {
    const slug = file.replace(/\.md$/, '')
    const fullPath = path.join(docsDirectory, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      slug,
      title: data.title || slug,
      description: data.description,
      content,
      date: data.date,
    }
  })

  // Sort by date if available, otherwise by title
  return docs.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    return a.title.localeCompare(b.title)
  })
}

export async function getDoc(slug: string): Promise<Doc | null> {
  const fullPath = path.join(docsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    title: data.title || slug,
    description: data.description,
    content,
    date: data.date,
  }
}

