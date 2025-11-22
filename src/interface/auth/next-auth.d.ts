import NextAuth, {
  DefaultSession,
  DefaultUser,
  JWT as DefaultJWT,
} from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface JWT extends DefaultJWT {
    id: string;
    role: string;
  }
}
