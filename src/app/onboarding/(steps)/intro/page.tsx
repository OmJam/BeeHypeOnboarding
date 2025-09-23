"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  Search,
  MessageSquare,
  BarChart3,
  Mail,
  User,
  Share2,
  Link as LinkIcon,
} from "lucide-react";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter();
  const { gmail, profile, socials, links, setCompleted } = useOnboardingStore();
  const [isFinishing, setIsFinishing] = useState(false);

  const handleFinish = async () => {
    setIsFinishing(true);

    // Mark onboarding as completed
    setCompleted(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsFinishing(false);
    router.push("/dashboard");
  };

  // Check completion status
  const isGmailConnected = gmail === "success";
  const isProfileComplete = !!(profile.name && profile.headline && profile.bio);
  const hasSocialLinks = socials.length > 0;

  const completionItems = [
    {
      id: "gmail",
      label: "Gmail Connected",
      completed: isGmailConnected,
      icon: Mail,
      description: "Email integration for brand communications",
    },
    {
      id: "profile",
      label: "Profile Complete",
      completed: isProfileComplete,
      icon: User,
      description: "Name, headline, and bio added",
    },
    {
      id: "socials",
      label: "Social Links Added",
      completed: hasSocialLinks,
      icon: Share2,
      description: "At least one social media profile linked",
    },
  ];

  const allRequiredCompleted = isProfileComplete && hasSocialLinks;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              You're All Set!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's how to get started with BeeHype and start connecting with
              brands.
            </p>
          </div>
        </div>

        {/* Completion Checklist */}
        <Card>
          <CardHeader>
            <CardTitle>Setup Complete</CardTitle>
            <CardDescription>
              Here's what you've accomplished during onboarding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {completionItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.completed ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        item.completed ? "text-green-600" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-medium ${
                          item.completed ? "text-green-800" : "text-gray-600"
                        }`}
                      >
                        {item.label}
                      </h3>
                      {item.completed && (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* How to Get Started */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            How to Get Started
          </h2>

          <div className="grid gap-4">
            {/* Find Brands */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-600" />
                  Find Brands
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Browse our database of brands looking for creators. Filter by
                  your specialties, audience size, and content style to find
                  perfect matches.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.specialties?.slice(0, 3).map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {specialty}
                    </span>
                  ))}
                  {profile.specialties && profile.specialties.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{profile.specialties.length - 3} more
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Pitch Yourself */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  Pitch Yourself
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Send personalized pitches to brands with your rates, audience
                  demographics, and content ideas. Use our templates to get
                  started quickly.
                </p>
                <div className="mt-3 text-sm text-gray-500">
                  <p>✓ Professional pitch templates</p>
                  <p>✓ Audience insights included</p>
                  <p>✓ Rate negotiation tools</p>
                </div>
              </CardContent>
            </Card>

            {/* Track Outcomes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Track Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitor your brand partnerships, track your earnings, and
                  analyze your performance to optimize your creator business.
                </p>
                <div className="mt-3 text-sm text-gray-500">
                  <p>✓ Partnership tracking</p>
                  <p>✓ Earnings analytics</p>
                  <p>✓ Performance insights</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Finish Button */}
        <div className="text-center pt-6">
          <Button
            onClick={handleFinish}
            disabled={isFinishing}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8"
          >
            {isFinishing ? "Finishing Setup..." : "Go to Dashboard"}
          </Button>

          {!allRequiredCompleted && (
            <p className="text-sm text-orange-600 mt-3">
              Note: Complete your profile and add social links for the best
              experience
            </p>
          )}
        </div>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help Getting Started?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Check Your Profile
                </h3>
                <p className="text-sm text-gray-600">
                  Make sure all your information is complete and up-to-date.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Browse Opportunities
                </h3>
                <p className="text-sm text-gray-600">
                  Start by looking at brands in your specialty areas.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Send Your First Pitch
                </h3>
                <p className="text-sm text-gray-600">
                  Use our templates to craft compelling pitches to brands.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
