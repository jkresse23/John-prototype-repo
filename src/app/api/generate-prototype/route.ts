import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getDoc } from '@/lib/docs'

const prototypesDirectory = path.join(process.cwd(), 'src/app/prototypes')
const prototypesListPath = path.join(process.cwd(), 'src/app/prototypes/page.tsx')

async function generatePrototypeCode(prdContent: string, docTitle: string): Promise<string> {
  const openaiApiKey = process.env.OPENAI_API_KEY

  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set.')
  }

  // Read the component library README to provide context
  const componentLibraryPath = path.join(process.cwd(), 'src/components/zip/README.md')
  const componentLibraryDocs = fs.existsSync(componentLibraryPath)
    ? fs.readFileSync(componentLibraryPath, 'utf8')
    : ''

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert React developer specializing in creating interactive prototypes using the Zip design system component library.

Your task is to generate a complete, functional React component that implements a prototype based on a PRD.

IMPORTANT GUIDELINES:
- Use ONLY components from the Zip component library: Button, Card, Header, SpendingPowerCard, PaymentPlanCard, PaymentMethodCard, BottomNav
- Import components like: import { Button, Card, Header } from '@/components/zip'
- Use the Zip color scheme: bg-[#F5F3FF] for main background, white cards, purple (#8660FF) for accents
- Create an interactive, realistic prototype that demonstrates the key features described in the PRD
- Use 'use client' directive at the top
- Include state management with useState for interactivity
- Make it visually appealing and match the Zip design system
- Keep it focused on the MVP/core features from the PRD
- Use realistic mock data
- Make buttons and interactive elements functional

Component Library Documentation:
${componentLibraryDocs}

Generate a complete, production-ready React component file.`,
          },
          {
            role: 'user',
            content: `Generate a React prototype component based on this PRD:

**Title:** ${docTitle}

**PRD Content:**
${prdContent}

Create a complete, interactive prototype that demonstrates the key features. Use the Zip component library and follow the design system guidelines. Make it realistic and functional.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 6000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenAI API error:', errorData)
      
      // Try with gpt-3.5-turbo as fallback
      if (errorData.error?.code === 'model_not_found' || errorData.error?.message?.includes('gpt-4o')) {
        return await generatePrototypeCodeFallback(prdContent, docTitle, componentLibraryDocs, openaiApiKey)
      }
      
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const generatedCode = data.choices[0]?.message?.content

    if (!generatedCode) {
      throw new Error('No code generated from OpenAI')
    }

    // Extract code from markdown code blocks if present
    const codeBlockMatch = generatedCode.match(/```(?:tsx|ts|jsx|js)?\n([\s\S]*?)```/)
    if (codeBlockMatch) {
      return codeBlockMatch[1].trim()
    }

    return generatedCode.trim()
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    throw error
  }
}

