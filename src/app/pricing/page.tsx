"use client";

import React from "react";
import Navbar from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center mb-10">
          Choose Your Plan
        </h1>

        <p className="text-center text-muted-foreground mb-16">
          Access free courses or unlock all premium content with a small fee.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border border-primary shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Free Plan</CardTitle>
              <p className="text-muted-foreground mt-2">
                Perfect for beginners. Start learning without paying anything.
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Access to <strong>free courses</strong>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Watch intro lessons
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 opacity-30" />
                  No premium chapters
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Check className="w-5 h-5 opacity-30" />
                  No certificate
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-primary shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center justify-between">
                Premium Plan
                <span className="text-3xl font-extrabold text-primary">
                  Rp.100.000
                </span>
              </CardTitle>

              <p className="text-muted-foreground mt-2">
                Unlock all courses, chapters, and premium content.
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Access <strong>all courses</strong>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Watch all video lessons
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Access all premium chapters
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  Certificate of completion
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
