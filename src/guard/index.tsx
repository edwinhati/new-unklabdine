import { useUser } from "@/context";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Protected({ children }: any) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  return user ? children : null;
}
