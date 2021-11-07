import { NextPage } from "next";
import { createContext, useEffect, useState } from "react";
import { Props } from "../models";
import { onAuthStateChanged } from "@firebase/auth";
import router from "next/router";
import { auth } from "../src/firebase";

export const AuthContext = createContext(null);

const AuthProvider: NextPage<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<null | {}>(null);
  // const [isGetAuth, setIsGetAuth] = useState(false);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        router.push("/login");
      }
    });

    return () => {
      unsubscribed();
    };
  }, []);
  const value: any = {
    currentUser,
    setCurrentUser,
    
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
