import { z } from 'zod'

// Profile schema

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(80),
  headline: z.string().trim().min(1, "Professional headline is required").max(60),
  bio: z.string().trim().min(1, "Bio is required").max(600),
  location: z.string().default(""),
  specialties: z.array(z.string()).default([]),
});

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

export type ProfileFormData = z.infer<typeof profileSchema>;
export type SocialRowFormData = z.infer<typeof socialRowSchema>
export type CustomLinkFormData = z.infer<typeof customLinkSchema>
