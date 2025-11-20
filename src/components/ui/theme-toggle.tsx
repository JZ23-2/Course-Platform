"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative"
    >
      {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
}
