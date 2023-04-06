import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { auth } from "@/config";
import axios from "axios";

export const UserContext = createContext({
  user: null,
  loading: true,
  responseStatus: null,
  mealtime: null,
  setMealtime: () => {},
  noreg: null,
  residence: null,
} as { user: any; loading: boolean; responseStatus: any; setMealtime: any; mealtime: any; noreg: any; residence: any });

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [responseStatus, setResponseStatus] = useState(null);
  const [mealtime, setMealtime] = useState(null);
  const [noreg, setNoreg] = useState(null);
  const [residence, setResidence] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((result: any) => {
      setUser(result);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/response/status?noreg=${user.email.split("@")[0]}`)
        .then((res) => {
          setResponseStatus(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setNoreg(user.email.split("@")[0]);
      axios
        .get(`/api/residence?noreg=${user.email.split("@")[0]}`)
        .then((res) => {
          setResidence(res.data.residence);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        responseStatus,
        setMealtime,
        mealtime,
        noreg,
        residence,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
