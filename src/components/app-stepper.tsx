"use client";

export default function AppStepper({
  currentIndex,
  total = 7,
}: {
  currentIndex: number;
  total?: number;
}) {
  const pct = Math.max(0, Math.min(100, ((currentIndex + 1) / total) * 100));
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-center gap-3">
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1}/{total}
        </span>
        <div className="h-2 w-full rounded-full bg-gray-300">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
