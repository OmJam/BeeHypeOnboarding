"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Mail, User, Compass } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/onboarding/gmail");
  };

  const handleSkipOnboarding = () => {
    router.push("/dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="text-center space-y-6">
        {/* Hero Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to BeeHype
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Let's get you set up to start connecting with brands and growing
            your creator business.
          </p>
        </div>

        {/* What We'll Do Checklist */}
        <Card className="text-left">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              What we'll do together
            </CardTitle>
            <CardDescription>
              This quick setup will help you get started on the right foot
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">
                  Connect Gmail (Optional)
                </h3>
                <p className="text-sm text-gray-600">
                  Link your email to streamline communication with brands. You
                  can skip this step if you prefer.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">
                  Complete Your Profile
                </h3>
                <p className="text-sm text-gray-600">
                  Add your name, headline, bio, and specialties to help brands
                  find you.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Quick Tour</h3>
                <p className="text-sm text-gray-600">
                  Learn how to find brands, pitch yourself, and track your
                  success.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Start Onboarding
          </Button>
          <Button
            onClick={handleSkipOnboarding}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Skip Onboarding
          </Button>
        </div>

        {/* Additional Info */}
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Don't worry - you can always come back and complete any step later
          from your dashboard.
        </p>
      </div>
    </div>
  );
}
