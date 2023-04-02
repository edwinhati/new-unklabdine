import { createContext, ReactNode, useContext, useState, useMemo } from "react";
import { auth } from "@/config";

export const UserContext = createContext({} as any);

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  auth.onAuthStateChanged((result: any) => {
    setUser(result);
    setLoading(false);
  });

  return (
    <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>
  );
}

export default UserContext;
