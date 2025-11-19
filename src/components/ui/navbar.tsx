"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Menu } from "lucide-react";
import { useUser } from "@/hooks/useUser";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const { role } = useUser();

  return (
    <nav className="w-full bg-background border-b border-border shadow-sm px-6 py-3 flex justify-between items-center relative">
      <Link href="/" className="text-2xl font-bold">
        Course Platform
      </Link>

      <div className="hidden md:flex items-center gap-4">
        <Link href="/courses" className="hover:text-primary transition-colors">
          Courses
        </Link>

        {role === "admin" && (
          <Link href="/admin" className="hover:text-primary transition-colors">
            Admin
          </Link>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="px-3 py-1 rounded">
              {session?.user?.name || "Profile"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>
              <Link href="/profile/edit">Edit Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="md:hidden">
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
              href="/courses"
              className="px-4 py-2 hover:bg-muted/20 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Courses
            </Link>

            {role === "admin" && (
              <Link
                href="/admin"
                className="px-4 py-2 hover:bg-muted/20 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            )}

            <Link
              href="/profile/edit"
              className="px-4 py-2 hover:bg-muted/20 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Edit Profile
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
