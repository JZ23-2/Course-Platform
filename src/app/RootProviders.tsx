"use client";

import { ThemeProvider } from "@/hooks/useTheme";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Toaster position="top-right" />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
