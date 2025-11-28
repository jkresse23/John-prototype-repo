import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const docsDirectory = path.join(process.cwd(), 'content/docs')

export async function POST(request: NextRequest) {
  try {
    const { filename, content } = await request.json()
    
    if (!filename || !content) {
      return NextResponse.json(
        { error: 'Filename and content are required' },
        { status: 400 }
      )
    }

    // Sanitize filename - only allow alphanumeric, hyphens, underscores
    const sanitizedFilename = filename
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    
    if (!sanitizedFilename) {
      return NextResponse.json(
        { error: 'Invalid filename' },
        { status: 400 }
      )
    }

    const filePath = path.join(docsDirectory, `${sanitizedFilename}.md`)
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'A document with this name already exists' },
        { status: 409 }
      )
    }

    // Ensure directory exists
    if (!fs.existsSync(docsDirectory)) {
      fs.mkdirSync(docsDirectory, { recursive: true })
    }

    // Write the file
    fs.writeFileSync(filePath, content, 'utf8')

    return NextResponse.json({ 
      success: true, 
      slug: sanitizedFilename 
    })
  } catch (error) {
    console.error('Error saving document:', error)
    return NextResponse.json(
      { error: 'Failed to save document' },
      { status: 500 }
    )
  }
}

