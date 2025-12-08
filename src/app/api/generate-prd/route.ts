import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const docsDirectory = path.join(process.cwd(), 'content/docs')
const prdInstructionsPath = path.join(process.cwd(), 'agents/prd.md')

async function generatePRD(projectTitle: string, projectNotes: string): Promise<string> {
  // Read PRD instructions
  const prdInstructions = fs.readFileSync(prdInstructionsPath, 'utf8')

  // Check if OpenAI API key is available
  const openaiApiKey = process.env.OPENAI_API_KEY

  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set. Please add it to your .env.local file.')
  }

  try {
    // Use OpenAI to generate the PRD with an improved prompt
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o', // Using gpt-4o for better quality, fallback to gpt-3.5-turbo if needed
        messages: [
          {
            role: 'system',
            content: `You are an expert product manager with years of experience writing comprehensive Product Requirements Documents (PRDs). 

Your task is to write a complete, detailed PRD following these exact instructions:

${prdInstructions}

IMPORTANT GUIDELINES:
- Write a FULL, COMPLETE PRD - do not leave placeholders or "to be completed" sections
- Use the project notes provided to infer realistic details and fill in all sections
- Be specific and detailed in every section
- Make reasonable assumptions based on the project notes when specific data isn't provided
- Write as if you have full context about the project
- Use professional product management language
- Include specific examples, metrics, and details throughout`,
          },
          {
            role: 'user',
            content: `Write a complete, comprehensive PRD for this project:

**Project Title:** ${projectTitle}

**Project Notes:**
${projectNotes}

Please generate a FULL PRD that includes:
1. A complete Problem Definition section with specific problem statement, context, validation evidence, and goals
2. A complete Solution section with UX flows, solution options, phases, and effort estimate
3. A complete Requirements section with specific, testable functional requirements in table format

Do NOT include placeholders or "to be completed" text. Write a complete, professional PRD that could be used immediately by a development team. Use the project notes to infer realistic details and make reasonable assumptions where needed.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 8000, // Increased for longer, more complete PRDs
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenAI API error:', errorData)
      
      // Try with gpt-3.5-turbo as fallback
      if (errorData.error?.code === 'model_not_found' || errorData.error?.message?.includes('gpt-4o')) {
        console.log('Falling back to gpt-3.5-turbo')
        return await generatePRDFallback(projectTitle, projectNotes, prdInstructions, openaiApiKey)
      }
      
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const generatedContent = data.choices[0]?.message?.content

    if (!generatedContent) {
      throw new Error('No content generated from OpenAI')
    }

    return generatedContent
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    throw error
  }
}

async function generatePRDFallback(projectTitle: string, projectNotes: string, prdInstructions: string, apiKey: string): Promise<string> {
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
          content: `You are an expert product manager. Write a complete, detailed PRD following these instructions:\n\n${prdInstructions}\n\nWrite a FULL PRD - no placeholders or "to be completed" sections.`,
        },
        {
          role: 'user',
          content: `Write a complete PRD for:\n\nTitle: ${projectTitle}\n\nNotes: ${projectNotes}\n\nGenerate a full, complete PRD with all sections filled in. Use the notes to infer realistic details.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || ''
}

function generateTemplatePRD(projectTitle: string, projectNotes: string, instructions: string): string {
  // Generate a structured PRD template based on the instructions
  const date = new Date().toISOString().split('T')[0]
  
  return `# ${projectTitle}

## PART 1: PROBLEM DEFINITION

### 🤔 Problem

[Based on your notes: ${projectNotes}]

*To be completed: State the problem clearly and concisely in 1-2 sentences. Identify the specific customer segment affected. Focus on the user's pain point, not the solution.*

### Context

*To be completed: Provide background a new reader would need to understand the problem. Describe how the product currently works in this area. Include relevant facts, screenshots references, or user flows. Explain any technical or business context that matters.*

**Initial Notes:**
${projectNotes.split('\n').map(line => `- ${line}`).join('\n')}

### 📊 Problem Validation

*To be completed: Include evidence that proves this is a real problem. Reference qualitative data: user interviews, support tickets, feedback. Reference quantitative data: metrics, conversion rates, usage data.*

### 🎯 Goals

*To be completed: Define clear, measurable success criteria. Tie goals to company OKRs or strategic pillars. Include target metrics (e.g., "Increase X by Y%"). Link to any business impact forecasting or sizing.*

---

## PART 2: SOLUTION

**Note:** Solutioning should happen AFTER Part 1 is complete. Design must be included in the conversation at this stage.

### 🎨 UX Flows or Wireframes

*To be completed: Describe the high-level user flow. Reference or describe wireframes/mockups. Show the happy path and key interactions. Include rough visual descriptions if no designs exist yet.*

### 🎯 Solution Options / Summary / MVP

*To be completed: Describe the proposed solution with structure and bullet points. Do NOT write formal requirements here—keep it conceptual. List the major chunks of work. Document alternative solutions that were considered and why they were rejected. Clearly define what is MVP vs. what can come later.*

### 🏆 Additional Phases / Breakdown

*To be completed: Break future work into logical phases. Phase 1 = MVP, Phase 2 = enhancements, etc. Keep it high-level—details go in requirements.*

### 👕 T-Shirt Estimate

*To be completed: Provide effort estimate: **Small**, **Medium**, **Large**, or **XL** (Small = days, Medium = 1-2 weeks, Large = 2-4 weeks, XL = 4+ weeks)*

---

## PART 3: REQUIREMENTS

### 📋 Functional Requirements

| # | Requirement | Priority | Comments |
|---|-------------|----------|----------|
| 1 | *To be completed* | P0/P1/P2 | *Any notes* |

**Priority Definitions:**
- **P0** = Must have for launch (MVP)
- **P1** = Should have, high value
- **P2** = Nice to have, future consideration

---

*This PRD was generated from initial project notes. Please review and complete all sections following the PRD writing guidelines.*`
}

export async function POST(request: NextRequest) {
  try {
    const { projectTitle, projectNotes } = await request.json()

    if (!projectTitle || !projectNotes) {
      return NextResponse.json(
        { error: 'Project title and notes are required' },
        { status: 400 }
      )
    }

    // Generate the PRD
    let prdContent: string
    try {
      prdContent = await generatePRD(projectTitle.trim(), projectNotes.trim())
    } catch (error: any) {
      // If API key is missing, return helpful error
      if (error.message?.includes('OPENAI_API_KEY')) {
        return NextResponse.json(
          { 
            error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file. See the README for setup instructions.',
            requiresApiKey: true
          },
          { status: 500 }
        )
      }
      
      // For other errors, return the error message
      console.error('PRD generation error:', error)
      return NextResponse.json(
        { error: error.message || 'Failed to generate PRD. Please check your OpenAI API key and try again.' },
        { status: 500 }
      )
    }

    // Sanitize filename
    const sanitizedFilename = projectTitle
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    if (!sanitizedFilename) {
      return NextResponse.json(
        { error: 'Invalid project title' },
        { status: 400 }
      )
    }

    // Generate markdown with frontmatter
    const date = new Date().toISOString().split('T')[0]
    const markdownContent = `---
title: "${projectTitle}"
description: "Generated PRD"
date: "${date}"
---

${prdContent}`

    const filePath = path.join(docsDirectory, `${sanitizedFilename}.md`)

    // Check if file already exists
    if (fs.existsSync(filePath)) {
      // Append timestamp to make it unique
      const timestamp = Date.now()
      const uniqueFilename = `${sanitizedFilename}-${timestamp}`
      const uniqueFilePath = path.join(docsDirectory, `${uniqueFilename}.md`)
      fs.writeFileSync(uniqueFilePath, markdownContent, 'utf8')
      return NextResponse.json({
        success: true,
        slug: uniqueFilename,
      })
    }

    // Ensure directory exists
    if (!fs.existsSync(docsDirectory)) {
      fs.mkdirSync(docsDirectory, { recursive: true })
    }

    // Write the file
    fs.writeFileSync(filePath, markdownContent, 'utf8')

    return NextResponse.json({
      success: true,
      slug: sanitizedFilename,
    })
  } catch (error) {
    console.error('Error generating PRD:', error)
    return NextResponse.json(
      { error: 'Failed to generate PRD' },
      { status: 500 }
    )
  }
}

