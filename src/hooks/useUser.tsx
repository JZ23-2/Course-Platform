import { getUserRole } from "@/actions/user/user-service";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUser() {
  const { data: session } = useSession();

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (session) {
        const res = await getUserRole(session?.user.email);
        setRole(res[0].role);
      }
    };

    fetchUserRole();
  }, [session]);

  return { role };
}
