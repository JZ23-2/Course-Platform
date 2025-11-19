import { registerUser } from "@/actions/auth/auth-service";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export function useAuth() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    startTransition(async () => {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (!res?.ok) {
        toast.error(res?.error || "Login failed");
        return;
      }

      toast.success("Login successful!");
      router.push("/home");
    });
  };

  return { handleRegister, handleLogin, isPending };
}
