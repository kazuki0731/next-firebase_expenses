import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "./authProvider";

const useIsLogin = (page: string) => {
  const { loginUser } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (loginUser) {
      router.push(page);
    }
  }, [loginUser]);
};

export default useIsLogin;
