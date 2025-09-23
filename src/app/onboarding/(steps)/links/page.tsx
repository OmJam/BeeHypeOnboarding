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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link as LinkIcon, Plus, Trash2, Globe } from "lucide-react";
import { useOnboardingStore, type CustomLink } from "@/lib/store";
import { useRouter } from "next/navigation";

const linkSuggestions = [
  "Portfolio",
  "Website",
  "Blog",
  "Press Kit",
  "Media Kit",
  "Rate Card",
  "Contact",
  "About",
  "Services",
  "Testimonials",
  "Case Studies",
  "Newsletter",
  "Podcast",
  "Course",
  "E-book",
  "Freebie",
  "Download",
  "Other",
];

export default function LinksPage() {
  const router = useRouter();
  const { links, addLink, updateLink, removeLink } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addNewLink = () => {
    const newLink: CustomLink = {
      id: Date.now().toString(),
      name: "",
      url: "",
    };
    addLink(newLink);
  };

  const updateLinkField = (
    id: string,
    field: keyof CustomLink,
    value: string
  ) => {
    updateLink(id, { [field]: value });
  };

  const handleContinue = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);
    router.push("/onboarding/intro");
  };

  const canContinue = true; // Links are optional

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <LinkIcon className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add Custom Links
            </h1>
            <p className="text-gray-600 mt-2">
              Share additional links like your portfolio, press kit, or other
              important pages.
            </p>
          </div>
        </div>

        {/* Custom Links */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Links</CardTitle>
            <CardDescription>
              Add any additional links you'd like to share with brands. This
              step is optional.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Links List */}
            {links.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No custom links added yet</p>
                <p className="text-sm">Click "Add Link" to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Custom Link</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLink(link.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Link Name */}
                      <div>
                        <Label htmlFor={`name-${link.id}`}>Link Name</Label>
                        <Select
                          value={link.name}
                          onValueChange={(value) =>
                            updateLinkField(link.id, "name", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select or type name" />
                          </SelectTrigger>
                          <SelectContent>
                            {linkSuggestions.map((suggestion) => (
                              <SelectItem key={suggestion} value={suggestion}>
                                {suggestion}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* URL */}
                      <div>
                        <Label htmlFor={`url-${link.id}`}>URL</Label>
                        <Input
                          id={`url-${link.id}`}
                          value={link.url}
                          onChange={(e) =>
                            updateLinkField(link.id, "url", e.target.value)
                          }
                          placeholder="https://..."
                          type="url"
                        />
                      </div>
                    </div>

                    {/* Custom Name Input (if Other is selected) */}
                    {link.name === "Other" && (
                      <div>
                        <Label htmlFor={`custom-name-${link.id}`}>
                          Custom Name
                        </Label>
                        <Input
                          id={`custom-name-${link.id}`}
                          value={link.name}
                          onChange={(e) =>
                            updateLinkField(link.id, "name", e.target.value)
                          }
                          placeholder="Enter custom name"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add Link Button */}
            <Button
              onClick={addNewLink}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </Button>

            {/* Continue Button */}
            <div className="flex justify-end pt-4">
              <Button
                onClick={handleContinue}
                disabled={isSubmitting}
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
            <CardTitle>Link Ideas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">Portfolio</h3>
                <p className="text-sm text-gray-600">
                  Showcase your best work and previous brand collaborations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">Press Kit</h3>
                <p className="text-sm text-gray-600">
                  Include your media kit with rates, audience demographics, and
                  contact info.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">Testimonials</h3>
                <p className="text-sm text-gray-600">
                  Share reviews and testimonials from previous brand
                  partnerships.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">Newsletter</h3>
                <p className="text-sm text-gray-600">
                  Let brands subscribe to your newsletter for ongoing updates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
