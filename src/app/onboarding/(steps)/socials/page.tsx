"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Share2,
  Plus,
  Trash2,
  Globe,
  Check,
  Pencil,
  ExternalLink,
} from "lucide-react";

import {
  useOnboardingStore,
  type SocialLink,
  type CustomLink,
} from "@/lib/store";

import { socialLinkSchema, customLinkSchema } from "@/lib/schemas";

/* Platforms shown in the Select */
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
] as const;

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
] as const;

/* Reusable green "Done" button (also used for Additional Links) */
function DoneButton({
  label = "Done",
  onClick,
}: {
  label?: string;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      size="sm"
      onClick={onClick}
      className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
    >
      <Check className="w-3 h-3" />
      {label}
    </Button>
  );
}

export default function SocialsPage() {
  const {
    socials,
    addSocial,
    updateSocial,
    removeSocial,
    links,
    addLink,
    updateLink,
    removeLink,
  } = useOnboardingStore();

  // show “Done” by default for newly added rows
  const [editingSocialIds, setEditingSocialIds] = useState<
    Record<string, boolean>
  >({});
  const [editingLinkIds, setEditingLinkIds] = useState<Record<string, boolean>>(
    {}
  );

  // --- Add row helpers ------------------------------------------------------

  // Make platform EMPTY by default so Select shows placeholder
  const addNewSocial = () => {
    const id = crypto.randomUUID?.() ?? String(Date.now());
    addSocial({ id, platform: "", username: "", url: "" });
    setEditingSocialIds((m) => ({ ...m, [id]: true }));
  };

  const addNewLink = () => {
    const id = crypto.randomUUID?.() ?? String(Date.now());
    addLink({ id, label: "", url: "" });
    setEditingLinkIds((m) => ({ ...m, [id]: true }));
  };

  // Best-effort profile URL from platform + username (applies to the FORM, not the store)
  const buildProfileUrl = (platform: string, username: string) => {
    const u = username.replace(/^@/, "");
    switch (platform) {
      case "instagram":
        return `https://instagram.com/${u}`;
      case "tiktok":
        return `https://www.tiktok.com/@${u}`;
      case "youtube":
        return `https://youtube.com/@${u}`;
      case "twitter":
        return `https://twitter.com/${u}`;
      case "facebook":
        return `https://facebook.com/${u}`;
      case "linkedin":
        return `https://www.linkedin.com/in/${u}`;
      case "pinterest":
        return `https://www.pinterest.com/${u}`;
      case "twitch":
        return `https://twitch.tv/${u}`;
      default:
        return "";
    }
  };

  // ---------------------------- Social Row (RHF controls while typing) ------
  function SocialRow({ row }: { row: SocialLink }) {
    const form = useForm({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolver: zodResolver(socialLinkSchema) as any,
      defaultValues: row, // seed with store values
      mode: "onChange",
    });

    // Save: write the WHOLE row to the store exactly once
    const submit = form.handleSubmit((data) => {
      updateSocial(row.id, data);
      setEditingSocialIds((m) => ({ ...m, [row.id]: false }));
    });

    // Live URL autofill while typing (RHF-safe)
    const lastAuto = useRef<string>("");
    const platform = form.watch("platform");
    const username = form.watch("username");
    const url = form.watch("url");

    useEffect(() => {
      if (!platform || !username?.trim()) return;
      const next = buildProfileUrl(platform, username.trim());
      // Only autofill if URL is empty OR equals our last autofill (i.e., user hasn't customized)
      if (!url || url === lastAuto.current) {
        form.setValue("url", next, { shouldValidate: true, shouldDirty: true });
        lastAuto.current = next;
      }
    }, [platform, username, url, form]);

    return (
      <div className="border border-gray-200 rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Social Link</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              removeSocial(row.id);
              setEditingSocialIds((m) => {
                const { [row.id]: _unused, ...rest } = m;
                return rest;
              });
            }}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            aria-label="Remove social link"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platform</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value); // RHF owns value
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {socialPlatforms.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {p.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="your_username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://..."
                      className="flex-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bottom-right green Done button */}
            <div className="flex justify-end">
              <DoneButton label="Done" onClick={submit} />
            </div>
          </form>
        </Form>
      </div>
    );
  }

  // ---------------------------- Saved Social Row (view mode) -----------------
  function SavedSocialRow({
    row,
    onEdit,
    onRemove,
  }: {
    row: SocialLink;
    onEdit: () => void;
    onRemove: () => void;
  }) {
    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              {row.platform || "—"}
            </div>
            <div className="font-medium">
              {row.username?.trim() || "No username"}
            </div>
            {row.url?.trim() && (
              <a
                href={row.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                {row.url}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              aria-label="Edit"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              aria-label="Remove"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------- Custom Link Row ----------------------------
  function LinkRow({ row }: { row: CustomLink }) {
    const form = useForm<CustomLink>({
      resolver: zodResolver(customLinkSchema),
      defaultValues: row,
      mode: "onChange",
    });

    const submit = form.handleSubmit((data) => {
      updateLink(row.id, data);
      setEditingLinkIds((m) => ({ ...m, [row.id]: false }));
    });

    return (
      <div className="border border-gray-200 rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Custom Link</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              removeLink(row.id);
              setEditingLinkIds((m) => {
                const { [row.id]: _unused, ...rest } = m;
                return rest;
              });
            }}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            aria-label="Remove link"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        <Form {...form}>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link Name</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select or type name" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {linkSuggestions.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://..." type="url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* If “Other”, let them rename */}
            {form.watch("label") === "Other" && (
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter custom name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Bottom-right green Done button (same as Socials) */}
            <div className="flex justify-end">
              <DoneButton label="Done" onClick={submit} />
            </div>
          </form>
        </Form>
      </div>
    );
  }

  // ------------------------------- Saved Link Row (view mode) ---------------
  function SavedLinkRow({
    row,
    onEdit,
    onRemove,
  }: {
    row: CustomLink;
    onEdit: () => void;
    onRemove: () => void;
  }) {
    return (
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground">
              {row.label || "—"}
            </div>
            {row.url?.trim() ? (
              <a
                href={row.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                {row.url}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <div className="text-sm text-muted-foreground">No URL</div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
              aria-label="Edit"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              aria-label="Remove"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------- Page UI ----------------------------------
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Share2 className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add Your Links</h1>
            <p className="text-gray-600 mt-2">
              Connect your social media profiles and add additional links so
              brands can see your content and learn more about you.
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
            {socials.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Share2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No social links added yet</p>
                <p className="text-sm">
                  Click &quot;Add Social Link&quot; to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {socials.map((row) =>
                  editingSocialIds[row.id] ? (
                    <SocialRow key={row.id} row={row} />
                  ) : (
                    <SavedSocialRow
                      key={row.id}
                      row={row}
                      onEdit={() =>
                        setEditingSocialIds((m) => ({ ...m, [row.id]: true }))
                      }
                      onRemove={() => {
                        removeSocial(row.id);
                        setEditingSocialIds((m) => {
                          const { [row.id]: _unused, ...rest } = m;
                          return rest;
                        });
                      }}
                    />
                  )
                )}
              </div>
            )}
            <Button
              onClick={addNewSocial}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Social Link
            </Button>
          </CardContent>
        </Card>

        {/* Additional Links */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Links</CardTitle>
            <CardDescription>
              Add any additional links you&apos;d like to share with brands.
              This step is optional.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {links.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No custom links added yet</p>
                <p className="text-sm">
                  Click &quot;Add Link&quot; to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {links.map((row) =>
                  editingLinkIds[row.id] ? (
                    <LinkRow key={row.id} row={row} />
                  ) : (
                    <SavedLinkRow
                      key={row.id}
                      row={row}
                      onEdit={() =>
                        setEditingLinkIds((m) => ({ ...m, [row.id]: true }))
                      }
                      onRemove={() => {
                        removeLink(row.id);
                        setEditingLinkIds((m) => {
                          const { [row.id]: _unused, ...rest } = m;
                          return rest;
                        });
                      }}
                    />
                  )
                )}
              </div>
            )}
            <Button
              onClick={addNewLink}
              variant="outline"
              className="w-full flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
