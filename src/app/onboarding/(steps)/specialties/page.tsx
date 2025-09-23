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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tags, Plus, X } from "lucide-react";
import { useOnboardingStore } from "@/lib/store";
import { useRouter } from "next/navigation";

const predefinedSpecialties = [
  "Beauty",
  "Fashion",
  "Tech",
  "Fitness",
  "Gaming",
  "Travel",
  "Food",
  "Education",
  "Finance",
  "Other",
];

export default function SpecialtiesPage() {
  const router = useRouter();
  const { profile, setProfile } = useOnboardingStore();
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    profile.specialties || []
  );
  const [customSpecialty, setCustomSpecialty] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSpecialtyToggle = (specialty: string) => {
    setSelectedSpecialties((prev) => {
      if (prev.includes(specialty)) {
        return prev.filter((s) => s !== specialty);
      } else {
        return [...prev, specialty];
      }
    });
  };

  const handleAddCustom = () => {
    if (
      customSpecialty.trim() &&
      !selectedSpecialties.includes(customSpecialty.trim())
    ) {
      setSelectedSpecialties((prev) => [...prev, customSpecialty.trim()]);
      setCustomSpecialty("");
      setIsDialogOpen(false);
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) => prev.filter((s) => s !== specialty));
  };

  const handleContinue = async () => {
    if (selectedSpecialties.length === 0) return;

    setIsSubmitting(true);

    // Save to store
    setProfile({ specialties: selectedSpecialties });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);
    router.push("/onboarding/socials");
  };

  const canContinue = selectedSpecialties.length > 0;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Tags className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Choose Your Specialties
            </h1>
            <p className="text-gray-600 mt-2">
              Select the areas where you create content. This helps brands find
              creators in their niche.
            </p>
          </div>
        </div>

        {/* Specialties Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Content Specialties</CardTitle>
            <CardDescription>
              Select all that apply. You can add custom specialties if needed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Predefined Specialties */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Popular Categories
              </Label>
              <div className="flex flex-wrap gap-2">
                {predefinedSpecialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant={
                      selectedSpecialties.includes(specialty)
                        ? "default"
                        : "outline"
                    }
                    className={`cursor-pointer transition-colors ${
                      selectedSpecialties.includes(specialty)
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => handleSpecialtyToggle(specialty)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSpecialtyToggle(specialty);
                      }
                    }}
                    aria-pressed={selectedSpecialties.includes(specialty)}
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Add Custom Specialty */}
            <div className="flex items-center gap-3">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Your Own
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Custom Specialty</DialogTitle>
                    <DialogDescription>
                      Enter a specialty that isn't listed above.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="custom-specialty">Specialty Name</Label>
                      <Input
                        id="custom-specialty"
                        value={customSpecialty}
                        onChange={(e) => setCustomSpecialty(e.target.value)}
                        placeholder="e.g., Sustainable Fashion, Pet Care"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCustom();
                          }
                        }}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddCustom}
                        disabled={!customSpecialty.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Selected Specialties */}
            {selectedSpecialties.length > 0 && (
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Selected ({selectedSpecialties.length})
                </Label>
                <div className="flex flex-wrap gap-2">
                  {selectedSpecialties.map((specialty) => (
                    <Badge
                      key={specialty}
                      variant="default"
                      className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1"
                    >
                      {specialty}
                      <button
                        onClick={() => handleRemoveSpecialty(specialty)}
                        className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                        aria-label={`Remove ${specialty}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Continue Button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleContinue}
                disabled={!canContinue || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                {isSubmitting ? "Saving..." : "Continue"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Why Specialties Matter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Better Brand Matches
                </h3>
                <p className="text-sm text-gray-600">
                  Brands search for creators by specialty, so accurate
                  categories help you get discovered.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Relevant Opportunities
                </h3>
                <p className="text-sm text-gray-600">
                  You'll receive partnership opportunities that align with your
                  content and audience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Higher Success Rates
                </h3>
                <p className="text-sm text-gray-600">
                  Brands prefer working with creators who have proven expertise
                  in their niche.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
