export interface UserContextType {
  name: string | null;
  role: string | null;
  fetchUserData: () => Promise<void>;
}
