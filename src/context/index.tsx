import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { auth } from "@/config";
import axios from "axios";

type UserContextState = {
  user: any;
  loading: boolean;
  responseStatus: any;
  mealtime: any;
  setMealtime: any;
  noreg: any;
  residence: any;
  // checkStatus: any;
};

export const UserContext = createContext<UserContextState>({
  user: null,
  loading: true,
  responseStatus: null,
  mealtime: null,
  setMealtime: () => {},
  noreg: null,
  residence: null,
  // checkStatus: null,
});
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
  // const [checkStatus, setCheckStatus] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((result: any) => {
      setUser(result);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      setNoreg(user.email.split("@")[0]);
      axios
        .get(`/api/response/status?noreg=${user.email.split("@")[0]}`)
        .then((res) => {
          setResponseStatus(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      axios
        .get(`/api/residence?noreg=${user.email.split("@")[0]}`)
        .then((res) => {
          setResidence(res.data?.residence ?? null);
        });
      // axios.get(`/api/check?noreg=${user.email.split("@")[0]}`).then((res) => {
      //   setCheckStatus(res.data ?? null);
      // });
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
        // checkStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
