"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle2,
  Search,
  MessageSquare,
  BarChart3,
  Mail,
  User,
  Share2,
} from "lucide-react";
import { useOnboardingStore } from "@/lib/store";

export default function IntroPage() {
  const router = useRouter();
  const { gmail, profile, socials } = useOnboardingStore();

  // Check completion status
  const gmailConnected = gmail === "success";
  const isProfileComplete =
    !!profile?.name?.trim() &&
    !!profile?.headline?.trim() &&
    !!profile?.bio?.trim();
  const hasSocial = Array.isArray(socials) && socials.length > 0;

  const completionItems = [
    {
      id: "gmail",
      label: "Gmail Connected",
      completed: gmailConnected,
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
      completed: hasSocial,
      icon: Share2,
      description: "At least one social media profile linked",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="mx-auto w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              You&apos;re All Set!
            </h1>
            <p className="text-gray-600 mt-2">
              Here&apos;s how to get started with BeeHype and start connecting
              with brands.
            </p>
          </div>
        </div>

        {/* Completion Checklist */}
        <Card className="mx-auto max-w-md p-4">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-base leading-6">
              Setup Complete
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            {completionItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      item.completed ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      className={`w-3 h-3 ${
                        item.completed ? "text-green-600" : "text-gray-400"
                      }`}
                    />
                  </div>
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
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* How to Get Started */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            How to Get Started
          </h2>

          <div className="mt-2 space-y-4 max-w-3xl mx-auto">
            {/* Find Brands (primary) */}
            <Card className="w-full">
              <CardContent className="flex flex-col px-4 py-1">
                <CardTitle className="flex items-center gap-2 text-lg mb-1">
                  <Search className="w-4 h-4 text-blue-600" />
                  Find Brands
                </CardTitle>
                <p className="text-[15px] text-muted-foreground leading-5">
                  Browse brands looking for creators. Filter by specialties,
                  audience size, and content style to find the right matches.
                </p>
                <div className="mt-2.5 flex justify-end">
                  <Button
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700"
                    onClick={() => router.push("/brands")}
                  >
                    Find Brands
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pitch Yourself */}
            <Card className="w-full">
              <CardContent className="flex flex-col px-4 py-1">
                <CardTitle className="flex items-center gap-2 text-lg mb-1">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  Pitch Yourself
                </CardTitle>
                <p className="text-[15px] text-muted-foreground leading-5">
                  Send personalized pitches with your rates, audience
                  demographics, and content ideas. Use templates to get started
                  quickly.
                </p>
                <ul className="mt-1 text-[13px] text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Professional pitch templates</li>
                  <li>Audience insights included</li>
                  <li>Rate negotiation tools</li>
                </ul>
              </CardContent>
            </Card>

            {/* Track Outcomes */}
            <Card className="w-full">
              <CardContent className="flex flex-col px-4 py-1">
                <CardTitle className="flex items-center gap-2 text-lg mb-1">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  Track Outcomes
                </CardTitle>
                <p className="text-[15px] text-muted-foreground leading-5">
                  See results on your dashboard—track partnerships, analyze
                  earnings, and review performance metrics.
                </p>
                <ul className="mt-1 text-[13px] text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Partnership tracking</li>
                  <li>Earnings analytics</li>
                  <li>Performance insights</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
