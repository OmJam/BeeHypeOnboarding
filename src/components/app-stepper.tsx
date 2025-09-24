"use client";

export default function AppStepper({
  value,
  total = 6,
}: {
  value: number;
  total?: number;
}) {
  const safeValue = Math.max(0, Math.min(value, total));
  const pct = (safeValue / total) * 100;

  return (
    // container width + padding
    <div className="mx-auto w-full max-w-6xl px-6">
      {/* the bar frame is centered; label is positioned off the bar so it never affects centering */}
      <div className="relative mx-auto w-full max-w-3xl">
        {/* centered progress bar */}
        <div
          className="h-2 w-full rounded-full bg-gray-300"
          role="progressbar"
          aria-label="Onboarding progress"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={safeValue}
        >
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* X/7 status – doesn’t influence centering */}
        <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full -ml-3 text-sm text-gray-600">
          {safeValue}/{total}
        </span>
      </div>
    </div>
  );
}
