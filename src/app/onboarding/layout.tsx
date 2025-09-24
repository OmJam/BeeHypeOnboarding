"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AppStepper from "@/components/app-stepper";
import { StepFooter } from "@/components/step-footer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STEPS = [
  "welcome",
  "profile",
  "gmail",
  "specialties",
  "socials",
  "links",
  "intro",
] as const;

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [showSkipDialog, setShowSkipDialog] = useState(false);

  // Get current step index
  const currentStep = STEPS.find((step) => pathname.includes(step));
  const currentIndex = currentStep ? STEPS.indexOf(currentStep) : 0;
  const canGoBack = currentIndex > 0;

  const handleBack = () => {
    if (currentIndex < 0) {
      console.warn(
        "Unknown step for pathname:",
        pathname,
        "— check STEPS array and routes."
      );
    }
    if (currentIndex > 0) {
      const prevStep = STEPS[currentIndex - 1];
      router.push(`/onboarding/${prevStep}`);
    }
  };

  const handleContinue = () => {
    // Handle form submissions for specific steps
    if (currentStep === "profile") {
      // Use the global form submission handler
      const profileHandleContinue = (
        window as Window & { profileHandleContinue?: () => void }
      ).profileHandleContinue;
      if (profileHandleContinue) {
        profileHandleContinue();
        return;
      }
    }

    if (currentIndex < STEPS.length - 1) {
      const nextStep = STEPS[currentIndex + 1];
      router.push(`/onboarding/${nextStep}`);
    }
  };

  const handleSkipConfirm = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Sticky Header with Progress and Skip Button */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
        <div className="relative mx-auto w-full max-w-6xl px-6 py-3">
          {/* Progress (mathematically centered) */}
          <div className="mx-auto max-w-3xl">
            <AppStepper currentIndex={currentIndex} total={STEPS.length} />
          </div>

          {/* Skip doesn't affect centering */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSkipDialog(true)}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            Skip Setup
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Sticky Footer with Navigation */}
      <footer className="sticky bottom-0 z-40 border-t bg-background/80 backdrop-blur px-6 py-2">
        <StepFooter
          canGoBack={canGoBack}
          onBack={handleBack}
          onContinue={handleContinue}
        />
      </footer>

      {/* Skip Confirmation Dialog */}
      <Dialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Skip setup?</DialogTitle>
            <DialogDescription>
              Are you sure you want to skip setting up your profile? You can
              always go to your settings to finish your profile.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSkipDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSkipConfirm}>
              Skip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
