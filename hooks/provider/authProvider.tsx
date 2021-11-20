import { NextPage } from "next";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Props } from "../../models/interface";
import { onAuthStateChanged } from "@firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../../src/firebase";

export const AuthContext = createContext(
  {} as {
    currentUser: {} | null;
    setCurrentUser: Dispatch<SetStateAction<{} | null>>;
    nowMonth: number;
    setNowMonth: Dispatch<SetStateAction<number>>;
  }
);

const AuthProvider: NextPage<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<null | {}>(null);
  const [nowMonth, setNowMonth] = useState<number>(new Date().getMonth() + 1);
  const router = useRouter();

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
  const value = {
    currentUser,
    setCurrentUser,
    nowMonth,
    setNowMonth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
