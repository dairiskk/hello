import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, setAuthCookie } from '@/lib/utils/auth'
import { loginSchema } from '@/lib/utils/validation'
import type { ApiResponse, AuthUser } from '@/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = loginSchema.parse(body)
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      } as ApiResponse, { status: 401 })
    }
    
    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.passwordHash)
    
    if (!isValidPassword) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email or password'
      } as ApiResponse, { status: 401 })
    }
    
    // Create auth user object
    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      plan: user.plan,
      publishedVariantCount: user.publishedVariantCount,
    }
    
    // Set auth cookie
    await setAuthCookie(authUser)
    
    return NextResponse.json({
      success: true,
      data: { user: authUser }
    } as ApiResponse<{ user: AuthUser }>)
    
  } catch (error) {
    console.error('Login error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Login failed'
    } as ApiResponse, { status: 400 })
  }
}