import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type GmailState = "not_started" | "connecting" | "success" | "failed"

export type CreatorProfile = {
  name: string
  headline: string
  bio: string
  location: string
  specialties: string[]
}

export type SocialLink = {
  id: string
  platform: string
  username: string
  url: string
  verified: boolean
}

export type CustomLink = {
  id: string
  name: string
  url: string
}

interface OnboardingStore {
  // State
  gmail: GmailState
  profile: CreatorProfile
  socials: SocialLink[]
  links: CustomLink[]
  completed: boolean
  
  // Setters
  setGmail: (state: GmailState) => void
  setProfile: (profile: Partial<CreatorProfile>) => void
  addSocial: (social: SocialLink) => void
  updateSocial: (id: string, updates: Partial<SocialLink>) => void
  removeSocial: (id: string) => void
  addLink: (link: CustomLink) => void
  updateLink: (id: string, updates: Partial<CustomLink>) => void
  removeLink: (id: string) => void
  setCompleted: (completed: boolean) => void
  
  // Actions
  reset: () => void
}

const initialProfile: CreatorProfile = {
  name: '',
  headline: '',
  bio: '',
  location: '',
  specialties: []
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      // Initial state
      gmail: "not_started",
      profile: initialProfile,
      socials: [],
      links: [],
      completed: false,
      
      // Setters
      setGmail: (state) => set({ gmail: state }),
      
      setProfile: (updates) => set((state) => ({
        profile: { ...state.profile, ...updates }
      })),
      
      addSocial: (social) => set((state) => ({
        socials: [...state.socials, social]
      })),
      
      updateSocial: (id, updates) => set((state) => ({
        socials: state.socials.map(social => 
          social.id === id ? { ...social, ...updates } : social
        )
      })),
      
      removeSocial: (id) => set((state) => ({
        socials: state.socials.filter(social => social.id !== id)
      })),
      
      addLink: (link) => set((state) => ({
        links: [...state.links, link]
      })),
      
      updateLink: (id, updates) => set((state) => ({
        links: state.links.map(link => 
          link.id === id ? { ...link, ...updates } : link
        )
      })),
      
      removeLink: (id) => set((state) => ({
        links: state.links.filter(link => link.id !== id)
      })),
      
      setCompleted: (completed) => set({ completed }),
      
      // Actions
      reset: () => set({
        gmail: "not_started",
        profile: initialProfile,
        socials: [],
        links: [],
        completed: false
      })
    }),
    {
      name: 'beehype-onboarding-storage',
      partialize: (state) => ({
        gmail: state.gmail,
        profile: state.profile,
        socials: state.socials,
        links: state.links,
        completed: state.completed
      })
    }
  )
)
