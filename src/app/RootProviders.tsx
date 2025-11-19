"use client";

import { ThemeProvider } from "@/hooks/useTheme";
import { Toaster } from "react-hot-toast";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Toaster position="top-right" />
      {children}
    </ThemeProvider>
  );
}
