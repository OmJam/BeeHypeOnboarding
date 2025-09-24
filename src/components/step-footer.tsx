"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepFooterProps {
  canGoBack: boolean;
  onBack: () => void;
  onContinue: () => void;
  continueDisabled?: boolean;
  continueText?: string;
  backText?: string;
}

export function StepFooter({
  canGoBack,
  onBack,
  onContinue,
  continueDisabled = false,
  continueText = "Continue",
  backText = "Back",
}: StepFooterProps) {
  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="grid grid-cols-3 items-center">
        {/* Back Button */}
        <div className="col-start-1">
          {canGoBack && (
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {backText}
            </Button>
          )}
        </div>

        {/* Empty middle column */}
        <div className="col-start-2" />

        {/* Continue Button */}
        <div className="col-start-3 justify-self-end">
          <Button
            onClick={onContinue}
            disabled={continueDisabled}
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
