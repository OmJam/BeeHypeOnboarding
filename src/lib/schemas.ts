import { z } from 'zod'

// Profile schema
export const profileSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name must be less than 80 characters'),
  headline: z.string()
    .min(10, 'Headline must be at least 10 characters')
    .max(60, 'Headline must be less than 60 characters'),
  bio: z.string()
    .min(50, 'Bio must be at least 50 characters')
    .max(600, 'Bio must be less than 600 characters'),
  location: z.string().optional(),
  specialties: z.array(z.string())
    .min(1, 'Please select at least one specialty')
})

// Social link schema
export const socialRowSchema = z.object({
  platform: z.string().min(1, 'Please select a platform'),
  username: z.string()
    .min(2, 'Username must be at least 2 characters')
    .max(30, 'Username must be less than 30 characters'),
  url: z.string().url('Please enter a valid URL'),
  verified: z.boolean()
})

// Custom link schema
export const customLinkSchema = z.object({
  name: z.string()
    .min(2, 'Link name must be at least 2 characters')
    .max(30, 'Link name must be less than 30 characters'),
  url: z.string().url('Please enter a valid URL')
})

// Step validation schemas
export const stepValidationSchemas = {
  welcome: z.object({}), // No validation needed
  gmail: z.object({}), // No validation needed
  profile: profileSchema,
  specialties: z.object({
    specialties: z.array(z.string()).min(1, 'Please select at least one specialty')
  }),
  socials: z.object({
    socials: z.array(socialRowSchema).optional()
  }),
  links: z.object({
    links: z.array(customLinkSchema).optional()
  }),
  intro: z.object({}) // No validation needed
}

export type ProfileFormData = z.infer<typeof profileSchema>
export type SocialRowFormData = z.infer<typeof socialRowSchema>
export type CustomLinkFormData = z.infer<typeof customLinkSchema>
