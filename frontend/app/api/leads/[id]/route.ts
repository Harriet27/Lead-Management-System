import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    
    // Get authorization header
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Forward to backend API
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3002'
    const response = await fetch(`${backendUrl}/api/leads/${id}`, {
      headers: {
        'Authorization': authHeader
      }
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch lead' },
        { status: response.status }
      )
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching lead:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

