"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User, MapPin } from "lucide-react";
import { useOnboardingStore } from "@/lib/store";
import { profileSchema, type ProfileFormData } from "@/lib/schemas";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, setProfile } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name || "",
      headline: profile.headline || "",
      bio: profile.bio || "",
      location: profile.location || "",
      specialties: profile.specialties || [],
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);

    // Save to store
    setProfile(data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);
    router.push("/onboarding/specialties");
  };

  const headlineLength = form.watch("headline")?.length || 0;
  const bioLength = form.watch("bio")?.length || 0;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Complete Your Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Tell brands about yourself and what makes you unique as a creator.
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              This information will help brands understand who you are and what
              you do.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          aria-describedby="name-error"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Headline */}
                <FormField
                  control={form.control}
                  name="headline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Headline *</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            {...field}
                            placeholder="e.g., Beauty Content Creator & Makeup Artist"
                            maxLength={60}
                            aria-describedby="headline-error headline-counter"
                          />
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>Brief description of what you do</span>
                            <span
                              id="headline-counter"
                              className={
                                headlineLength > 50
                                  ? "text-orange-500"
                                  : "text-gray-500"
                              }
                            >
                              {headlineLength}/60
                            </span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Bio */}
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio *</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Textarea
                            {...field}
                            placeholder="Tell brands about yourself, your content style, and what makes you unique. Include your audience size, engagement rates, and any notable achievements."
                            rows={4}
                            maxLength={600}
                            aria-describedby="bio-error bio-counter"
                          />
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>
                              Detailed description of your brand and audience
                            </span>
                            <span
                              id="bio-counter"
                              className={
                                bioLength > 500
                                  ? "text-orange-500"
                                  : "text-gray-500"
                              }
                            >
                              {bioLength}/600
                            </span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Location */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Location (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., Los Angeles, CA or New York, NY"
                          aria-describedby="location-error"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  >
                    {isSubmitting ? "Saving..." : "Continue"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Tips for a Great Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">Be Specific</h3>
                <p className="text-sm text-gray-600">
                  Include specific details about your niche, audience
                  demographics, and content style.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">Show Your Value</h3>
                <p className="text-sm text-gray-600">
                  Highlight your unique selling points and what brands can
                  expect when working with you.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">Include Metrics</h3>
                <p className="text-sm text-gray-600">
                  Mention your follower count, engagement rates, or any notable
                  achievements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
