"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { getUserData } from "@/actions/user/user-service";
import { UserContextType } from "@/interface/user/user-context-interface";

const UserContext = createContext<UserContextType>({
  name: null,
  role: null,
  fetchUserData: async () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [name, setName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const fetchUserData = async () => {
    if (!session?.user?.email) return;
    const res = await getUserData(session.user.email);

    setName(res[0].name);
    setRole(res[0].role);
  };

  useEffect(() => {
    fetchUserData();
  }, [session?.user?.email]);

  return (
    <UserContext.Provider value={{ name, role, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
