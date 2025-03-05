import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { message: 'Name, email, and phone are required fields' },
        { status: 400 }
      )
    }
    
    // Forward to backend API
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000'
    const response = await fetch(`${backendUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`
      },
      body: JSON.stringify(body)
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to submit lead' },
        { status: response.status }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error submitting lead:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Forward to backend API
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5000'
    const response = await fetch(`${backendUrl}/api/leads`, {
      headers: {
        'Authorization': authHeader
      }
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch leads' },
        { status: response.status }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

