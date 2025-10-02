import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/utils/auth'
import type { ApiResponse } from '@/types'

export async function POST() {
  try {
    await clearAuthCookie()
    
    return NextResponse.json({
      success: true,
      data: { message: 'Logged out successfully' }
    } as ApiResponse<{ message: string }>)
    
  } catch (error) {
    console.error('Logout error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Logout failed'
    } as ApiResponse, { status: 500 })
  }
}