"use client";

import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";
import { useOnboardingStore } from "@/lib/store";

const steps = [
  { id: "welcome", name: "Welcome", weight: 0 },
  { id: "gmail", name: "Gmail Connect", weight: 0 },
  { id: "profile", name: "Profile", weight: 60 },
  { id: "specialties", name: "Specialties", weight: 10 },
  { id: "socials", name: "Social Links", weight: 25 },
  { id: "links", name: "Custom Links", weight: 5 },
  { id: "intro", name: "Intro", weight: 0 },
];

export function AppStepper() {
  const pathname = usePathname();
  const { gmail, profile, socials, links, completed } = useOnboardingStore();

  // Calculate completion percentage
  const calculateProgress = () => {
    let totalWeight = 0;
    let completedWeight = 0;

    steps.forEach((step) => {
      totalWeight += step.weight;

      switch (step.id) {
        case "gmail":
          if (gmail === "success") completedWeight += step.weight;
          break;
        case "profile":
          if (profile.name && profile.headline && profile.bio) {
            completedWeight += step.weight;
          }
          break;
        case "specialties":
          if (profile.specialties.length > 0) {
            completedWeight += step.weight;
          }
          break;
        case "socials":
          if (socials.length > 0) {
            completedWeight += step.weight;
          }
          break;
        case "links":
          if (links.length > 0) {
            completedWeight += step.weight;
          }
          break;
      }
    });

    return totalWeight > 0
      ? Math.round((completedWeight / totalWeight) * 100)
      : 0;
  };

  const progress = calculateProgress();
  const currentStepIndex = steps.findIndex((step) =>
    pathname.includes(step.id)
  );

  const isStepCompleted = (stepId: string) => {
    switch (stepId) {
      case "gmail":
        return gmail === "success";
      case "profile":
        return !!(profile.name && profile.headline && profile.bio);
      case "specialties":
        return profile.specialties.length > 0;
      case "socials":
        return socials.length > 0;
      case "links":
        return links.length > 0;
      default:
        return false;
    }
  };

  const isStepCurrent = (stepId: string) => {
    return pathname.includes(stepId);
  };

  return (
    <div className="w-full space-y-4">
      {/* Progress Ring */}
      <div className="flex items-center justify-center">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-gray-200"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-blue-600"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${progress}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-700">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="w-full" />

      {/* Steps */}
      <div className="flex flex-wrap gap-2 justify-center">
        {steps.map((step, index) => {
          const completed = isStepCompleted(step.id);
          const current = isStepCurrent(step.id);

          return (
            <Badge
              key={step.id}
              variant={
                completed ? "default" : current ? "secondary" : "outline"
              }
              className={`flex items-center gap-1 px-3 py-1 ${
                completed
                  ? "bg-green-100 text-green-800 border-green-200"
                  : current
                  ? "bg-blue-100 text-blue-800 border-blue-200"
                  : "bg-gray-100 text-gray-600 border-gray-200"
              }`}
            >
              {completed ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <Circle className="w-3 h-3" />
              )}
              <span className="text-xs font-medium">{step.name}</span>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
