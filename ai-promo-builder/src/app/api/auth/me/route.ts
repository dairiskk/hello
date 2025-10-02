import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/utils/auth'
import type { ApiResponse, AuthUser } from '@/types'

export async function GET() {
  try {
    const user = await getAuthUser()
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Not authenticated'
      } as ApiResponse, { status: 401 })
    }
    
    return NextResponse.json({
      success: true,
      data: { user }
    } as ApiResponse<{ user: AuthUser }>)
    
  } catch (error) {
    console.error('Auth check error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Authentication check failed'
    } as ApiResponse, { status: 500 })
  }
}