import { signOut } from "@firebase/auth";
import { useRouter } from "next/router";
import { useContext } from "react";
import { auth } from "../src/firebase";
import { AuthContext } from "./authProvider";

export const Logout = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const router = useRouter();
  const clickLogout = () => {
    signOut(auth);
    setCurrentUser(null);
    router.push("/login");
  };

  return {
    currentUser,
    clickLogout,
  };
};

export const jumpToLink = () => {
  const clickLink = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };
  return { clickLink };
};
