import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, setAuthCookie } from '@/lib/utils/auth'
import { registerSchema } from '@/lib/utils/validation'
import type { ApiResponse, AuthUser } from '@/types'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = registerSchema.parse(body)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'User already exists with this email'
      } as ApiResponse, { status: 400 })
    }
    
    // Hash password and create user
    const passwordHash = await hashPassword(validatedData.password)
    
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash,
        plan: 'FREE',
        publishedVariantCount: 0,
      }
    })
    
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
    console.error('Registration error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Registration failed'
    } as ApiResponse, { status: 400 })
  }
}