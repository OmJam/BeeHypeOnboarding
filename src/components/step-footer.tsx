"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, SkipForward } from "lucide-react";
import { useRouter } from "next/navigation";

interface StepFooterProps {
  onBack?: () => void;
  onSkip?: () => void;
  onContinue?: () => void;
  canGoBack?: boolean;
  canSkip?: boolean;
  canContinue?: boolean;
  continueText?: string;
  skipText?: string;
  backText?: string;
}

const stepOrder = [
  "welcome",
  "gmail",
  "profile",
  "specialties",
  "socials",
  "links",
  "intro",
];

export function StepFooter({
  onBack,
  onSkip,
  onContinue,
  canGoBack = true,
  canSkip = true,
  canContinue = true,
  continueText = "Continue",
  skipText = "Skip",
  backText = "Back",
}: StepFooterProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Default navigation logic
      const currentPath = window.location.pathname;
      const currentStep = stepOrder.find((step) => currentPath.includes(step));
      if (currentStep) {
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex > 0) {
          const prevStep = stepOrder[currentIndex - 1];
          router.push(`/onboarding/${prevStep}`);
        }
      }
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      // Default skip logic - go to next step
      const currentPath = window.location.pathname;
      const currentStep = stepOrder.find((step) => currentPath.includes(step));
      if (currentStep) {
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex < stepOrder.length - 1) {
          const nextStep = stepOrder[currentIndex + 1];
          router.push(`/onboarding/${nextStep}`);
        }
      }
    }
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      // Default continue logic - go to next step
      const currentPath = window.location.pathname;
      const currentStep = stepOrder.find((step) => currentPath.includes(step));
      if (currentStep) {
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex < stepOrder.length - 1) {
          const nextStep = stepOrder[currentIndex + 1];
          router.push(`/onboarding/${nextStep}`);
        }
      }
    }
  };

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={!canGoBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {backText}
        </Button>

        {/* Center Actions */}
        <div className="flex items-center gap-3">
          {/* Skip Button */}
          {canSkip && (
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <SkipForward className="w-4 h-4" />
              {skipText}
            </Button>
          )}

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!canContinue}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            {continueText}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
