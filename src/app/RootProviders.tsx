"use client";

import { ThemeProvider } from "@/hooks/useTheme";
import { UserProvider } from "@/hooks/useUser";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <UserProvider>
          <Toaster position="top-right" />
          {children}
        </UserProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
