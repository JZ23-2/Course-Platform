"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Menu } from "lucide-react";
import { useUser } from "@/hooks/useUser";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { role, name } = useUser();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full bg-background border-b border-border shadow-sm px-6 py-3 flex justify-between items-center relative">
      <Link href="/" className="text-2xl font-bold">
        Course Platform
      </Link>

      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/home"
          className={`hover:text-primary transition-colors ${
            isActive("/home") ? "text-primary font-semibold" : ""
          }`}
        >
          Courses
        </Link>

        <Link
          href="/pricing"
          className={`hover:text-primary transition-colors ${
            isActive("/pricing") ? "text-primary font-semibold" : ""
          }`}
        >
          Pricing
        </Link>

        {role === "admin" && (
          <Link
            href="/admin/course"
            className={`hover:text-primary transition-colors ${
              isActive("/admin/course") ? "text-primary font-semibold" : ""
            }`}
          >
            Admin
          </Link>
        )}

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-3 py-1 rounded">
                {name || "Profile"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>
                <Link
                  href="/user/profile"
                  className={isActive("/user/profile") ? "font-semibold" : ""}
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </div>

      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          className="p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="w-6 h-6" />
        </Button>

        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded shadow-lg flex flex-col">
            <Link
              href="/home"
              className={`px-4 py-2 hover:bg-muted/20 transition-colors ${
                isActive("/home") ? "bg-muted/20 font-semibold" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Courses
            </Link>

            <Link
              href="/pricing"
              className={`hover:text-primary transition-colors ${
                isActive("/pricing") ? "text-primary font-semibold" : ""
              }`}
            >
              Pricing
            </Link>

            {role === "admin" && (
              <Link
                href="/admin/course"
                className={`px-4 py-2 hover:bg-muted/20 transition-colors ${
                  isActive("/admin/course") ? "bg-muted/20 font-semibold" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            <Link
              href="/user/profile"
              className={`px-4 py-2 hover:bg-muted/20 transition-colors ${
                isActive("/user/profile") ? "bg-muted/20 font-semibold" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-left px-4 py-2 hover:bg-muted/20 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
