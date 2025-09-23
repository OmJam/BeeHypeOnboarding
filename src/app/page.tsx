import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold">BeeHype Onboarding (Demo)</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Start the creator onboarding flow.
      </p>
      <Link
        href="/onboarding/welcome"
        className="mt-4 inline-block rounded-md border px-4 py-2"
      >
        Start Onboarding
      </Link>
    </main>
  );
}
