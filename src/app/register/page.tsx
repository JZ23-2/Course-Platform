"use client";
import { useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";
import toast from "react-hot-toast";
import { registerUser } from "@/actions/auth/auth-service";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const confirm = form.get("confirm") as string;

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    startTransition(async () => {
      const res = await registerUser({ name, email, password });

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      if (res.success) {
        toast.success(res.message);
      }
      router.push("/");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Create Account
          </h1>
          <p className="text-muted-foreground text-sm">
            Join the Course Platform and start learning today
          </p>
        </div>

        <Card className="shadow-xl border border-border/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">Register</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Input Your Username"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Input Your Email"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Input Your Password"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  name="confirm"
                  type="password"
                  placeholder="Input Your Confirm Password"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Creating account..." : "Sign Up"}
              </Button>
            </form>

            <div className="mt-4 text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href={"/"} className="text-primary hover:underline">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
