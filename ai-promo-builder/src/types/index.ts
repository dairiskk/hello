// Base types (will be replaced with Prisma generated types after migration)
export enum Plan {
  FREE = 'FREE',
  PAID = 'PAID',
  ULTIMATE = 'ULTIMATE'
}

export enum PageStatus {
  DRAFT = 'DRAFT',
  GENERATING = 'GENERATING',
  READY = 'READY',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum EventType {
  VIEW = 'VIEW',
  CLICK = 'CLICK',
  CONVERSION = 'CONVERSION'
}

// Base database types
export interface User {
  id: string
  email: string
  passwordHash: string
  plan: Plan
  publishedVariantCount: number
  stripeCustomerId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface BrandKit {
  id: string
  projectId: string
  tokensBase: Record<string, unknown>
  tokensOverrides?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

export interface Page {
  id: string
  projectId: string
  pageSpecBase: Record<string, unknown>
  pageSpecOverrides?: Record<string, unknown>
  status: PageStatus
  baseSlug: string
  createdAt: Date
  updatedAt: Date
}

export interface Variant {
  id: string
  pageId: string
  locale: string
  region: string
  slug: string
  i18nBase: Record<string, unknown>
  i18nOverrides?: Record<string, unknown>
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

// Extended types with relations
export type UserWithProjects = User & {
  projects: Project[]
}

export type ProjectWithDetails = Project & {
  user: User
  brandKit?: BrandKit
  pages: PageWithVariants[]
}

export type PageWithVariants = Page & {
  project: Project
  variants: Variant[]
}

export type VariantWithAnalytics = Variant & {
  page: Page
  analytics: {
    views: number
    clicks: number
    ctr: number
  }
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

// Authentication types
export interface AuthUser {
  id: string
  email: string
  plan: Plan
  publishedVariantCount: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  confirmPassword: string
}

// Page Builder types
export interface PageSpec {
  layout: {
    template: string
    sections: Section[]
  }
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  content: {
    hero: HeroSection
    features?: FeatureSection[]
    cta: CTASection
    footer?: FooterSection
  }
}

export interface Section {
  id: string
  type: 'hero' | 'features' | 'cta' | 'footer' | 'custom'
  config: Record<string, unknown>
}

export interface HeroSection {
  headline: string
  subheadline: string
  ctaText: string
  ctaUrl: string
  backgroundImage?: string
}

export interface FeatureSection {
  title: string
  features: Feature[]
}

export interface Feature {
  title: string
  description: string
  icon?: string
}

export interface CTASection {
  headline: string
  description: string
  buttonText: string
  buttonUrl: string
}

export interface FooterSection {
  links: FooterLink[]
  copyright: string
}

export interface FooterLink {
  text: string
  url: string
}

// Brand Kit types
export interface BrandTokens {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  spacing: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: string
}

// AI Generation types
export interface AIGenerationRequest {
  casinoUrl?: string
  content?: Partial<PageSpec>
  brandPreferences?: Partial<BrandTokens>
}

export interface AIGenerationResponse {
  pageSpec: PageSpec
  brandKit: BrandTokens
}

// Analytics types
export interface AnalyticsData {
  views: number
  clicks: number
  ctr: number
  topReferrers: Array<{ referrer: string; count: number }>
  dailyStats: Array<{ date: string; views: number; clicks: number }>
}

// Subscription types
export interface SubscriptionLimits {
  maxPublishedPages: number
  customDomains: number
  analyticsRetentionDays: number
}

export const PLAN_LIMITS: Record<Plan, SubscriptionLimits> = {
  FREE: {
    maxPublishedPages: 1,
    customDomains: 0,
    analyticsRetentionDays: 30,
  },
  PAID: {
    maxPublishedPages: 20,
    customDomains: 1,
    analyticsRetentionDays: 180,
  },
  ULTIMATE: {
    maxPublishedPages: 50,
    customDomains: 3,
    analyticsRetentionDays: 365,
  },
}

// File upload types
export interface FileUploadConfig {
  maxSize: number
  allowedTypes: string[]
  uploadDir: string
}

export const FILE_UPLOAD_CONFIG: FileUploadConfig = {
  maxSize: 2 * 1024 * 1024, // 2MB
  allowedTypes: ['image/webp', 'image/jpeg', 'image/png'],
  uploadDir: '/uploads',
}