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
export const socialLinkSchema = z.object({
  id: z.string(),
  platform: z.enum(["instagram","tiktok","youtube","twitter","facebook","linkedin","pinterest","twitch","other"]),
  username: z.string().trim().optional().default(""),
  url: z.string().trim().optional().default("")
    .refine(v => v === "" || /^https?:\/\//i.test(v), "Enter a valid URL (http/https)"),
}).refine(v => !!(v.username?.trim() || v.url?.trim()), {
  message: "Add a username or a profile URL.", path: ["url"]
});

// Custom link schema
export const customLinkSchema = z.object({
  id: z.string(),
  label: z.string().trim().min(1, "Link name is required"),
  url: z.string().trim().min(1, "URL is required").url("Enter a valid URL"),
});

// Step validation schemas
export const stepValidationSchemas = {
  welcome: z.object({}), // No validation needed
  gmail: z.object({}), // No validation needed
  profile: profileSchema,
  specialties: z.object({
    specialties: z.array(z.string()).min(1, 'Please select at least one specialty')
  }),
  socials: z.object({
    socials: z.array(socialLinkSchema).optional()
  }),
  links: z.object({
    links: z.array(customLinkSchema).optional()
  }),
  intro: z.object({}) // No validation needed
}

export type ProfileFormData = z.infer<typeof profileSchema>;
export type SocialLinkFormData = z.infer<typeof socialLinkSchema>
export type CustomLinkFormData = z.infer<typeof customLinkSchema>
