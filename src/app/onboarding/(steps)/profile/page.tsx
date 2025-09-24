"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, MapPin, AlertCircle } from "lucide-react";
import { useOnboardingStore } from "@/lib/store";
import { profileSchema, type ProfileFormData } from "@/lib/schemas";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, setProfile } = useOnboardingStore();
  const [showEmptyFieldsAlert, setShowEmptyFieldsAlert] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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

  // Create handleContinue function for the footer
  const handleContinue = form.handleSubmit(async (data: ProfileFormData) => {
    // Check if any required fields are empty
    const isEmpty =
      !data.name.trim() || !data.headline.trim() || !data.bio.trim();

    if (isEmpty) {
      setShowEmptyFieldsAlert(true);
      // Still save whatever is present and continue
    } else {
      setShowEmptyFieldsAlert(false);
    }

    // Save to store
    setProfile(data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    router.push("/onboarding/gmail");
  });

  // Expose handleContinue to parent layout
  useEffect(() => {
    (
      window as Window & { profileHandleContinue?: () => void }
    ).profileHandleContinue = handleContinue;

    return () => {
      delete (window as Window & { profileHandleContinue?: () => void })
        .profileHandleContinue;
    };
  }, [handleContinue]);

  const headlineLength = form.watch("headline")?.length || 0;
  const bioLength = form.watch("bio")?.length || 0;

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Profile Information
            </h1>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="mx-auto max-w-5xl px-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start lg:justify-items-stretch">
          {/* Left Column - Tips */}
          <Card className="self-start">
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
                    Mention your follower count, engagement rates, or any
                    notable achievements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Profile Form */}
          <Card className="self-start">
            <CardContent>
              {/* Empty Fields Alert */}
              {showEmptyFieldsAlert && (
                <Alert className="mb-6 border-orange-200 bg-orange-50">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    Please fill out your information. You can always come back
                    to complete it later.
                  </AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form ref={formRef} className="space-y-6">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input {...field} aria-describedby="name-error" />
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
                              placeholder="e.g., Content Creator & Artist"
                              maxLength={60}
                              aria-describedby="headline-error headline-counter"
                            />
                            <div className="flex justify-end text-sm text-gray-500">
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
                              rows={4}
                              maxLength={600}
                              aria-describedby="bio-error bio-counter"
                            />
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>
                                Detailed description about yourself, your brand,
                                and your audience
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
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
