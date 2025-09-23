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
import { Switch } from "@/components/ui/switch";
import { Share2, Plus, Trash2, Link as LinkIcon } from "lucide-react";
import { useOnboardingStore, type SocialLink } from "@/lib/store";
import { useRouter } from "next/navigation";

const socialPlatforms = [
  { value: "instagram", label: "Instagram", baseUrl: "https://instagram.com/" },
  { value: "tiktok", label: "TikTok", baseUrl: "https://tiktok.com/@" },
  { value: "youtube", label: "YouTube", baseUrl: "https://youtube.com/@" },
  { value: "twitter", label: "Twitter/X", baseUrl: "https://twitter.com/" },
  { value: "facebook", label: "Facebook", baseUrl: "https://facebook.com/" },
  { value: "linkedin", label: "LinkedIn", baseUrl: "https://linkedin.com/in/" },
  { value: "pinterest", label: "Pinterest", baseUrl: "https://pinterest.com/" },
  { value: "twitch", label: "Twitch", baseUrl: "https://twitch.tv/" },
  { value: "other", label: "Other", baseUrl: "" },
];

export default function SocialsPage() {
  const router = useRouter();
  const { socials, addSocial, updateSocial, removeSocial } =
    useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addNewSocial = () => {
    const newSocial: SocialLink = {
      id: Date.now().toString(),
      platform: "",
      username: "",
      url: "",
      verified: false,
    };
    addSocial(newSocial);
  };

  const updateSocialField = (
    id: string,
    field: keyof SocialLink,
    value: string | boolean
  ) => {
    updateSocial(id, { [field]: value });
  };

  const autofillUrl = (id: string, platform: string, username: string) => {
    const platformData = socialPlatforms.find((p) => p.value === platform);
    if (platformData && platformData.baseUrl && username) {
      updateSocial(id, { url: platformData.baseUrl + username });
    }
  };

  const handleContinue = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    setIsSubmitting(false);
    router.push("/onboarding/links");
  };

  const canContinue = socials.length > 0;

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Share2 className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add Your Social Links
            </h1>
            <p className="text-gray-600 mt-2">
              Connect your social media profiles so brands can see your content
              and audience.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Profiles</CardTitle>
            <CardDescription>
              Add your social media accounts. At least one is required to
              continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Links List */}
            {socials.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Share2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No social links added yet</p>
                <p className="text-sm">
                  Click "Add Social Link" to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {socials.map((social) => (
                  <div
                    key={social.id}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Social Link</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSocial(social.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Platform */}
                      <div>
                        <Label htmlFor={`platform-${social.id}`}>
                          Platform
                        </Label>
                        <Select
                          value={social.platform}
                          onValueChange={(value) => {
                            updateSocialField(social.id, "platform", value);
                            if (social.username) {
                              autofillUrl(social.id, value, social.username);
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            {socialPlatforms.map((platform) => (
                              <SelectItem
                                key={platform.value}
                                value={platform.value}
                              >
                                {platform.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Username */}
                      <div>
                        <Label htmlFor={`username-${social.id}`}>
                          Username
                        </Label>
                        <Input
                          id={`username-${social.id}`}
                          value={social.username}
                          onChange={(e) => {
                            updateSocialField(
                              social.id,
                              "username",
                              e.target.value
                            );
                            if (social.platform) {
                              autofillUrl(
                                social.id,
                                social.platform,
                                e.target.value
                              );
                            }
                          }}
                          placeholder="your_username"
                        />
                      </div>
                    </div>

                    {/* URL */}
                    <div>
                      <Label htmlFor={`url-${social.id}`}>Profile URL</Label>
                      <div className="flex gap-2">
                        <Input
                          id={`url-${social.id}`}
                          value={social.url}
                          onChange={(e) =>
                            updateSocialField(social.id, "url", e.target.value)
                          }
                          placeholder="https://..."
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (social.platform && social.username) {
                              autofillUrl(
                                social.id,
                                social.platform,
                                social.username
                              );
                            }
                          }}
                          disabled={!social.platform || !social.username}
                          className="px-3"
                        >
                          <LinkIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Verified Switch */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={`verified-${social.id}`}>
                          Verified Account
                        </Label>
                        <p className="text-sm text-gray-500">
                          Check if this account is verified by the platform
                        </p>
                      </div>
                      <Switch
                        id={`verified-${social.id}`}
                        checked={social.verified}
                        onCheckedChange={(checked) =>
                          updateSocialField(social.id, "verified", checked)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Social Link Button */}
            <Button
              onClick={addNewSocial}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Social Link
            </Button>

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
            <CardTitle>Why Social Links Matter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Showcase Your Content
                </h3>
                <p className="text-sm text-gray-600">
                  Brands want to see your content style and quality before
                  reaching out.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">
                  Verify Your Audience
                </h3>
                <p className="text-sm text-gray-600">
                  Social links help brands verify your follower count and
                  engagement rates.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium text-gray-900">Build Trust</h3>
                <p className="text-sm text-gray-600">
                  Verified accounts and consistent branding across platforms
                  build credibility.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
