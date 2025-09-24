"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react";
import { useOnboardingStore } from "@/lib/store";

export default function GmailPage() {
  const { gmail, setGmail } = useOnboardingStore();

  const handleConnect = async () => {
    setGmail("connecting");

    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // 80% success rate simulation
    const success = Math.random() < 0.8;
    setGmail(success ? "success" : "failed");
  };

  const handleRetry = () => {
    setGmail("not_started");
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Connect Your Gmail
            </h1>
            <p className="text-gray-600 mt-2">
              Link your Gmail to streamline communication with brands and manage
              your partnerships more effectively.
            </p>
          </div>
        </div>

        {/* Connection Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Gmail Integration
            </CardTitle>
            <CardDescription>
              This step is optional - you can skip it and connect later if you
              prefer.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Connection States */}
            {gmail === "not_started" && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-6">
                  Connect your Gmail to automatically sync brand communications
                  and track your partnerships.
                </p>
                <Button
                  onClick={handleConnect}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Connect Gmail
                </Button>
              </div>
            )}

            {gmail === "connecting" && (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Connecting to Gmail...</p>
              </div>
            )}

            {gmail === "success" && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Success!</strong> Your Gmail has been connected
                  successfully. You can now manage brand communications directly
                  from BeeHype.
                </AlertDescription>
              </Alert>
            )}

            {gmail === "failed" && (
              <Alert className="border-red-200 bg-red-50">
                <XCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Connection failed.</strong> There was an issue
                  connecting to Gmail. You can try again or skip this step.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            {gmail === "failed" && (
              <div className="flex justify-center">
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Why connect Gmail?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">
                  Centralized Communication
                </h3>
                <p className="text-sm text-gray-600">
                  Manage all brand emails in one place without switching between
                  apps.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">
                  Partnership Tracking
                </h3>
                <p className="text-sm text-gray-600">
                  Automatically track your brand relationships and communication
                  history.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Quick Responses</h3>
                <p className="text-sm text-gray-600">
                  Respond to brand inquiries faster with integrated email
                  templates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
