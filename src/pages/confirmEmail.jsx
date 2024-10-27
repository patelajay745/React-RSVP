import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function ConfirmEmail() {
  const [formData, setFormData] = useState({ code: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    // Your confirm logic
  };

  const handleResend = () => {
    // Your resend logic
  };

  const handleSkip = () => {
    // Logic for skipping confirmation
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-gray-800">
            Confirm Your Email
          </CardTitle>
          <CardDescription className="text-gray-500 mt-2">
            Enter the code sent to your email to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleConfirm} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="code" className="block text-gray-700 font-medium">
                Confirmation Code
              </label>
              <Input
                id="code"
                name="code"
                type="text"
                required
                placeholder="Enter code here"
                value={formData.code}
                onChange={handleChange}
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
              <p className="text-xs text-gray-500">
                Didn’t receive the code? Check your spam folder.
              </p>
            </div>

            {error && (
              <Alert variant="destructive" className="text-center">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Confirm
            </Button>
          </form>

          <div className="mt-4 text-center space-y-2">
            <p className="text-sm text-gray-600">Need a new code?</p>
            <Button
              onClick={handleResend}
              type="button"
              variant="outline"
              className="w-full"
            >
              Resend Code
            </Button>

            <Button
              onClick={handleSkip}
              type="button"
              variant="ghost"
              className="mt-2 w-full text-gray-500 hover:text-gray-700"
            >
              Skip for Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
