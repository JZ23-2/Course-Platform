import type { Metadata } from "next";
import "./globals.css";
import { RootProviders } from "./RootProviders";

export const metadata: Metadata = {
  title: "Course Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
