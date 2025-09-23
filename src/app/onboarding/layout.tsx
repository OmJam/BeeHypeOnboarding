import { AppStepper } from "@/components/app-stepper";
import { StepFooter } from "@/components/step-footer";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Stepper */}
      <header className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <AppStepper />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer with Navigation */}
      <StepFooter />
    </div>
  );
}
