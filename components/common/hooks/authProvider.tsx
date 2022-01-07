import { NextPage } from "next";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../../../lib/firebase";
import { User } from "firebase/auth";

export const AuthContext = createContext(
  {} as {
    loginUser: User | null;
    setLoginUser: Dispatch<SetStateAction<User | null>>;
  }
);

const AuthProvider: NextPage = ({ children }) => {
  const [loginUser, setLoginUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoginUser(user);
      }
    });

    return () => {
      unsubscribed();
    };
  }, []);

  const value = {
    loginUser,
    setLoginUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
