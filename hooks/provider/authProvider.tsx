import { NextPage } from "next";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../../lib/firebase";
import { User } from "firebase/auth";
import { signInWithEmailAndPassword } from "@firebase/auth";

export const AuthContext = createContext(
  {} as {
    loginUser: User | null;
    setLoginUser: Dispatch<SetStateAction<User | null>>;
    loginAsGuest: () => Promise<void>;
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

  // 登録なし（ゲスト）ログイン
  const loginAsGuest = async () => {
    const email = process.env.NEXT_PUBLIC_TESTUSER_EMAIL;
    const password = process.env.NEXT_PUBLIC_TESTUSER_PASSWORD;
    if (!email || !password) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
    }
  };

  const value = {
    loginUser,
    setLoginUser,
    loginAsGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
