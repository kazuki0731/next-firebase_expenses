import { signOut } from "@firebase/auth";
import { useRouter } from "next/router";
import { useContext } from "react";
import { auth } from "../../../lib/firebase";
import { AuthContext } from "./authProvider";

export const Logout = () => {
  const { setLoginUser } = useContext(AuthContext);
  const router = useRouter();
  const clickLogout = () => {
    signOut(auth);
    setLoginUser(null);
    router.push("/");
  };

  return { clickLogout };
};

export const jumpToLink = () => {
  const clickLink = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  return { clickLink };
};