async function generatePrototypeCodeFallback(
  prdContent: string, 
  docTitle: string, 
  componentLibraryDocs: string,
  apiKey: string
): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Generate a React prototype using Zip components: Button, Card, Header, SpendingPowerCard. Use 'use client', useState, and Zip design system.`,
        },
        {
          role: 'user',
          content: `Create a prototype for: ${docTitle}\n\nPRD: ${prdContent.substring(0, 2000)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 3000,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`)
  }

  const data = await response.json()
  const code = data.choices[0]?.message?.content || ''
  
  const codeBlockMatch = code.match(/```(?:tsx|ts|jsx|js)?\n([\s\S]*?)```/)
  return codeBlockMatch ? codeBlockMatch[1].trim() : code.trim()
}

function addPrototypeToList(slug: string, title: string, description: string) {
  // Read current prototypes list
  let prototypesListContent = fs.readFileSync(prototypesListPath, 'utf8')
  
  // Escape single quotes in title and description
  const escapedTitle = title.replace(/'/g, "\\'")
  const escapedDescription = description.replace(/'/g, "\\'")
  
  // Create new prototype entry
  const newPrototype = `  {
    slug: '${slug}',
    title: '${escapedTitle}',
    description: '${escapedDescription}',
  },`

  // Find the prototypes array and add the new entry before the closing bracket
  const arrayMatch = prototypesListContent.match(/(const prototypes = \[)([\s\S]*?)(\])/)
  
  if (!arrayMatch) {
    throw new Error('Could not find prototypes array in page.tsx')
  }

  const arrayStart = arrayMatch[1]
  const existingContent = arrayMatch[2]
  const arrayEnd = arrayMatch[3]
  
  // Add new prototype entry (with proper spacing)
  const updatedContent = existingContent.trim() 
    ? existingContent.trim() + '\n' + newPrototype + '\n'
    : newPrototype + '\n'

  // Replace the array
  prototypesListContent = prototypesListContent.replace(
    /const prototypes = \[[\s\S]*?\]/,
    arrayStart + updatedContent + arrayEnd
  )

  // Write back to file
  fs.writeFileSync(prototypesListPath, prototypesListContent, 'utf8')
}

export async function POST(request: NextRequest) {
  try {
    const { docSlug, docTitle } = await request.json()

    if (!docSlug || !docTitle) {
      return NextResponse.json(
        { error: 'Document slug and title are required' },
        { status: 400 }
      )
    }

    // Get the PRD content
    const doc = await getDoc(docSlug)
    if (!doc) {
      return NextResponse.json(
        { error: 'Document not found' },
        { status: 404 }
      )
    }

    // Generate prototype code
    let prototypeCode: string
    try {
      prototypeCode = await generatePrototypeCode(doc.content, docTitle)
    } catch (error: any) {
      if (error.message?.includes('OPENAI_API_KEY')) {
        return NextResponse.json(
          { 
            error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file.',
            requiresApiKey: true
          },
          { status: 500 }
        )
      }
      
      console.error('Prototype generation error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to generate prototype. Please check your OpenAI API key and try again.' },
        { status: 500 }
      )
    }

    // Sanitize slug for prototype
    const sanitizedSlug = docSlug
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    if (!sanitizedSlug) {
      return NextResponse.json(
        { error: 'Invalid document slug' },
        { status: 400 }
      )
    }

    // Create prototype directory
    const prototypeDir = path.join(prototypesDirectory, sanitizedSlug)
    if (!fs.existsSync(prototypeDir)) {
      fs.mkdirSync(prototypeDir, { recursive: true })
    }

    // Check if prototype already exists
    const prototypePagePath = path.join(prototypeDir, 'page.tsx')
    if (fs.existsSync(prototypePagePath)) {
      // Append timestamp to make it unique
      const timestamp = Date.now()
      const uniqueSlug = `${sanitizedSlug}-${timestamp}`
      const uniqueDir = path.join(prototypesDirectory, uniqueSlug)
      fs.mkdirSync(uniqueDir, { recursive: true })
      fs.writeFileSync(path.join(uniqueDir, 'page.tsx'), prototypeCode, 'utf8')
      addPrototypeToList(uniqueSlug, docTitle, `Prototype generated from ${docTitle}`)
      
      return NextResponse.json({
        success: true,
        slug: uniqueSlug,
      })
    }

    // Ensure the code starts with 'use client' if it doesn't
    if (!prototypeCode.includes("'use client'") && !prototypeCode.includes('"use client"')) {
      prototypeCode = "'use client'\n\n" + prototypeCode
    }

    // Write the prototype file
    fs.writeFileSync(prototypePagePath, prototypeCode, 'utf8')

    // Add to prototypes list
    addPrototypeToList(sanitizedSlug, docTitle, `Prototype generated from ${docTitle}`)

    return NextResponse.json({
      success: true,
      slug: sanitizedSlug,
    })
  } catch (error) {
    console.error('Error generating prototype:', error)
    return NextResponse.json(
      { error: 'Failed to generate prototype' },
      { status: 500 }
    )
  }
}

