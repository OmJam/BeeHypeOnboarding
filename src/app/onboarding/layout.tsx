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
  "specialties",
  "gmail",
  "socials",
  "intro",
] as const;
type Step = (typeof STEPS)[number];

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [showSkipDialog, setShowSkipDialog] = useState(false);

  // derive current step/index
  const seg = (pathname.split("/").pop() || "welcome") as Step;
  const currentIndex = Math.max(0, STEPS.indexOf(seg));
  const canGoBack = currentIndex > 0;

  const handleBack = () => {
    if (currentIndex > 0) router.push(`/onboarding/${STEPS[currentIndex - 1]}`);
  };

  const handleContinue = () => {
    // Let the Profile page run its form submit
    if (seg === "profile") {
      (
        window as Window & { profileHandleContinue?: () => void }
      ).profileHandleContinue?.();
      return;
    }

    // If we're on the last step, go to dashboard
    if (currentIndex === STEPS.length - 1) {
      router.push("/dashboard");
      return;
    }

    // Otherwise go to the next step
    router.push(`/onboarding/${STEPS[currentIndex + 1]}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* sticky header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
        <div className="relative mx-auto w-full max-w-6xl px-6 py-3">
          {/* bar centered */}
          <AppStepper value={currentIndex + 1} total={STEPS.length} />
          {/* Skip (absolute so it never shifts centering) */}
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

      <main className="flex-1">{children}</main>

      {/* sticky footer */}
      <footer className="sticky bottom-0 z-40 border-t bg-background/80 backdrop-blur px-6 py-2">
        <StepFooter
          canGoBack={canGoBack}
          onBack={handleBack}
          onContinue={handleContinue}
          continueText={
            currentIndex === STEPS.length - 1 ? "Finish" : "Continue"
          }
        />
      </footer>

      {/* Skip confirm */}
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
            <Button
              variant="destructive"
              onClick={() => router.push("/dashboard")}
            >
              Skip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
