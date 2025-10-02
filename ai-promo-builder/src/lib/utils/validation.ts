import { z } from 'zod'

// Validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name too long'),
})

export const pageSpecSchema = z.object({
  layout: z.object({
    template: z.string(),
    sections: z.array(z.object({
      id: z.string(),
      type: z.enum(['hero', 'features', 'cta', 'footer', 'custom']),
      config: z.record(z.string(), z.unknown()),
    })),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
  }),
  content: z.object({
    hero: z.object({
      headline: z.string(),
      subheadline: z.string(),
      ctaText: z.string(),
      ctaUrl: z.string(),
      backgroundImage: z.string().optional(),
    }),
    features: z.array(z.object({
      title: z.string(),
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
      })),
    })).optional(),
    cta: z.object({
      headline: z.string(),
      description: z.string(),
      buttonText: z.string(),
      buttonUrl: z.string(),
    }),
    footer: z.object({
      links: z.array(z.object({
        text: z.string(),
        url: z.string(),
      })),
      copyright: z.string(),
    }).optional(),
  }),
})

export const brandTokensSchema = z.object({
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    background: z.string(),
    text: z.string(),
  }),
  fonts: z.object({
    heading: z.string(),
    body: z.string(),
  }),
  spacing: z.object({
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
    xl: z.string(),
  }),
  borderRadius: z.string(),
})

export const aiGenerationRequestSchema = z.object({
  casinoUrl: z.string().url().optional(),
  content: pageSpecSchema.partial().optional(),
  brandPreferences: brandTokensSchema.partial().optional(),
})

// Type inference from schemas
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type PageSpecInput = z.infer<typeof pageSpecSchema>
export type BrandTokensInput = z.infer<typeof brandTokensSchema>
export type AIGenerationRequestInput = z.infer<typeof aiGenerationRequestSchema>