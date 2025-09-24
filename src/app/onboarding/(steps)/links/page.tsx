"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LinksPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to socials page since links are now combined there
    router.push("/onboarding/socials");
  }, [router]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="text-center">
        <p className="text-gray-600">Redirecting to links page...</p>
      </div>
    </div>
  );
}
