import { NextPage } from "next";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../lib/firebase";
import { User } from "firebase/auth";

export const AuthContext = createContext(
  {} as {
    currentUser: any;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
  }
);

const AuthProvider: NextPage = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => {
      unsubscribed();
    };
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
